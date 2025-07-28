import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FloatingMoodCard } from '@/components/FloatingMoodCard';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { Heart, Sunrise, Camera, TreePine, Waves, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

import jungleMornings from '@/assets/jungle-mornings.jpg';
import romanticHideouts from '@/assets/romantic-hideouts.jpg';
import instagramWorthy from '@/assets/instagram-worthy.jpg';
import soulfulSolitude from '@/assets/soulful-solitude.jpg';

interface Mood {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: any;
  gradient: string;
  isRecommended?: boolean;
}

const moods: Mood[] = [
  {
    id: 'jungle-mornings',
    name: 'Jungle Mornings',
    description: 'Wake to birdsong and misty canopies in pristine rainforest sanctuaries',
    image: jungleMornings,
    icon: TreePine,
    gradient: 'from-emerald-400 to-teal-600',
    isRecommended: true
  },
  {
    id: 'romantic-hideouts',
    name: 'Romantic Hideouts',
    description: 'Intimate moments under starlit skies with your special someone',
    image: romanticHideouts,
    icon: Heart,
    gradient: 'from-rose-400 to-orange-400',
    isRecommended: true
  },
  {
    id: 'instagram-worthy',
    name: 'Instagram Worthy',
    description: 'Picture-perfect moments that inspire wanderlust and storytelling',
    image: instagramWorthy,
    icon: Camera,
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'soulful-solitude',
    name: 'Soulful Solitude',
    description: 'Find peace and clarity in quiet contemplation and mindful retreats',
    image: soulfulSolitude,
    icon: Sparkles,
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'coastal-serenity',
    name: 'Coastal Serenity',
    description: 'Ocean waves as your meditation soundtrack along pristine shorelines',
    image: instagramWorthy,
    icon: Waves,
    gradient: 'from-blue-400 to-teal-500',
    isRecommended: true
  },
  {
    id: 'sunrise-sessions',
    name: 'Sunrise Sessions',
    description: 'Golden hour rituals and morning magic that awakens the soul',
    image: jungleMornings,
    icon: Sunrise,
    gradient: 'from-amber-400 to-orange-500'
  }
];

interface EnhancedMoodSelectorProps {
  selectedMoods: string[];
  onMoodToggle: (moodId: string) => void;
  onContinue: () => void;
}

export function EnhancedMoodSelector({ selectedMoods, onMoodToggle, onContinue }: EnhancedMoodSelectorProps) {
  const maxMoods = 3;
  const canAddMore = selectedMoods.length < maxMoods;

  // Separate moods into recommended and others
  const { recommendedMoods, otherMoods } = useMemo(() => {
    const recommended = moods.filter(mood => mood.isRecommended);
    const others = moods.filter(mood => !mood.isRecommended);
    return { recommendedMoods: recommended, otherMoods: others };
  }, []);

  const handleReset = () => {
    selectedMoods.forEach(moodId => onMoodToggle(moodId));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background with Particles */}
      <div className="absolute inset-0 bg-gradient-serene" />
      <ParticleBackground />
      
      <div className="relative z-10 py-8 lg:py-12">
        <div className="container-xl">
          {/* Sticky Progress Indicator */}
          <div className="sticky top-4 z-20 mb-8">
            <div className="flex justify-center">
              <Card className="glass-card px-6 py-3">
                <ProgressIndicator currentStep="mood" />
              </Card>
            </div>
          </div>

          {/* Enhanced Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-tight">
              How are you feeling?
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Choose up to 3 moods that resonate with your soul. Let your emotions guide your journey through Sri Lanka's hidden gems.
            </p>
            
            {/* Interactive Selection Status */}
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <Badge variant="secondary" className="text-base px-4 py-2 backdrop-blur-md">
                {selectedMoods.length} of {maxMoods} selected
              </Badge>
              {selectedMoods.length === maxMoods && (
                <Badge className="floating-badge text-primary-foreground text-base px-4 py-2 animate-bounce-gentle">
                  Perfect selection! ✨
                </Badge>
              )}
              {selectedMoods.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="backdrop-blur-md border-border/50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Enhanced Mood Grid with Masonry Layout */}
          <div className="space-y-12">
            {/* Recommended Section */}
            {recommendedMoods.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-3">
                    ✨ Perfect for Your Journey
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    These moods create the most magical Sri Lankan experiences
                  </p>
                </div>
                
                <div className="masonry-grid">
                  {recommendedMoods.map((mood, index) => {
                    const isSelected = selectedMoods.includes(mood.id);
                    const isDisabled = !isSelected && !canAddMore;
                    const selectionOrder = isSelected ? selectedMoods.indexOf(mood.id) + 1 : undefined;

                    return (
                      <FloatingMoodCard
                        key={mood.id}
                        mood={mood}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        selectionOrder={selectionOrder}
                        animationDelay={index * 150}
                        onClick={() => onMoodToggle(mood.id)}
                        isRecommended={true}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* Other Moods Section */}
            {otherMoods.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-3">
                    🌟 More Beautiful Experiences
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Additional moods to complete your perfect journey
                  </p>
                </div>
                
                <div className="masonry-grid">
                  {otherMoods.map((mood, index) => {
                    const isSelected = selectedMoods.includes(mood.id);
                    const isDisabled = !isSelected && !canAddMore;
                    const selectionOrder = isSelected ? selectedMoods.indexOf(mood.id) + 1 : undefined;

                    return (
                      <FloatingMoodCard
                        key={mood.id}
                        mood={mood}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        selectionOrder={selectionOrder}
                        animationDelay={(recommendedMoods.length + index) * 150}
                        onClick={() => onMoodToggle(mood.id)}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Enhanced Continue Section */}
          {selectedMoods.length > 0 && (
            <div className="text-center mt-16 animate-fade-in-up sticky bottom-6 z-20" style={{ animationDelay: '600ms' }}>
              <Card className="glass-island p-6 max-w-lg mx-auto">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {selectedMoods.length === 1 
                      ? 'Beautiful choice! Add up to 2 more moods to create your perfect journey, or continue with your current selection.'
                      : selectedMoods.length === 2
                      ? 'Excellent! Add one more mood to complete your experience, or continue to find your ideal stays.'
                      : 'Perfect harmony achieved! Your mood selection will guide us to the most suitable accommodations for your journey.'}
                  </p>
                  
                  <Button
                    onClick={onContinue}
                    variant="mood"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-medium shadow-elegant hover:shadow-immersive transition-all duration-300"
                  >
                    Continue Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
