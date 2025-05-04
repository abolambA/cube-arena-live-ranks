
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/use-language';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary">
      <div className="text-center p-8">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-cube-purple-dark rounded-lg transform rotate-45"></div>
          <div className="absolute inset-0 bg-cube-purple rounded-lg transform -rotate-12"></div>
          <div className="absolute inset-2 bg-white rounded-md flex items-center justify-center">
            <span className="text-4xl font-mono">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-cube-purple-darker">Oops!</h1>
        <p className="text-xl text-gray-600 mb-6">
          This page seems to have vanished faster than a solved cube.
        </p>
        <Button asChild>
          <Link to="/">Return to Leaderboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
