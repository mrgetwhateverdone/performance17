'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import FeedbackButton from '@/components/FeedbackButton';
import Link from 'next/link';

// Define types to fix linter errors
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

interface SetWeight {
  weight: string;
  completed: boolean;
}

interface ExerciseProgress {
  completed: boolean;
  setWeights: SetWeight[];
  previousSetWeights: SetWeight[] | null;
}

// Mock workout data generator (in a real app, this would come from an API)
const generateWorkoutPlan = (
  sport: string,
  workoutType: string,
  height: number,
  weight: number,
  position?: string
): WeekPlan[] => {
  // Determine body type category
  const isTall = height >= 76; // 76 inches or more
  const isHeavy = weight >= 231; // 231 lbs or more
  
  let bodyType = '';
  if (isHeavy && isTall) bodyType = 'heavy-tall';
  else if (isHeavy && !isTall) bodyType = 'heavy-short';
  else if (!isHeavy && !isTall) bodyType = 'light-short';
  else bodyType = 'light-tall';
  
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
      const exercises = generateExercises(sport, workoutType, bodyType, position, intensity, week, day);
      
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

// Helper function to generate exercises
const generateExercises = (
  sport: string,
  workoutType: string,
  bodyType: string,
  position: string | undefined,
  intensity: string,
  week: number,
  day: number
) => {
  // This is a simplified version - in a real app, you would have a database of exercises
  // tailored to each sport, position, body type, etc.
  
  // Core exercises that remain consistent throughout the program
  const coreExercises = [];
  
  if (workoutType === 'Strength') {
    // Add strength core exercises based on sport
    switch (sport) {
      case 'Basketball':
        coreExercises.push(
          { name: 'Squats', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Bench Press', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Deadlifts', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Pull-ups', sets: 3, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: false }
        );
        break;
      case 'Football':
        coreExercises.push(
          { name: 'Power Cleans', sets: 4, reps: week <= 2 ? '5-6' : week <= 4 ? '6-8' : '5-6', weight: true },
          { name: 'Bench Press', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Squats', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Shoulder Press', sets: 3, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true }
        );
        break;
      // Add cases for other sports...
      default:
        coreExercises.push(
          { name: 'Squats', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Bench Press', sets: 4, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Rows', sets: 3, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true },
          { name: 'Shoulder Press', sets: 3, reps: week <= 2 ? '6-8' : week <= 4 ? '8-10' : '6-8', weight: true }
        );
    }
  } else {
    // Add plyometric core exercises based on sport
    switch (sport) {
      case 'Basketball':
        coreExercises.push(
          { name: 'Box Jumps', sets: 4, reps: '8-10', weight: false },
          { name: 'Depth Jumps', sets: 3, reps: '6-8', weight: false },
          { name: 'Lateral Bounds', sets: 3, reps: '8 each side', weight: false },
          { name: 'Medicine Ball Throws', sets: 3, reps: '10', weight: false }
        );
        break;
      case 'Sprinting':
        coreExercises.push(
          { name: 'Bounding', sets: 4, reps: '30m', weight: false },
          { name: 'Single Leg Hops', sets: 3, reps: '10 each leg', weight: false },
          { name: 'Depth Jumps', sets: 3, reps: '8', weight: false },
          { name: 'Sprint Starts', sets: 5, reps: '20m', weight: false }
        );
        break;
      // Add cases for other sports...
      default:
        coreExercises.push(
          { name: 'Box Jumps', sets: 4, reps: '8-10', weight: false },
          { name: 'Jumping Lunges', sets: 3, reps: '10 each leg', weight: false },
          { name: 'Plyo Push-ups', sets: 3, reps: '8-10', weight: false },
          { name: 'Lateral Bounds', sets: 3, reps: '8 each side', weight: false }
        );
    }
  }
  
  // Additional exercises that vary
  const additionalExercises = [];
  
  // Add 2-5 additional exercises based on day, sport, position, etc.
  if (workoutType === 'Strength') {
    // Day 1 - typically lower body focus
    if (day === 1) {
      additionalExercises.push(
        { name: 'Leg Press', sets: 3, reps: week <= 2 ? '8-10' : week <= 4 ? '10-12' : '8-10', weight: true },
        { name: 'Lunges', sets: 3, reps: week <= 2 ? '8 each' : week <= 4 ? '10 each' : '8 each', weight: true }
      );
      
      // Add body type specific exercises
      if (bodyType === 'heavy-tall' || bodyType === 'heavy-short') {
        additionalExercises.push(
          { name: 'Leg Extensions', sets: 3, reps: '10-12', weight: true }
        );
      } else {
        additionalExercises.push(
          { name: 'Bulgarian Split Squats', sets: 3, reps: '8 each', weight: true }
        );
      }
    }
    // Day 2 - typically upper body focus
    else if (day === 2) {
      additionalExercises.push(
        { name: 'Incline Press', sets: 3, reps: week <= 2 ? '8-10' : week <= 4 ? '10-12' : '8-10', weight: true },
        { name: 'Lat Pulldowns', sets: 3, reps: week <= 2 ? '8-10' : week <= 4 ? '10-12' : '8-10', weight: true }
      );
      
      // Add body type specific exercises
      if (bodyType === 'light-tall' || bodyType === 'light-short') {
        additionalExercises.push(
          { name: 'Dips', sets: 3, reps: '8-10', weight: false }
        );
      } else {
        additionalExercises.push(
          { name: 'Cable Flyes', sets: 3, reps: '10-12', weight: true }
        );
      }
    }
    // Day 3 - typically full body or core focus
    else {
      additionalExercises.push(
        { name: 'Planks', sets: 3, reps: '30-45 sec', weight: false },
        { name: 'Russian Twists', sets: 3, reps: '15 each side', weight: false }
      );
      
      // Add sport specific exercises
      if (sport === 'Basketball' || sport === 'Volleyball') {
        additionalExercises.push(
          { name: 'Calf Raises', sets: 3, reps: '15-20', weight: true }
        );
      } else if (sport === 'Football' || sport === 'Wrestling') {
        additionalExercises.push(
          { name: 'Farmer\'s Walks', sets: 3, reps: '30m', weight: true }
        );
      }
    }
  } else {
    // Plyometric workouts
    // Day 1 - typically lower body focus
    if (day === 1) {
      if (week <= 2) { // Low level
        additionalExercises.push(
          { name: 'Jump Squats', sets: 3, reps: '10-12', weight: false },
          { name: 'Ankle Bounces', sets: 3, reps: '15-20', weight: false }
        );
      } else if (week <= 4) { // Medium level
        additionalExercises.push(
          { name: 'Tuck Jumps', sets: 3, reps: '8-10', weight: false },
          { name: 'Split Jumps', sets: 3, reps: '8 each leg', weight: false }
        );
      } else { // High level
        additionalExercises.push(
          { name: 'Depth Jumps to Box Jump', sets: 3, reps: '6-8', weight: false },
          { name: 'Single Leg Bounds', sets: 3, reps: '8 each leg', weight: false }
        );
      }
    }
    // Day 2 - typically upper body/core focus
    else if (day === 2) {
      if (week <= 2) { // Low level
        additionalExercises.push(
          { name: 'Medicine Ball Chest Pass', sets: 3, reps: '10-12', weight: false },
          { name: 'Plyo Push-up (from knees if needed)', sets: 3, reps: '8-10', weight: false }
        );
      } else if (week <= 4) { // Medium level
        additionalExercises.push(
          { name: 'Medicine Ball Slams', sets: 3, reps: '10', weight: false },
          { name: 'Plyo Push-ups', sets: 3, reps: '8-10', weight: false }
        );
      } else { // High level
        additionalExercises.push(
          { name: 'Clapping Push-ups', sets: 3, reps: '8-10', weight: false },
          { name: 'Medicine Ball Rotational Throws', sets: 3, reps: '8 each side', weight: false }
        );
      }
    }
    // Day 3 - typically sport-specific focus
    else {
      if (sport === 'Basketball') {
        additionalExercises.push(
          { name: 'Reactive Jump to Reach', sets: 3, reps: '8', weight: false },
          { name: 'Lateral Skater Jumps', sets: 3, reps: '10 each side', weight: false }
        );
      } else if (sport === 'Sprinting') {
        additionalExercises.push(
          { name: 'A-Skips', sets: 3, reps: '20m', weight: false },
          { name: 'Resisted Sprints', sets: 4, reps: '20m', weight: false }
        );
      } else {
        additionalExercises.push(
          { name: 'Agility Ladder Drills', sets: 3, reps: '30 sec', weight: false },
          { name: 'Lateral Bounds', sets: 3, reps: '8 each side', weight: false }
        );
      }
    }
  }
  
  // Combine core and additional exercises
  return [...coreExercises, ...additionalExercises];
};

// Main component that uses useSearchParams
function WorkoutPlanContent() {
  const searchParams = useSearchParams();
  const [workoutPlan, setWorkoutPlan] = useState<WeekPlan[]>([]);
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exerciseProgress, setExerciseProgress] = useState<Record<string, ExerciseProgress>>({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  useEffect(() => {
    // Check if we have a stored workout plan in localStorage
    if (typeof window !== 'undefined') {
      try {
        const storedPlan = localStorage.getItem('workoutPlan');
        if (storedPlan) {
          const parsedPlan = JSON.parse(storedPlan);
          setWorkoutPlan(parsedPlan);
          
          // Initialize progress tracking for the stored plan
          const initialProgress: Record<string, ExerciseProgress> = {};
          parsedPlan.forEach((week: WeekPlan, weekIndex: number) => {
            week.workouts.forEach((workout, workoutIndex) => {
              workout.exercises.forEach((exercise, exerciseIndex) => {
                const exerciseId = `w${weekIndex+1}d${workoutIndex+1}e${exerciseIndex+1}`;
                
                // Initialize set weights array based on number of sets
                const setWeights: SetWeight[] = Array(exercise.sets).fill(0).map(() => ({
                  weight: '',
                  completed: false
                }));
                
                initialProgress[exerciseId] = {
                  completed: false,
                  setWeights,
                  previousSetWeights: null,
                };
              });
            });
          });
          setExerciseProgress(initialProgress);
          return; // Exit early since we loaded from localStorage
        }
      } catch (error) {
        console.error('Failed to load workout plan from localStorage:', error);
        // Continue with normal plan generation if localStorage fails
      }
    }
    
    // If no stored plan, generate a new one from URL parameters
    // Get parameters from URL
    const sport = searchParams.get('sport') || '';
    const workoutType = searchParams.get('workoutType') || '';
    const height = parseInt(searchParams.get('height') || '0', 10);
    const weight = parseInt(searchParams.get('weight') || '0', 10);
    const position = searchParams.get('position') || undefined;
    
    // Generate workout plan
    const plan = generateWorkoutPlan(sport, workoutType, height, weight, position);
    setWorkoutPlan(plan);
    
    // Initialize progress tracking
    const initialProgress: Record<string, ExerciseProgress> = {};
    plan.forEach((week, weekIndex) => {
      week.workouts.forEach((workout, workoutIndex) => {
        workout.exercises.forEach((exercise, exerciseIndex) => {
          const exerciseId = `w${weekIndex+1}d${workoutIndex+1}e${exerciseIndex+1}`;
          
          // Initialize set weights array based on number of sets
          const setWeights: SetWeight[] = Array(exercise.sets).fill(0).map(() => ({
            weight: '',
            completed: false
          }));
          
          initialProgress[exerciseId] = {
            completed: false,
            setWeights,
            previousSetWeights: null,
          };
        });
      });
    });
    setExerciseProgress(initialProgress);
  }, [searchParams]);
  
  const handleStartWorkout = (week: number, workout: Workout) => {
    setActiveWorkout(workout);
  };
  
  const handleCompleteWorkout = () => {
    // Mark the current workout as completed
    const updatedPlan = [...workoutPlan];
    const weekIndex = activeWeek - 1;
    const workoutIndex = updatedPlan[weekIndex].workouts.findIndex((w) => w.day === activeWorkout?.day);
    
    if (workoutIndex !== -1) {
      updatedPlan[weekIndex].workouts[workoutIndex].isCompleted = true;
      setWorkoutPlan(updatedPlan);
      
      // Set localStorage flag to indicate a workout has been completed
      // This will be used to control access to the rehabilitation page
      try {
        localStorage.setItem('workoutCompleted', 'true');
      } catch (error) {
        console.error('Failed to set localStorage:', error);
      }
    }
    
    // Show completion modal instead of immediately returning to plan
    setShowCompletionModal(true);
  };
  
  const handleCompletionOption = (option: string) => {
    setShowCompletionModal(false);
    
    // Handle different options
    switch (option) {
      case 'rehabilitation':
        // Navigate to rehabilitation page (you would need to create this page)
        window.location.href = '/workout/rehabilitation';
        break;
      case 'progress':
        // Navigate to progress page
        window.location.href = '/workout/progress';
        break;
      case 'menu':
        // Return to workout menu
        setActiveWorkout(null);
        break;
      default:
        setActiveWorkout(null);
    }
  };
  
  const handleSetComplete = (exerciseId: string, setIndex: number, weight: string) => {
    setExerciseProgress(prev => {
      const exercise = prev[exerciseId];
      const updatedSetWeights = [...exercise.setWeights];
      updatedSetWeights[setIndex] = {
        weight,
        completed: true
      };
      
      // Check if all sets are completed
      const allSetsCompleted = updatedSetWeights.every(set => set.completed);
      
      return {
        ...prev,
        [exerciseId]: {
          ...exercise,
          completed: allSetsCompleted,
          setWeights: updatedSetWeights,
          previousSetWeights: exercise.previousSetWeights,
        }
      };
    });
  };
  
  const allWorkoutsCompletedInWeek = (week: number) => {
    const weekData = workoutPlan[week - 1];
    return weekData && weekData.workouts.every((workout) => workout.isCompleted);
  };
  
  const canStartWorkout = (week: number, workoutDay: number) => {
    // First workout can always be started
    if (week === 1 && workoutDay === 1) return true;
    
    const weekIndex = week - 1;
    const workoutIndex = workoutDay - 1;
    
    // If it's the first workout of a week (except week 1)
    if (workoutDay === 1 && week > 1) {
      // Check if all workouts in the previous week are completed
      return allWorkoutsCompletedInWeek(week - 1);
    }
    
    // Otherwise, check if the previous workout in the same week is completed
    return weekIndex < workoutPlan.length && 
           workoutIndex > 0 && 
           workoutPlan[weekIndex].workouts[workoutIndex - 1].isCompleted;
  };
  
  if (workoutPlan.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-black">Loading your workout plan...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If a workout is active, show the workout interface
  if (activeWorkout) {
    const weekIndex = activeWeek - 1;
    const workoutIndex = workoutPlan[weekIndex].workouts.findIndex((w) => w.day === activeWorkout.day);
    
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <Header />
        
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <button 
                onClick={() => setActiveWorkout(null)}
                className="text-[#007AFF] hover:text-[#0056b3] flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Plan
              </button>
              
              <h2 className="text-2xl font-bold text-black">
                Week {activeWeek}, Workout {activeWorkout.day}
              </h2>
            </div>
            
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-black">
                {activeWorkout.intensity}
              </h3>
              
              <div className="space-y-8">
                {activeWorkout.exercises.map((exercise, exerciseIndex) => {
                  const exerciseId = `w${weekIndex+1}d${workoutIndex+1}e${exerciseIndex+1}`;
                  const progress = exerciseProgress[exerciseId];
                  
                  return (
                    <div key={exerciseIndex} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h4 className="text-lg font-medium text-black mb-2">
                        {exercise.name}
                      </h4>
                      <p className="text-[#666666] mb-4">
                        {exercise.sets} sets × {exercise.reps}
                      </p>
                      
                      <div className="space-y-4">
                        {progress.setWeights.map((setProgress, setIndex) => {
                          return (
                            <div key={setIndex} className="flex items-center justify-between">
                              <div className="font-medium text-black">
                                Set {setIndex + 1}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                {exercise.weight && !setProgress.completed ? (
                                  <div className="flex items-center">
                                    <input
                                      type="number"
                                      placeholder="Weight"
                                      className="w-24 px-3 py-2 border-2 border-[#007AFF] rounded-xl shadow-sm focus:ring-[#007AFF] focus:border-[#007AFF] bg-white text-black"
                                      value={setProgress.weight}
                                      min="0"
                                      step="2.5"
                                      onChange={(e) => {
                                        const newSetWeights = [...progress.setWeights];
                                        newSetWeights[setIndex] = {
                                          ...newSetWeights[setIndex],
                                          weight: e.target.value
                                        };
                                        
                                        setExerciseProgress(prev => ({
                                          ...prev,
                                          [exerciseId]: {
                                            ...prev[exerciseId],
                                            setWeights: newSetWeights
                                          }
                                        }));
                                      }}
                                      onKeyPress={(e) => {
                                        // Allow Enter key to complete the set if weight is entered
                                        if (e.key === 'Enter' && setProgress.weight) {
                                          handleSetComplete(exerciseId, setIndex, setProgress.weight);
                                        }
                                      }}
                                    />
                                    <span className="ml-2 text-[#666666]">lbs</span>
                                  </div>
                                ) : null}
                                
                                {!setProgress.completed ? (
                                  <button
                                    onClick={() => handleSetComplete(exerciseId, setIndex, setProgress.weight)}
                                    className={`px-4 py-2 rounded-xl ${exercise.weight && !setProgress.weight ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#007AFF] hover:bg-[#0056b3] text-white'}`}
                                    disabled={exercise.weight && !setProgress.weight}
                                  >
                                    Complete
                                  </button>
                                ) : (
                                  <div className="flex items-center">
                                    {exercise.weight && (
                                      <span className="bg-[#4CD964] text-white px-3 py-1 rounded-lg mr-2">
                                        {setProgress.weight} lbs
                                      </span>
                                    )}
                                    <span className="bg-[#4CD964] text-white px-3 py-1 rounded-lg">
                                      Completed
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button
                  onClick={() => window.location.href = '/workout/rehabilitation'}
                  variant="secondary"
                  size="lg"
                >
                  Rehabilitation Exercises
                </Button>
                <Button
                  onClick={handleCompleteWorkout}
                  disabled={!activeWorkout.exercises.every((_, index) => 
                    exerciseProgress[`w${weekIndex+1}d${workoutIndex+1}e${index+1}`]?.completed
                  )}
                  variant="primary"
                  size="lg"
                >
                  Finish Workout
                </Button>
              </div>
            </div>
            
            {/* Workout Completion Modal */}
            {showCompletionModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full">
                  <h3 className="text-2xl font-bold text-black mb-4 text-center">
                    Workout Completed!
                  </h3>
                  <p className="text-center text-[#666666] mb-6">
                    Great job! What would you like to do next?
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleCompletionOption('rehabilitation')}
                      variant="secondary"
                      fullWidth
                    >
                      Rehabilitation
                    </Button>
                    
                    <Button 
                      onClick={() => handleCompletionOption('progress')}
                      variant="secondary"
                      fullWidth
                    >
                      View Progression
                    </Button>
                    
                    <Button 
                      onClick={() => handleCompletionOption('menu')}
                      variant="secondary"
                      fullWidth
                    >
                      Back to Workout Menu
                    </Button>
                    
                    <Button 
                      onClick={() => handleCompletionOption('close')}
                      variant="primary"
                      fullWidth
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-black mb-2">
              Your 6-Week Workout Plan
            </h1>
            <p className="text-center text-[#666666] max-w-3xl mx-auto">
              This personalized plan is designed to help you achieve your athletic goals. Complete each workout in sequence to track your progress.
            </p>
          </div>
          
          {/* Progress Tracker Button */}
          <div className="mb-8 flex justify-center">
            <Link href="/workout/progress">
              <Button variant="secondary" size="lg">
                View Progress Tracker
              </Button>
            </Link>
          </div>
          
          {/* Main Content with Week Tabs on Left */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Week Tabs - Vertical on Left */}
            <div className="md:w-48 flex-shrink-0 mb-6 md:mb-0">
              <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible no-scrollbar border-b md:border-b-0 md:border-r border-[#E5E5E5]">
                {workoutPlan.map((week) => (
                  <button
                    key={week.week}
                    onClick={() => setActiveWeek(week.week)}
                    className={`py-3 px-6 font-medium text-sm whitespace-nowrap flex-shrink-0 md:border-r-2 md:border-b-0 border-b-2 ${
                      activeWeek === week.week
                        ? 'md:border-r-[#007AFF] border-b-[#007AFF] text-[#007AFF]'
                        : 'md:border-r-transparent border-b-transparent text-[#666666] hover:text-black hover:md:border-r-[#007AFF] hover:border-b-[#007AFF]'
                    }`}
                  >
                    Week {week.week}
                    {allWorkoutsCompletedInWeek(week.week) && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Workouts for Selected Week */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workoutPlan[activeWeek - 1].workouts.map((workout) => (
                  <div
                    key={workout.day}
                    className={`bg-white shadow-md rounded-xl overflow-hidden ${
                      !canStartWorkout(activeWeek, workout.day) && !workout.isCompleted
                        ? 'opacity-60'
                        : ''
                    }`}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-black">
                        Workout {workout.day}
                      </h3>
                      <p className="text-[#666666] mb-4">
                        {workout.intensity}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <p key={index} className="text-black">
                            • {exercise.name}
                          </p>
                        ))}
                        {workout.exercises.length > 3 && (
                          <p className="text-[#666666] text-sm">
                            +{workout.exercises.length - 3} more exercises
                          </p>
                        )}
                      </div>
                      
                      {workout.isCompleted ? (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl text-center font-medium">
                          Completed
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleStartWorkout(activeWeek, workout)}
                          disabled={!canStartWorkout(activeWeek, workout.day)}
                          variant="primary"
                          fullWidth
                        >
                          {canStartWorkout(activeWeek, workout.day) ? 'Start Workout' : 'Locked'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Feedback Button */}
          <div className="mt-16">
            <FeedbackButton />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Main export with Suspense boundary
export default function WorkoutPlan() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-black">Loading your workout plan...</p>
        </main>
        <Footer />
      </div>
    }>
      <WorkoutPlanContent />
    </Suspense>
  );
} 