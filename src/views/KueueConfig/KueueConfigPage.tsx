import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
  List,
  ListItem,
  PageSection,
  Title,
} from '@patternfly/react-core';
import {
  DocumentTitle,
  ListPageHeader,
  Timestamp,
  useK8sWatchResource,
} from '@openshift-console/dynamic-plugin-sdk';
import { KueueKind } from '../../types';
import { KueueGroupVersionKind } from '../../models';
import { ConditionsTable } from '../../components/shared/ConditionsTable';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

export default function KueueConfigPage() {
  const { t } = useKueueTranslation();
  const [resource, loaded, loadError] = useK8sWatchResource<KueueKind>({
    groupVersionKind: KueueGroupVersionKind,
    name: 'cluster',
    namespace: 'openshift-kueue-operator',
  });

  if (!loaded) {
    return <PageSection>{t('Loading...')}</PageSection>;
  }

  if (loadError) {
    return (
      <PageSection>
        {t('Error loading Kueue configuration: {{error}}', {
          error: (loadError as Error)?.message ?? String(loadError),
        })}
      </PageSection>
    );
  }

  const spec = resource?.spec;
  const frameworks = spec?.config?.integrations?.frameworks;

  return (
    <>
      <DocumentTitle>{t('Kueue Configuration')}</DocumentTitle>
      <ListPageHeader title={t('Kueue Configuration')} />
      <PageSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--pf-t--global--spacer--lg)' }}>
          <div>
            <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
              {t('Operator')}
            </Title>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>{t('Name')}</DescriptionListTerm>
                <DescriptionListDescription>{resource?.metadata?.name}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t('Namespace')}</DescriptionListTerm>
                <DescriptionListDescription>{resource?.metadata?.namespace}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t('Management State')}</DescriptionListTerm>
                <DescriptionListDescription>
                  <Label color="green" isCompact>
                    {spec?.managementState ?? 'Managed'}
                  </Label>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t('Created')}</DescriptionListTerm>
                <DescriptionListDescription>
                  <Timestamp timestamp={resource?.metadata?.creationTimestamp} />
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </div>

          <div>
            <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
              {t('Integrations')}
            </Title>
            {frameworks?.length ? (
              <>
                <p style={{ marginBottom: 'var(--pf-t--global--spacer--xs)' }}>
                  {t('Enabled Frameworks:')}
                </p>
                <List>
                  {frameworks.map((fw) => (
                    <ListItem key={fw}>{fw}</ListItem>
                  ))}
                </List>
              </>
            ) : (
              <>{t('No frameworks configured')}</>
            )}
          </div>
        </div>

        {spec?.config?.workloadManagement?.labelPolicy && (
          <div style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
            <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
              {t('Webhook Configuration')}
            </Title>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>{t('Label Policy')}</DescriptionListTerm>
                <DescriptionListDescription>
                  {spec.config.workloadManagement.labelPolicy}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </div>
        )}

        {resource?.status?.conditions && (
          <div style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
            <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
              {t('Conditions')}
            </Title>
            <ConditionsTable conditions={resource.status.conditions} />
          </div>
        )}
      </PageSection>
    </>
  );
}
