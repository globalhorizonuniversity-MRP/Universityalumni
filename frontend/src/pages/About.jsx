import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function About({ user, onLogout }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const campusImages = [
    { url: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763', title: 'Main Campus Building' },
    { url: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6', title: 'Academic Hall' },
    { url: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7', title: 'University Plaza' },
    { url: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg', title: 'Historic Library' },
    { url: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg', title: 'Administration Building' },
    { url: 'https://images.unsplash.com/photo-1577985043696-8bd54d9f093f', title: 'Student Commons' },
    { url: 'https://images.unsplash.com/photo-1485182708500-e8f1318ba72', title: 'Dining Hall' },
    { url: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg', title: 'Campus Green' }
  ];

  const successStories = [
    {
      name: 'Dr. Sarah Mitchell',
      batch: 1998,
      achievement: 'Nobel Prize Winner in Physics',
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6',
      story: 'Leading groundbreaking research in quantum computing and artificial intelligence.'
    },
    {
      name: 'Marcus Chen',
      batch: 2005,
      achievement: 'Tech Entrepreneur',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      story: 'Founded three successful startups valued at over $2 billion collectively.'
    },
    {
      name: 'Dr. Priya Sharma',
      batch: 2010,
      achievement: 'Medical Researcher',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      story: 'Pioneering cancer treatment methods that have saved thousands of lives.'
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={onLogout} />
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-8" data-testid="about-title">
            About Global Horizon University
          </h1>

          {/* Our Legacy */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Legacy</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  Founded in 1975, Global Horizon University has been at the forefront of academic excellence and innovation for five decades. Our journey began with a vision to create an institution that would not only impart knowledge but also shape future leaders who would make a meaningful impact on society.
                </p>
                <p>
                  Over the years, we have grown from a small liberal arts college to a comprehensive research university with over 25,000 students from more than 100 countries. Our campus spans 200 acres of beautifully landscaped grounds, featuring state-of-the-art facilities, cutting-edge research labs, and inspiring learning spaces that foster creativity and collaboration.
                </p>
                <p>
                  The university has consistently been ranked among the top 50 institutions globally, recognized for our commitment to academic rigor, groundbreaking research, and dedication to developing well-rounded individuals who are prepared to tackle the world's most pressing challenges.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Current Courses */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Courses & Programs</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  Global Horizon University offers a comprehensive range of undergraduate, graduate, and doctoral programs across multiple disciplines. Our academic portfolio includes:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">School of Engineering & Technology</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Computer Science & AI</li>
                      <li>• Electrical Engineering</li>
                      <li>• Mechanical Engineering</li>
                      <li>• Biotechnology</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">School of Business & Management</h3>
                    <ul className="text-sm space-y-1">
                      <li>• MBA Programs</li>
                      <li>• Finance & Economics</li>
                      <li>• Marketing & Strategy</li>
                      <li>• Entrepreneurship</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">School of Sciences</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Physics & Astronomy</li>
                      <li>• Chemistry</li>
                      <li>• Biology & Life Sciences</li>
                      <li>• Environmental Science</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">School of Arts & Humanities</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Literature & Languages</li>
                      <li>• Philosophy</li>
                      <li>• History</li>
                      <li>• Fine Arts & Design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campus Life */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Campus Life</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  Life at Global Horizon University extends far beyond the classroom. Our vibrant campus community offers countless opportunities for personal growth, cultural enrichment, and social engagement. With over 300 student organizations, including academic clubs, cultural societies, sports teams, and volunteer groups, there's something for everyone.
                </p>
                <p>
                  Our athletic programs compete at the highest levels, and our performing arts center hosts world-class concerts, theater productions, and exhibitions throughout the year. The campus features modern residence halls, diverse dining options, a comprehensive fitness center, and beautiful outdoor spaces perfect for studying, socializing, or simply relaxing between classes.
                </p>
                <p>
                  We pride ourselves on fostering an inclusive, supportive environment where students from all backgrounds feel welcome and valued. Our commitment to diversity and inclusion is reflected in our programming, support services, and the rich tapestry of perspectives that make up our community.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Alumni Success Stories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Alumni Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <Card key={idx} className="hover-lift">
                  <div className="relative h-64">
                    <img
                      src={`${story.image}?w=400&q=80`}
                      alt={story.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{story.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Class of {story.batch}</p>
                    <p className="text-purple-600 font-semibold mb-3">{story.achievement}</p>
                    <p className="text-sm text-gray-700">{story.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Vision & Mission */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision & Mission</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-4">
                  <h3 className="font-bold text-gray-800 mb-2">Our Vision</h3>
                  <p>
                    To be a globally recognized leader in higher education, research, and innovation, inspiring and empowering the next generation of change-makers to create a better, more sustainable world.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Our Mission</h3>
                  <p>
                    We are committed to providing a transformative educational experience that combines rigorous academics with practical application, fostering critical thinking, creativity, and ethical leadership. Through cutting-edge research, community engagement, and a dedication to excellence, we prepare our students to thrive in an ever-changing global landscape while making meaningful contributions to society.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campus Gallery */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {campusImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-48 rounded-lg overflow-hidden cursor-pointer hover-lift"
                  onClick={() => setSelectedImage(img)}
                  data-testid={`campus-image-${idx}`}
                >
                  <img
                    src={`${img.url}?w=400&q=80`}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white text-sm font-medium p-3">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <img
            src={`${selectedImage?.url}?w=1200&q=80`}
            alt={selectedImage?.title}
            className="w-full h-auto rounded-lg"
          />
          <p className="text-center text-lg font-medium mt-4">{selectedImage?.title}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}