interface LogEntry {
  lap: number;
  message: string;
  type: 'info' | 'pit' | 'weather' | 'finish';
}

interface RaceLogProps {
  logs: LogEntry[];
}

// 레이스 로그를 표시하는 컴포넌트
export function RaceLog({ logs }: RaceLogProps) {
  const getLogStyle = (type: LogEntry['type']) => {
    switch (type) {
      case 'pit':
        return 'border-l-racing-pit text-racing-pit';
      case 'weather':
        return 'border-l-racing-rain text-racing-rain';
      case 'finish':
        return 'border-l-racing-green text-racing-green';
      default:
        return 'border-l-muted-foreground text-muted-foreground';
    }
  };

  const getIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'pit':
        return '🛠️';
      case 'weather':
        return '🌧️';
      case 'finish':
        return '🏁';
      default:
        return '📢';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-64 overflow-hidden">
      <h3 className="font-display text-sm text-muted-foreground tracking-wider mb-3">
        RACE DIRECTOR
      </h3>
      
      <div className="h-48 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {logs.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Waiting for race to start...
          </p>
        ) : (
          [...logs].reverse().map((log, index) => (
            <div 
              key={index}
              className={`
                text-sm pl-3 py-1 border-l-2 animate-slide-in
                ${getLogStyle(log.type)}
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className="mr-2">{getIcon(log.type)}</span>
              <span className="text-muted-foreground">LAP {log.lap}:</span>
              <span className="ml-2">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export type { LogEntry };
