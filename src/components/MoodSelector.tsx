import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Sunrise, Camera, TreePine, Waves, Sparkles } from 'lucide-react';

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
}

const moods: Mood[] = [
  {
    id: 'jungle-mornings',
    name: 'Jungle Mornings',
    description: 'Wake to birdsong and misty canopies',
    image: jungleMornings,
    icon: TreePine,
    gradient: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'romantic-hideouts',
    name: 'Romantic Hideouts',
    description: 'Intimate moments under starlit skies',
    image: romanticHideouts,
    icon: Heart,
    gradient: 'from-rose-400 to-orange-400'
  },
  {
    id: 'instagram-worthy',
    name: 'Instagram Worthy',
    description: 'Picture-perfect moments that inspire',
    image: instagramWorthy,
    icon: Camera,
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'soulful-solitude',
    name: 'Soulful Solitude',
    description: 'Peace found in quiet contemplation',
    image: soulfulSolitude,
    icon: Sparkles,
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'coastal-serenity',
    name: 'Coastal Serenity',
    description: 'Ocean waves as your meditation soundtrack',
    image: instagramWorthy, // Reusing for now
    icon: Waves,
    gradient: 'from-blue-400 to-teal-500'
  },
  {
    id: 'sunrise-sessions',
    name: 'Sunrise Sessions',
    description: 'Golden hour rituals and morning magic',
    image: jungleMornings, // Reusing for now
    icon: Sunrise,
    gradient: 'from-amber-400 to-orange-500'
  }
];

interface MoodSelectorProps {
  selectedMoods: string[];
  onMoodToggle: (moodId: string) => void;
  onContinue: () => void;
}

export function MoodSelector({ selectedMoods, onMoodToggle, onContinue }: MoodSelectorProps) {
  const maxMoods = 3;
  const canAddMore = selectedMoods.length < maxMoods;

  return (
    <div className="min-h-screen bg-gradient-serene py-6 sm:py-8 lg:py-12">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6">
            How are you feeling?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Choose up to 3 moods that resonate with your soul. Let your emotions guide your journey through Sri Lanka's hidden gems.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {selectedMoods.length} of {maxMoods} selected
            </Badge>
            {selectedMoods.length === maxMoods && (
              <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                Ready to continue!
              </Badge>
            )}
          </div>
        </div>

        {/* Mood Grid */}
        <div className="grid-responsive mb-8 sm:mb-12">
          {moods.map((mood, index) => {
            const isSelected = selectedMoods.includes(mood.id);
            const isDisabled = !isSelected && !canAddMore;
            const Icon = mood.icon;

            return (
              <Card
                key={mood.id}
                className={`card-base card-interactive relative overflow-hidden transition-all duration-500 group animate-fade-in-up ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-glow scale-[1.02]'
                    : isDisabled
                    ? 'opacity-50 cursor-not-allowed hover:scale-100'
                    : 'hover:shadow-medium'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => !isDisabled && onMoodToggle(mood.id)}
              >
                {/* Background Image */}
                <div className="aspect-[4/3] sm:aspect-[3/2] relative overflow-hidden">
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300`} />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full card-glass flex items-center justify-center ${
                      isSelected ? 'animate-pulse-glow ring-2 ring-white/50' : 'animate-float'
                    }`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <Badge className="bg-primary text-primary-foreground animate-pulse-glow text-xs">
                        ✓ Selected
                      </Badge>
                    </div>
                  )}

                  {/* Selection Number */}
                  {isSelected && (
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {selectedMoods.indexOf(mood.id) + 1}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2">
                    {mood.name}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {mood.description}
                  </p>
                  
                  {/* Interactive hint */}
                  <div className="mt-3 sm:mt-4 text-xs text-muted-foreground/70">
                    {isSelected ? 'Tap to remove' : isDisabled ? 'Maximum reached' : 'Tap to select'}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedMoods.length > 0 && (
          <div className="text-center animate-fade-in-up sticky bottom-4 sm:bottom-6 z-10">
            <div className="card-glass p-4 sm:p-6 rounded-2xl max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                {selectedMoods.length === 1 
                  ? 'Great start! Add up to 2 more moods, or continue with your selection.'
                  : selectedMoods.length === 2
                  ? 'Perfect! Add one more mood or continue to find your ideal stays.'
                  : 'Perfect selection! Ready to discover your ideal stays.'}
              </p>
              <Button
                onClick={onContinue}
                variant="mood"
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-medium"
              >
                Continue Your Journey
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}