'use client';

import { useState } from 'react';
import Button from './Button';

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    alert('Thank you for your feedback!');
    setFeedback('');
    setIsOpen(false);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-12">
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        variant="outline"
        size="lg"
        className="mx-auto block"
      >
        Leave Feedback
      </Button>
      
      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-black mb-4 text-center">We Value Your Input</h3>
          <p className="text-[#666666] mb-6 text-center">
            The goal of creating this software was to give athletes of all ages an equal opportunity to experience all that I did with collegiate athletics without experiencing the training roadblocks that I did. I also wanted to create a platform that allows current collegiate athletes to continue to improve through a software designed specifically for you. I would love for you to assist me on this journey in doing so, so please let me know what I can to improve this software so I can continue to help you be the best athlete you can be.
          </p>
          
          <form onSubmit={handleSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 border-2 border-[#007AFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] bg-white text-black placeholder-[#007AFF]"
              rows={4}
              placeholder="Your feedback..."
              required
            />
            
            <div className="mt-6 flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit Feedback
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackButton; 