import { useState, useCallback, useRef } from 'react';
import { Driver, Weather, RaceStatus, RACE_CONFIG } from '@/types/race';
import { 
  initializeDrivers, 
  determineWeather, 
  simulateLap, 
  sortDriversByTime 
} from '@/utils/raceSimulation';
import { WeatherDisplay } from './WeatherDisplay';
import { LapCounter } from './LapCounter';
import { RaceLog, LogEntry } from './RaceLog';
import { RaceControls } from './RaceControls';
import { Standings } from './Standings';

// 메인 레이스 시뮬레이터 컴포넌트
export function RaceSimulator() {
  // 상태 관리
  const [drivers, setDrivers] = useState<Driver[]>(initializeDrivers());
  const [weather, setWeather] = useState<Weather | null>(null);
  const [currentLap, setCurrentLap] = useState(0);
  const [status, setStatus] = useState<RaceStatus>('idle');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pitStopsThisLap, setPitStopsThisLap] = useState<number[]>([]);
  
  const raceInterval = useRef<NodeJS.Timeout | null>(null);

  // 로그 추가 함수
  const addLog = useCallback((lap: number, message: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev, { lap, message, type }]);
  }, []);

  // 레이스 시작 함수
  const startRace = useCallback(() => {
    // 초기화
    const newDrivers = initializeDrivers();
    const raceWeather = determineWeather();
    
    setDrivers(newDrivers);
    setWeather(raceWeather);
    setCurrentLap(0);
    setStatus('racing');
    setLogs([]);
    setPitStopsThisLap([]);

    // 날씨 로그
    addLog(0, raceWeather === 'sunny' 
      ? 'Clear skies - perfect racing conditions!' 
      : 'Rain detected - expect slower lap times!', 
      'weather'
    );

    let lap = 0;
    let currentDrivers = newDrivers;

    // 랩별 시뮬레이션 (1.5초 간격)
    raceInterval.current = setInterval(() => {
      lap++;
      
      // 랩 시뮬레이션
      const results = simulateLap(currentDrivers, lap, raceWeather);
      
      // 피트스탑 로그
      const pitsThisLap: number[] = [];
      results.forEach(result => {
        if (result.hasPitStop) {
          const driver = currentDrivers.find(d => d.id === result.driverId);
          if (driver) {
            addLog(lap, `${driver.name} makes a PIT STOP!`, 'pit');
            pitsThisLap.push(driver.id);
          }
        }
      });
      setPitStopsThisLap(pitsThisLap);

      // 순위 정렬 및 상태 업데이트
      const sortedDrivers = sortDriversByTime(currentDrivers);
      currentDrivers = sortedDrivers;
      
      setDrivers([...sortedDrivers]);
      setCurrentLap(lap);

      // 레이스 종료 체크
      if (lap >= RACE_CONFIG.TOTAL_LAPS) {
        if (raceInterval.current) {
          clearInterval(raceInterval.current);
        }
        setStatus('finished');
        addLog(lap, `${sortedDrivers[0].name} WINS THE RACE!`, 'finish');
        setPitStopsThisLap([]);
      }
    }, 1500);
  }, [addLog]);

  // 레이스 리셋 함수
  const resetRace = useCallback(() => {
    if (raceInterval.current) {
      clearInterval(raceInterval.current);
    }
    setDrivers(initializeDrivers());
    setWeather(null);
    setCurrentLap(0);
    setStatus('idle');
    setLogs([]);
    setPitStopsThisLap([]);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-carbon">
      {/* 헤더 */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                <span className="text-primary">F1</span> RACE SIMULATOR
              </h1>
              <WeatherDisplay weather={weather} />
            </div>
            <RaceControls 
              status={status} 
              onStart={startRace} 
              onReset={resetRace} 
            />
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 좌측: 랩 카운터 & 로그 */}
          <div className="lg:col-span-1 space-y-6">
            <LapCounter 
              currentLap={currentLap} 
              isFinished={status === 'finished'} 
            />
            <RaceLog logs={logs} />
            
            {/* 레이스 설정 정보 */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-sm text-muted-foreground tracking-wider mb-3">
                RACE INFO
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Laps</span>
                  <span className="font-display">{RACE_CONFIG.TOTAL_LAPS}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Lap Time</span>
                  <span className="font-display">{RACE_CONFIG.BASE_LAP_TIME}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pit Stop Chance</span>
                  <span className="font-display">{RACE_CONFIG.PIT_STOP_CHANCE * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drivers</span>
                  <span className="font-display">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 순위표 */}
          <div className="lg:col-span-2">
            <Standings 
              drivers={drivers}
              isRacing={status === 'racing'}
              showPoints={status === 'finished'}
              currentLap={currentLap}
              pitStopsThisLap={pitStopsThisLap}
            />
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-border mt-auto py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display tracking-wide">
            🏎️ Educational F1 Race Simulation • Learn: Loops, Random, Conditionals, Sorting, Data Structures
          </p>
        </div>
      </footer>
    </div>
  );
}
