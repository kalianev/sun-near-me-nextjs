'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, MoveHorizontal, Sun, MapPin, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '@/store/locationStore';
import ComparisonCard from '@/components/comparison/ComparisonCard';
import CityComparisonCard from '@/components/comparison/CityComparisonCard';
import AddLocationDialog from '@/components/comparison/AddLocationDialog';
import { mockCities } from '@/utils/mockData';
import Footer from '@/components/footer';
import { FadeIn } from "@/components/fade-in";
import { AnimatedBackground } from "@/components/sun-background";
import { AnimatedText } from "@/components/animated-text";
import Link from 'next/link';

const ComparePage = () => {
  const router = useRouter();
  const { locations, comparisonList, removeFromComparison, clearComparison, addToComparison } = useLocationStore();
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  
  // Add sample locations if comparison is empty
  useEffect(() => {
    if (comparisonList.length === 0 && locations.length >= 2) {
      // Add first 2 locations to comparison
      locations.slice(0, 2).forEach(location => {
        addToComparison(location);
      });
    }
  }, [comparisonList.length, locations, addToComparison]);
  
  // Find highest sun score among cities
  const highestScoreCity = mockCities.reduce((prev, current) => 
    (prev.sunScore > current.sunScore) ? prev : current
  );

  // Get the best location based on sun score
  const bestLocation = comparisonList.length > 0 
    ? comparisonList.sort((a, b) => b.sunScore - a.sunScore)[0]
    : null;

  // Handle view directions
  const handleViewDirections = () => {
    if (bestLocation) {
      // Open Google Maps with the location's coordinates
      const address = encodeURIComponent(bestLocation.address || '');
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }
  };

  // Handle plan weekend
  const handlePlanWeekend = () => {
    // Create a weekend itinerary based on the best city
    const weekendPlan = {
      city: highestScoreCity,
      activities: highestScoreCity.topActivities,
      weather: highestScoreCity.weatherInfo,
      bestTime: `${highestScoreCity.weatherInfo.sunriseTime} - ${highestScoreCity.weatherInfo.sunsetTime}`
    };

    // Store the weekend plan in localStorage
    localStorage.setItem('weekendPlan', JSON.stringify(weekendPlan));
    
    // Navigate to a new page to show the weekend plan
    router.push('/trips/weekend');
  };
  
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to home</span>
        </Link>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-12">
          <FadeIn>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              <AnimatedText text="Location Comparison" type="letter" />
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl border p-6 backdrop-blur-sm mb-6">
              <h2 className="text-xl font-medium mb-4">Your Comparison List</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence>
                  {comparisonList.map((location) => (
                    <ComparisonCard 
                      key={location.id} 
                      location={location} 
                      onRemove={removeFromComparison} 
                    />
                  ))}
                </AnimatePresence>
                
                {comparisonList.length < 3 && (
                  <motion.div 
                    className="place-card flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-border min-h-[300px] rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsAddLocationOpen(true)}
                  >
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Plus size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-center">
                      Add another location<br />to compare
                    </p>
                  </motion.div>
                )}
              </div>
              
              {comparisonList.length > 0 && (
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => clearComparison()}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
          
          {comparisonList.length >= 2 && (
            <FadeIn delay={0.3}>
              <div className="bg-card rounded-xl border p-6 backdrop-blur-sm">
                <h2 className="text-xl font-medium mb-4 flex items-center">
                  <Sun size={20} className="mr-2 text-amber-500" />
                  Sun Insights
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div 
                    className="bg-muted rounded-lg p-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <h3 className="font-medium mb-2">Best Time to Visit</h3>
                    <p className="text-sm text-muted-foreground">
                      {comparisonList[0].name} gets the most sunlight between {comparisonList[0].weatherInfo?.sunriseTime} and {comparisonList[0].weatherInfo?.sunsetTime}, while {comparisonList[1].name} is best from {comparisonList[1].weatherInfo?.sunriseTime} to {comparisonList[1].weatherInfo?.sunsetTime}.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-muted rounded-lg p-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <h3 className="font-medium mb-2">Sun Score Comparison</h3>
                    <div className="space-y-3">
                      {comparisonList.map(location => (
                        <div key={location.id} className="flex items-center justify-between">
                          <span className="text-sm">{location.name}</span>
                          <div className="w-2/3 h-4 bg-muted-foreground/20 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${location.sunScore}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Recommendations</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your comparison, we recommend {bestLocation?.name} for the best sun experience today. It has the highest sun score and optimal conditions.
                  </p>
                  <motion.button 
                    onClick={handleViewDirections}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!bestLocation}
                  >
                    <MapPin size={16} />
                    View Directions
                  </motion.button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
        
        {/* City comparison section */}
        <div>
          <FadeIn delay={0.4}>
            <div className="flex items-center mb-6">
              <MoveHorizontal size={20} className="mr-2 text-sky-500" />
              <h2 className="text-2xl font-semibold tracking-tight">
                <AnimatedText text="Sunny Cities Near You" type="letter" />
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {mockCities.map((city, index) => (
              <FadeIn key={city.id} delay={0.2 * (index + 1)}>
                <CityComparisonCard 
                  city={city} 
                  index={index}
                  isHighestScore={city.id === highestScoreCity.id}
                />
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.6}>
            <motion.div 
              className="bg-card rounded-xl border p-6 backdrop-blur-sm"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-medium mb-4">City Comparison Insights</h3>
              <p className="text-muted-foreground mb-6">
                {highestScoreCity.name} has the highest sun score today at {highestScoreCity.sunScore}, with {highestScoreCity.weatherInfo.sunlightHours} hours of direct sunlight. It's 2-5 degrees warmer than the other cities and has the best UV index for outdoor activities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Best for Outdoor Activities</h4>
                  <p className="text-amber-500 font-semibold">Boston</p>
                  <p className="text-xs text-muted-foreground">
                    Highest UV index and longest sun hours
                  </p>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Most Comfortable Temperature</h4>
                  <p className="text-amber-500 font-semibold">Providence</p>
                  <p className="text-xs text-muted-foreground">
                    Moderate temperature with good sunshine
                  </p>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Best for Photography</h4>
                  <p className="text-amber-500 font-semibold">Portland</p>
                  <p className="text-xs text-muted-foreground">
                    Partly cloudy for softer light and contrast
                  </p>
                </div>
              </div>
              
              <motion.button 
                onClick={handlePlanWeekend}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar size={16} />
                Plan a Sunny Weekend
              </motion.button>
            </motion.div>
          </FadeIn>
        </div>

        <AnimatePresence>
          {isAddLocationOpen && (
            <AddLocationDialog
              isOpen={isAddLocationOpen}
              onClose={() => setIsAddLocationOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
};

export default ComparePage; 