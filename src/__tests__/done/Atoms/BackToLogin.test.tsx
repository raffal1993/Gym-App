import BackToLogin from 'components/Atoms/BackToLogin/BackToLogin';
import { Router } from 'react-router-dom';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

describe('testing BackToLogin', () => {
  test('check if link have "/" as "href" attribute', async () => {
    const history = createMemoryHistory({ initialEntries: ['/register'] });

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BackToLogin />
      </Router>,
    );
    expect(history.location.pathname).toBe('/register');
    expect(screen.getByText(/Back to login page/i)).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });
});
