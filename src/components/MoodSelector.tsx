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
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-4 sm:mb-6 tracking-tight">
            How are you feeling?
          </h1>
          <p className="font-sans text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 font-light">
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
                  
                  {/* Minimalist Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Glass Morphism Icon */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl card-glass-strong flex items-center justify-center transition-all duration-300 ${
                      isSelected ? 'animate-ring-pulse scale-110' : 'animate-gentle-bounce'
                    }`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
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

                {/* Content with improved typography */}
                <div className="p-5 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground mb-3 tracking-tight">
                    {mood.name}
                  </h3>
                  <p className="font-sans text-muted-foreground text-base sm:text-lg leading-relaxed font-light">
                    {mood.description}
                  </p>
                  
                  {/* Interactive hint with better typography */}
                  <div className="mt-4 sm:mt-5 text-xs sm:text-sm text-muted-foreground/70 font-sans uppercase tracking-wider">
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