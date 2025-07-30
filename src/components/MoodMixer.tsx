import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Shuffle, 
  Heart, 
  Mountain, 
  Waves, 
  TreePine,
  Sparkles,
  RotateCcw,
  Zap
} from 'lucide-react';

interface MoodIntensity {
  romantic: number;
  adventurous: number;
  peaceful: number;
  coastal: number;
}

interface MoodMixerProps {
  onMoodMix: (mixedMood: string, intensities: MoodIntensity) => void;
}

export function MoodMixer({ onMoodMix }: MoodMixerProps) {
  const [intensities, setIntensities] = useState<MoodIntensity>({
    romantic: 25,
    adventurous: 25,
    peaceful: 25,
    coastal: 25
  });

  const [isShuffling, setIsShuffling] = useState(false);

  const moods = [
    { key: 'romantic' as keyof MoodIntensity, label: 'Romance', icon: Heart, color: 'from-rose-400 to-pink-600' },
    { key: 'adventurous' as keyof MoodIntensity, label: 'Adventure', icon: Mountain, color: 'from-orange-400 to-red-600' },
    { key: 'peaceful' as keyof MoodIntensity, label: 'Peace', icon: TreePine, color: 'from-emerald-400 to-teal-600' },
    { key: 'coastal' as keyof MoodIntensity, label: 'Coastal', icon: Waves, color: 'from-blue-400 to-cyan-600' }
  ];

  const handleIntensityChange = (moodKey: keyof MoodIntensity, value: number[]) => {
    setIntensities(prev => ({
      ...prev,
      [moodKey]: value[0]
    }));
  };

  const shuffleMoods = () => {
    setIsShuffling(true);
    
    // Generate random intensities that add up to 100
    const random1 = Math.random() * 100;
    const random2 = Math.random() * (100 - random1);
    const random3 = Math.random() * (100 - random1 - random2);
    const random4 = 100 - random1 - random2 - random3;
    
    const shuffledIntensities = [random1, random2, random3, random4]
      .sort(() => Math.random() - 0.5)
      .map(val => Math.round(val));
    
    setIntensities({
      romantic: shuffledIntensities[0],
      adventurous: shuffledIntensities[1],
      peaceful: shuffledIntensities[2],
      coastal: shuffledIntensities[3]
    });

    setTimeout(() => setIsShuffling(false), 1000);
  };

  const resetMoods = () => {
    setIntensities({
      romantic: 25,
      adventurous: 25,
      peaceful: 25,
      coastal: 25
    });
  };

  const getDominantMood = (): string => {
    const maxIntensity = Math.max(...Object.values(intensities));
    const dominantMood = Object.entries(intensities).find(([_, value]) => value === maxIntensity);
    return dominantMood ? dominantMood[0] : 'peaceful';
  };

  const getMoodMixDescription = (): string => {
    const total = Object.values(intensities).reduce((sum, val) => sum + val, 0);
    const normalized = Object.entries(intensities).map(([key, value]) => ({
      mood: key,
      percentage: Math.round((value / total) * 100)
    })).sort((a, b) => b.percentage - a.percentage);

    const top2 = normalized.slice(0, 2);
    
    if (top2[0].percentage > 60) {
      return `Pure ${top2[0].mood} with subtle ${top2[1].mood} undertones`;
    } else if (top2[0].percentage > 40) {
      return `${top2[0].mood}-focused with ${top2[1].mood} elements`;
    } else {
      return `Balanced blend of ${top2[0].mood} and ${top2[1].mood}`;
    }
  };

  const applyMoodMix = () => {
    const dominantMood = getDominantMood();
    onMoodMix(dominantMood, intensities);
  };

  return (
    <Card className="bg-gradient-card border-primary/20 shadow-float">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Palette className="w-6 h-6 text-primary" />
          <span className="font-playfair">Mood Mixer</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Blend different travel moods to create your perfect experience
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mood Sliders */}
        <div className="space-y-4">
          {moods.map(mood => (
            <div key={mood.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <mood.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{mood.label}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {intensities[mood.key]}%
                </Badge>
              </div>
              
              <div className="relative">
                <Slider
                  value={[intensities[mood.key]]}
                  onValueChange={(value) => handleIntensityChange(mood.key, value)}
                  max={100}
                  step={1}
                  className={`transition-all duration-300 ${
                    isShuffling ? 'animate-pulse' : ''
                  }`}
                />
                
                {/* Gradient background for slider */}
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${mood.color} opacity-20 rounded-full transition-all duration-300`}
                  style={{ width: `${intensities[mood.key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mood Mix Visualization */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Your Mood Blend</h4>
          
          {/* Color Bar */}
          <div className="h-4 rounded-full overflow-hidden flex">
            {moods.map(mood => (
              <div
                key={mood.key}
                className={`bg-gradient-to-r ${mood.color} transition-all duration-500`}
                style={{ width: `${intensities[mood.key]}%` }}
              />
            ))}
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground italic">
            {getMoodMixDescription()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleMoods}
            disabled={isShuffling}
            className="flex items-center space-x-1"
          >
            <Shuffle className={`w-3 h-3 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>Shuffle</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetMoods}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </Button>
          
          <Button
            size="sm"
            onClick={applyMoodMix}
            className="flex items-center space-x-1 bg-gradient-tropical"
          >
            <Zap className="w-3 h-3" />
            <span>Apply</span>
          </Button>
        </div>

        {/* Intensity Indicators */}
        <div className="grid grid-cols-4 gap-2">
          {moods.map(mood => (
            <div key={mood.key} className="text-center">
              <div className={`w-8 h-8 mx-auto rounded-full bg-gradient-to-r ${mood.color} flex items-center justify-center transition-all duration-300`}>
                <mood.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {intensities[mood.key]}%
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-primary">
              <span className="font-medium">Perfect for:</span> Travelers who want a 
              <strong className="ml-1">{getDominantMood()}</strong> experience with custom intensity
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}