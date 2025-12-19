import { Driver, POINTS_SYSTEM } from '@/types/race';
import { formatTime, formatGap } from '@/utils/raceSimulation';

interface DriverCardProps {
  driver: Driver;
  position: number;
  leader: Driver;
  isRacing: boolean;
  showPoints?: boolean;
  lastLapPitStop?: boolean;
}

// 개별 드라이버 정보를 표시하는 카드 컴포넌트
export function DriverCard({ 
  driver, 
  position, 
  leader, 
  isRacing, 
  showPoints = false,
  lastLapPitStop = false
}: DriverCardProps) {
  const gap = position === 1 ? 0 : driver.totalTime - leader.totalTime;
  const points = POINTS_SYSTEM[position] || 0;
  
  // 포지션에 따른 배경 스타일
  const getPositionStyle = () => {
    if (position === 1) return 'gradient-gold text-accent-foreground';
    if (position === 2) return 'gradient-silver text-foreground';
    if (position === 3) return 'gradient-bronze text-foreground';
    return 'bg-muted text-foreground';
  };

  return (
    <div 
      className={`
        animate-slide-in flex items-center gap-4 p-4 rounded-lg bg-card border border-border
        transition-all duration-300 hover:border-primary/50
        ${isRacing ? 'opacity-100' : ''}
      `}
      style={{ animationDelay: `${position * 50}ms` }}
    >
      {/* 순위 표시 */}
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-xl
        ${getPositionStyle()}
      `}>
        P{position}
      </div>

      {/* 팀 컬러 바 */}
      <div 
        className="w-1.5 h-12 rounded-full"
        style={{ backgroundColor: driver.color }}
      />

      {/* 드라이버 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-lg truncate">
            {driver.name}
          </span>
          {lastLapPitStop && (
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-racing-pit/20 text-racing-pit animate-pulse-fast">
              🛠️ PIT
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{driver.team}</span>
      </div>

      {/* 시간 정보 */}
      <div className="text-right">
        <div className="font-display font-semibold text-racing-timing">
          {driver.totalTime > 0 ? formatTime(driver.totalTime) : '--:--.---'}
        </div>
        <div className="text-sm text-muted-foreground">
          {position === 1 ? 'LEADER' : formatGap(gap)}
        </div>
      </div>

      {/* 포인트 표시 */}
      {showPoints && (
        <div className="w-16 text-right">
          <div className="font-display font-bold text-xl text-accent">
            {points}
          </div>
          <div className="text-xs text-muted-foreground">PTS</div>
        </div>
      )}

      {/* 레이싱 중 애니메이션 */}
      {isRacing && (
        <div className="text-2xl animate-car-move">
          🏎️
        </div>
      )}
    </div>
  );
}
