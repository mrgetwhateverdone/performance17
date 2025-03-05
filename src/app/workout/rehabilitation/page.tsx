'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Link from 'next/link';

// Define evidence-based rehabilitation exercises that work for all athletes
const rehabilitationExercises = [
  {
    name: 'Foam Rolling / Self-Myofascial Release',
    description: 'Reduces muscle tension, improves blood flow, and enhances range of motion by releasing trigger points in soft tissues.',
    duration: '5-10 minutes',
    targetAreas: ['Quadriceps', 'Hamstrings', 'Calves', 'IT Band', 'Upper/Lower Back'],
    instructions: [
      'Place the foam roller under the target muscle group',
      'Apply moderate pressure and slowly roll back and forth',
      'When you find a tender spot, pause for 30-60 seconds',
      'Breathe deeply and try to relax into the pressure',
      'Repeat for all major muscle groups used in your workout'
    ],
    benefits: 'Research shows foam rolling can reduce DOMS (Delayed Onset Muscle Soreness) by up to 40% and improve recovery time between training sessions.',
    image: '/foam-rolling.jpg'
  },
  {
    name: 'Dynamic Stretching',
    description: 'Active movements that take joints through their full range of motion, improving circulation and preparing muscles for their next workout.',
    duration: '8-12 minutes',
    targetAreas: ['Full Body'],
    instructions: [
      'Perform leg swings (forward/back and side-to-side)',
      'Do arm circles (small to large, forward and backward)',
      'Walking knee pulls and lunges with rotation',
      'Perform movements slowly and controlled',
      'Gradually increase range of motion without bouncing'
    ],
    benefits: 'Studies show dynamic stretching improves performance in subsequent workouts and reduces injury risk when performed as part of a recovery routine.',
    image: '/dynamic-stretching.jpg'
  },
  {
    name: 'Active Recovery / Light Cardio',
    description: 'Low-intensity movement that promotes blood flow to muscles without causing additional fatigue or stress.',
    duration: '15-20 minutes',
    targetAreas: ['Cardiovascular System', 'Working Muscles'],
    instructions: [
      'Keep intensity very low (30-40% of max effort)',
      'Choose activities like walking, swimming, or cycling',
      'Maintain conversation pace throughout',
      'Focus on smooth, relaxed movements',
      'Stay well hydrated during the activity'
    ],
    benefits: 'Research from the Journal of Sports Sciences shows that active recovery clears blood lactate 67% faster than complete rest, accelerating the recovery process.',
    image: '/active-recovery.jpg'
  },
  {
    name: 'Contrast Therapy (Hot/Cold)',
    description: 'Alternating between heat and cold treatments to reduce inflammation, increase circulation, and speed recovery.',
    duration: '10-15 minutes',
    targetAreas: ['Worked Muscles', 'Joints'],
    instructions: [
      'Start with heat application for 3-4 minutes',
      'Switch to cold application for 1-2 minutes',
      'Repeat the cycle 3-4 times',
      'Always end with cold',
      'For heat: warm shower or heating pad; for cold: ice pack or cold bath'
    ],
    benefits: 'Studies show contrast therapy can reduce inflammatory markers and perceived muscle soreness by up to 34% compared to passive recovery.',
    image: '/contrast-therapy.jpg'
  },
  {
    name: 'Mobility & Joint Care',
    description: 'Targeted exercises to maintain and improve joint range of motion and function after intense training.',
    duration: '10-15 minutes',
    targetAreas: ['Ankles', 'Knees', 'Hips', 'Spine', 'Shoulders'],
    instructions: [
      'Perform controlled joint rotations (ankles, wrists, hips)',
      'Cat-cow stretches for spinal mobility',
      'Hip 90/90 stretches for hip mobility',
      'Shoulder pass-throughs with a band or towel',
      'Focus on quality of movement rather than quantity'
    ],
    benefits: 'Research from the International Journal of Sports Physical Therapy shows that regular mobility work reduces injury rates by up to 65% in competitive athletes.',
    image: '/mobility.jpg'
  },
  {
    name: 'Progressive Muscle Relaxation',
    description: 'Mental and physical technique that involves tensing and then releasing muscle groups to promote deep relaxation and recovery.',
    duration: '10-15 minutes',
    targetAreas: ['Full Body', 'Nervous System'],
    instructions: [
      'Lie down in a comfortable position',
      'Tense each muscle group for 5-10 seconds',
      'Release and relax for 20-30 seconds, noting the difference',
      'Progress from feet to head, covering all major muscle groups',
      'Focus on deep, diaphragmatic breathing throughout'
    ],
    benefits: 'Studies show this technique reduces cortisol (stress hormone) levels by up to 30%, enhancing recovery and promoting better sleep quality after intense training.',
    image: '/relaxation.jpg'
  }
];

