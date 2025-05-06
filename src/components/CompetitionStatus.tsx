
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/use-language';

type StatusType = 'not-started' | 'in-progress' | 'finished';

interface CompetitionStatusProps {
  status: StatusType;
}

const CompetitionStatus = ({ status }: CompetitionStatusProps) => {
  const { t } = useLanguage();
  
  const getStatusColor = () => {
    switch (status) {
      case 'not-started':
        return "bg-yellow-500/80";
      case 'in-progress':
        return "bg-green-500/80 animate-pulse-subtle";
      case 'finished':
        return "bg-blue-500/80";
      default:
        return "bg-gray-500/80";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'not-started':
        return t('notStarted');
      case 'in-progress':
        return t('inProgress');
      case 'finished':
        return t('finished');
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center justify-center my-6">
      <Badge className={`${getStatusColor()} text-white py-1 px-4 text-sm`}>
        {t('competitionStatus')}: {getStatusText()}
      </Badge>
    </div>
  );
};

export default CompetitionStatus;
