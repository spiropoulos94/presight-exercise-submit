import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '@/components/Navigation';

describe('Navigation Component', () => {
  it('renders correctly with proper links', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    // Check if at least one link exists for each route
    const usersLinks = screen.getAllByText(/users list/i);
    const streamingLinks = screen.getAllByText(/streaming text/i);
    const websocketLinks = screen.getAllByText(/websocket queue/i);

    expect(usersLinks.length).toBeGreaterThan(0);
    expect(streamingLinks.length).toBeGreaterThan(0);
    expect(websocketLinks.length).toBeGreaterThan(0);

    // Check if the first link for each has the correct href
    expect(usersLinks[0].closest('a')?.getAttribute('href')).toBe('/');
    expect(streamingLinks[0].closest('a')?.getAttribute('href')).toBe('/streaming');
    expect(websocketLinks[0].closest('a')?.getAttribute('href')).toBe('/websocket');
  });
});
