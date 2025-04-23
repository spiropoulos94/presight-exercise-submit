import { MobileNavigationProps, navItems } from './types';
import NavItem from './NavItem';

const MobileNavigation = ({ isOpen, location, onItemClick }: MobileNavigationProps) => (
  <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
    <div className="pt-2 pb-3 space-y-1">
      {navItems.map((item) => {
        const isActive =
          item.to === '/' ? location.pathname === item.to : location.pathname.startsWith(item.to);

        return (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            isActive={isActive}
            onClick={onItemClick}
          />
        );
      })}
    </div>
  </div>
);

export default MobileNavigation;
