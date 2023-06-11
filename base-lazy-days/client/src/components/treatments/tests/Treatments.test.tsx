import { render, screen } from '@testing-library/react';

import { renderWithQueryClient } from '../../../test-utils/index';
import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  // write test here
  renderWithQueryClient(<Treatments />);

  const treatments = await screen.findAllByRole('heading', {
    name: /massage|facial|scrub/i,
  });
  expect(treatments).toHaveLength(3);
});
