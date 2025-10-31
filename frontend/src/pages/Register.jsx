import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { GraduationCap } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Register({ onRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: 'Global Horizon University',
    passout_year: '',
    location: '',
    company: '',
    domain: '',
    phone: '',
    profile_picture: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = formData;
      submitData.passout_year = parseInt(submitData.passout_year);
      
      const response = await axios.post(`${API}/register`, submitData);
      toast.success('Welcome to Global Horizon Alumni Network!');
      onRegister(response.data);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const years = [];
  for (let year = 2025; year >= 1990; year--) {
    years.push(year);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Join Our Alumni Network</h1>
            <p className="text-gray-600">Connect with fellow graduates worldwide</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="register-form">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  data-testid="register-fullname-input"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="register-email-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="register-password-input"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  data-testid="register-confirm-password-input"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  value="Global Horizon University"
                  disabled
                  className="mt-1 bg-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="passout_year">Passout Year *</Label>
                <Select
                  value={formData.passout_year}
                  onValueChange={(value) => setFormData({ ...formData, passout_year: value })}
                  required
                >
                  <SelectTrigger className="mt-1" data-testid="register-passout-year-select">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  name="location"
                  data-testid="register-location-input"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <Label htmlFor="company">Current Company *</Label>
                <Input
                  id="company"
                  name="company"
                  data-testid="register-company-input"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="domain">Domain/Industry *</Label>
                <Input
                  id="domain"
                  name="domain"
                  data-testid="register-domain-input"
                  required
                  value={formData.domain}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="e.g., Technology, Finance"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  data-testid="register-phone-input"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="mt-1"
                  placeholder="(555) 123-4567"
                  maxLength={14}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="profile_picture">Profile Picture URL (Optional)</Label>
                <Input
                  id="profile_picture"
                  name="profile_picture"
                  data-testid="register-profile-picture-input"
                  value={formData.profile_picture}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                data-testid="register-submit-btn"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-full transition-all hover:scale-105"
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Button
                type="button"
                variant="outline"
                data-testid="register-back-to-login-btn"
                onClick={() => navigate('/login')}
                className="flex-1 py-6 rounded-full"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}