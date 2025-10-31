import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Heart } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Dashboard({ user, onLogout }) {
  const [stats, setStats] = useState({ total_alumni: 0, upcoming_events: 0, recent_donations: 0 });
  const [currentImage, setCurrentImage] = useState(0);

  const alumniImages = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    'https://images.unsplash.com/photo-1581065178047-8ee15951ede6',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    'https://images.unsplash.com/photo-1595211877493-41a4e5f236b3',
    'https://images.pexels.com/photos/34457086/pexels-photo-34457086.jpeg'
  ];

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % alumniImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={onLogout} />
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2" data-testid="dashboard-greeting">
              Hi {user.full_name}, Batch of {user.passout_year}!
            </h1>
            <p className="text-lg text-gray-600">Welcome back to the Global Horizon Alumni Network</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover-lift" data-testid="dashboard-total-alumni-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                <Users className="h-5 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total_alumni}</div>
                <p className="text-xs text-blue-100 mt-1">Connected worldwide</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover-lift" data-testid="dashboard-upcoming-events-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-5 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.upcoming_events}</div>
                <p className="text-xs text-purple-100 mt-1">Don't miss out!</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover-lift" data-testid="dashboard-recent-donations-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Donations</CardTitle>
                <Heart className="h-5 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.recent_donations}</div>
                <p className="text-xs text-orange-100 mt-1">Thank you for giving!</p>
              </CardContent>
            </Card>
          </div>

          {/* Image Carousel */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Featured Alumni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 rounded-lg overflow-hidden">
                {alumniImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${img}?w=800&q=80`}
                    alt={`Alumni ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}