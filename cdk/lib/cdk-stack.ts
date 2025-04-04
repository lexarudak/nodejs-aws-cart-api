import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appFunction = new NodejsFunction(this, 'appFunction', {
      runtime: Runtime.NODEJS_22_X,
      entry: '../src/main.ts',
      handler: 'handler',
      memorySize: 128,
      timeout: Duration.seconds(30),
      bundling: {
        externalModules: [
          'aws-sdk',
          'class-validator',
          'class-transformer',
          '@nestjs/microservices',
          '@nestjs/websockets',
        ],
        forceDockerBundling: false,
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
