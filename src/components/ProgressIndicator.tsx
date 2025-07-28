interface ProgressIndicatorProps {
  currentStep: 'mood' | 'region' | 'hotels';
  className?: string;
}

export function ProgressIndicator({ currentStep, className = '' }: ProgressIndicatorProps) {
  const steps = [
    { id: 'mood', label: 'Moods', completed: true },
    { id: 'region', label: 'Region', completed: currentStep === 'region' || currentStep === 'hotels' },
    { id: 'hotels', label: 'Hotels', completed: currentStep === 'hotels' }
  ];

  return (
    <div className={`progress-dots ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`progress-dot ${
              step.id === currentStep
                ? 'active'
                : step.completed
                ? 'completed'
                : 'inactive'
            }`}
          />
          {index < steps.length - 1 && (
            <div className="w-8 h-px bg-border/50 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}