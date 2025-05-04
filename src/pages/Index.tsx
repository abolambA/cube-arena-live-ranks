
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import PodiumDisplay from '@/components/PodiumDisplay';
import CompetitionStatus from '@/components/CompetitionStatus';
import EventSelector from '@/components/EventSelector';
import LeaderboardTable from '@/components/LeaderboardTable';
import { useLanguage } from '@/hooks/use-language';

// Mock data for initial development
const mockCompetitors = [
  {
    id: '1',
    name: 'Ahmed Mohammed',
    average: 9.25,
    solves: [8.72, 9.43, 'DNF', 8.62, 9.69]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    average: 10.12,
    solves: [10.55, 9.88, 9.94, 12.33, 10.55]
  },
  {
    id: '3',
    name: 'Michael Chen',
    average: 10.87,
    solves: [10.22, 11.33, 10.56, 11.50, 10.81]
  },
  {
    id: '4',
    name: 'Fatima Al-Sayed',
    average: 11.42,
    solves: [11.20, 11.63, 10.98, 12.01, 11.43]
  },
  {
    id: '5',
    name: 'David Wilson',
    average: 12.05,
    solves: ['DNF', 12.22, 11.87, 11.98, 12.10]
  },
];

const Index = () => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState('3x3');
  const [competitors, setCompetitors] = useState(mockCompetitors);

  // In a real app, we'd fetch data based on the selected event
  const handleEventChange = (event: string) => {
    setSelectedEvent(event);
    // Here you would fetch data for the selected event from Firebase
    console.log(`Event changed to ${event}`);
  };

  // Get top 3 competitors for the podium
  const topThree = competitors.sort((a, b) => a.average - b.average).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-cube-purple-darker">{t('leaderboard')}</h1>
        
        <CompetitionStatus status="in-progress" />
        
        <div className="flex justify-center">
          <EventSelector 
            selectedEvent={selectedEvent}
            onEventChange={handleEventChange}
          />
        </div>
        
        <PodiumDisplay topThree={topThree} />
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <LeaderboardTable competitors={competitors} />
        </div>
      </main>
    </div>
  );
};

export default Index;
