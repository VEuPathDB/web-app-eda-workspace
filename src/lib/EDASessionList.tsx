import React, { useMemo } from 'react';
import { EDASessionListContainer } from '@veupathdb/eda-workspace-core';
import { mockSessionStore } from './Mocks';
import { EDAWorkspaceHeading } from './EDAWorkspaceHeading';
import { SessionList } from './SessionList';
import { cx } from './Utils';
import { SubsettingClient } from '@veupathdb/eda-workspace-core/lib/api/eda-api';
import { DataClient } from '@veupathdb/eda-workspace-core/lib/api/data-service';

export interface Props {
  studyId: string;
  edaServiceUrl: string;
  dataServiceUrl: string;
}

export function EDASessionList(props: Props) {
  const subsettingClient: SubsettingClient = useMemo(
    () =>
      new (class extends SubsettingClient {
        async getStudyMetadata() {
          return super.getStudyMetadata('GEMSCC0002-1');
        }
      })({ baseUrl: props.edaServiceUrl }),
    [props.edaServiceUrl]
  );

  const dataClient: DataClient = useMemo(
    () => new DataClient({ baseUrl: props.dataServiceUrl }),
    [props.dataServiceUrl]
  );

  return (
    <EDASessionListContainer
      studyId={props.studyId}
      subsettingClient={subsettingClient}
      dataClient={dataClient}
      className={cx()}
      sessionClient={mockSessionStore}
    >
      <EDAWorkspaceHeading />
      <SessionList sessionStore={mockSessionStore} />
    </EDASessionListContainer>
  );
}
