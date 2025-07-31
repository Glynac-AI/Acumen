
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ph-light/30 to-white">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-9xl font-display font-bold text-ph">404</h1>
        <p className="text-2xl text-muted-foreground mt-6 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="button-primary inline-flex items-center"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
