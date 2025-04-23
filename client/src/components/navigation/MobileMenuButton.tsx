import { MenuIcon, XIcon } from '@/components/ui/icons';
import { MobileMenuButtonProps } from './types';

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => (
  <div className="md:hidden">
    <button
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      aria-controls="mobile-menu"
      aria-expanded={isOpen ? 'true' : 'false'}
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <MenuIcon className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} />
      <XIcon className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} />
    </button>
  </div>
);

export default MobileMenuButton;
