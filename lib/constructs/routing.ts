import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as apigw2 from '@aws-cdk/aws-apigatewayv2-alpha';

import { DomainSettings } from '../constants/bfl';

interface RoutingProps {
  environment: 'dev' | 'prd' | 'tst';
}

export class Routing extends Construct {
  public readonly hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: RoutingProps) {
    super(scope, id);

    const environmentDomainName = `${props.environment}.${DomainSettings.domainName}`;

    const hostedZone = new route53.HostedZone(this, 'HostedZone', {
      zoneName: environmentDomainName,
    });

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: `*.${hostedZone.zoneName}`,
      certificateName: 'BrainFartLab Service',
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    const domainName = new apigw2.DomainName(this, 'DomainName', {
      domainName: `api.${environmentDomainName}`,
      certificate,
    });

    new route53.CnameRecord(this, 'ApiRecordSet', {
      zone: hostedZone,
      recordName: `api.${environmentDomainName}`,
      domainName: domainName.regionalDomainName,
    });
  }
}
