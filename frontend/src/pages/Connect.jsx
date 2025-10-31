import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Connect({ user, onLogout }) {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = alumni.filter(
        (a) =>
          a.id !== user.id &&
          (a.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.company.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredAlumni(filtered);
    } else {
      setFilteredAlumni(alumni.filter((a) => a.id !== user.id));
    }
  }, [searchQuery, alumni, user.id]);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get(`${API}/alumni`);
      setAlumni(response.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  const openChat = async (alumniMember) => {
    setSelectedAlumni(alumniMember);
    setShowChat(true);
    // Fetch existing messages
    try {
      const response = await axios.get(`${API}/messages/${user.id}`, {
        params: { other_user_id: alumniMember.id }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`${API}/messages`, {
        sender_id: user.id,
        receiver_id: selectedAlumni.id,
        message: newMessage
      });

      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" data-testid="connect-title">
              Connect with Alumni
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                data-testid="connect-search-input"
                placeholder="Search by name or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredAlumni.map((alumniMember) => (
              <Card
                key={alumniMember.id}
                className="hover-lift cursor-pointer"
                onClick={() => openChat(alumniMember)}
                data-testid={`alumni-card-${alumniMember.id}`}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={alumniMember.profile_picture} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                      {alumniMember.full_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{alumniMember.full_name}</CardTitle>
                    <p className="text-sm text-gray-600">Batch of {alumniMember.passout_year}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-gray-800">{alumniMember.company}</p>
                  <p className="text-sm text-gray-600">{alumniMember.domain}</p>
                  <p className="text-sm text-gray-600 mt-2">{alumniMember.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-2xl" data-testid="connect-chat-modal">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedAlumni?.profile_picture} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {selectedAlumni?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{selectedAlumni?.full_name}</DialogTitle>
                <p className="text-sm text-gray-600">{selectedAlumni?.company}</p>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="h-96 pr-4" data-testid="connect-chat-messages">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender_id === user.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2 ${
                      msg.sender_id === user.id
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              data-testid="connect-chat-input"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              data-testid="connect-chat-send-btn"
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}