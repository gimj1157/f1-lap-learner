import { Weather } from '@/types/race';

interface WeatherDisplayProps {
  weather: Weather | null;
}

// 현재 날씨를 표시하는 컴포넌트
export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  if (!weather) return null;

  return (
    <div className={`
      flex items-center gap-3 px-5 py-3 rounded-lg font-display text-lg
      ${weather === 'sunny' 
        ? 'bg-accent/20 text-accent' 
        : 'bg-racing-rain/20 text-racing-rain'
      }
    `}>
      <span className="text-2xl">
        {weather === 'sunny' ? '☀️' : '🌧️'}
      </span>
      <span className="font-semibold tracking-wide">
        {weather === 'sunny' ? 'DRY CONDITIONS' : 'WET CONDITIONS'}
      </span>
      {weather === 'rainy' && (
        <span className="text-sm opacity-80 ml-2">
          (+3~6s per lap)
        </span>
      )}
    </div>
  );
}
