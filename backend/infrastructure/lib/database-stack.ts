import * as cdk from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import { type VpcStack } from './vpc-stack';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

export class DatabaseStack extends cdk.Stack {
  public readonly securityGroup: ec2.SecurityGroup;
  public readonly databaseCluster: rds.DatabaseCluster;

  constructor(scope: Construct, id: string, vpcStack: VpcStack, props?: cdk.StackProps) {
    super(scope, id, props);

    this.securityGroup = new ec2.SecurityGroup(this, 'DatabaseSecurityGroup', {
      vpc: vpcStack.vpc,
      description: 'RDS Security Group',
    });

    vpcStack.vpc.privateSubnets.forEach((subnet) => {
      this.securityGroup.addIngressRule(
        ec2.Peer.ipv4(subnet.ipv4CidrBlock),
        ec2.Port.tcp(5432),
        `Allow PostgreSQL access from resources within the private subnet(s)`,
      );
    });

    this.databaseCluster = new rds.DatabaseCluster(this, 'KolliconCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_4,
      }),
      vpc: vpcStack.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 1,
      writer: rds.ClusterInstance.serverlessV2('writer'),
      securityGroups: [this.securityGroup],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      defaultDatabaseName: 'postgres',
      backup: {
        retention: cdk.Duration.days(35),
      },
    });
  }
}
