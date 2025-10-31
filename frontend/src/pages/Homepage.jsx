import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Heart, Calendar } from 'lucide-react';

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-orange-900/70"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-6 border border-white/20">
              <GraduationCap className="w-20 h-20 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Global Horizon University
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-100 mb-4">
            Alumni Network
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Connect. Celebrate. Contribute.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              data-testid="homepage-login-btn"
              onClick={() => navigate('/login')}
              size="lg"
              className="bg-white text-purple-900 hover:bg-blue-50 font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-2xl"
            >
              Login
            </Button>
            <Button 
              data-testid="homepage-register-btn"
              onClick={() => navigate('/register')}
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-2xl"
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-800">
            Why Join Our Network?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Connect with Alumni</h3>
              <p className="text-gray-600">Build meaningful relationships with fellow graduates across the globe. Network and grow together.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Exclusive Events</h3>
              <p className="text-gray-600">Attend reunions, workshops, and networking events designed exclusively for our alumni community.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Give Back</h3>
              <p className="text-gray-600">Support scholarships, research, and infrastructure. Help shape the future of Global Horizon University.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Donate</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-blue-100">alumni@globalhorizon.edu</p>
              <p className="text-blue-100">(555) 123-4567</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-300 transition-colors">Facebook</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-300 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-blue-200 border-t border-white/20 pt-8">
            <p>&copy; 2025 Global Horizon University Alumni Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}