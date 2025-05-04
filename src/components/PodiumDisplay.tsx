
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

interface Competitor {
  id: string;
  name: string;
  average: number;
  solves: (number | string)[];
}

interface PodiumDisplayProps {
  topThree: Competitor[];
}

const PodiumDisplay = ({ topThree }: PodiumDisplayProps) => {
  const { t } = useLanguage();

  const formatTime = (time: number | string) => {
    if (typeof time === 'string') return time;
    return time.toFixed(2);
  };

  // Make sure we have exactly 3 positions, fill with empty if needed
  const podiumPositions = [...topThree];
  while (podiumPositions.length < 3) {
    podiumPositions.push({
      id: `empty-${podiumPositions.length}`,
      name: '',
      average: 0,
      solves: []
    });
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-center mb-6">{t('podium')}</h2>
      
      <div className="flex justify-center items-end h-[300px] mx-auto max-w-md">
        {/* 2nd Place */}
        <div className="podium-position bg-gradient-to-t from-gray-400 to-gray-300 h-[220px] w-1/3">
          {podiumPositions[1]?.name ? (
            <>
              <div className="podium-block bg-gray-500">2</div>
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <div className="bg-white text-gray-800 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">🥈</span>
                </div>
                <p className="text-center font-semibold text-gray-800">{podiumPositions[1].name}</p>
                <p className="timer-text text-gray-800">{formatTime(podiumPositions[1].average)}</p>
              </div>
            </>
          ) : (
            <div className="podium-block bg-gray-500">2</div>
          )}
        </div>

        {/* 1st Place */}
        <div className="podium-position bg-gradient-to-t from-amber-500 to-yellow-300 h-[260px] w-1/3 z-10">
          {podiumPositions[0]?.name ? (
            <>
              <div className="podium-block bg-amber-600">1</div>
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <div className="bg-white text-amber-600 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold">🥇</span>
                </div>
                <p className="text-center font-bold text-amber-800">{podiumPositions[0].name}</p>
                <p className="timer-text text-amber-900">{formatTime(podiumPositions[0].average)}</p>
              </div>
            </>
          ) : (
            <div className="podium-block bg-amber-600">1</div>
          )}
        </div>

        {/* 3rd Place */}
        <div className="podium-position bg-gradient-to-t from-amber-700 to-amber-500 h-[180px] w-1/3">
          {podiumPositions[2]?.name ? (
            <>
              <div className="podium-block bg-amber-800">3</div>
              <div className="flex flex-col items-center justify-center py-2 px-2">
                <div className="bg-white text-amber-700 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                  <span className="text-lg font-bold">🥉</span>
                </div>
                <p className="text-center font-semibold text-amber-900 text-sm">{podiumPositions[2].name}</p>
                <p className="timer-text text-amber-900 text-sm">{formatTime(podiumPositions[2].average)}</p>
              </div>
            </>
          ) : (
            <div className="podium-block bg-amber-800">3</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodiumDisplay;
