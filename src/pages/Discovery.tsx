import { useState, useEffect } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { RegionSelector } from '@/components/RegionSelector';
import { HotelListings } from '@/components/HotelListings';

type DiscoveryStep = 'mood' | 'region' | 'hotels';

export default function Discovery() {
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>('mood');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMoodToggle = (moodId: string) => {
    setSelectedMoods(prev => 
      prev.includes(moodId)
        ? prev.filter(id => id !== moodId)
        : prev.length < 3
        ? [...prev, moodId]
        : prev
    );
  };

  const handleMoodContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('region');
      setIsTransitioning(false);
    }, 300);
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const handleRegionContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('hotels');
      setIsTransitioning(false);
    }, 300);
  };

  const handleHotelSelect = (hotelId: string) => {
    // Here you would navigate to the individual hotel page
    console.log('Selected hotel:', hotelId);
  };

  const handleBackToMoods = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('mood');
      setSelectedRegion(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToRegions = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('region');
      setIsTransitioning(false);
    }, 300);
  };

  const renderCurrentStep = () => {
    if (currentStep === 'mood') {
      return (
        <MoodSelector
          selectedMoods={selectedMoods}
          onMoodToggle={handleMoodToggle}
          onContinue={handleMoodContinue}
        />
      );
    }

    if (currentStep === 'region') {
      return (
        <RegionSelector
          selectedMoods={selectedMoods}
          selectedRegion={selectedRegion}
          onRegionSelect={handleRegionSelect}
          onContinue={handleRegionContinue}
          onBack={handleBackToMoods}
        />
      );
    }

    if (currentStep === 'hotels' && selectedRegion) {
      return (
        <HotelListings
          selectedMoods={selectedMoods}
          selectedRegion={selectedRegion}
          onBack={handleBackToRegions}
          onHotelSelect={handleHotelSelect}
        />
      );
    }

    return null;
  };

  return (
    <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {renderCurrentStep()}
    </div>
  );
}