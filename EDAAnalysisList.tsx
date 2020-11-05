import * as React from 'react';
import { EDAAnalysisListContainer } from 'ebrc-client/modules/eda-workspace-core/components/EDAAnalysisListContainer';
import { mockAnalysisStore, mockStudyMetadataStore } from './Mocks';
import { EDAWorkspaceHeading } from './EDAWorkspaceHeading';
import { AnalysisList } from './AnalysisList';

export interface Props {
  studyId: string;
}

export function EDAAnalysisList(props: Props) {
  return (
    <EDAAnalysisListContainer studyId={props.studyId} analysisStore={mockAnalysisStore} studyMetadataStore={mockStudyMetadataStore}>
      <EDAWorkspaceHeading/>
      <AnalysisList analysisStore={mockAnalysisStore} />
    </EDAAnalysisListContainer>
  )
}
