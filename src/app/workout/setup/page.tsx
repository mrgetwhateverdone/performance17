'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

// Define the sports and their positions
const sportsWithPositions = {
  Basketball: ['Guard', 'Forward', 'Center'],
  Football: ['Quarterback', 'Skill Position', 'Lineman'],
  Baseball: ['Pitcher', 'Infield', 'Outfield', 'Catcher'],
  Volleyball: ['Hitter', 'Setter', 'Blocker', 'Libero'],
  Soccer: ['Striker', 'Midfielder', 'Defender', 'Goalkeeper'],
};

// Sports without positions
const sportsWithoutPositions = ['Sprinting', 'Tennis', 'Wrestling', 'General Workout'];

// All sports combined
const allSports = [...Object.keys(sportsWithPositions), ...sportsWithoutPositions];

export default function WorkoutSetup() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showPositions, setShowPositions] = useState(false);
  const [positions, setPositions] = useState<string[]>([]);

  // Update positions when sport changes
  useEffect(() => {
    if (selectedSport in sportsWithPositions) {
      setShowPositions(true);
      setPositions(sportsWithPositions[selectedSport as keyof typeof sportsWithPositions]);
      setSelectedPosition(''); // Reset position when sport changes
    } else {
      setShowPositions(false);
      setSelectedPosition('');
    }
  }, [selectedSport]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedSport) {
      alert('Please select a sport');
      return;
    }
    
    if (!selectedWorkoutType) {
      alert('Please select a workout type');
      return;
    }
    
    if (!height) {
      alert('Please enter your height');
      return;
    }
    
    if (!weight) {
      alert('Please enter your weight');
      return;
    }
    
    if (showPositions && !selectedPosition) {
      alert('Please select your position');
      return;
    }
    
    // Navigate to the finalize page with the form data
    const queryParams = new URLSearchParams({
      sport: selectedSport,
      workoutType: selectedWorkoutType,
      height,
      weight,
      ...(selectedPosition && { position: selectedPosition }),
    }).toString();
    
    router.push(`/workout/finalize?${queryParams}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-black">
            Create Your Personalized Workout Plan
          </h1>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 space-y-8">
            {/* Sport Selection */}
            <div>
              <label htmlFor="sport" className="block text-lg font-medium text-black mb-2">
                What sport do you play?
              </label>
              <select
                id="sport"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="block w-full px-4 py-3 border-2 border-[#007AFF] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] bg-white text-black text-lg"
                required
              >
                <option value="">Select a sport</option>
                {allSports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Workout Type Selection */}
            <div>
              <label className="block text-lg font-medium text-black mb-4">
                What type of workout plan do you want?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedWorkoutType === 'Strength' 
                      ? 'bg-black text-white border-black' 
                      : 'border-black bg-white text-black hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedWorkoutType('Strength')}
                >
                  <input
                    type="radio"
                    id="strength"
                    name="workoutType"
                    value="Strength"
                    checked={selectedWorkoutType === 'Strength'}
                    onChange={() => setSelectedWorkoutType('Strength')}
                    className="h-5 w-5 text-white focus:ring-black border-gray-300"
                  />
                  <label htmlFor="strength" className="ml-3 block text-base font-medium cursor-pointer">
                    Strength
                  </label>
                </div>
                
                <div 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedWorkoutType === 'Plyometric' 
                      ? 'bg-black text-white border-black' 
                      : 'border-black bg-white text-black hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedWorkoutType('Plyometric')}
                >
                  <input
                    type="radio"
                    id="plyometric"
                    name="workoutType"
                    value="Plyometric"
                    checked={selectedWorkoutType === 'Plyometric'}
                    onChange={() => setSelectedWorkoutType('Plyometric')}
                    className="h-5 w-5 text-white focus:ring-black border-gray-300"
                  />
                  <label htmlFor="plyometric" className="ml-3 block text-base font-medium cursor-pointer">
                    Explosiveness
                  </label>
                </div>
              </div>
            </div>
            
            {/* Physical Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="height" className="block text-lg font-medium text-black mb-2">
                  Height
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Inches"
                  min="36"
                  max="96"
                  className="block w-full px-4 py-3 border-2 border-[#007AFF] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] bg-white text-black placeholder-[#007AFF]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-lg font-medium text-black mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="lbs"
                  min="50"
                  max="500"
                  className="block w-full px-4 py-3 border-2 border-[#007AFF] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] bg-white text-black placeholder-[#007AFF]"
                  required
                />
              </div>
            </div>
            
            {/* Position Selection (conditional) */}
            {showPositions && (
              <div>
                <label htmlFor="position" className="block text-lg font-medium text-black mb-2">
                  What position do you play?
                </label>
                <select
                  id="position"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="block w-full px-4 py-3 border-2 border-[#007AFF] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] bg-white text-black text-lg"
                  required
                >
                  <option value="">Select your position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Create My Workout Plan
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}