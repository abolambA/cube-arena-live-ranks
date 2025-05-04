
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
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
          <div className="rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/aa920ae2-d856-4cfb-8a10-c8d64f5cc05b.png" 
              alt="Syria SpeedCubing Logo" 
              className="h-10 w-10"
            />
          </div>
          <span className="text-xl font-bold">Syria SpeedCubing Open 2025</span>
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
            <Button 
              className="bg-[#006847] hover:bg-[#006847]/90 text-white border-2 border-white relative overflow-hidden group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full bg-gradient-to-b from-[#006847] via-white to-[#ce1126] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">{t('adminLogin')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
