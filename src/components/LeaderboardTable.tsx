
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useLanguage } from '@/hooks/use-language';

interface Competitor {
  id: string;
  name: string;
  average: number;
  solves: (number | string)[];
}

interface LeaderboardTableProps {
  competitors: Competitor[];
}

const LeaderboardTable = ({ competitors }: LeaderboardTableProps) => {
  const { t, language } = useLanguage();

  const formatTime = (time: number | string) => {
    if (typeof time === 'string') return time;
    return time.toFixed(2);
  };

  return (
    <div className="w-full overflow-x-auto animate-fade-in">
      <Table dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <TableHeader>
          <TableRow className="bg-cube-purple/10">
            <TableHead className="w-16">{t('rank')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('average')}</TableHead>
            <TableHead>{t('solves')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.length > 0 ? (
            competitors.map((competitor, index) => (
              <TableRow key={competitor.id} className={index % 2 === 0 ? 'bg-secondary/50' : ''}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{competitor.name}</TableCell>
                <TableCell className="timer-text">{formatTime(competitor.average)}</TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {competitor.solves.map((solve, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-1 rounded text-xs ${
                          solve === 'DNF' 
                            ? 'bg-red-500/10 text-red-600' 
                            : 'bg-cube-purple/10'
                        }`}
                      >
                        {formatTime(solve)}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                {t('noCompetitors')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
