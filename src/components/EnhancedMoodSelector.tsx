import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Mountain, Waves, Users, TreePine, Camera, Coffee } from 'lucide-react';

import romanticHideouts from '@/assets/romantic-hideouts.jpg';
import soulfulSolitude from '@/assets/soulful-solitude.jpg';
import instagramWorthy from '@/assets/instagram-worthy.jpg';
import jungleMornings from '@/assets/jungle-mornings.jpg';

interface Mood {
  id: string;
  name: string;
  shortDescription: string;
  fullStory: string;
  personalityType: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  colorPalette: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  tags: string[];
  intensityLevel: number;
}

const moods: Mood[] = [
  {
    id: 'romantic',
    name: 'Romance',
    shortDescription: 'Intimate moments, candlelit dreams',
    fullStory: 'You seek the poetry of togetherness - where sunset dinners become eternal memories and every corner whispers love stories. Perfect for couples ready to write their next chapter.',
    personalityType: 'The Romantic Dreamer',
    image: romanticHideouts,
    icon: Heart,
    colorPalette: {
      primary: 'from-rose-400 to-pink-600',
      secondary: 'from-pink-50 to-rose-100',
      gradient: 'bg-gradient-to-br from-rose-400/20 via-pink-500/10 to-red-400/20'
    },
    tags: ['Intimate', 'Luxurious', 'Private'],
    intensityLevel: 8
  },
  {
    id: 'peaceful',
    name: 'Peaceful',
    shortDescription: 'Tranquil escapes, mindful moments',
    fullStory: 'Your soul craves the gentle embrace of silence - where meditation meets nature and every breath restores your inner balance. For those seeking to reconnect with themselves.',
    personalityType: 'The Mindful Seeker',
    image: soulfulSolitude,
    icon: TreePine,
    colorPalette: {
      primary: 'from-emerald-400 to-teal-600',
      secondary: 'from-emerald-50 to-teal-100',
      gradient: 'bg-gradient-to-br from-emerald-400/20 via-teal-500/10 to-green-400/20'
    },
    tags: ['Serene', 'Wellness', 'Mindful'],
    intensityLevel: 3
  },
  {
    id: 'adventurous',
    name: 'Adventure',
    shortDescription: 'Wild hearts, boundless horizons',
    fullStory: 'Your spirit thirsts for the untamed - where every trail leads to discovery and adrenaline flows like morning coffee. For explorers who collect moments, not things.',
    personalityType: 'The Bold Explorer',
    image: jungleMornings,
    icon: Mountain,
    colorPalette: {
      primary: 'from-orange-400 to-red-600',
      secondary: 'from-orange-50 to-red-100',
      gradient: 'bg-gradient-to-br from-orange-400/20 via-red-500/10 to-amber-400/20'
    },
    tags: ['Exciting', 'Outdoor', 'Active'],
    intensityLevel: 9
  },
  {
    id: 'beach',
    name: 'Coastal',
    shortDescription: 'Ocean breeze, endless blue',
    fullStory: 'You hear the ocean\'s calling - where salt air becomes therapy and sunset reflections paint your dreams. Perfect for those who find peace in the rhythm of waves.',
    personalityType: 'The Ocean Soul',
    image: instagramWorthy,
    icon: Waves,
    colorPalette: {
      primary: 'from-blue-400 to-cyan-600',
      secondary: 'from-blue-50 to-cyan-100',
      gradient: 'bg-gradient-to-br from-blue-400/20 via-cyan-500/10 to-teal-400/20'
    },
    tags: ['Refreshing', 'Coastal', 'Relaxing'],
    intensityLevel: 5
  }
];

interface EnhancedMoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (moodId: string) => void;
}

export function EnhancedMoodSelector({ selectedMood, onMoodSelect }: EnhancedMoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-tropical bg-clip-text text-transparent">
          What speaks to your soul?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
          Choose your travel personality and let us craft experiences that resonate with your inner wanderer
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {moods.map((mood, index) => {
          const isSelected = selectedMood === mood.id;
          const isHovered = hoveredMood === mood.id;
          
          return (
            <Card
              key={mood.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-700 transform-gpu
                ${isSelected 
                  ? 'ring-2 ring-primary shadow-dreamy scale-[1.02]' 
                  : 'hover:scale-[1.01] hover:shadow-float'
                }
                ${isHovered ? 'shadow-glow' : ''}
              `}
              style={{
                animationDelay: `${index * 150}ms`
              }}
              onClick={() => onMoodSelect(mood.id)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              {/* Background Image with Parallax */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ 
                    backgroundImage: `url(${mood.image})`,
                    transform: isHovered 
                      ? `scale(1.1) translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
                      : 'scale(1)'
                  }}
                />
                
                {/* Mood-specific Gradient Overlay */}
                <div className={`absolute inset-0 ${mood.colorPalette.gradient} transition-opacity duration-500 ${
                  isHovered ? 'opacity-40' : 'opacity-60'
                }`} />
                
                {/* Floating Particles Effect */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + (i % 3) * 20}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm transition-all duration-300 ${
                        isHovered ? 'scale-110 bg-white/30' : ''
                      }`}>
                        <mood.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                      >
                        {mood.personalityType}
                      </Badge>
                    </div>
                    
                    {/* Intensity Indicator */}
                    <div className="flex space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-4 rounded-full transition-all duration-300 ${
                            i < mood.intensityLevel 
                              ? 'bg-white/80' 
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
                        {mood.name}
                      </h3>
                      <p className="font-dancing text-lg md:text-xl text-white/90 italic">
                        {mood.shortDescription}
                      </p>
                    </div>
                    
                    {/* Expanded Story on Hover */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isHovered 
                        ? 'max-h-40 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-white/80 text-sm leading-relaxed font-light">
                        {mood.fullStory}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {mood.tags.map((tag) => (
                          <Badge 
                            key={tag}
                            variant="outline" 
                            className="bg-white/10 text-white border-white/30 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-primary shadow-glow animate-pulse-glow">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
                
                {/* Glassmorphism Border Effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-primary/50 ring-inset opacity-100' 
                    : 'opacity-0'
                }`} />
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Selected Mood Summary */}
      {selectedMood && (
        <div className="animate-fade-in-up">
          <Card className="p-6 bg-gradient-card border-primary/20 shadow-float">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-dancing text-xl text-primary">Your Travel Soul</span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground">
                You've chosen <strong className="text-foreground font-playfair">
                  {moods.find(m => m.id === selectedMood)?.personalityType}
                </strong> - let's find destinations that match your energy
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}