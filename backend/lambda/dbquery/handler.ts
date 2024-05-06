import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { Handler, Context } from 'aws-lambda';
import { Pool } from 'pg';

type Secret = {
  username: string;
  password: string;
  engine: string;
  host: string;
  port: number;
  dbname: string;
};

type CustomLambdaEvent = {
  sqlQueryString: string;
};

type LambdaHandler = Handler<CustomLambdaEvent, { statusCode: number; body: string }>;

export const handler: LambdaHandler = async (event: CustomLambdaEvent) => {
  const secretsManagerClient = new SecretsManagerClient({ region: 'eu-west-1' });

  const secretArn = process.env.DB_SECRET_ARN;
  if (!secretArn) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'DB_SECRET_ARN environment variable not set' }),
    };
  }

  try {
    const getSecretValueCommand = new GetSecretValueCommand({ SecretId: secretArn });
    const secretValue = await secretsManagerClient.send(getSecretValueCommand);
    const secretString = secretValue.SecretString;

    if (!secretString) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Secret string is nil' }),
      };
    }

    const secret: Secret = JSON.parse(secretString);
    const pool = new Pool({
      host: secret.host,
      user: secret.username,
      password: secret.password,
      database: secret.dbname,
      port: secret.port,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const sqlQuery = event.sqlQueryString;
    if (!sqlQuery) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No SQL query provided in the query string' }),
      };
    }

    const { rows } = await pool.query(sqlQuery);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: rows }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Database or AWS Secrets Manager error: ${error.message}` }),
    };
  }
};
