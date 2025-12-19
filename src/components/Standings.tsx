import { Driver } from '@/types/race';
import { DriverCard } from './DriverCard';

interface StandingsProps {
  drivers: Driver[];
  isRacing: boolean;
  showPoints?: boolean;
  currentLap: number;
  pitStopsThisLap?: number[];
}

// 순위표 컴포넌트
export function Standings({ 
  drivers, 
  isRacing, 
  showPoints = false,
  currentLap,
  pitStopsThisLap = []
}: StandingsProps) {
  const leader = drivers[0];

  return (
    <div className="space-y-3">
      <h2 className="font-display text-sm text-muted-foreground tracking-wider mb-4">
        {showPoints ? '🏆 FINAL STANDINGS' : '📊 LIVE TIMING'}
      </h2>
      
      <div className="space-y-2">
        {drivers.map((driver, index) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            position={index + 1}
            leader={leader}
            isRacing={isRacing}
            showPoints={showPoints}
            lastLapPitStop={pitStopsThisLap.includes(driver.id)}
          />
        ))}
      </div>
    </div>
  );
}
