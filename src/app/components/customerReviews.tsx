import { useState } from 'react';
import './CustomerReviews.css';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely love this product! The quality exceeded my expectations and shipping was super fast. Will definitely be ordering again.',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'Best purchase I\'ve made this year. The attention to detail is incredible and customer service was outstanding when I had questions.',
    date: '1 month ago',
    verified: true,
  },
  {
    id: 3,
    name: 'Emma Williams',
    rating: 4,
    comment: 'Really impressed with the quality and design. Only minor issue was the packaging, but the product itself is fantastic. Highly recommend!',
    date: '3 weeks ago',
    verified: true,
  },
  {
    id: 4,
    name: 'David Rodriguez',
    rating: 5,
    comment: 'This has completely transformed my daily routine. Worth every penny and more. The build quality is exceptional.',
    date: '1 week ago',
    verified: true,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    rating: 5,
    comment: 'I was skeptical at first, but this exceeded all my expectations. Great value for money and the customer support team is incredibly helpful.',
    date: '2 months ago',
    verified: true,
  },
  {
    id: 6,
    name: 'James Anderson',
    rating: 4,
    comment: 'Very satisfied with my purchase. The product works exactly as described and looks even better in person. Fast delivery too!',
    date: '3 weeks ago',
    verified: true,
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="reviews-section">
      <div className="reviews-container max-w-xl md:max-w-2xl lg:max-w-7xl">
        <div className="reviews-header">
          <h2>What Our Customers Say</h2>
          <div className="rating-summary">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star filled">★</span>
              ))}
            </div>
            <p className="rating-text">
              <strong>{averageRating}</strong> out of 5 based on <strong>{reviews.length}</strong> reviews
            </p>
          </div>
        </div>

        <div className="reviews-grid grid-cols-1 lg:grid-cols-3">
          {currentReviews.map((review, index) => (
            <div key={review.id} className="review-card bg-gray-50" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="reviewer-name">{review.name}</h3>
                    {review.verified && (
                      <span className="verified-badge">✓ Verified Purchase</span>
                    )}
                  </div>
                </div>
                <span className="review-date">{review.date}</span>
              </div>

              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>

              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="reviews-navigation">
            <button
              onClick={handlePrev}
              className="nav-button"
              aria-label="Previous reviews"
            >
              ‹
            </button>
            <div className="pagination-dots">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`dot ${i === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="nav-button"
              aria-label="Next reviews"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
