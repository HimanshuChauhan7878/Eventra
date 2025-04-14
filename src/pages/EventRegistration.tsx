import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

// Add SuccessPopup component
const SuccessPopup = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600 text-center mb-4">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
          name: user.displayName || '',
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Mock event data based on eventId
        const mockEvents: { [key: string]: Event } = {
          '1': {
            id: '1',
            title: 'Tech Symposium 2024',
            description: 'Join us for an exciting day of technology discussions, workshops, and networking opportunities. Learn from industry experts about the latest trends in software development, AI, and cloud computing.',
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
          '2': {
            id: '2',
            title: 'Career Fair',
            description: 'Connect with top companies and explore internship opportunities. Perfect for students looking to kickstart their careers in various industries.',
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
          '3': {
            id: '3',
            title: 'Cultural Festival',
            description: 'Celebrate diversity with performances, food, and cultural exhibits from around the world. A day filled with music, dance, and delicious cuisine.',
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
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const eventData = mockEvents[eventId || '1'];
        if (eventData) {
          setEvent(eventData);
          
          // For Tech Symposium and Career Fair, clear any existing registration
          if (eventId === '1' || eventId === '2') {
            const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
            const updatedRegistrations = userRegistrations.filter((id: string) => id !== eventId);
            localStorage.setItem('userRegistrations', JSON.stringify(updatedRegistrations));
            setError(''); // Clear any existing error
          } else {
            // For other events, check if already registered
            const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
            if (userRegistrations.includes(eventId)) {
              setError('You have already registered for this event');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!isAuthenticated) {
        setError('Please log in to register for events');
        navigate('/auth');
        return;
      }

      // Get current registrations
      const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
      
      // For Tech Symposium and Career Fair, allow multiple registrations
      if (eventId !== '1' && eventId !== '2') {
        // For other events, check if already registered
        if (userRegistrations.includes(eventId)) {
          setError('You have already registered for this event');
          return;
        }
      }

      // Add registration
      userRegistrations.push(eventId);
      localStorage.setItem('userRegistrations', JSON.stringify(userRegistrations));

      // Update vibe score
      const currentVibeScore = parseInt(localStorage.getItem('vibeScore') || '0');
      localStorage.setItem('vibeScore', (currentVibeScore + 1).toString());

      // Add to calendar
      const calendarEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
      calendarEvents.push({
        id: eventId,
        title: event?.title,
        date: event?.date,
        time: event?.time,
        venue: event?.venue,
      });
      localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));

      // Show success message
      setSuccessMessage(`You have successfully registered for ${event?.title}! Your vibe score has increased by 1!`);
      setShowSuccessPopup(true);
    } catch (error) {
      setError('Failed to register for event. Please try again.');
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup
          message={successMessage}
          onClose={handleSuccessPopupClose}
        />
      )}
      
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </button>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{event.title}</h1>
            <p className="text-slate-600 mb-6">{event.description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{event.venue}, {event.location}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Users className="w-5 h-5 mr-3" />
                <span>Organized by {event.club}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration; 