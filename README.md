# udemy-REACT-QUERY

Code to support the Udemy course [React Query: Server State Management in React](https://www.udemy.com/course/learn-react-query/?couponCode=REACT-QUERY-GITHUB)

[Original Code](https://github.com/bonnie/udemy-REACT-QUERY)

- 클라이언트에서 서버 데이터 캐쉬 관리
- 서버데이터가 필요할 때 Fetch 나 Axios 를 사용해 서버로 바로 이동하지 않고 React Query 캐쉬에서 데이터 요청
- 캐쉬에 저장된 서버의 데이터를

1. 명령형: 강제로 서버의 데이터를 가져온다
2. 선언형: 특별한 액션이 이루어질 때 데이터를 가져온다

- 서버 상태 관리에 대한 도구가 포함

1. 모든 쿼리에 대한 로딩 / 오류 상태 유지
2. 페이징 처리 및 스크롤 로딩에 대한 데이터 조각 제공
3. 캐쉬에 데이터를 저장하기 때문에 데이터를 요청하는 시간이 단축된다.
4. 서버에서 데이터의 변이(수정)이나 업데이트 관리
5. 페이지에서 동일한 데이터를 요청하는 경우 한번만 서버에 요청할 수 있다. 기존 데이터를 요청중인 경우 요청 제거 후 새로운 데이터 요청 가능
6. 서버 오류에 대한 재요청 가능
7. 서버 요청에 대한 실패 / 성공을 구분하여 콜백 요청 가능

```tsx
const queryClient = QueryClient();

<QueryClientProvider client={queryClient}></QueryClientProvider>;
```

```tsx
const { data } = useQuery({
  queryKey: unknown[];
  queryFn: () => Object;
});
```

## staleTime VS cacheTime

```tsx
useQuery({
	staleTime: number | Infinity;
	cacheTime: number | Infinity;
})
```

| staleTime                          | cacheTime                               |
| ---------------------------------- | --------------------------------------- |
| 데이터를 가져올 대상이 되는 시간   | 가져온 데이터를 캐쉬에 저장하는 시간    |
| staleTime 이후 Refetch 대상이 된다 | cacheTime 이후 데이터는 사용할 수 없다. |

## Query Key

- 쿼리키는 배열로 값을 선언한다.
- 배열에 속해있는 값들이 전부 같으면 같은 쿼리라고 인식하여 cache 에 저장되어 있는 데이터를 이용한다.

```tsx
useQuery({
	queryKey: unknown[];
})
```

## Pagination, prefetch

- 데이터를 미리 가져와 캐쉬에 저장
- 페이지 매김(Pagination) 에 주로 사용
- 사용자가 기다릴 필요 없이 다음 페이지의 내용을 미리 가져와 cache 에 저장한다.
- 기본적으로 미리 가져온 데이터는 stale(만료) 상태.

```tsx
const queryClient = useQueryClient();
queryClient.prefetchQuery({
  queryKey: unknown[];
  queryFn: () => Object;
});
```

## isLoading VS isFetching

```tsx
const { isLoading: boolean, isFetching: boolean } = useQuery();
```

| isLoading                                           | isFetching               |
| --------------------------------------------------- | ------------------------ |
| isFetching 결과 && cache 에 저장된 데이터 존재 유무 | async 함수의 수행중 여부 |

## 변이(Mutation)

- 서버에 데이터를 업데이트 하도록 요청

1. 데이터를 업데이트하고 해당 데이터를 서버로 보내 서버의 데이터 업데이트
2. 서버 데이터를 업데이트 하고 저장된 cache 의 데이터를 업데이트
3. 서버 데이터를 업데이트 하고 저장된 cache 의 데이터를 삭제하고 새로운 데이터를 cache 에 저장(refetch)

```tsx
const { mutate, isError, isLoading, isSuccess } = useMutation({
	mutationFn: () => void;
})
```

- 쿼리키가 필요 없다.
- isLoading 은 있지만 isFetching 은 없다.
- mutate 함수를 리턴한다.
- 기본적으로, 재시도를 하지 않는다.

## useInfiniteQuery

- 사용자의 액션에 따라 추가로 데이터를 가져오도록 요청

```tsx
const {
	data,              // 가져온 데이터
	hasNextPage,       // 다음 페이지의 유무
	fetchNextPage,     // 다음 페이지를 가져오는 URL
	hasPreviousPage,   // 이전 페이지의 유무
	fetchPreviosPage,  // 이전 페이지를 가져오는 URL
	isLoading,
	isError,
	error,
	isFetching
} = useInfiniteQuery({
	queryKey: unknown[];
	quertFn: (paramPage) => void;
	getNextPageParam: (lastPage) => void;        // 결과값이 hasNextPage 로 부여
	getPreviousPageParam: (lastPage) => void;    // 결과값이 hasPreviousPage 로 부여
})
```

## useQuery select

- useQuery 결과에 대하여 select 옵션을 사용하여 결과를 필터링 한다.
- 제공하는 값의 변함에 따라 select 함수를 실행 가능

```tsx
useQuery({
	select: (data) => filteredData;
});
```

## \*\* React.useCallback

- 사용하는 함수에 대하여 제공하는 값이 변함에 따라 함수를 수행 / 미수행 여부를 제공한다.
- useEffect 와 비슷한 문법 사용

```tsx
useCallback(() => {}, []);
```

## Polling / re-fetching

- 쿼리키가 처음 호출되거나, 현재창을 재포커스, 만료된 쿼리키, 네트워크가 다시연결되었을 때, 기본적으로 useQuery 가 수행된다.
- useQuery에 제공되는 옵션을 이용하여 원하는 때에 useQuery를 수행하여 데이터를 관리할 수 있다.

```tsx
useQuery({
	refetchOnMount: boolean;   // 컴포넌트가 처음 로딩될 때
	refetchOnWindowFocus: boolean;  // 현재 창이 다시 활성화 되었을 때
	refetchOnConnect: boolean;   // 네트워크가 연결 되었을 때
	refetchInterval: number;    // refetch 간격
});
```

- 변동이 잦지 않은 데이터에 대해서, staleTime 조정으로 리페치 간격 조정

> staleTime 이 cacheTime 보다 클경우, 캐쉬에 데이터는 없지만 만료가 되지 않은 상태가 되어 데이터를 새로이 가져오지 않고 사용할 데이터도 존재하지 않아 해당 쿼리키가 만료될 때까지 데이터를 보여줄 수 없다. staleTime ≤ cacheTime 이 안정적.

## setQueryData, removeQueryData

```tsx
const queryClient = useQueryClient();
queryClient.setQueryData();
queryClient.removeQueries();
```

- 캐쉬의 쿼리키에 데이터를 저장하거나 데이터를 삭제할 수 있다.

## dependent Query(의존적 쿼리)

```tsx
useQuery({
	enabled: boolean;
})
```

- 해당 쿼리를 수행할지 여부 설정

## Mutation

- 데이터 변형. 서버의 데이터를 업데이트
- 데이터를 업데이트만 하기 때문에 캐쉬 데이터 개념이 없다
- 캐쉬 데이터가 없음으로 실패시 재시도, refetch, isLoading, isfetching 개념도 없다.

```jsx
const { mutate } = useMutation({
	mutationFn: void;
	onSuccess: void;
})
```

## QueryClient.invalidateQueries

- 캐쉬 데이터를 무효화

```jsx
const queryClient = useQueryClient();
queryClient.invalidateQueries({
	queryKey: unknown[];
})
```

## 낙관적 업데이트

- 서버로부터 응답을 받기 전에 캐쉬의 데이터를 업데이트 → 업데이트가 문제없이 이루어질것으로 추정한다.
- 서버의 응답을 받기 전에 캐쉬 데이터를 업데이트 함으로 속도가 빠르지만, 서버에서 업데이트가 실패시 구현 로직이 복잡하다.
- 에러가 발생하면 수행중이던 Query 를 취소해야 한다.

```tsx
const query = useQuery({
  queryKey: ["todos"],
  queryFn: ({ signal }) =>
    axios.get("/todos", {
      // Pass the signal to `axios`
      signal,
    }),
});
```

- Axios 를 사용시, 취소할 수 있는 signal<AbortContoller> 를 추가해 주어야 한다.
- **`AbortController` : 하나 이상의 웹 요청을 취소할 수 있게 해준다.**

```tsx
useMutation({
	onMutate: (newData: customData) => oldData: customData;
	onError: (error: unknown, variables: customData, context: void) => void;
	onSettled: (data: User) => void;
});
```

- onMutate 를 통해 낙관적 업데이트 진행, 업데이트 이전 데이터 반환
- onError 를 통해 에러 발생시 onMutate 에서 반환된 업데이트 이전 데이터로 캐쉬를 업데이트
- onSettled 를 통해 서버의 최신 데이터를 다시 가져온다

## testing-library

- [msw (Mock Service Worker)](https://mswjs.io/) 사용

```tsx
npm install msw
```

- render(`@testing-library/react`) 를 사용해야 테스팅시 component 를 랜더링 한다.
- useQuery hook 을 사용하기 위해 QueryClientProvider 를 사용하는 render 객체를 반환한다.

```tsx
export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient
): RenderResult {
  const queryClient = client ?? generateQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}
```
