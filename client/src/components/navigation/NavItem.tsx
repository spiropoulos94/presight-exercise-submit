import { Link } from 'react-router-dom';
import { NavItemProps } from './types';

const NavItem = ({ to, label, isActive, onClick }: NavItemProps) => {
  const desktopClasses = `px-3 py-2 text-sm font-medium border-b-2 ${
    isActive
      ? 'border-blue-500 text-blue-600'
      : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
  }`;

  const mobileClasses = `block px-3 py-2 text-base font-medium ${
    isActive
      ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
      : 'border-l-4 border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
  }`;

  return (
    <Link key={to} to={to} onClick={onClick} className={onClick ? mobileClasses : desktopClasses}>
      {label}
    </Link>
  );
};

export default NavItem;
