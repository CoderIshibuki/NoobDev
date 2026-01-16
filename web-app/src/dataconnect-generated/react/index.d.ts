import { CreateTypingTestData, CreateTypingTestVariables, GetTypingTestsByUserData, GetTypingTestsByUserVariables, CreateChallengeData, CreateChallengeVariables, ListChallengesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateTypingTest(options?: useDataConnectMutationOptions<CreateTypingTestData, FirebaseError, CreateTypingTestVariables>): UseDataConnectMutationResult<CreateTypingTestData, CreateTypingTestVariables>;
export function useCreateTypingTest(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTypingTestData, FirebaseError, CreateTypingTestVariables>): UseDataConnectMutationResult<CreateTypingTestData, CreateTypingTestVariables>;

export function useGetTypingTestsByUser(vars: GetTypingTestsByUserVariables, options?: useDataConnectQueryOptions<GetTypingTestsByUserData>): UseDataConnectQueryResult<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;
export function useGetTypingTestsByUser(dc: DataConnect, vars: GetTypingTestsByUserVariables, options?: useDataConnectQueryOptions<GetTypingTestsByUserData>): UseDataConnectQueryResult<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;

export function useCreateChallenge(options?: useDataConnectMutationOptions<CreateChallengeData, FirebaseError, CreateChallengeVariables>): UseDataConnectMutationResult<CreateChallengeData, CreateChallengeVariables>;
export function useCreateChallenge(dc: DataConnect, options?: useDataConnectMutationOptions<CreateChallengeData, FirebaseError, CreateChallengeVariables>): UseDataConnectMutationResult<CreateChallengeData, CreateChallengeVariables>;

export function useListChallenges(options?: useDataConnectQueryOptions<ListChallengesData>): UseDataConnectQueryResult<ListChallengesData, undefined>;
export function useListChallenges(dc: DataConnect, options?: useDataConnectQueryOptions<ListChallengesData>): UseDataConnectQueryResult<ListChallengesData, undefined>;
