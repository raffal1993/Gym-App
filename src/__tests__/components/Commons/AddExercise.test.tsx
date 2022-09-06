import { fireEvent, screen } from '@testing-library/react';
import AddExercise from 'components/Commons/AddExercise/AddExercise';
import { renderWithProviders } from '__tests__/utils/test-utils';

jest.mock('helpers/importImages', () => ({
  importImages: jest.fn(() => ({
    images: { other: '/static/media/other.5da8004ba37c50ddf794.webp' },
  })),
}));

jest.mock('firebase-cfg/database/workout/add', () => ({
  addExerciseToDB: jest.fn(),
}));

describe('testing AddExercise component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('check if component exist', () => {
    renderWithProviders(<AddExercise isDisabled={false} name="testExercise" />);
    expect(screen.getByText(/testExercise/i)).toBeInTheDocument();
  });

  test('if AddExercise is disabled', async () => {
    renderWithProviders(<AddExercise isDisabled={true} name="testExercise" />);
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toHaveStyle({ 'pointer-events': 'none' });
  });

  test('if image have properly "src" and "alt" attributes', () => {
    renderWithProviders(<AddExercise isDisabled={true} name="other" />);
    const image = screen.getByAltText(/imageExercise/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/static/media/other.5da8004ba37c50ddf794.webp');
    expect(image).toHaveAttribute('alt', 'imageExercise');
  });

  test('click event', async () => {
    renderWithProviders(<AddExercise isDisabled={true} name="other" />);
    const wrapper = screen.getByTestId('wrapper');
    wrapper.onclick = jest.fn();
    fireEvent.click(wrapper);
    expect(jest.mock.call.length).toBe(1);
  });
});
