import { EDAWorkspaceContainer } from '@veupathdb/eda-workspace-core';
import { SubsettingClient } from '@veupathdb/eda-workspace-core/lib/api/eda-api';
import { DataClient } from '@veupathdb/eda-workspace-core/lib/api/data-service';
import React, { useCallback, useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { EDASession } from './EDASession';
import { EDAWorkspaceHeading } from './EDAWorkspaceHeading';
import { mockSessionStore } from './Mocks';
import { cx } from './Utils';

interface Props {
  studyId: string;
  sessionId: string;
  edaServiceUrl: string;
  dataServiceUrl: string;
}
export function EDAWorkspace(props: Props) {
  const { url } = useRouteMatch();
  const subsettingClient: SubsettingClient = useMemo(
    () =>
      new (class extends SubsettingClient {
        constructor() {
          super({ baseUrl: props.edaServiceUrl });
        }
        async getStudyMetadata() {
          return super.getStudyMetadata('GEMSCC0002-1');
        }
      })(),
    [props.edaServiceUrl]
  );

  const dataClient: DataClient = useMemo(
    () => new DataClient({ baseUrl: props.dataServiceUrl }),
    [props.dataServiceUrl]
  );

  const makeVariableLink = useCallback(
    (entityId: string, variableId: string) =>
      `${url}/variables/${entityId}/${variableId}`,
    [url]
  );
  return (
    <EDAWorkspaceContainer
      sessionId={props.sessionId}
      studyId={props.studyId}
      className={cx()}
      sessionClient={mockSessionStore}
      subsettingClient={subsettingClient}
      dataClient={dataClient}
      makeVariableLink={makeVariableLink}
    >
      <EDAWorkspaceHeading />
      <EDASession sessionId={props.sessionId} />
    </EDAWorkspaceContainer>
  );
}
