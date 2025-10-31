import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Calendar, MapPin } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Events({ user, onLogout }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user.full_name,
    email: user.email,
    phone: user.phone,
    attend_dinner: 'yes'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/events/register`, {
        user_id: user.id,
        event_id: selectedEvent.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        attend_dinner: formData.attend_dinner === 'yes'
      });

      toast.success('Registration Successful!');
      setShowModal(false);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
        <div className="max-w-7xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2" data-testid="events-title">
              Upcoming Events
            </h1>
            <p className="text-lg text-gray-600">Join us for exciting alumni gatherings and networking opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover-lift overflow-hidden" data-testid={`event-card-${event.id}`}>
                <div className="relative h-48">
                  <img
                    src={`${event.image}?w=600&q=80`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="flex flex-col gap-2 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
                {event.has_registration && (
                  <CardFooter>
                    <Button
                      data-testid={`event-register-btn-${event.id}`}
                      onClick={() => handleRegister(event)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full"
                    >
                      Register
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent data-testid="event-registration-modal">
          <DialogHeader>
            <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                data-testid="event-modal-name-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                data-testid="event-modal-email-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                data-testid="event-modal-phone-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Will you attend dinner?</Label>
              <RadioGroup
                value={formData.attend_dinner}
                onValueChange={(value) => setFormData({ ...formData, attend_dinner: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" data-testid="event-modal-dinner-yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" data-testid="event-modal-dinner-no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                data-testid="event-modal-submit-btn"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {loading ? 'Registering...' : 'Submit Registration'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}