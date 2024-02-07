package com.myorg;

import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.ec2.*;
import software.amazon.awscdk.services.ecs.*;
import software.amazon.awscdk.services.ecs.patterns.*;

import software.amazon.awscdk.services.rds.*;
import software.amazon.awscdk.services.secretsmanager.Secret;
import software.amazon.awscdk.services.secretsmanager.SecretProps;

import software.amazon.awscdk.services.ecr.*;
import software.amazon.awscdk.services.ecr.assets.*;



public class InfrastructureStack extends Stack {
    public InfrastructureStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public InfrastructureStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        Vpc vpc = Vpc.Builder.create(this, "KolliconVpc")
            .maxAzs(2)
            .build();

        Cluster cluster = Cluster.Builder.create(this, "KolliconCluster")
            .vpc(vpc).build();


        AssetImageProps assetImageProps = AssetImageProps.builder()
            .platform(Platform.LINUX_AMD64)
            .build();

        ApplicationLoadBalancedFargateService.Builder.create(this, "KolliconFargateService")
            .cluster(cluster)     
            .cpu(256)                   
            .desiredCount(1)          
            .taskImageOptions(
                    ApplicationLoadBalancedTaskImageOptions.builder()
                            .image(ContainerImage.fromAsset("/Users/philiplu/Desktop/Github/KOLLiCon/backend", assetImageProps))
                            .containerPort(80)
                            .build())
            .memoryLimitMiB(512)       
            .publicLoadBalancer(true)
            .listenerPort(80)
            .build();

/*        // Create a PostgreSQL database using Aurora
        ServerlessCluster auroraDatabase = ServerlessCluster.Builder.create(this, "KolliconAuroraDatabase")
            .engine(AuroraPostgresEngine.builder())
            .vpc(vpc)
            .build();

        // Create a secret for the database credentials
        Secret databaseSecret = Secret.Builder.create(this, "KolliconDatabaseSecret")
            .secretName("KolliconDatabaseSecret")
            .generateSecretString(SecretStringGenerator.builder()
                    .secretStringTemplate("{\"username\":\"admin\"}")
                    .generateStringKey("password")
                    .excludePunctuation(true)
                    .passwordLength(16)
                    .build())
            .build();

        // Grant the Fargate service permission to access the Aurora database
        auroraDatabase.grantConnect(fargateService.getTaskDefinition().getTaskRole());*/
    }
}
