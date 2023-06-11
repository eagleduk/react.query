import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';

jest.setTimeout(100000000);

test('filter appointments by availability', async () => {
  // custom hook과 그에 사용되는 component 를 설정
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });

  // hook 의 결과를 기다린다.
  await waitFor(() => Object.keys(result.current.appointments).length > 0);

  const filteredAppointmentsLength = Object.keys(
    result.current.appointments,
  ).length;

  // hook 에 대한 액션을 취한다.
  act(() => result.current.setShowAll(true));

  // hook 의 결과를 기다린다.
  await waitFor(
    () =>
      Object.keys(result.current.appointments).length >
      filteredAppointmentsLength,
  );

  // await waitFor(() => Object.keys(result.current.appointments).length > 0);
  // const noFilteredAppointmentsLength = Object.keys(
  //   result.current.appointments,
  // ).length;
  // console.log('noFilteredAppointmentsLength', noFilteredAppointmentsLength);

  // expect(noFilteredAppointmentsLength).toBeGreaterThan(
  //   filteredAppointmentsLength,
  // );
});
