import * as cdk from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import { VpcStack } from './vpc-stack';
import { DatabaseStack } from './database-stack';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    vpcStack: VpcStack,
    databaseStack: DatabaseStack,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const securityGroup = new ec2.SecurityGroup(this, 'LambdaSecurityGroup', {
      vpc: vpcStack.vpc,
      description: 'Lambda Security Group',
      allowAllOutbound: true,
    });

    const queryLambda = new lambda.Function(this, 'KolliconQueryLambda', {
      code: lambda.Code.fromAsset('../lambda/dbQuery/dbquery.zip'),
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.handler',
      environment: {
        DB_SECRET_ARN: databaseStack.databaseCluster.secret?.secretArn!,
      },
      vpc: vpcStack.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [securityGroup],
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
    const dbSecret = databaseStack.databaseCluster.secret!;
    dbSecret.grantRead(queryLambda);
  }
}
