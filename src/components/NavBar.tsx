
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/use-language';

const NavBar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-cube-purple-darkest/90 backdrop-blur-md text-white py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-cube-purple to-cube-purple-dark p-2 rounded-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16.5C21 19.538 18.538 22 15.5 22C12.462 22 10 19.538 10 16.5C10 13.462 12.462 11 15.5 11C18.538 11 21 13.462 21 16.5Z" fill="currentColor" fillOpacity="0.2"/>
              <path d="M2 7.5C2 10.538 4.462 13 7.5 13C10.538 13 13 10.538 13 7.5C13 4.462 10.538 2 7.5 2C4.462 2 2 4.462 2 7.5Z" fill="currentColor" fillOpacity="0.6"/>
              <path d="M16 3H8C6.34315 3 5 4.34315 5 6V14C5 15.6569 6.34315 17 8 17H16C17.6569 17 19 15.6569 19 14V6C19 4.34315 17.6569 3 16 3Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xl font-bold">CubeArena</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                🇺🇸 English {language === 'en' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ar')}>
                🇸🇦 العربية {language === 'ar' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/admin">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              {t('adminLogin')}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
