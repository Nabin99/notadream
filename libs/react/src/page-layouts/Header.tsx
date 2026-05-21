import { ReactNode, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

import { LocaleSwitcher, useTranslation } from '../i18n';
import { useRouting } from '../routing';
import { ThemeToggle } from '../theme-engine';
import { Button } from '../ui';
import { NavigationMenu } from './components/nav';

import type { NavItemType } from './types';

export interface HeaderProperties {
  navItems?: NavItemType[];
  logo: ReactNode;
}

export const Header = ({ navItems, logo }: HeaderProperties) => {
  const { Link } = useRouting();
  const [isMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { supportedLanguages } = useTranslation();

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMenuOpen);
  };

  const handleCloseMobileView = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="brand-logo-container">
        <Link href={"/"} aria-label="logo">
          {logo}
        </Link>
      </div>
      <Button
        size="large"
        variant="borderless"
        onClick={handleToggleMobileMenu}
        aria-expanded={isMenuOpen}
        label="Toggle navigation menu"
        icon={isMenuOpen ? <HiX /> : <HiMenu />}
        iconOnly={true}
        className="toggle-nav-menu"
      ></Button>
      <div className={`navbar-container ${isMenuOpen ? "open" : ""}`}>
        {navItems ? (
          <NavigationMenu
            items={navItems || []}
            openItems={openItems}
            className={`${isMenuOpen ? "open" : ""}`}
            setOpenItem={(name) => {
              if (openItems.includes(name)) {
                setOpenItems((pre) => pre.filter((item) => item !== name));
              } else {
                setOpenItems((pre) => [...pre, name]);
              }
            }}
            toggleMenuOpen={handleCloseMobileView}
          />
        ) : null}
      </div>

      <div className="header-menu">
        <ThemeToggle />
        {supportedLanguages.length > 1 ? <LocaleSwitcher /> : null}
      </div>
    </header>
  );
};
