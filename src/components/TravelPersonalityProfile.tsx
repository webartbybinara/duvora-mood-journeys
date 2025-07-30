import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  TrendingUp, 
  Target, 
  Award, 
  Star, 
  Heart,
  Compass,
  Map,
  Brain,
  Sparkles,
  RotateCcw,
  Share2,
  Download
} from 'lucide-react';

interface PersonalityTrait {
  name: string;
  value: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface TravelPersonalityProfileProps {
  selectedMood: string | null;
  selectedRegion: string | null;
  viewedHotels: string[];
  onStartOver: () => void;
}

export function TravelPersonalityProfile({ 
  selectedMood, 
  selectedRegion, 
  viewedHotels,
  onStartOver 
}: TravelPersonalityProfileProps) {
  const [profileGenerated, setProfileGenerated] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    if (selectedMood && selectedRegion) {
      setTimeout(() => {
        setProfileGenerated(true);
        setAnimateProgress(true);
      }, 500);
    } else {
      setProfileGenerated(false);
      setAnimateProgress(false);
    }
  }, [selectedMood, selectedRegion]);

  const generatePersonalityTraits = (): PersonalityTrait[] => {
    const baseTraits = {
      adventure: { name: 'Adventure Seeker', icon: Compass, color: 'text-orange-600' },
      romance: { name: 'Romantic Soul', icon: Heart, color: 'text-pink-600' },
      tranquility: { name: 'Peace Lover', icon: Star, color: 'text-green-600' },
      discovery: { name: 'Culture Explorer', icon: Map, color: 'text-blue-600' },
      luxury: { name: 'Luxury Enthusiast', icon: Award, color: 'text-purple-600' }
    };

    const traits: PersonalityTrait[] = [];

    // Calculate scores based on selections
    if (selectedMood === 'adventurous') {
      traits.push({
        ...baseTraits.adventure,
        value: 85 + Math.random() * 15,
        description: 'You thrive on exciting experiences and outdoor adventures'
      });
      traits.push({
        ...baseTraits.discovery,
        value: 70 + Math.random() * 20,
        description: 'You enjoy exploring new cultures and hidden gems'
      });
    } else if (selectedMood === 'romantic') {
      traits.push({
        ...baseTraits.romance,
        value: 90 + Math.random() * 10,
        description: 'You value intimate moments and beautiful settings'
      });
      traits.push({
        ...baseTraits.luxury,
        value: 75 + Math.random() * 20,
        description: 'You appreciate refined experiences and premium comfort'
      });
    } else if (selectedMood === 'peaceful') {
      traits.push({
        ...baseTraits.tranquility,
        value: 95 + Math.random() * 5,
        description: 'You seek calm, restorative environments'
      });
      traits.push({
        ...baseTraits.discovery,
        value: 60 + Math.random() * 25,
        description: 'You enjoy mindful exploration at your own pace'
      });
    } else if (selectedMood === 'beach') {
      traits.push({
        ...baseTraits.tranquility,
        value: 80 + Math.random() * 15,
        description: 'You find peace in coastal environments'
      });
      traits.push({
        ...baseTraits.romance,
        value: 65 + Math.random() * 25,
        description: 'You enjoy romantic sunset moments'
      });
    }

    // Add discovery trait based on hotel views
    if (viewedHotels.length > 0) {
      const existingDiscovery = traits.find(t => t.name === 'Culture Explorer');
      if (!existingDiscovery) {
        traits.push({
          ...baseTraits.discovery,
          value: Math.min(50 + viewedHotels.length * 10, 90),
          description: 'Your curiosity drives you to explore multiple options'
        });
      }
    }

    return traits.slice(0, 4); // Return top 4 traits
  };

  const getPersonalityType = (): { type: string; description: string; emoji: string } => {
    if (!selectedMood) return { type: '', description: '', emoji: '' };

    const types = {
      adventurous: {
        type: 'The Thrill Seeker',
        description: 'You live for adrenaline and unforgettable adventures',
        emoji: '🏔️'
      },
      romantic: {
        type: 'The Love Voyager',
        description: 'You travel to create beautiful memories with your loved one',
        emoji: '💕'
      },
      peaceful: {
        type: 'The Zen Explorer',
        description: 'You seek destinations that restore your inner balance',
        emoji: '🧘'
      },
      beach: {
        type: 'The Coastal Dreamer',
        description: 'You find your bliss where ocean meets sky',
        emoji: '🌊'
      }
    };

    return types[selectedMood as keyof typeof types] || { type: '', description: '', emoji: '' };
  };

  const getProgressSteps = () => {
    const steps = [
      { label: 'Mood Selected', completed: !!selectedMood, icon: Heart },
      { label: 'Region Chosen', completed: !!selectedRegion, icon: Map },
      { label: 'Hotels Explored', completed: viewedHotels.length > 0, icon: Star },
      { label: 'Profile Generated', completed: profileGenerated, icon: User }
    ];
    return steps;
  };

  const completedSteps = getProgressSteps().filter(step => step.completed).length;
  const progressPercentage = (completedSteps / 4) * 100;
  const personalityTraits = generatePersonalityTraits();
  const personalityType = getPersonalityType();

  if (!selectedMood && !selectedRegion) {
    return null;
  }

  return (
    <Card className="bg-gradient-card border-primary/20 shadow-float">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-primary" />
          <span className="font-playfair">Your Travel Personality</span>
          <Sparkles className="w-5 h-5 text-accent" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Discovery Progress</span>
            <span className="text-sm text-muted-foreground">{completedSteps}/4 steps</span>
          </div>
          
          <Progress 
            value={animateProgress ? progressPercentage : 0} 
            className="h-2"
          />
          
          <div className="grid grid-cols-4 gap-2">
            {getProgressSteps().map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  step.completed 
                    ? 'bg-primary text-primary-foreground shadow-glow' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-3 h-3" />
                </div>
                <span className="text-xs text-center text-muted-foreground">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Type */}
        {profileGenerated && personalityType.type && (
          <div className="text-center p-4 bg-gradient-serene rounded-lg space-y-2">
            <div className="text-3xl">{personalityType.emoji}</div>
            <h3 className="font-playfair text-xl font-bold text-foreground">
              {personalityType.type}
            </h3>
            <p className="text-sm text-muted-foreground">
              {personalityType.description}
            </p>
          </div>
        )}

        {/* Personality Traits */}
        {profileGenerated && personalityTraits.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Your Travel DNA</h4>
            <div className="grid gap-3">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <trait.icon className={`w-4 h-4 ${trait.color}`} />
                      <span className="text-sm font-medium">{trait.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {Math.round(trait.value)}%
                    </span>
                  </div>
                  <Progress 
                    value={animateProgress ? trait.value : 0} 
                    className="h-1.5"
                  />
                  <p className="text-xs text-muted-foreground">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-lg text-primary">{viewedHotels.length}</div>
            <div className="text-xs text-muted-foreground">Hotels Viewed</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-primary">
              {selectedMood && selectedRegion ? '95%' : '0%'}
            </div>
            <div className="text-xs text-muted-foreground">Match Score</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-primary">
              {profileGenerated ? '1' : '0'}
            </div>
            <div className="text-xs text-muted-foreground">Profile Created</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onStartOver}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          
          {profileGenerated && (
            <>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>

        {/* Recommendations Badge */}
        {profileGenerated && (
          <div className="text-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Target className="w-3 h-3 mr-1" />
              Personalized recommendations ready
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}