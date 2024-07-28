import { render } from '@testing-library/react';
import Logo from './Logo';

describe('Logo Component', () => {
  it('renders correctly', () => {
    const { getByAltText } = render(<Logo />);
    const logoElement = getByAltText('Confi Logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('logo-image');
    expect(logoElement).toHaveAttribute('src', expect.stringContaining('Logo.png'));
  });
});
