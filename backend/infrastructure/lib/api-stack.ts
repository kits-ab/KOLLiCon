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
    });

    taskDefinition.addContainer('KolliconAppContainer', {
      image: ecs.ContainerImage.fromAsset('../'),
      portMappings: [
        {
          containerPort: applicationPort,
          protocol: ecs.Protocol.TCP,
        },
      ],
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
      healthCheck: {
        command: ['CMD-SHELL', 'curl -f http://localhost:8080/actuator/health || exit 1'],
        interval: cdk.Duration.seconds(60),
        timeout: cdk.Duration.seconds(30),
        retries: 3,
        startPeriod: cdk.Duration.seconds(300),
      },
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'KolliconApp',
        logGroup: new logs.LogGroup(this, 'LogGroup', {
          logGroupName: '/ecs/kollicon',
          removalPolicy: cdk.RemovalPolicy.DESTROY,
        }),
      }),
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
        cpu: 512,
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

        healthCheckGracePeriod: cdk.Duration.minutes(5),
      },
    );

    fargateService.targetGroup.configureHealthCheck({
      interval: cdk.Duration.seconds(60),
      timeout: cdk.Duration.seconds(30),
      healthyThresholdCount: 5,
      unhealthyThresholdCount: 2,
      path: '/actuator/health',
    });

    // DB Query Lambda.
    const queryLambda = new lambda.Function(this, 'KolliconQueryLambda', {
      code: lambda.Code.fromAsset('../lambda/dbQuery/dbquery.zip'),
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.handler',
      environment: {
        DB_SECRET_ARN: databaseStack.databaseCluster.secret?.secretArn!,
      },
      vpc: vpcStack.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [fargateSecurityGroup],
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      role: new cdk.aws_iam.Role(this, 'LambdaExecutionRole', {
        assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaVPCAccessExecutionRole',
          ),
          cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole',
          ),
        ],
      }),
    });
    dbSecret.grantRead(queryLambda);

    // Outputs
    new cdk.CfnOutput(this, 'KolliconLoadBalancerDnsName', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
