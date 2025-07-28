import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface Mood {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
  gradient: string;
}

interface FloatingMoodCardProps {
  mood: Mood;
  isSelected: boolean;
  isDisabled: boolean;
  selectionOrder?: number;
  animationDelay: number;
  onClick: () => void;
  isRecommended?: boolean;
}

export function FloatingMoodCard({
  mood,
  isSelected,
  isDisabled,
  selectionOrder,
  animationDelay,
  onClick,
  isRecommended = false
}: FloatingMoodCardProps) {
  const Icon = mood.icon;

  return (
    <div
      className={`group relative cursor-pointer animate-fade-in-up masonry-item ${
        isDisabled ? 'cursor-not-allowed' : ''
      }`}
      style={{
        animationDelay: `${animationDelay}ms`
      }}
      onClick={() => !isDisabled && onClick()}
    >
      {/* Floating Glass Island Container */}
      <div className={`glass-island rounded-3xl overflow-hidden transition-all duration-700 ${
        isSelected 
          ? 'scale-[0.98] shadow-deep border-primary/40' 
          : isDisabled
          ? 'opacity-40 scale-100'
          : 'hover:shadow-immersive hover:scale-[1.02] hover:border-white/30'
      }`}>
        
        {/* Hero Image with Parallax */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={mood.image}
            alt={mood.name}
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isSelected ? 'scale-110 blur-[1px]' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />
          
          {/* Dynamic Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-700 ${
            isSelected 
              ? 'opacity-95' 
              : 'opacity-70 group-hover:opacity-50'
          }`} />
          
          {/* Shimmer Effect for Recommended Cards */}
          {isRecommended && !isSelected && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}

          {/* Floating Icon Badge */}
          <div className={`absolute top-4 right-4 z-30 transition-all duration-700 ${
            isSelected 
              ? 'transform translate-x-1 -translate-y-1 scale-110' 
              : 'group-hover:transform group-hover:-translate-x-1 group-hover:-translate-y-1'
          }`}>
            <div className={`floating-badge w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isSelected 
                ? 'shadow-glow animate-bounce-gentle scale-110' 
                : 'group-hover:scale-110 hover:shadow-glow'
            }`}>
              <Icon className={`w-7 h-7 transition-all duration-300 ${
                isSelected ? 'text-primary-foreground' : 'text-white'
              }`} />
            </div>
          </div>

          {/* Selection Badge */}
          {isSelected && selectionOrder && (
            <div className="absolute top-4 left-4 z-30 animate-scale-in">
              <Badge className="floating-badge text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium">
                ✓ Choice #{selectionOrder}
              </Badge>
            </div>
          )}

          {/* Recommended Badge */}
          {isRecommended && !isSelected && (
            <div className="absolute top-4 left-4 z-30">
              <Badge className="bg-accent/90 text-accent-foreground px-3 py-1.5 rounded-xl text-xs font-medium border border-accent/30 backdrop-blur-md">
                ✨ Recommended
              </Badge>
            </div>
          )}
        </div>

        {/* Floating Content Section */}
        <div className="p-6 relative">
          {/* Mood Name with Enhanced Typography */}
          <h3 className={`text-2xl font-medium mb-3 transition-colors duration-300 tracking-tight ${
            isSelected ? 'text-primary' : 'text-foreground'
          }`}>
            {mood.name}
          </h3>
          
          {/* Rich Description */}
          <p className="text-muted-foreground text-base leading-relaxed mb-4 line-clamp-3">
            {mood.description}
          </p>
          
          {/* Interactive Hint with Visual Feedback */}
          <div className={`text-sm transition-all duration-300 font-medium ${
            isSelected 
              ? 'text-primary/80' 
              : isDisabled 
              ? 'text-muted-foreground/50' 
              : 'text-muted-foreground/70 group-hover:text-primary/60'
          }`}>
            {isSelected 
              ? 'Tap to remove from selection' 
              : isDisabled 
              ? 'Maximum moods selected' 
              : 'Tap to add to your journey'
            }
          </div>

          {/* Selection Glow Ring */}
          {isSelected && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 to-primary-glow/5 animate-pulse-glow pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
}