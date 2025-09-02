import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  Brain, 
  BarChart3, 
  BookOpen, 
  Mail,
  User,
  Settings,
  LogOut,
  Crown
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AnimatedLogo from './AnimatedLogo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, userRole, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Ozone', path: '/ozone', icon: Brain },
    { name: 'Benchmarks', path: '/benchmarks', icon: BarChart3 },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-apple border-b border-mystical/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-neural group">
            <div className="relative">
              <div className="w-10 h-10">
                <AnimatedLogo />
              </div>
            </div>
            <span className="text-xl font-bold gradient-neural">LEAP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover-neural ${
                    isActive(item.path)
                      ? 'glass-mystical text-mystical border-mystical/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="glass-apple hover-neural">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{profile?.first_name || user.email?.split('@')[0]}</span>
                      {userRole && userRole !== 'user' && (
                        <Badge variant="outline">{userRole}</Badge>
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-apple" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" className="glass-apple">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="glass-apple hover-neural">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden glass-apple"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-mystical/20 md:hidden">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover-neural ${
                    isActive(item.path)
                      ? 'glass-mystical text-mystical border-mystical/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-mystical/20">
              {user ? (
                <div className="space-y-3">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-4 py-3 glass-app rounded-lg">
                    <Settings className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;