import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class CognitoStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly userPoolDomain: cognito.UserPoolDomain;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'Kollicon-UserPool',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk/SecretValue.html#aws_cdk.SecretValue.unsafe_unwrap
    const clientId = cdk.SecretValue.secretsManager('AzureFederatedSignIn', {
      jsonField: 'client_id',
    }).unsafeUnwrap();
    const clientSecret = cdk.SecretValue.secretsManager('AzureFederatedSignIn', {
      jsonField: 'client_secret',
    }).unsafeUnwrap();

    const oidcProvider = new cognito.UserPoolIdentityProviderOidc(this, 'OIDCProvider', {
      userPool: this.userPool,
      name: 'AzureServerlessTest',
      clientId,
      clientSecret,
      issuerUrl: 'https://login.microsoftonline.com/31759c9d-8927-430d-9abc-cf496fc85429/v2.0',
      scopes: ['openid', 'profile', 'email'],
      attributeMapping: {
        email: cognito.ProviderAttribute.other('email'),
        fullname: cognito.ProviderAttribute.other('name'),
      },
    });

    this.userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool: this.userPool,
      idTokenValidity: cdk.Duration.days(1),
      accessTokenValidity: cdk.Duration.days(1),
      refreshTokenValidity: cdk.Duration.days(30),
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.custom(oidcProvider.providerName),
      ],
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL, cognito.OAuthScope.PROFILE],
        callbackUrls: [
          'http://localhost:5173/handlelogin',
          'https://kollicon-dev.aws.kits.dev/handlelogin',
        ],
        logoutUrls: ['http://localhost:5173/login', 'https://kollicon-dev.aws.kits.dev/login'],
      },
      authFlows: {
        userSrp: false,
        custom: false,
      },
    });
    this.userPoolClient.node.addDependency(oidcProvider);

    this.userPoolDomain = new cognito.UserPoolDomain(this, 'UserPoolDomain', {
      userPool: this.userPool,
      cognitoDomain: {
        domainPrefix: 'kollicon-dev',
      },
    });

    new cdk.CfnOutput(this, 'UserPoolClientIdOutput', {
      value: this.userPoolClient.userPoolClientId,
    });

    const userPoolEndpoint = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPool.userPoolId}`;
    new cdk.CfnOutput(this, 'UserPoolEndpointOutput', {
      value: userPoolEndpoint,
    });
  }
}
