'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

// Define types
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: boolean;
}

interface Workout {
  day: number;
  intensity: string;
  exercises: Exercise[];
  isCompleted: boolean;
}

interface WeekPlan {
  week: number;
  workouts: Workout[];
}

interface CustomExercise {
  name: string;
  sets: number;
  reps: string;
  weight: boolean;
}

// Mock workout data generator (simplified version of the one in plan page)
const generateWorkoutPlan = (
  sport: string,
  workoutType: string
): WeekPlan[] => {
  // Generate 6 weeks of workouts (3 workouts per week)
  const weeks: WeekPlan[] = [];
  
  for (let week = 1; week <= 6; week++) {
    const workouts: Workout[] = [];
    
    for (let day = 1; day <= 3; day++) {
      // Determine workout intensity based on week
      let intensity = '';
      if (workoutType === 'Strength') {
        if (week <= 2) intensity = 'Setting the Baseline';
        else if (week <= 4) intensity = 'Power';
        else intensity = 'Strength';
      } else { // Plyometric
        if (week <= 2) intensity = 'Setting the Baseline';
        else if (week <= 4) intensity = 'Power';
        else intensity = 'Strength';
      }
      
      // Generate exercises based on sport, position, body type, and workout type
      // This is a simplified version - in a real app, you would have a database of exercises
      const exercises: Exercise[] = [];
      
      // Add some basic exercises based on workout type
      if (workoutType === 'Strength') {
        exercises.push(
          { name: 'Squats', sets: 4, reps: '8-10', weight: true },
          { name: 'Bench Press', sets: 4, reps: '8-10', weight: true },
          { name: 'Deadlifts', sets: 4, reps: '6-8', weight: true }
        );
      } else {
        exercises.push(
          { name: 'Box Jumps', sets: 4, reps: '8-10', weight: false },
          { name: 'Depth Jumps', sets: 3, reps: '6-8', weight: false },
          { name: 'Lateral Bounds', sets: 3, reps: '8 each side', weight: false }
        );
      }
      
      // Add sport-specific exercises
      if (sport === 'Basketball') {
        exercises.push(
          { name: 'Vertical Jump Training', sets: 3, reps: '8-10', weight: false }
        );
      } else if (sport === 'Football') {
        exercises.push(
          { name: 'Power Cleans', sets: 3, reps: '5-6', weight: true }
        );
      }
      
      workouts.push({
        day,
        intensity,
        exercises,
        isCompleted: false,
      });
    }
    
    weeks.push({
      week,
      workouts,
    });
  }
  
  return weeks;
};

export default function FinalizePlan() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <FinalizePlanContent />
    </Suspense>
  );
}

function FinalizePlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workoutPlan, setWorkoutPlan] = useState<WeekPlan[]>([]);
  const [customExercises, setCustomExercises] = useState<CustomExercise[]>([]);
  const [newExercise, setNewExercise] = useState<CustomExercise>({
    name: '',
    sets: 3,
    reps: '8-10',
    weight: false
  });
  const [activeWeek, setActiveWeek] = useState(1);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  
  useEffect(() => {
    // Get parameters from URL
    const sport = searchParams.get('sport') || '';
    const workoutType = searchParams.get('workoutType') || '';
    
    // Generate workout plan
    const plan = generateWorkoutPlan(sport, workoutType);
    setWorkoutPlan(plan);
  }, [searchParams]);
  
  const handleAddCustomExercise = () => {
    if (!newExercise.name.trim()) {
      alert('Please enter an exercise name');
      return;
    }
    
    setCustomExercises([...customExercises, { ...newExercise }]);
    setNewExercise({
      name: '',
      sets: 3,
      reps: '8-10',
      weight: false
    });
    setShowAddExerciseModal(false);
  };
  
  const handleRemoveCustomExercise = (index: number) => {
    const updatedExercises = [...customExercises];
    updatedExercises.splice(index, 1);
    setCustomExercises(updatedExercises);
  };
  
  const handleFinalizePlan = () => {
    // Add custom exercises to the first and third workout of each week
    if (customExercises.length > 0) {
      const updatedPlan = [...workoutPlan];
      
      updatedPlan.forEach((week) => {
        // Add to first workout (day 1)
        if (week.workouts[0]) {
          week.workouts[0].exercises = [
            ...week.workouts[0].exercises,
            ...customExercises
          ];
        }
        
        // Add to third workout (day 3)
        if (week.workouts[2]) {
          week.workouts[2].exercises = [
            ...week.workouts[2].exercises,
            ...customExercises
          ];
        }
      });
      
      setWorkoutPlan(updatedPlan);
    }
    
    // Store the updated plan in localStorage
    if (typeof window !== 'undefined') {
      try {
        typeof window !== "undefined" && localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
      } catch (error) {
        console.error('Failed to store workout plan:', error);
      }
    }
    
    // Navigate to the workout plan page with the original parameters
    const queryParams = new URLSearchParams();
    for (const [key, value] of Array.from(searchParams.entries())) {
      queryParams.append(key, value);
    }
    
    // Add a flag to indicate custom exercises were added
    if (customExercises.length > 0) {
      queryParams.append('customExercises', 'true');
    }
    
    router.push(`/workout/plan?${queryParams.toString()}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-black">
            Finalize Your Workout Plan
          </h1>
          
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Your 6-Week Plan Overview
            </h2>
            <p className="text-[#666666] mb-6">
              We&apos;ve created a personalized 6-week workout plan based on your inputs. You can now add custom exercises to tailor it further to your needs.
            </p>
            
            {/* Week selector */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2">
                {workoutPlan.map((week) => (
                  <button
                    key={week.week}
                    onClick={() => setActiveWeek(week.week)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium ${
                      activeWeek === week.week
                        ? 'bg-[#007AFF] text-white'
                        : 'bg-gray-100 text-[#666666] hover:bg-gray-200'
                    }`}
                  >
                    Week {week.week}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Display workouts for selected week */}
            {workoutPlan[activeWeek - 1] && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workoutPlan[activeWeek - 1].workouts.map((workout) => (
                  <div key={workout.day} className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-2 text-black">
                      Workout {workout.day}
                    </h3>
                    <p className="text-[#666666] mb-3 text-sm">
                      {workout.intensity}
                    </p>
                    
                    <ul className="space-y-2 mb-4">
                      {workout.exercises.map((exercise, index) => (
                        <li key={index} className="text-black text-sm">
                          • {exercise.name} ({exercise.sets} sets × {exercise.reps})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Custom Exercises Section */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-black">
                Custom Exercises
              </h2>
              <Button 
                onClick={() => setShowAddExerciseModal(true)}
                variant="primary"
                size="sm"
              >
                Add Exercise
              </Button>
            </div>
            
            <p className="text-[#666666] mb-6">
              Add your own exercises to personalize your workout plan. These will be added to the first and third workout of each week.
            </p>
            
            {customExercises.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-[#666666]">
                  No custom exercises added yet. Click the &quot;Add Exercise&quot; button to add your own exercises.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {customExercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-black">{exercise.name}</h4>
                      <p className="text-[#666666] text-sm">
                        {exercise.sets} sets × {exercise.reps} {exercise.weight ? '(with weight)' : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveCustomExercise(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="lg"
            >
              Back to Setup
            </Button>
            
            <Button
              onClick={handleFinalizePlan}
              variant="primary"
              size="lg"
            >
              Begin Your Improvement!
            </Button>
          </div>
        </div>
      </main>
      
      {/* Add Exercise Modal */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-black mb-4">
              Add Custom Exercise
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="exerciseName" className="block text-sm font-medium text-[#666666] mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  id="exerciseName"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-[#007AFF] rounded-xl shadow-sm focus:ring-[#007AFF] focus:border-[#007AFF] bg-white text-black"
                  placeholder="e.g., Bulgarian Split Squats"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sets" className="block text-sm font-medium text-[#666666] mb-1">
                    Sets
                  </label>
                  <input
                    type="number"
                    id="sets"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({...newExercise, sets: parseInt(e.target.value) || 1})}
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border-2 border-[#007AFF] rounded-xl shadow-sm focus:ring-[#007AFF] focus:border-[#007AFF] bg-white text-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="reps" className="block text-sm font-medium text-[#666666] mb-1">
                    Reps
                  </label>
                  <input
                    type="text"
                    id="reps"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-[#007AFF] rounded-xl shadow-sm focus:ring-[#007AFF] focus:border-[#007AFF] bg-white text-black"
                    placeholder="e.g., 8-10 or 12"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useWeight"
                  checked={newExercise.weight}
                  onChange={(e) => setNewExercise({...newExercise, weight: e.target.checked})}
                  className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                />
                <label htmlFor="useWeight" className="ml-2 block text-sm text-[#666666]">
                  This exercise uses weights
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                onClick={() => setShowAddExerciseModal(false)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              
              <Button
                onClick={handleAddCustomExercise}
                variant="primary"
                size="sm"
              >
                Add Exercise
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 
