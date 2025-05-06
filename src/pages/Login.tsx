
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from "@/hooks/use-toast";

// Mock authentication for development (replace with Firebase auth)
const mockCredentials = {
  email: 'admin@syriaspeedcubing.com',
  password: 'admin123'
};

const Login = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // In a real app, this would authenticate with Firebase
    // For now, let's simulate authentication
    setTimeout(() => {
      if (email === mockCredentials.email && password === mockCredentials.password) {
        toast({
          title: t('login') + " " + t('success'),
          description: t('welcomeAdmin'),
        });
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(t('invalidCredentials'));
        toast({
          title: t('login') + " " + t('failed'),
          description: t('invalidCredentials'),
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#006847] via-white to-[#ce1126]">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/aa920ae2-d856-4cfb-8a10-c8d64f5cc05b.png" 
                alt="Syria SpeedCubing Logo" 
                className="h-16 w-16"
              />
            </div>
            <CardTitle className="text-2xl text-center">{t('login')}</CardTitle>
            <CardDescription className="text-center">
              Syria SpeedCubing Open 2025 - {t('adminPanel')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-[#006847] hover:bg-[#006847]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? t('loggingIn') : t('login')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/" className="text-sm text-[#ce1126] hover:underline">
              {t('viewLeaderboard')}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;

