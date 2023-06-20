import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Routing } from '../constructs/routing';

interface DomainStackProps extends cdk.StackProps {
  environment: 'tst' | 'dev' | 'prd';
}

export class DomainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    new Routing(this, 'Routing', {
      environment: props.environment,
    });
  }
}
