/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
