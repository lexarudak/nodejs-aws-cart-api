import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime, Function, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appFunction = new Function(this, 'appFunction', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'main.handler',
      memorySize: 128,
      timeout: Duration.seconds(30),
      code: Code.fromAsset('../dist'),
      environment: {
        JWT_SECRET: 'your-secret-key',
        JWT_EXPIRATION: '1h',
      },
    });

    const api = new RestApi(this, 'appApi', {
      restApiName: 'App Service',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
      },
    });

    const rootResource = api.root;
    rootResource.addProxy({
      defaultIntegration: new LambdaIntegration(appFunction),
      anyMethod: true,
    });

    new CfnOutput(this, 'ApiGatewayUrl', {
      value: api.url,
      description: 'API Gateway Endpoint for App Service',
    });
  }
}
