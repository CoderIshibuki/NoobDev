# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetTypingTestsByUser*](#gettypingtestsbyuser)
  - [*ListChallenges*](#listchallenges)
- [**Mutations**](#mutations)
  - [*CreateTypingTest*](#createtypingtest)
  - [*CreateChallenge*](#createchallenge)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetTypingTestsByUser
You can execute the `GetTypingTestsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTypingTestsByUser(vars: GetTypingTestsByUserVariables): QueryPromise<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;

interface GetTypingTestsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTypingTestsByUserVariables): QueryRef<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;
}
export const getTypingTestsByUserRef: GetTypingTestsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTypingTestsByUser(dc: DataConnect, vars: GetTypingTestsByUserVariables): QueryPromise<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;

interface GetTypingTestsByUserRef {
  ...
  (dc: DataConnect, vars: GetTypingTestsByUserVariables): QueryRef<GetTypingTestsByUserData, GetTypingTestsByUserVariables>;
}
export const getTypingTestsByUserRef: GetTypingTestsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTypingTestsByUserRef:
```typescript
const name = getTypingTestsByUserRef.operationName;
console.log(name);
```

### Variables
The `GetTypingTestsByUser` query requires an argument of type `GetTypingTestsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTypingTestsByUserVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTypingTestsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTypingTestsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTypingTestsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTypingTestsByUser, GetTypingTestsByUserVariables } from '@dataconnect/generated';

// The `GetTypingTestsByUser` query requires an argument of type `GetTypingTestsByUserVariables`:
const getTypingTestsByUserVars: GetTypingTestsByUserVariables = {
  userId: ..., 
};

// Call the `getTypingTestsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTypingTestsByUser(getTypingTestsByUserVars);
// Variables can be defined inline as well.
const { data } = await getTypingTestsByUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTypingTestsByUser(dataConnect, getTypingTestsByUserVars);

console.log(data.typingTests);

// Or, you can use the `Promise` API.
getTypingTestsByUser(getTypingTestsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.typingTests);
});
```

### Using `GetTypingTestsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTypingTestsByUserRef, GetTypingTestsByUserVariables } from '@dataconnect/generated';

// The `GetTypingTestsByUser` query requires an argument of type `GetTypingTestsByUserVariables`:
const getTypingTestsByUserVars: GetTypingTestsByUserVariables = {
  userId: ..., 
};

// Call the `getTypingTestsByUserRef()` function to get a reference to the query.
const ref = getTypingTestsByUserRef(getTypingTestsByUserVars);
// Variables can be defined inline as well.
const ref = getTypingTestsByUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTypingTestsByUserRef(dataConnect, getTypingTestsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.typingTests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.typingTests);
});
```

## ListChallenges
You can execute the `ListChallenges` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listChallenges(): QueryPromise<ListChallengesData, undefined>;

interface ListChallengesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListChallengesData, undefined>;
}
export const listChallengesRef: ListChallengesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listChallenges(dc: DataConnect): QueryPromise<ListChallengesData, undefined>;

interface ListChallengesRef {
  ...
  (dc: DataConnect): QueryRef<ListChallengesData, undefined>;
}
export const listChallengesRef: ListChallengesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listChallengesRef:
```typescript
const name = listChallengesRef.operationName;
console.log(name);
```

### Variables
The `ListChallenges` query has no variables.
### Return Type
Recall that executing the `ListChallenges` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListChallengesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListChallengesData {
  challenges: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    endsAt: TimestampString;
    type: string;
  } & Challenge_Key)[];
}
```
### Using `ListChallenges`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listChallenges } from '@dataconnect/generated';


// Call the `listChallenges()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listChallenges();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listChallenges(dataConnect);

console.log(data.challenges);

// Or, you can use the `Promise` API.
listChallenges().then((response) => {
  const data = response.data;
  console.log(data.challenges);
});
```

### Using `ListChallenges`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listChallengesRef } from '@dataconnect/generated';


// Call the `listChallengesRef()` function to get a reference to the query.
const ref = listChallengesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listChallengesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.challenges);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.challenges);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateTypingTest
You can execute the `CreateTypingTest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTypingTest(vars: CreateTypingTestVariables): MutationPromise<CreateTypingTestData, CreateTypingTestVariables>;

interface CreateTypingTestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTypingTestVariables): MutationRef<CreateTypingTestData, CreateTypingTestVariables>;
}
export const createTypingTestRef: CreateTypingTestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTypingTest(dc: DataConnect, vars: CreateTypingTestVariables): MutationPromise<CreateTypingTestData, CreateTypingTestVariables>;

interface CreateTypingTestRef {
  ...
  (dc: DataConnect, vars: CreateTypingTestVariables): MutationRef<CreateTypingTestData, CreateTypingTestVariables>;
}
export const createTypingTestRef: CreateTypingTestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTypingTestRef:
```typescript
const name = createTypingTestRef.operationName;
console.log(name);
```

