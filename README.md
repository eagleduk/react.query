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
const { data } = useQuery({
  queryKey: [...args],
  queryFn: () => Object,
});
```

## staleTime VS cacheTime

```tsx
useQuery({
	staleTime: number | Infinity
	cacheTime: number | Infinity
})
```

|             staleTime              |                cacheTime                |
| :--------------------------------: | :-------------------------------------: |
|  데이터를 가져올 대상이 되는 시간  |  가져온 데이터를 캐쉬에 저장하는 시간   |
| staleTime 이후 Refetch 대상이 된다 | cacheTime 이후 데이터는 사용할 수 없다. |

## Query Key

- 쿼리키는 배열로 값을 선언한다.
- 배열에 속해있는 값들이 전부 같으면 같은 쿼리라고 인식하여 cache 에 저장되어 있는 데이터를 이용한다.

```tsx
useQuery({
  queryKey: [...args],
});
```

## Pagination, prefetch

- 데이터를 미리 가져와 캐쉬에 저장
- 페이지 매김(Pagination) 에 주로 사용
- 사용자가 기다릴 필요 없이 다음 페이지의 내용을 미리 가져와 cache 에 저장한다.
- 기본적으로 미리 가져온 데이터는 stale(만료) 상태.

```tsx
const queryClient = useQueryClient();
queryClient.prefetchQuery({
  queryKey: [...args],
  queryFn: () => Object,
});
```

## isLoading VS isFetching

```tsx
const { isLoading: boolean, isFetching: boolean } = useQuery();
```

|                      isLoading                      |        isFetching        |
| :-------------------------------------------------: | :----------------------: |
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
	queryKey: string[];
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
  select: (data) => filteredData,
});
```

## \*\* React.useCallback

- 사용하는 함수에 대하여 제공하는 값이 변함에 따라 함수를 수행 / 미수행 여부를 제공한다.
- useEffect 와 비슷한 문법 사용

```tsx
useCallback(() => {}, []);
```
