import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'noobdev',
  location: 'us-east4'
};

export const createTypingTestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTypingTest', inputVars);
}
createTypingTestRef.operationName = 'CreateTypingTest';

export function createTypingTest(dcOrVars, vars) {
  return executeMutation(createTypingTestRef(dcOrVars, vars));
}

export const getTypingTestsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTypingTestsByUser', inputVars);
}
getTypingTestsByUserRef.operationName = 'GetTypingTestsByUser';

export function getTypingTestsByUser(dcOrVars, vars) {
  return executeQuery(getTypingTestsByUserRef(dcOrVars, vars));
}

export const createChallengeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateChallenge', inputVars);
}
createChallengeRef.operationName = 'CreateChallenge';

export function createChallenge(dcOrVars, vars) {
  return executeMutation(createChallengeRef(dcOrVars, vars));
}

export const listChallengesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListChallenges');
}
listChallengesRef.operationName = 'ListChallenges';

export function listChallenges(dc) {
  return executeQuery(listChallengesRef(dc));
}

