'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Link from 'next/link';
import FeedbackButton from '@/components/FeedbackButton';

// Mock data for the progress charts
const mockExerciseProgress = [
  {
    name: 'Bench Press',
    data: [135, 145, 155, 155, 165, 175, 180, 185, 190, 195],
    improvement: 44.4, // percentage improvement
  },
  {
    name: 'Squats',
    data: [185, 195, 205, 215, 225, 235, 245, 255, 265, 275],
    improvement: 48.6,
  },
  {
    name: 'Deadlifts',
    data: [225, 235, 245, 255, 265, 275, 285, 295, 305, 315],
    improvement: 40.0,
  },
  {
    name: 'Shoulder Press',
    data: [95, 100, 105, 110, 115, 120, 125, 130, 135, 140],
    improvement: 47.4,
  },
];

export default function ProgressTracker() {
  const [sortedExercises, setSortedExercises] = useState<typeof mockExerciseProgress>([]);
  
  useEffect(() => {
    // Sort exercises by improvement (highest first)
    const sorted = [...mockExerciseProgress].sort((a, b) => b.improvement - a.improvement);
    setSortedExercises(sorted);
  }, []);
  
  const handlePrintSummary = () => {
    window.print();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                Your Progress Tracker
              </h1>
              <p className="text-[#666666]">
                Track your improvement over time for each exercise.
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link href="/workout/plan">
                <Button variant="outline">
                  Back to Workout Plan
                </Button>
              </Link>
              
              <Button onClick={handlePrintSummary} variant="primary">
                Print Summary
              </Button>
            </div>
          </div>
          
          {/* Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {sortedExercises.map((exercise, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-black">
                    {exercise.name}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-xl text-sm font-medium">
                    +{exercise.improvement.toFixed(1)}%
                  </span>
                </div>
                
                <div className="h-64 relative">
                  {/* Simple bar chart visualization */}
                  <div className="absolute inset-0 flex items-end">
                    {exercise.data.map((value, i) => {
                      const height = `${(value / Math.max(...exercise.data)) * 100}%`;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-[#007AFF] rounded-t"
                            style={{ height }}
                          ></div>
                          <span className="text-xs mt-1 text-[#666666]">
                            {i + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 inset-y-0 flex flex-col justify-between pointer-events-none">
                    <span className="text-xs text-[#666666]">
                      {Math.max(...exercise.data)} lbs
                    </span>
                    <span className="text-xs text-[#666666]">
                      {Math.min(...exercise.data)} lbs
                    </span>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-[#666666]">
                  You&apos;ve improved your {exercise.name} by {exercise.improvement.toFixed(1)}% over the course of your workouts.
                </p>
              </div>
            ))}
          </div>
          
          {/* Summary Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">
              6-Week Program Summary
            </h2>
            
            <div className="space-y-4">
              <p className="text-black">
                Congratulations on completing your 6-week workout program! Here&apos;s a summary of your progress:
              </p>
              
              <ul className="list-disc pl-5 text-[#666666] space-y-2">
                <li>
                  <span className="font-medium text-black">Total workouts completed:</span> 18 workouts
                </li>
                <li>
                  <span className="font-medium text-black">Most improved exercise:</span> {sortedExercises[0]?.name} (+{sortedExercises[0]?.improvement.toFixed(1)}%)
                </li>
                <li>
                  <span className="font-medium text-black">Average improvement:</span> {(sortedExercises.reduce((sum, ex) => sum + ex.improvement, 0) / sortedExercises.length).toFixed(1)}%
                </li>
                <li>
                  <span className="font-medium text-black">Consistency rate:</span> 100%
                </li>
              </ul>
              
              <p className="text-[#666666] mt-4">
                Your dedication to this program has resulted in significant strength gains. To continue your progress, consider starting a new 6-week program with increased weights or trying a different workout style.
              </p>
            </div>
          </div>
          
          {/* Feedback Button */}
          <FeedbackButton />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 