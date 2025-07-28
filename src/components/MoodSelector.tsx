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
                className={`group relative cursor-pointer animate-fade-in-up transition-all duration-500 ${
                  isDisabled ? 'cursor-not-allowed opacity-60' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => !isDisabled && onMoodToggle(mood.id)}
              >
                {/* Full Background Image Container */}
                <div className={`relative aspect-[3/4] sm:aspect-[4/3] rounded-3xl overflow-hidden transition-all duration-700 ${
                  isSelected 
                    ? 'ring-4 ring-primary/50 shadow-[0_0_40px_rgba(var(--primary)_/_0.4)] scale-[1.02]' 
                    : 'hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
                }`}>
                  
                  {/* Background Image */}
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      isSelected ? 'scale-110 brightness-110' : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />
                  
                  {/* Glass Morphism Overlay */}
                  <div className={`absolute inset-0 transition-all duration-700 ${
                    isSelected 
                      ? 'bg-gradient-to-t from-primary/40 via-primary/10 to-transparent backdrop-blur-[2px]'
                      : 'bg-gradient-to-t from-black/50 via-transparent to-black/20 group-hover:from-black/40'
                  }`} />
                  
                  {/* Floating Icon - Top Right */}
                  <div className={`absolute top-6 right-6 transition-all duration-500 ${
                    isSelected ? 'scale-110 rotate-12' : 'group-hover:scale-105 group-hover:-rotate-6'
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all duration-500 ${
                      isSelected 
                        ? 'bg-primary/20 shadow-[0_8px_32px_rgba(var(--primary)_/_0.3)]' 
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`}>
                      <Icon className={`w-8 h-8 transition-all duration-300 ${
                        isSelected ? 'text-primary' : 'text-white'
                      }`} />
                    </div>
                  </div>

                  {/* Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-6 left-6 animate-scale-in">
                      <div className="backdrop-blur-xl bg-primary/90 text-primary-foreground px-4 py-2 rounded-2xl text-sm font-medium border border-primary/30 shadow-lg">
                        Selected #{selectedMoods.indexOf(mood.id) + 1}
                      </div>
                    </div>
                  )}

                  {/* Floating Content Glass Card */}
                  <div className={`absolute bottom-6 left-6 right-6 transition-all duration-700 ${
                    isSelected ? 'transform translate-y-1' : 'group-hover:-translate-y-1'
                  }`}>
                    <div className={`backdrop-blur-xl rounded-2xl border border-white/20 p-6 transition-all duration-500 ${
                      isSelected 
                        ? 'bg-white/95 border-primary/30 shadow-[0_16px_32px_rgba(var(--primary)_/_0.2)]'
                        : 'bg-white/80 group-hover:bg-white/90'
                    }`}>
                      {/* Mood Name */}
                      <h3 className={`text-xl sm:text-2xl font-light mb-2 transition-colors duration-300 ${
                        isSelected ? 'text-primary' : 'text-foreground'
                      }`}>
                        {mood.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                        {mood.description}
                      </p>
                      
                      {/* Status Indicator */}
                      <div className="flex items-center justify-between">
                        <div className={`text-xs font-medium transition-all duration-300 ${
                          isSelected 
                            ? 'text-primary' 
                            : isDisabled 
                            ? 'text-muted-foreground/50' 
                            : 'text-muted-foreground group-hover:text-foreground'
                        }`}>
                          {isSelected ? '✓ Added to journey' : isDisabled ? 'Max selection reached' : 'Tap to select'}
                        </div>
                        
                        {/* Floating Action Indicator */}
                        {!isDisabled && !isSelected && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Ambient Glow Effect for Selected */}
                  {isSelected && (
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-[2rem] blur-xl animate-pulse-glow -z-10" />
                  )}
                </div>
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