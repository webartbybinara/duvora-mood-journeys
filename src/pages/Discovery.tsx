import { useState } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { RegionSelector } from '@/components/RegionSelector';
import { HotelListings } from '@/components/HotelListings';

type DiscoveryStep = 'mood' | 'region' | 'hotels';

export default function Discovery() {
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>('mood');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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
    setCurrentStep('region');
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const handleRegionContinue = () => {
    setCurrentStep('hotels');
  };

  const handleHotelSelect = (hotelId: string) => {
    // Here you would navigate to the individual hotel page
    console.log('Selected hotel:', hotelId);
  };

  const handleBackToMoods = () => {
    setCurrentStep('mood');
    setSelectedRegion(null);
  };

  const handleBackToRegions = () => {
    setCurrentStep('region');
  };

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
}