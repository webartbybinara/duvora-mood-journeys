import { Heart, Sunrise, Camera, TreePine, Waves, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MoodFloat {
  id: string;
  name: string;
  icon: any;
  color: string;
}

const moodData: MoodFloat[] = [
  {
    id: 'jungle-mornings',
    name: 'Jungle Mornings',
    icon: TreePine,
    color: 'from-emerald-400/20 to-teal-600/20'
  },
  {
    id: 'romantic-hideouts',
    name: 'Romantic Hideouts',
    icon: Heart,
    color: 'from-rose-400/20 to-orange-400/20'
  },
  {
    id: 'instagram-worthy',
    name: 'Instagram Worthy',
    icon: Camera,
    color: 'from-cyan-400/20 to-blue-500/20'
  },
  {
    id: 'soulful-solitude',
    name: 'Soulful Solitude',
    icon: Sparkles,
    color: 'from-purple-400/20 to-indigo-500/20'
  },
  {
    id: 'coastal-serenity',
    name: 'Coastal Serenity',
    icon: Waves,
    color: 'from-blue-400/20 to-teal-500/20'
  },
  {
    id: 'sunrise-sessions',
    name: 'Sunrise Sessions',
    icon: Sunrise,
    color: 'from-amber-400/20 to-orange-500/20'
  }
];

interface MoodFloatsProps {
  selectedMoods: string[];
  className?: string;
  showCount?: boolean;
}

export function MoodFloats({ selectedMoods, className = "", showCount = false }: MoodFloatsProps) {
  if (selectedMoods.length === 0) return null;

  const selectedMoodData = moodData.filter(mood => selectedMoods.includes(mood.id));

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {showCount && (
        <span className="text-sm text-muted-foreground font-light">
          Your journey mood{selectedMoods.length > 1 ? 's' : ''}:
        </span>
      )}
      {selectedMoodData.map((mood, index) => {
        const Icon = mood.icon;
        return (
          <Badge
            key={mood.id}
            variant="secondary"
            className={`
              bg-gradient-to-r ${mood.color} backdrop-blur-sm border border-primary/20 
              text-foreground font-light px-4 py-2 rounded-full shadow-float
              animate-fade-in-up hover:scale-105 transition-all duration-300
            `}
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            <Icon className="w-4 h-4 mr-2" />
            {mood.name}
          </Badge>
        );
      })}
    </div>
  );
}

interface MoodContextProps {
  selectedMoods: string[];
  currentStep: 'mood' | 'region' | 'hotels';
}

export function MoodContext({ selectedMoods, currentStep }: MoodContextProps) {
  if (selectedMoods.length === 0 || currentStep === 'mood') return null;

  const getMoodPoetry = (moods: string[]) => {
    if (moods.length === 1) {
      const mood = moods[0].replace('-', ' ');
      return `A journey crafted for ${mood}`;
    } else if (moods.length === 2) {
      const [first, second] = moods.map(m => m.replace('-', ' '));
      return `Where ${first} meets ${second}`;
    } else {
      return `A symphony of moods awaits your soul`;
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-in-left">
      <div className="bg-card/90 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 shadow-mood">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-light italic">
            {getMoodPoetry(selectedMoods)}
          </span>
          <div className="h-4 w-px bg-border" />
          <MoodFloats selectedMoods={selectedMoods} />
        </div>
      </div>
    </div>
  );
}