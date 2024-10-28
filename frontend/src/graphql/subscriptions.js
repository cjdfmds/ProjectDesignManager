/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onCreateProject(filter: $filter, owner: $owner) {
      id
      requesterName
      projectType
      projectName
      projectBrief
      dateNeeded
      fileURL
      status
      dateRequested
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onUpdateProject(filter: $filter, owner: $owner) {
      id
      requesterName
      projectType
      projectName
      projectBrief
      dateNeeded
      fileURL
      status
      dateRequested
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onDeleteProject(filter: $filter, owner: $owner) {
      id
      requesterName
      projectType
      projectName
      projectBrief
      dateNeeded
      fileURL
      status
      dateRequested
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
