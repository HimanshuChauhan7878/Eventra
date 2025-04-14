import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Star, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Review, { ReviewData } from './Review';
import ReviewList from './ReviewList';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  onRegister: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  location,
  category,
  capacity,
  registered,
  onRegister
}) => {
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'career':
        return 'bg-green-100 text-green-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'wellness':
        return 'bg-pink-100 text-pink-800';
      case 'sports':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReviewSubmit = (review: ReviewData) => {
    // Here you would typically send the review to your backend
    console.log('Review submitted:', review);
    setReviews([...reviews, review]);
    setShowReview(false);
    // You can add a success message or notification here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}>
            {category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {registered}/{capacity}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/register/${id}`)}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
          >
            Register Now
            <ArrowRight className="ml-2" size={16} />
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowReview(true)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              Write a Review
              <Star className="ml-2" size={16} />
            </button>

            <button
              onClick={() => setShowReviews(true)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              View Reviews
              <MessageSquare className="ml-2" size={16} />
            </button>
          </div>
        </div>

        {showReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Write a Review</h3>
                <button
                  onClick={() => setShowReview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <Review
                  eventId={id}
                  eventTitle={title}
                  eventDate={date}
                  onSubmitReview={handleReviewSubmit}
                />
              </div>
            </div>
          </div>
        )}

        {showReviews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-semibold">Reviews for {title}</h3>
                <button
                  onClick={() => setShowReviews(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <ReviewList reviews={reviews} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard; 