import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { GraduationCap, Building2, FlaskConical } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Donate({ user, onLogout }) {
  const [formData, setFormData] = useState({
    name: user.full_name,
    email: user.email,
    phone: user.phone,
    amount: '',
    purpose: '',
    message: ''
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const causes = [
    {
      id: 'scholarship',
      title: 'Scholarship Fund',
      description: 'Support deserving students in achieving their academic dreams. Your contribution helps provide financial aid to talented students who need it most.',
      image: 'https://images.unsplash.com/photo-1514369118554-e20d93546b30',
      icon: GraduationCap
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      description: 'Help build state-of-the-art facilities, modern classrooms, and campus improvements that enhance the learning environment for future generations.',
      image: 'https://images.unsplash.com/photo-1551295022-de5522c94e08',
      icon: Building2
    },
    {
      id: 'research',
      title: 'Research & Innovation',
      description: 'Fund cutting-edge research projects and innovation labs that push the boundaries of knowledge and create breakthrough discoveries.',
      image: 'https://images.pexels.com/photos/8539753/pexels-photo-8539753.jpeg',
      icon: FlaskConical
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) < 10) {
      toast.error('Minimum donation amount is $10');
      return;
    }
    if (parseFloat(formData.amount) > 10000) {
      toast.error('Maximum donation amount is $10,000');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/donate`, {
        user_id: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
        message: formData.message
      });

      // Show confetti effect
      toast.success('Payment Successful! Thank you for your contribution! 🎉');
      setShowPaymentModal(false);
      setFormData({
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        amount: '',
        purpose: '',
        message: ''
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4" data-testid="donate-title">
              Your Contribution Builds Tomorrow
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Every donation, no matter the size, makes a meaningful difference in shaping the future of Global Horizon University and its students.
            </p>
          </div>

          {/* Causes */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {causes.map((cause) => {
              const Icon = cause.icon;
              return (
                <Card key={cause.id} className="hover-lift overflow-hidden" data-testid={`donate-cause-${cause.id}`}>
                  <div className="relative h-48">
                    <img
                      src={`${cause.image}?w=400&q=80`}
                      alt={cause.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Icon className="w-8 h-8 mb-2" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{cause.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">{cause.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Donation Form */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Make Your Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="donate-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      data-testid="donate-name-input"
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
                      data-testid="donate-email-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      data-testid="donate-phone-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount ($10 - $10,000)</Label>
                    <Input
                      id="amount"
                      type="number"
                      data-testid="donate-amount-input"
                      min="10"
                      max="10000"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      data-testid="donate-purpose-input"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      required
                      placeholder="e.g., Scholarship Fund"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      data-testid="donate-message-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts..."
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  data-testid="donate-proceed-btn"
                  className="w-full bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white font-semibold py-6 rounded-full text-lg"
                >
                  Proceed to Pay
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent data-testid="donate-payment-modal">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Amount to pay</p>
              <p className="text-3xl font-bold text-gray-800">${formData.amount}</p>
            </div>

            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" data-testid="donate-payment-card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" data-testid="donate-payment-upi" />
                <Label htmlFor="upi">UPI</Label>
              </div>
            </RadioGroup>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                This is a dummy payment gateway for prototype purposes.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              data-testid="donate-payment-submit-btn"
              onClick={handlePayment}
              disabled={loading}
              className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white"
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}