import { Button } from '@/components/ui/button';
import { RaceStatus } from '@/types/race';

interface RaceControlsProps {
  status: RaceStatus;
  onStart: () => void;
  onReset: () => void;
}

// 레이스 컨트롤 버튼 컴포넌트
export function RaceControls({ status, onStart, onReset }: RaceControlsProps) {
  return (
    <div className="flex gap-4">
      {status === 'idle' && (
        <Button 
          onClick={onStart}
          size="lg"
          className="font-display text-lg px-8 py-6 gradient-racing hover:opacity-90 transition-opacity"
        >
          🏁 START RACE
        </Button>
      )}
      
      {status === 'racing' && (
        <Button 
          disabled
          size="lg"
          variant="secondary"
          className="font-display text-lg px-8 py-6"
        >
          <span className="animate-pulse">🏎️ RACING...</span>
        </Button>
      )}
      
      {status === 'finished' && (
        <Button 
          onClick={onReset}
          size="lg"
          variant="outline"
          className="font-display text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          🔄 NEW RACE
        </Button>
      )}
    </div>
  );
}
