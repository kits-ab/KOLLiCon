import * as cdk from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import { type CognitoStack } from './cognito-stack';
import { VpcStack } from './vpc-stack';
import { DatabaseStack } from './database-stack';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as elbv2Actions from 'aws-cdk-lib/aws-elasticloadbalancingv2-actions';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const applicationPort = 8080;

export class ApiStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    cognitoStack: CognitoStack,
    vpcStack: VpcStack,
    databaseStack: DatabaseStack,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const fargateSecurityGroup = new ec2.SecurityGroup(this, 'FargateSecurityGroup', {
      vpc: vpcStack.vpc,
      description: 'Fargate Security Group',
      allowAllOutbound: true,
    });
    fargateSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP traffic to ALB',
    );
    fargateSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTPS traffic to ALB',
    );
    fargateSecurityGroup.addIngressRule(
      fargateSecurityGroup,
      ec2.Port.tcp(applicationPort),
      'Allow ALB to to communicate with the Fargate tasks on the specific application port',
    );

    const taskRole = new iam.Role(this, 'EcsTaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      description: 'Allows ECS tasks to interact with AWS services during operation',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'),
      ],
    });
    const dbSecret = databaseStack.databaseCluster.secret!;
    dbSecret.grantRead(taskRole);

    const executionRole = new iam.Role(this, 'EcsTaskExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      description: 'Allows ECS service to pull ECR images, store logs, etc',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'),
      ],
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'KolliconAppTask', {
      taskRole,
      executionRole,
      memoryLimitMiB: 2048,
    });

    taskDefinition.addContainer('KolliconAppContainer', {
      image: ecs.ContainerImage.fromAsset('../'),
      portMappings: [
        {
          containerPort: applicationPort,
          protocol: ecs.Protocol.TCP,
        },
      ],
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'KolliconApp',
        logGroup: new logs.LogGroup(this, 'LogGroup', {
          logGroupName: '/ecs/kollicon',
          removalPolicy: cdk.RemovalPolicy.DESTROY,
        }),
      }),
      environment: {
        DB_NAME: 'postgres',
        // Placeholders
        SPRING_MAIL_HOST: 'smtp.gmail.com',
        SPRING_MAIL_PORT: '587',
        SPRING_MAIL_USERNAME: 'example@kits.se',
        SPRING_MAIL_PASSWORD: 'password',
        SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH: 'true',
        SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE: 'true',
      },
      secrets: {
        DB_HOST: ecs.Secret.fromSecretsManager(dbSecret, 'host'),
        DB_PORT: ecs.Secret.fromSecretsManager(dbSecret, 'port'),
        DB_USERNAME: ecs.Secret.fromSecretsManager(dbSecret, 'username'),
        DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, 'password'),
      },
    });

    const certificateArn = ssm.StringParameter.valueForStringParameter(
      this,
      '/config/certificateArn',
    );
    const certificate = acm.Certificate.fromCertificateArn(this, 'KolliconTLSCert', certificateArn);

    const cluster = new ecs.Cluster(this, 'EcsCluster', {
      vpc: vpcStack.vpc,
      clusterName: 'KolliconCluster',
    });
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'KolliconFargateService',
      {
        cluster,
        taskDefinition,
        cpu: 256,
        memoryLimitMiB: 2048,
        desiredCount: 1,
        taskSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        securityGroups: [fargateSecurityGroup],

        publicLoadBalancer: true,
        loadBalancerName: 'KolliconALB',
        protocol: elbv2.ApplicationProtocol.HTTPS,
        certificate,
        redirectHTTP: true,
      },
    );

    // Outputs
    new cdk.CfnOutput(this, 'KolliconLoadBalancerDnsName', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
