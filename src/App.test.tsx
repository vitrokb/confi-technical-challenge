import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./pages/Search', () => ({
  Search: () => <div>Search Page</div>,
}));

vi.mock('./pages/Order', () => ({
  Order: () => <div>Order Page</div>,
}));

describe('App Component', () => {
  it('renders Search page on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Search Page')).toBeInTheDocument();
  });

  it('renders Search page on /search route', async () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Search Page')).toBeInTheDocument();
  });

  it('renders Order page on /order route', async () => {
    render(
      <MemoryRouter initialEntries={['/order']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Order Page')).toBeInTheDocument();
  });
});
