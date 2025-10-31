import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Heart, Info, Mail, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Users, label: 'Connect', path: '/connect' },
    { icon: Heart, label: 'Donate', path: '/donate' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Mail, label: 'Contact', path: '/contact' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 text-white h-full p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">GHU Alumni</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              data-testid={`sidebar-${item.label.toLowerCase()}-btn`}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-blue-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <Button
        data-testid="sidebar-logout-btn"
        onClick={handleLogout}
        variant="ghost"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-100 mt-4"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </Button>
    </div>
  );
}