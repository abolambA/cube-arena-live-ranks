
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with Firebase
    // For now, let's use a simple mock
    toast({
      title: "Login Success",
      description: "Welcome to the admin panel",
    });
    navigate('/admin/dashboard');
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{t('login')}</CardTitle>
            <CardDescription className="text-center">
              {t('adminPanel')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">{t('login')}</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/" className="text-sm text-cube-purple hover:underline">
              {t('viewLeaderboard')}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
