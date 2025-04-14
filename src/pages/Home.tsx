import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Calendar, MapPin, Users, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  image: string;
  club: string;
}

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'academic', name: 'Academic' },
    { id: 'career', name: 'Career' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'sports', name: 'Sports' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Mock events data
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Tech Symposium 2024',
            description: 'Join us for an exciting day of technology discussions, workshops, and networking opportunities.',
            date: '2024-05-15',
            time: '10:00 AM',
            venue: 'Main Auditorium',
            location: 'Engineering Block',
            category: 'Academic',
            capacity: 200,
            registered: 150,
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            club: 'Computer Science Club'
          },
          {
            id: '2',
            title: 'Career Fair',
            description: 'Connect with top companies and explore internship opportunities.',
            date: '2024-05-20',
            time: '9:00 AM',
            venue: 'Student Center',
            location: 'Central Campus',
            category: 'Career',
            capacity: 500,
            registered: 300,
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
            club: 'Career Services'
          },
          {
            id: '3',
            title: 'Cultural Festival',
            description: 'Celebrate diversity with performances, food, and cultural exhibits.',
            date: '2024-05-25',
            time: '4:00 PM',
            venue: 'Open Air Theater',
            location: 'East Campus',
            category: 'Cultural',
            capacity: 1000,
            registered: 800,
            image: 'https://images.unsplash.com/photo-1511795409834-432f31197ce6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            club: 'Cultural Society'
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category.toLowerCase() === selectedCategory));
    }
  }, [selectedCategory, events]);

  const fadeIn = `transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  const handleRegister = (eventId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in to register for events.');
      return;
    }

    navigate(`/register/${eventId}`);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-blue-900 to-slate-900"></div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-no-repeat bg-cover bg-center" style={{
            backgroundImage: "url('/src/img/1743184158426.jpeg')"
          }}></div>
        </div>
        
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-white" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative w-full h-screen bg-cover bg-center flex items-center">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className={`text-center lg:text-left ${fadeIn}`}>
              <div className="inline-block px-3 py-1 mb-6 bg-teal-400/20 backdrop-blur-sm rounded-full border border-teal-400/30">
                <span className="text-teal-200 font-medium text-sm">One stop solution to all your Event related queries</span>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-teal-500/20 blur-xl rounded-3xl"></div>
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Transform Your College Life
                    <span className="block text-teal-400 mt-2">With Eventra</span>
                  </h1>
                </div>
              </div>

              <p className="text-xl text-slate-200 mb-8 max-w-2xl backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg">
                Discover, register, and review college events while earning XP and Vibe Score points.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-teal-400 animate-bounce" />
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-slate-600 mr-2" />
            <h2 className="text-lg font-semibold text-slate-900">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-slate-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Organized by {event.club}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500">
                      {event.registered}/{event.capacity} registered
                    </div>
                    <button
                      onClick={() => handleRegister(event.id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No events found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;