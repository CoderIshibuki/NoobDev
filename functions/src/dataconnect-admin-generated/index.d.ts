import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Challenge_Key {
  id: UUIDString;
  __typename?: 'Challenge_Key';
}

export interface CreateChallengeData {
  challenge_insert: Challenge_Key;
}

export interface CreateChallengeVariables {
  passageId: UUIDString;
  name: string;
  description: string;
  endsAt: TimestampString;
  type: string;
}

export interface CreateTypingTestData {
  typingTest_insert: TypingTest_Key;
}

export interface CreateTypingTestVariables {
  passageId: UUIDString;
  userId: UUIDString;
  accuracy: number;
  duration: number;
  endTime: TimestampString;
  startTime: TimestampString;
  wpm: number;
}

export interface GetTypingTestsByUserData {
  typingTests: ({
    id: UUIDString;
    passageId?: UUIDString | null;
    accuracy: number;
    wpm: number;
    duration: number;
    startTime: TimestampString;
    endTime: TimestampString;
  } & TypingTest_Key)[];
}

export interface GetTypingTestsByUserVariables {
  userId: UUIDString;
}

export interface LeaderboardEntry_Key {
  id: UUIDString;
  __typename?: 'LeaderboardEntry_Key';
}

export interface ListChallengesData {
  challenges: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    endsAt: TimestampString;
    type: string;
  } & Challenge_Key)[];
}

export interface TypingPassage_Key {
  id: UUIDString;
  __typename?: 'TypingPassage_Key';
}

export interface TypingTest_Key {
  id: UUIDString;
  __typename?: 'TypingTest_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateTypingTest' Mutation. Allow users to execute without passing in DataConnect. */
export function createTypingTest(dc: DataConnect, vars: CreateTypingTestVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTypingTestData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTypingTest' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTypingTest(vars: CreateTypingTestVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTypingTestData>>;

/** Generated Node Admin SDK operation action function for the 'GetTypingTestsByUser' Query. Allow users to execute without passing in DataConnect. */
export function getTypingTestsByUser(dc: DataConnect, vars: GetTypingTestsByUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTypingTestsByUserData>>;
/** Generated Node Admin SDK operation action function for the 'GetTypingTestsByUser' Query. Allow users to pass in custom DataConnect instances. */
export function getTypingTestsByUser(vars: GetTypingTestsByUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTypingTestsByUserData>>;

/** Generated Node Admin SDK operation action function for the 'CreateChallenge' Mutation. Allow users to execute without passing in DataConnect. */
export function createChallenge(dc: DataConnect, vars: CreateChallengeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateChallengeData>>;
/** Generated Node Admin SDK operation action function for the 'CreateChallenge' Mutation. Allow users to pass in custom DataConnect instances. */
export function createChallenge(vars: CreateChallengeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateChallengeData>>;

/** Generated Node Admin SDK operation action function for the 'ListChallenges' Query. Allow users to execute without passing in DataConnect. */
export function listChallenges(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListChallengesData>>;
/** Generated Node Admin SDK operation action function for the 'ListChallenges' Query. Allow users to pass in custom DataConnect instances. */
export function listChallenges(options?: OperationOptions): Promise<ExecuteOperationResponse<ListChallengesData>>;

