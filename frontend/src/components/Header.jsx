import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Menu, X, Star, Users, TrendingUp, Sun, Moon, LogOut, Settings, User, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors, buttons, text, backgrounds } from '../theme';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  
  // Debug log - UPDATED VERSION with Org Settings
  console.log('Header loaded - VERSION: 2024-10-23 with Org Settings', { isAdmin, user });

  // Base navigation for all users
  const navigation = [
    { name: 'Find Agents', href: '/agents', icon: Search },
    { name: 'Deals', href: '/deals', icon: BarChart3 },
    { name: 'Compare', href: '/compare', icon: TrendingUp },
    { name: 'Reviews', href: '/reviews', icon: Star },
    { name: 'About', href: '/about', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <Star className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold text-black dark:text-white transition-colors`}>
                AgentRate
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Find Your Perfect Agent</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${
                    isActive(item.href)
                      ? 'text-white bg-black dark:bg-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                    Sign In
                  </Button>
                </Link>
                <Link to="/public-signup">
                  <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-success hover:bg-success/90 text-white hover:text-white px-6 shadow-sm">
                    List Your Agency
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-black"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BarChart3 className="inline h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="inline h-4 w-4 mr-2" />
                          Organization Settings
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      </>
                    )}
                    {user?.role === 'agency_staff' && (
                      <>
                        <Link
                          to="/staff/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BarChart3 className="inline h-4 w-4 mr-2" />
                          Agent Dashboard
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      </>
                    )}
                    <Link
                      to={
                        isAdmin ? "/admin/profile" : 
                        user?.role === 'agency_staff' ? "/staff/my-profile" : 
                        "/dashboard"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="inline h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    {(isAdmin || user?.role === 'agency_staff') && (
                      <>
                        <Link
                          to="/staff/deals"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BarChart3 className="inline h-4 w-4 mr-2" />
                          My Deals
                        </Link>
                        <Link
                          to="/staff/reviews"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Star className="inline h-4 w-4 mr-2" />
                          My Reviews
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary hover:bg-primary/10"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-white bg-black dark:bg-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {theme === 'light' ? <Moon className="h-4 w-4 mr-3" /> : <Sun className="h-4 w-4 mr-3" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
              
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/public-signup">
                    <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-success hover:bg-success/90 text-white hover:text-white shadow-sm">
                      List Your Agency
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {isAdmin && (
                    <>
                      <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                          <BarChart3 className="h-4 w-4 mr-3" />
                          Admin Dashboard
                        </Button>
                      </Link>
                      <Link to="/admin/settings" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                          <Settings className="h-4 w-4 mr-3" />
                          Organization Settings
                        </Button>
                      </Link>
                    </>
                  )}
                  {user?.role === 'agency_staff' && (
                    <Link to="/staff/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4 mr-3" />
                        Agent Dashboard
                      </Button>
                    </Link>
                  )}
                  <Link to={
                    isAdmin ? "/admin/profile" : 
                    user?.role === 'agency_staff' ? "/staff/my-profile" : 
                    "/dashboard"
                  } onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                      <User className="h-4 w-4 mr-3" />
                      My Profile
                    </Button>
                  </Link>
                  {(isAdmin || user?.role === 'agency_staff') && (
                    <>
                      <Link to="/staff/deals" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                          <BarChart3 className="h-4 w-4 mr-3" />
                          My Deals
                        </Button>
                      </Link>
                      <Link to="/staff/reviews" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                          <Star className="h-4 w-4 mr-3" />
                          My Reviews
                        </Button>
                      </Link>
                    </>
                  )}
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-gray-600 dark:text-gray-300"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;