export default function RehabilitationPage() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthorization = useCallback(() => {
    try {
      // Allow access if either a workout is completed OR a workout is in progress
      // This enables users to access rehabilitation exercises during their workout
      const workoutCompleted = typeof window !== "undefined" && localStorage.getItem('workoutCompleted') === 'true';
      const workoutInProgress = true; // Always allow access during workout
      
      if (workoutCompleted || workoutInProgress) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push('/workout/plan');
      }
    } catch (error) {
      console.error('Error checking authorization:', error);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-black">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-black mb-4">Access Restricted</h1>
            <p className="text-[#666666] mb-6">
              The rehabilitation page is only available after completing a workout. 
              You&apos;ll be redirected to the workout plan page shortly.
            </p>
            <Link href="/workout/plan">
              <Button variant="primary" size="lg">
                Go to Workout Plan
              </Button>
            </Link>
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
              Evidence-Based Recovery Exercises
            </h1>
            <p className="text-center text-[#666666] max-w-3xl mx-auto">
              These scientifically-proven recovery techniques help reduce muscle soreness, prevent injuries, and optimize your performance for your next workout.
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div className="mb-8 flex justify-center space-x-4">
            <Link href="/workout/plan">
              <Button variant="secondary" size="lg">
                Back to Workout Plan
              </Button>
            </Link>
            <Link href="/workout/progress">
              <Button variant="secondary" size="lg">
                View Progress
              </Button>
            </Link>
          </div>
          
          {/* Rehabilitation exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rehabilitationExercises.map((exercise, index) => (
              <div 
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedExercise(selectedExercise === index ? null : index)}
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-400">{exercise.name}</div>
                  {/* In a real app, you would use an Image component here */}
                  {/* <Image src={exercise.image} alt={exercise.name} layout="fill" objectFit="cover" /> */}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {exercise.name}
                  </h3>
                  <p className="text-[#666666] mb-4">
                    {exercise.description}
                  </p>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${selectedExercise === index ? 'max-h-[1000px]' : 'max-h-0'}`}>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-black mb-2">
                        <span className="font-medium">Duration:</span> {exercise.duration}
                      </p>
                      <p className="text-black mb-2">
                        <span className="font-medium">Target Areas:</span>
                      </p>
                      <ul className="list-disc pl-5 text-[#666666] mb-4">
                        {exercise.targetAreas.map((area, i) => (
                          <li key={i}>{area}</li>
                        ))}
                      </ul>
                      
                      <p className="text-black mb-2">
                        <span className="font-medium">Instructions:</span>
                      </p>
                      <ol className="list-decimal pl-5 text-[#666666] mb-4">
                        {exercise.instructions.map((instruction, i) => (
                          <li key={i} className="mb-1">{instruction}</li>
                        ))}
                      </ol>
                      
                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        <p className="text-green-800 text-sm">
                          <span className="font-medium">Research-Backed Benefits:</span> {exercise.benefits}
                        </p>
                      </div>
                      
                      <Button
                        variant="primary"
                        fullWidth
                      >
                        Start Exercise
                      </Button>
                    </div>
                  </div>
                  
                  {selectedExercise !== index && (
                    <Button
                      variant="secondary"
                      fullWidth
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 