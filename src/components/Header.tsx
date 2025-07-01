import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton, onBack, title }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          <div className="flex items-center space-x-3">
            {/* Cool AI Logo */}
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl shadow-lg">
                <svg 
                  className="w-8 h-8 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* AI Brain Circuit Pattern */}
                  <path 
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M21 9C21 7.9 20.1 7 19 7C17.9 7 17 7.9 17 9C17 10.1 17.9 11 19 11C20.1 11 21 10.1 21 9Z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M7 9C7 7.9 6.1 7 5 7C3.9 7 3 7.9 3 9C3 10.1 3.9 11 5 11C6.1 11 7 10.1 7 9Z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z" 
                    fill="currentColor"
                  />
                  {/* Connecting Lines */}
                  <path 
                    d="M12 6V8M12 16V18M17 9H14M10 9H7M14.5 7.5L16.5 9.5M9.5 7.5L7.5 9.5M14.5 16.5L16.5 14.5M9.5 16.5L7.5 14.5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  {/* Central Processing Unit */}
                  <rect 
                    x="9" 
                    y="9" 
                    width="6" 
                    height="6" 
                    rx="1" 
                    fill="currentColor" 
                    fillOpacity="0.3"
                  />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-xl opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Mock Interview AI
              </h1>
              {title && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Practice • Learn • Succeed
            </span>
          </div>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};