### Variables
The `CreateTypingTest` mutation requires an argument of type `CreateTypingTestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTypingTestVariables {
  passageId: UUIDString;
  userId: UUIDString;
  accuracy: number;
  duration: number;
  endTime: TimestampString;
  startTime: TimestampString;
  wpm: number;
}
```
### Return Type
Recall that executing the `CreateTypingTest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTypingTestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTypingTestData {
  typingTest_insert: TypingTest_Key;
}
```
### Using `CreateTypingTest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTypingTest, CreateTypingTestVariables } from '@dataconnect/generated';

// The `CreateTypingTest` mutation requires an argument of type `CreateTypingTestVariables`:
const createTypingTestVars: CreateTypingTestVariables = {
  passageId: ..., 
  userId: ..., 
  accuracy: ..., 
  duration: ..., 
  endTime: ..., 
  startTime: ..., 
  wpm: ..., 
};

// Call the `createTypingTest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTypingTest(createTypingTestVars);
// Variables can be defined inline as well.
const { data } = await createTypingTest({ passageId: ..., userId: ..., accuracy: ..., duration: ..., endTime: ..., startTime: ..., wpm: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTypingTest(dataConnect, createTypingTestVars);

console.log(data.typingTest_insert);

// Or, you can use the `Promise` API.
createTypingTest(createTypingTestVars).then((response) => {
  const data = response.data;
  console.log(data.typingTest_insert);
});
```

### Using `CreateTypingTest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTypingTestRef, CreateTypingTestVariables } from '@dataconnect/generated';

// The `CreateTypingTest` mutation requires an argument of type `CreateTypingTestVariables`:
const createTypingTestVars: CreateTypingTestVariables = {
  passageId: ..., 
  userId: ..., 
  accuracy: ..., 
  duration: ..., 
  endTime: ..., 
  startTime: ..., 
  wpm: ..., 
};

// Call the `createTypingTestRef()` function to get a reference to the mutation.
const ref = createTypingTestRef(createTypingTestVars);
// Variables can be defined inline as well.
const ref = createTypingTestRef({ passageId: ..., userId: ..., accuracy: ..., duration: ..., endTime: ..., startTime: ..., wpm: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTypingTestRef(dataConnect, createTypingTestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.typingTest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.typingTest_insert);
});
```

## CreateChallenge
You can execute the `CreateChallenge` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createChallenge(vars: CreateChallengeVariables): MutationPromise<CreateChallengeData, CreateChallengeVariables>;

interface CreateChallengeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChallengeVariables): MutationRef<CreateChallengeData, CreateChallengeVariables>;
}
export const createChallengeRef: CreateChallengeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createChallenge(dc: DataConnect, vars: CreateChallengeVariables): MutationPromise<CreateChallengeData, CreateChallengeVariables>;

interface CreateChallengeRef {
  ...
  (dc: DataConnect, vars: CreateChallengeVariables): MutationRef<CreateChallengeData, CreateChallengeVariables>;
}
export const createChallengeRef: CreateChallengeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createChallengeRef:
```typescript
const name = createChallengeRef.operationName;
console.log(name);
```

### Variables
The `CreateChallenge` mutation requires an argument of type `CreateChallengeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateChallengeVariables {
  passageId: UUIDString;
  name: string;
  description: string;
  endsAt: TimestampString;
  type: string;
}
```
### Return Type
Recall that executing the `CreateChallenge` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateChallengeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateChallengeData {
  challenge_insert: Challenge_Key;
}
```
### Using `CreateChallenge`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createChallenge, CreateChallengeVariables } from '@dataconnect/generated';

// The `CreateChallenge` mutation requires an argument of type `CreateChallengeVariables`:
const createChallengeVars: CreateChallengeVariables = {
  passageId: ..., 
  name: ..., 
  description: ..., 
  endsAt: ..., 
  type: ..., 
};

// Call the `createChallenge()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createChallenge(createChallengeVars);
// Variables can be defined inline as well.
const { data } = await createChallenge({ passageId: ..., name: ..., description: ..., endsAt: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createChallenge(dataConnect, createChallengeVars);

console.log(data.challenge_insert);

// Or, you can use the `Promise` API.
createChallenge(createChallengeVars).then((response) => {
  const data = response.data;
  console.log(data.challenge_insert);
});
```

### Using `CreateChallenge`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createChallengeRef, CreateChallengeVariables } from '@dataconnect/generated';

// The `CreateChallenge` mutation requires an argument of type `CreateChallengeVariables`:
const createChallengeVars: CreateChallengeVariables = {
  passageId: ..., 
  name: ..., 
  description: ..., 
  endsAt: ..., 
  type: ..., 
};

// Call the `createChallengeRef()` function to get a reference to the mutation.
const ref = createChallengeRef(createChallengeVars);
// Variables can be defined inline as well.
const ref = createChallengeRef({ passageId: ..., name: ..., description: ..., endsAt: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createChallengeRef(dataConnect, createChallengeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.challenge_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.challenge_insert);
});
```

