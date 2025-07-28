import { useState } from 'react';
import { EnhancedMoodSelector } from '@/components/EnhancedMoodSelector';
import { RegionSelector } from '@/components/RegionSelector';
import { HotelListings } from '@/components/HotelListings';
import { Navigation } from '@/components/Navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';

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
      <>
        <Navigation />
        <main className="pt-16">
          <div className="container-xl py-8">
            <Breadcrumbs />
          </div>
          <EnhancedMoodSelector
            selectedMoods={selectedMoods}
            onMoodToggle={handleMoodToggle}
            onContinue={handleMoodContinue}
          />
        </main>
      </>
    );
  }

  if (currentStep === 'region') {
    return (
      <>
        <Navigation />
        <main className="pt-16">
          <div className="container-xl py-8">
            <Breadcrumbs />
          </div>
          <RegionSelector
            selectedMoods={selectedMoods}
            selectedRegion={selectedRegion}
            onRegionSelect={handleRegionSelect}
            onContinue={handleRegionContinue}
            onBack={handleBackToMoods}
          />
        </main>
      </>
    );
  }

  if (currentStep === 'hotels' && selectedRegion) {
    return (
      <>
        <Navigation />
        <main className="pt-16">
          <div className="container-xl py-8">
            <Breadcrumbs />
          </div>
          <HotelListings
            selectedMoods={selectedMoods}
            selectedRegion={selectedRegion}
            onBack={handleBackToRegions}
            onHotelSelect={handleHotelSelect}
          />
        </main>
      </>
    );
  }

  return null;
}