import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { Handler, Context } from 'aws-lambda';
import * as mysql from 'mysql2/promise';

type Secret = {
  username: string;
  password: string;
  engine: string;
  host: string;
  port: number;
};

type CustomLambdaEvent = {
  sqlQueryString: string;
}

type LambdaHandler = Handler<CustomLambdaEvent, { statusCode: number; body: string }>;

export const handler: LambdaHandler = async (event: CustomLambdaEvent) => {
  // Initialize AWS Secrets Manager client
  const secretsManagerClient = new SecretsManagerClient({ region: 'eu-west-1' });

  // Retrieve DB secret ARN from environment variable
  const secretArn = process.env.DB_SECRET_ARN;
  if (!secretArn) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'DB_SECRET_ARN environment variable not set' }),
    };
  }

  // Get secret from AWS Secrets Manager
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

    // Parse the secret string to get DB credentials
    const secret: Secret = JSON.parse(secretString);

    // Database connection string
    const connConfig = {
      host: secret.host,
      user: secret.username,
      password: secret.password,
      database: secret.engine, // Assuming the database name is 'postgres'
      port: secret.port,
      ssl: {
        rejectUnauthorized: false,
      },
    };

    // Create a new database connection
    const connection = await mysql.createConnection(connConfig);

    // Get SQL query from queryString parameters of the event
    const sqlQuery = event.sqlQueryString;
    if (!sqlQuery) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No SQL query provided in the query string' }),
      };
    }

    // Execute the query
    const [rows] = await connection.execute(sqlQuery);

    // Close the connection
    await connection.end();

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
