import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Search from './Search';

vi.mock('../../components/Logo', () => ({
  __esModule: true,
  Logo: () => <div>Mocked Logo</div>,
}));

vi.mock('../../components/SearchContainer', () => ({
  __esModule: true,
  SearchContainer: () => <div>Mocked SearchContainer</div>,
}));

describe('Search Component', () => {
  it('renders Logo component', () => {
    render(<Search />);
    expect(screen.getByText('Mocked Logo')).toBeInTheDocument();
  });

  it('renders SearchContainer component', () => {
    const { getByText } = render(<Search />);
    expect(getByText('Mocked SearchContainer')).toBeInTheDocument();
  });

  it('has correct class on main element', () => {
    const { container } = render(<Search />);
    expect(container.firstChild).toHaveClass('search-wrapper');
  });
});
