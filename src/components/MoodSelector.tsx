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
    <div className="min-h-screen bg-gradient-misty relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-dreamy opacity-50" />
      
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Cinematic Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-extralight text-foreground mb-6 leading-tight">
                How does your
                <br />
                <span className="bg-gradient-tropical bg-clip-text text-transparent animate-breathe">
                  soul feel today?
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                In the misty mountains and golden coastlines of Sri Lanka, 
                every emotion finds its perfect sanctuary. Choose the moods 
                that call to your spirit, and let us craft a journey that 
                resonates with your inner landscape.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <Badge variant="secondary" className="px-4 py-2 text-sm font-light bg-card/70 backdrop-blur-sm border-primary/20">
                {selectedMoods.length} of {maxMoods} emotions selected
              </Badge>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {moods.map((mood, index) => {
            const isSelected = selectedMoods.includes(mood.id);
            const isDisabled = !isSelected && !canAddMore;
            const Icon = mood.icon;

            return (
              <Card
                key={mood.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 group ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-glow'
                    : isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-dreamy'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => !isDisabled && onMoodToggle(mood.id)}
              >
                {/* Background Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${mood.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ${
                      isSelected ? 'animate-pulse-glow' : 'animate-float'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground animate-pulse-glow">
                        Selected
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    {mood.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {mood.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

          {/* Journey Continuation */}
          {selectedMoods.length > 0 && (
            <div className="text-center animate-slide-in-right">
              <div className="mb-6">
                <p className="text-lg text-muted-foreground font-light italic mb-4">
                  Your emotional compass is set...
                </p>
              </div>
              <Button
                onClick={onContinue}
                variant="mood"
                size="lg"
                className="px-16 py-6 text-lg font-light rounded-full shadow-mood hover:shadow-glow hover:scale-105 transition-all duration-500"
              >
                Begin Your Journey
                <Sparkles className="w-5 h-5 ml-3 animate-gentle-bounce" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}