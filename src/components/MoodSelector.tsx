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
              <div
                key={mood.id}
                className={`group relative cursor-pointer animate-fade-in-up ${
                  isDisabled ? 'cursor-not-allowed' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => !isDisabled && onMoodToggle(mood.id)}
              >
                {/* Base Image Layer */}
                <div className={`relative aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden transition-all duration-700 ${
                  isSelected 
                    ? 'scale-[0.98] shadow-[0_20px_50px_rgba(var(--primary)_/_0.4)]' 
                    : isDisabled
                    ? 'opacity-40 scale-100'
                    : 'shadow-elegant hover:shadow-immersive hover:scale-[1.01]'
                }`}>
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      isSelected ? 'scale-105 blur-[1px]' : 'group-hover:scale-110'
                    }`}
                    loading="lazy"
                  />
                  
                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-700 ${
                    isSelected 
                      ? 'opacity-90' 
                      : 'opacity-60 group-hover:opacity-40'
                  }`} />
                  
                  {/* Parallax Layer - Mood Icon */}
                  <div className={`absolute top-4 right-4 z-30 transition-all duration-700 ${
                    isSelected 
                      ? 'transform translate-x-1 -translate-y-1 scale-110' 
                      : 'group-hover:transform group-hover:-translate-x-1 group-hover:-translate-y-1'
                  }`}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 ${
                      isSelected 
                        ? 'bg-primary/80 shadow-[0_0_20px_rgba(var(--primary)_/_0.6)] animate-pulse-glow' 
                        : 'bg-white/10 group-hover:bg-white/20 group-hover:scale-110'
                    }`}>
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                        isSelected ? 'text-primary-foreground' : 'text-white'
                      }`} />
                    </div>
                  </div>

                  {/* Selected Badge - Top Layer */}
                  {isSelected && (
                    <div className="absolute top-4 left-4 z-30 animate-scale-in">
                      <div className="backdrop-blur-md bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-xl text-xs font-medium border border-primary/20 shadow-lg">
                        ✓ Selected #{selectedMoods.indexOf(mood.id) + 1}
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Content Card - Elevated Layer */}
                <div className={`relative -mt-8 mx-4 z-20 transition-all duration-700 ${
                  isSelected 
                    ? 'transform translate-y-2 scale-[1.02]' 
                    : 'group-hover:-translate-y-1'
                }`}>
                  <Card className={`backdrop-blur-lg border border-white/20 shadow-immersive transition-all duration-700 ${
                    isSelected 
                      ? 'bg-primary/5 border-primary/30 shadow-[0_20px_40px_rgba(var(--primary)_/_0.3)]'
                      : 'bg-white/80 group-hover:bg-white/90 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]'
                  }`}>
                    <div className="p-5 sm:p-6">
                      <h3 className={`text-lg sm:text-xl font-medium mb-2 transition-colors duration-300 ${
                        isSelected ? 'text-primary' : 'text-foreground'
                      }`}>
                        {mood.name}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
                        {mood.description}
                      </p>
                      
                      {/* Interactive Hint */}
                      <div className={`text-xs transition-all duration-300 ${
                        isSelected 
                          ? 'text-primary/70 font-medium' 
                          : isDisabled 
                          ? 'text-muted-foreground/50' 
                          : 'text-muted-foreground/70 group-hover:text-muted-foreground'
                      }`}>
                        {isSelected ? 'Tap to remove from selection' : isDisabled ? 'Maximum moods selected' : 'Tap to add to your journey'}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Selection Glow Effect */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 animate-pulse-glow pointer-events-none z-10" />
                )}
              </div>
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