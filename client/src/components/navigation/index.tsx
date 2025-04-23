import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import MobileMenuButton from './MobileMenuButton';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Logo />
          <MobileMenuButton isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
          <DesktopNavigation location={location} />
        </div>
      </nav>
      <MobileNavigation isOpen={mobileMenuOpen} location={location} onItemClick={closeMobileMenu} />
    </header>
  );
};

export default Navigation;
