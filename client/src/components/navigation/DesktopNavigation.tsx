import { NavigationSectionProps, navItems } from './types';
import NavItem from './NavItem';

const DesktopNavigation = ({ location }: NavigationSectionProps) => (
  <div className="hidden md:flex md:items-center md:space-x-4">
    {navItems.map((item) => {
      const isActive =
        item.to === '/' ? location.pathname === item.to : location.pathname.startsWith(item.to);

      return <NavItem key={item.to} to={item.to} label={item.label} isActive={isActive} />;
    })}
  </div>
);

export default DesktopNavigation;
