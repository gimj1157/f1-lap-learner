import { RACE_CONFIG } from '@/types/race';

interface LapCounterProps {
  currentLap: number;
  isFinished: boolean;
}

// 랩 카운터 컴포넌트
export function LapCounter({ currentLap, isFinished }: LapCounterProps) {
  const progress = (currentLap / RACE_CONFIG.TOTAL_LAPS) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm text-muted-foreground tracking-wider">
          LAP
        </span>
        {isFinished && (
          <span className="text-2xl animate-flag-wave">🏁</span>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-display font-bold text-5xl text-foreground">
          {currentLap}
        </span>
        <span className="font-display text-2xl text-muted-foreground">
          / {RACE_CONFIG.TOTAL_LAPS}
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full gradient-racing transition-all duration-500 ease-out animate-race-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-sm text-muted-foreground font-display">
        {isFinished ? 'RACE COMPLETE' : `${RACE_CONFIG.TOTAL_LAPS - currentLap} LAPS REMAINING`}
      </div>
    </div>
  );
}
