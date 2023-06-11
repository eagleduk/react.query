import { screen } from '@testing-library/react';

import { renderWithQueryClient } from '../../../test-utils/index';
// import { rest } from 'msw';
// import { defaultQueryClientOptions } from '../../../react-query/queryClient';
// import { server } from '../../../mocks/server';
// import { renderWithClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';

test('renders response from query', async () => {
  // write test here
  renderWithQueryClient(<AllStaff />);

  const staffTitles = await screen.findAllByRole('heading', {
    name: /divya|sandra|michael|mateo/i,
  });

  expect(staffTitles).toHaveLength(4);
});

test('handles query error', async () => {
  // (re)set handler to return a 500 error for staff
  // server.resetHandlers(
  //   rest.get('http://localhost:3030/staff', (req, res, ctx) => {
  //     return res(ctx.status(500));
  //   }),
  // );
});
