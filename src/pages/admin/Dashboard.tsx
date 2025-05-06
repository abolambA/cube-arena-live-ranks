
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cube-purple-darker">{t('adminPanel')}</h1>
          <Button variant="outline" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Competitor Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t('competitorManagement')}</CardTitle>
              <CardDescription>Add, edit or remove competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Manage the list of competitors for all events.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/competitors">{t('competitors')}</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Results Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t('addResults')}</CardTitle>
              <CardDescription>Record times for competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Add solve times for each competitor by event.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/results">{t('viewResults')}</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Status Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t('changeStatus')}</CardTitle>
              <CardDescription>Update competition status</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Set the competition status to Not Started, In Progress, or Finished.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/status">{t('updateStatus')}</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Events Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t('eventManagement')}</CardTitle>
              <CardDescription>Configure available events</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Add, edit, or disable events for the competition.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/events">{t('events')}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="link" asChild>
            <Link to="/">{t('viewLeaderboard')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
