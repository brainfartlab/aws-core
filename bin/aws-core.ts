#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DomainStack } from '../lib/infra/domain-stack';

const app = new cdk.App();
new DomainStack(app, 'AwsCoreStack', {
  env: {
    account: '811733000668',
    region: 'eu-west-1',
  },
  environment: 'tst',
});
