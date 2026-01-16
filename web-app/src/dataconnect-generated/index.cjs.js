const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'noobdev',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createTypingTestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTypingTest', inputVars);
}
createTypingTestRef.operationName = 'CreateTypingTest';
exports.createTypingTestRef = createTypingTestRef;

exports.createTypingTest = function createTypingTest(dcOrVars, vars) {
  return executeMutation(createTypingTestRef(dcOrVars, vars));
};

const getTypingTestsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTypingTestsByUser', inputVars);
}
getTypingTestsByUserRef.operationName = 'GetTypingTestsByUser';
exports.getTypingTestsByUserRef = getTypingTestsByUserRef;

exports.getTypingTestsByUser = function getTypingTestsByUser(dcOrVars, vars) {
  return executeQuery(getTypingTestsByUserRef(dcOrVars, vars));
};

const createChallengeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateChallenge', inputVars);
}
createChallengeRef.operationName = 'CreateChallenge';
exports.createChallengeRef = createChallengeRef;

exports.createChallenge = function createChallenge(dcOrVars, vars) {
  return executeMutation(createChallengeRef(dcOrVars, vars));
};

const listChallengesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListChallenges');
}
listChallengesRef.operationName = 'ListChallenges';
exports.listChallengesRef = listChallengesRef;

exports.listChallenges = function listChallenges(dc) {
  return executeQuery(listChallengesRef(dc));
};
