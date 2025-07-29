import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Camera, TreePine, Waves } from 'lucide-react';

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
}

const moods: Mood[] = [
  {
    id: 'romantic-hideouts',
    name: 'Romance',
    description: 'Intimate moments and cozy hideaways',
    image: romanticHideouts,
    icon: Heart,
  },
  {
    id: 'instagram-worthy',
    name: 'Adventure',
    description: 'Picture-perfect moments and exciting experiences',
    image: instagramWorthy,
    icon: Camera,
  },
  {
    id: 'soulful-solitude',
    name: 'Peaceful',
    description: 'Quiet contemplation and mindful relaxation',
    image: soulfulSolitude,
    icon: TreePine,
  },
  {
    id: 'coastal-serenity',
    name: 'Beach',
    description: 'Ocean waves and coastal serenity',
    image: jungleMornings, // Using available image
    icon: Waves,
  }
];

interface SimplifiedMoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (moodId: string) => void;
}

export function SimplifiedMoodSelector({ selectedMood, onMoodSelect }: SimplifiedMoodSelectorProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-light text-foreground mb-6 text-center">
        What's your travel mood?
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id;
          const Icon = mood.icon;

          return (
            <Card
              key={mood.id}
              className={`cursor-pointer transition-all duration-300 overflow-hidden group ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-lg scale-[1.02]' 
                  : 'hover:shadow-md hover:scale-[1.01]'
              }`}
              onClick={() => onMoodSelect(mood.id)}
            >
              <div className="relative aspect-square">
                <img
                  src={mood.image}
                  alt={mood.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-primary' : ''}`} />
                  <h3 className="font-medium text-center">{mood.name}</h3>
                  <p className="text-xs text-white/80 text-center mt-1 hidden sm:block">
                    {mood.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}