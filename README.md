# udemy-REACT-QUERY

Code to support the Udemy course [React Query: Server State Management in React](https://www.udemy.com/course/learn-react-query/?couponCode=REACT-QUERY-GITHUB)

[Original Code](https://github.com/bonnie/udemy-REACT-QUERY)

## React Query

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
