import { Driver, Weather, RACE_CONFIG, INITIAL_DRIVERS, LapResult } from '@/types/race';

// 랜덤 숫자 생성 함수 (min 이상 max 이하)
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// 랜덤 정수 생성 함수
export function getRandomInt(min: number, max: number): number {
  return Math.floor(getRandomNumber(min, max + 1));
}

// 날씨 랜덤 결정 함수
export function determineWeather(): Weather {
  return Math.random() < 0.5 ? 'sunny' : 'rainy';
}

// 드라이버 초기화 함수
export function initializeDrivers(): Driver[] {
  return INITIAL_DRIVERS.map((driver, index) => ({
    ...driver,
    totalTime: 0,
    lapTimes: [],
    pitStops: [],
    currentPosition: index + 1,
  }));
}

// 단일 랩 타임 계산 함수
export function calculateLapTime(
  weather: Weather,
  hasPitStop: boolean
): number {
  const { BASE_LAP_TIME, LAP_TIME_VARIANCE, RAIN_PENALTY_MIN, RAIN_PENALTY_MAX, PIT_STOP_TIME_MIN, PIT_STOP_TIME_MAX } = RACE_CONFIG;
  
  // 기본 랩 타임 + 랜덤 변동
  let lapTime = BASE_LAP_TIME + getRandomNumber(-LAP_TIME_VARIANCE, LAP_TIME_VARIANCE);
  
  // 비 올 때 페널티 추가
  if (weather === 'rainy') {
    lapTime += getRandomNumber(RAIN_PENALTY_MIN, RAIN_PENALTY_MAX);
  }
  
  // 피트스탑 시 추가 시간
  if (hasPitStop) {
    lapTime += getRandomNumber(PIT_STOP_TIME_MIN, PIT_STOP_TIME_MAX);
  }
  
  return lapTime;
}

// 피트스탑 발생 여부 결정 함수
export function checkPitStop(): boolean {
  return Math.random() < RACE_CONFIG.PIT_STOP_CHANCE;
}

// 한 랩 시뮬레이션 함수
export function simulateLap(
  drivers: Driver[],
  lapNumber: number,
  weather: Weather
): LapResult[] {
  const results: LapResult[] = [];
  
  drivers.forEach(driver => {
    const hasPitStop = checkPitStop();
    const lapTime = calculateLapTime(weather, hasPitStop);
    
    // 드라이버 데이터 업데이트
    driver.lapTimes.push(lapTime);
    driver.totalTime += lapTime;
    
    if (hasPitStop) {
      driver.pitStops.push(lapNumber);
    }
    
    results.push({
      driverId: driver.id,
      lapTime,
      hasPitStop,
      totalTime: driver.totalTime,
    });
  });
  
  return results;
}

// 순위 정렬 함수 (누적 시간 기준 오름차순)
export function sortDriversByTime(drivers: Driver[]): Driver[] {
  const sorted = [...drivers].sort((a, b) => a.totalTime - b.totalTime);
  
  // 순위 업데이트
  sorted.forEach((driver, index) => {
    driver.currentPosition = index + 1;
  });
  
  return sorted;
}

// 시간 포맷팅 함수 (초 -> M:SS.mmm)
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toFixed(3).padStart(6, '0')}`;
}

// 시간 차이 포맷팅 함수
export function formatGap(gap: number): string {
  if (gap === 0) return '';
  return `+${gap.toFixed(3)}s`;
}
