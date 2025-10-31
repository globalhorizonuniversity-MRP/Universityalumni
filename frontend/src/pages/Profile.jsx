import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Pencil, Save, Calendar, MessageSquare, Heart } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Profile({ user, onLogout, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user.full_name,
    location: user.location,
    company: user.company,
    domain: user.domain,
    phone: user.phone,
    profile_picture: user.profile_picture || ''
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      const allEvents = response.data;
      const registeredEvents = allEvents.filter((event) =>
        user.registered_events?.includes(event.id)
      );
      setEvents(registeredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${API}/user/${user.id}`, formData);
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={onLogout} />
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800" data-testid="profile-title">
              My Profile
            </h1>
            {!isEditing ? (
              <Button
                data-testid="profile-edit-btn"
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button
                data-testid="profile-save-btn"
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardContent className="p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={user.profile_picture} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-4xl">
                    {user.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.full_name}</h2>
                <p className="text-gray-600 mb-4">Class of {user.passout_year}</p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{events.length}</span>
                    <span className="text-gray-600">Events Registered</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">{user.donations?.length || 0}</span>
                    <span className="text-gray-600">Donations</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Active</span>
                    <span className="text-gray-600">Member</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      data-testid="profile-fullname-input"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="mt-1 bg-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={user.university}
                      disabled
                      className="mt-1 bg-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="passout_year">Passout Year</Label>
                    <Input
                      id="passout_year"
                      value={user.passout_year}
                      disabled
                      className="mt-1 bg-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Current Location</Label>
                    <Input
                      id="location"
                      data-testid="profile-location-input"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Current Company</Label>
                    <Input
                      id="company"
                      data-testid="profile-company-input"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="domain">Domain/Industry</Label>
                    <Input
                      id="domain"
                      data-testid="profile-domain-input"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      data-testid="profile-phone-input"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      disabled={!isEditing}
                      className="mt-1"
                      maxLength={14}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="profile_picture">Profile Picture URL</Label>
                    <Input
                      id="profile_picture"
                      data-testid="profile-picture-input"
                      value={formData.profile_picture}
                      onChange={(e) => setFormData({ ...formData, profile_picture: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="https://example.com/your-photo.jpg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registered Events */}
          {events.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Registered Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                      data-testid={`profile-event-${event.id}`}
                    >
                      <img
                        src={`${event.image}?w=100&q=80`}
                        alt={event.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Donation History */}
          {user.donations?.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.donations.map((donation, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg"
                    >
                      <div>
                        <p className="font-bold text-gray-800">{donation.purpose}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(donation.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">${donation.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}