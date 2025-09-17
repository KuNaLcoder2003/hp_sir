import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, FileText, Award, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: Award, label: 'Test Results', path: '/tests' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-purple-800">
          <h2 className="text-xl font-bold text-white">Student Portal</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-purple-800 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'text-purple-200 hover:bg-white hover:bg-opacity-10 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <p className="text-purple-200 text-sm">
              Need help? Contact your teacher or administrator.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
