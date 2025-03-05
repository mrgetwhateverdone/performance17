import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import FeedbackButton from "@/components/FeedbackButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
          {/* Hero Section with App Mockup */}
          <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-20">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Created by a college athlete, for athletes.
              </h1>
              <p className="text-[#666666] text-lg">
                Helping athletes become the best version of themselves through strength training, explosive plyometric training, and position-specific training.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" fullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative h-[500px] transform rotate-[-5deg] hover:rotate-0 transition-all duration-300">
              <div className="absolute inset-0 bg-black rounded-[40px] shadow-xl overflow-hidden border-8 border-black">
                <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex items-center justify-center">
                  <div className="w-20 h-4 bg-black rounded-b-xl"></div>
                </div>
                <div className="h-full w-full bg-white pt-6">
                  <div className="h-full w-full bg-white rounded-t-xl overflow-hidden flex flex-col">
                    <div className="bg-[#4CD964] text-white p-4 text-center font-bold">
                      Workout Complete!
                    </div>
                    <div className="flex-1 p-4 flex flex-col items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-[#4CD964] flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">Great Job!</h3>
                      <p className="text-[#666666] text-center mb-4">You&apos;ve completed your workout for today.</p>
                      <Button variant="accent" size="md">
                        View Progress
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* First Section with Purpose */}
          <div className="w-full max-w-4xl mb-20">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Purpose of Pitia Performance
                </h2>
                <p className="text-[#666666]">
                  This platform creates custom 6-week workout plans based on your sport, position, body type, and training goals and tracks your progress. Whether you&apos;re focused on strength training or improving your athletic ability, I&apos;ve got you covered with sport-specific exercises and workouts, with injury prevention rehab included, that will elevate your game and take you to the next level.
                </p>
              </div>
            </div>
          </div>
          
          {/* Second Section with Creator Info */}
          <div className="w-full max-w-4xl mb-16">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  About the Creator
                </h2>
                <p className="text-[#666666]">
                  Pitia Performance was created by DJ Pitia, a former college basketball player who was frustrated with generic workout plans that didn&apos;t address the specific training needs of true athletes. After years of wasting time and effort on inefficient workouts, DJ combined his knowledge in computer programming and sports science to create a platform that truly understands what college athletes need to improve, stay injury-free, and most importantly perform at the highest level.
                </p>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="w-full max-w-4xl mb-16">
            <h2 className="text-3xl font-bold text-black text-center mb-10">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Personalized Plans</h3>
                <p className="text-[#666666]">Workout plans tailored to your sport, position, and body type</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Progress Tracking</h3>
                <p className="text-[#666666]">Monitor your improvements with detailed analytics</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">6-Week Programs</h3>
                <p className="text-[#666666]">Structured training cycles with progressive overload</p>
              </div>
            </div>
          </div>
          
          {/* Feedback Button */}
          <FeedbackButton />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
