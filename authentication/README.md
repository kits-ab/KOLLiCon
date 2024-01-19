# AUTHENTICATION

# DEPLOY
**This is already deployed and ready to go, only re-deploy if changes are made to serverless.yml.**

To deploy the authentication stack you can run the following command:

```bash
Mac
AWS_PROFILE=<MY_PROFILE> npx sls deploy -s <STAGE_NAME>

Windows
set AWS_PROFILE=<MY_PROFILE>&& npx sls deploy -s <STAGE_NAME>
```

The stage name to be used is defined in env.yml, for now the stage is named "dev".

The serverless file has two interesting parameters 

```yaml
 ProviderDetails:
          client_id: ${ssm:/azure/client_id~true}
          client_secret: ${ssm:/azure/client_secret~true}
```

These two lines are two parameters defined when doing an app registration on azure,
where their expiration date also is set (currently 7/9/2023). To view this app, log into
azure with your account and go to the "App registrations" service and find the "konpro" app.
They are stored as encrypted parameters in aws ssm (Systems Manager), and are used to
allow cognito to connect to azure.