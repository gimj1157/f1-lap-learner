// 드라이버 정보를 담는 타입
export interface Driver {
  id: number;
  name: string;
  team: string;
  color: string;
  totalTime: number;
  lapTimes: number[];
  pitStops: number[];
  currentPosition: number;
}

// 랩 결과 타입
export interface LapResult {
  driverId: number;
  lapTime: number;
  hasPitStop: boolean;
  totalTime: number;
}

// 날씨 타입
export type Weather = 'sunny' | 'rainy';

// 레이스 상태 타입
export type RaceStatus = 'idle' | 'racing' | 'finished';

// 포인트 시스템 (F1 규칙 간단 버전)
export const POINTS_SYSTEM: Record<number, number> = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
};

// 드라이버 초기 데이터
export const INITIAL_DRIVERS: Omit<Driver, 'totalTime' | 'lapTimes' | 'pitStops' | 'currentPosition'>[] = [
  { id: 1, name: 'Max Verstappen', team: 'Red Bull', color: '#1E41FF' },
  { id: 2, name: 'Lewis Hamilton', team: 'Mercedes', color: '#00D2BE' },
  { id: 3, name: 'Charles Leclerc', team: 'Ferrari', color: '#DC0000' },
  { id: 4, name: 'Lando Norris', team: 'McLaren', color: '#FF8700' },
  { id: 5, name: 'Fernando Alonso', team: 'Aston Martin', color: '#006F62' },
];

// 레이스 설정 상수
export const RACE_CONFIG = {
  TOTAL_LAPS: 10,
  BASE_LAP_TIME: 90, // 초
  LAP_TIME_VARIANCE: 5, // ±5초 변동
  RAIN_PENALTY_MIN: 3, // 비 올 때 최소 추가 시간
  RAIN_PENALTY_MAX: 6, // 비 올 때 최대 추가 시간
  PIT_STOP_CHANCE: 0.2, // 20% 확률
  PIT_STOP_TIME_MIN: 15, // 피트스탑 최소 시간
  PIT_STOP_TIME_MAX: 25, // 피트스탑 최대 시간
};
