import { useLocation } from 'react-router-dom';

export type NavItemType = {
  to: string;
  label: string;
  exact?: boolean;
};

export type NavItemProps = {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

export type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export type NavigationSectionProps = {
  location: ReturnType<typeof useLocation>;
};

export type MobileNavigationProps = NavigationSectionProps & {
  isOpen: boolean;
  onItemClick: () => void;
};

// Navigation items
export const navItems: NavItemType[] = [
  { to: '/', label: 'Users List', exact: true },
  { to: '/streaming', label: 'Streaming Text' },
  { to: '/websocket', label: 'Websocket Queue' },
];
