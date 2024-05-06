# Deployment

### Prerequisites

For manual configuration or deployment:

- NPM installed
- AWS CDK installed
- AWS CLI installed
- Appropriate AWS credentials configured on your machine

### Installation

To install all dependencies required, run npm install:

```bash
npm install
```

### Setup

If it's the first deployment on the account, a parameter will need to be set in SSM with the arn of the certificate for the external ALB domain.

```bash
aws ssm --profile <profile> put-parameter --name "/config/certificateArn" --value "<certificateArn>" --type String
```

Confirm the parameter was set sucessfully:

```bash
aws --profile <profile> ssm get-parameter --name "/config/certificateArn" --query "Parameter.Value" --output text
```

### Manual Deployment

The stacks are automatically deployed when pushed to the main branch on github, but for manual deployment run:

```bash
cdk deploy --profile <profile>
```

## Costs/month

- VPC: ~$5
- VPC Endpoint x3: ~$25
- Fargate with low configurations: ~$20
- Application Load Balancer: ~$20 base cost (no base cost with AWS Free tier if it's the only ELB on the account)
- RDS Aurora: ~$50 base cost
