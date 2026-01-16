import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

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

interface CreateTypingTestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTypingTestVariables): MutationRef<CreateTypingTestData, CreateTypingTestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTypingTestVariables): MutationRef<CreateTypingTestData, CreateTypingTestVariables>;
  operationName: string;
}
export const createTypingTestRef: CreateTypingTestRef;

export function createTypingTest(vars: CreateTypingTestVariables): MutationPromise<CreateTypingTestData, CreateTypingTestVariables>;
export function createTypingTest(dc: DataConnect, vars: CreateTypingTestVariables): MutationPromise<CreateTypingTestData, CreateTypingTestVariables>;

interface GetTypingTestsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTypingTestsByUserVariables): QueryRef<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTypingTestsByUserVariables): QueryRef<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;
  operationName: string;
}
export const getTypingTestsByUserRef: GetTypingTestsByUserRef;

export function getTypingTestsByUser(vars: GetTypingTestsByUserVariables): QueryPromise<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;
export function getTypingTestsByUser(dc: DataConnect, vars: GetTypingTestsByUserVariables): QueryPromise<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;

interface CreateChallengeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChallengeVariables): MutationRef<CreateChallengeData, CreateChallengeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateChallengeVariables): MutationRef<CreateChallengeData, CreateChallengeVariables>;
  operationName: string;
}
export const createChallengeRef: CreateChallengeRef;

export function createChallenge(vars: CreateChallengeVariables): MutationPromise<CreateChallengeData, CreateChallengeVariables>;
export function createChallenge(dc: DataConnect, vars: CreateChallengeVariables): MutationPromise<CreateChallengeData, CreateChallengeVariables>;

interface ListChallengesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListChallengesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListChallengesData, undefined>;
  operationName: string;
}
export const listChallengesRef: ListChallengesRef;

export function listChallenges(): QueryPromise<ListChallengesData, undefined>;
export function listChallenges(dc: DataConnect): QueryPromise<ListChallengesData, undefined>;

