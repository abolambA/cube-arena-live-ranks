
import React, { useState, useEffect } from 'react';
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
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [competitionStatus, setCompetitionStatus] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');

  // Effect to listen for competition status changes
  useEffect(() => {
    // In a real implementation with Firebase, we would have:
    // const statusRef = ref(db, 'competition/status');
    // onValue(statusRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setCompetitionStatus(data || 'not-started');
    // });
    
    // For now, we'll use localStorage as a temporary solution
    const checkStatus = () => {
      const savedStatus = localStorage.getItem('competitionStatus');
      if (savedStatus) {
        setCompetitionStatus(savedStatus as 'not-started' | 'in-progress' | 'finished');
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 2000); // Check every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Effect to listen for results changes based on selected event
  useEffect(() => {
    if (!selectedEvent) {
      setCompetitors([]);
      return;
    }

    // In a real implementation with Firebase, we would have:
    // const resultsRef = ref(db, `results/${selectedEvent}`);
    // onValue(resultsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     const competitorsList = Object.values(data);
    //     setCompetitors(competitorsList);
    //   } else {
    //     setCompetitors([]);
    //   }
    // });
    
    // For now, load mock data for demonstration
    setCompetitors(mockCompetitors);
    
    // For demo purposes, we could use localStorage to simulate data updates
    const checkResults = () => {
      const savedResults = localStorage.getItem(`results_${selectedEvent}`);
      if (savedResults) {
        try {
          const parsedResults = JSON.parse(savedResults);
          setCompetitors(parsedResults);
        } catch (e) {
          console.error('Error parsing results:', e);
        }
      }
    };
    
    checkResults();
    const interval = setInterval(checkResults, 2000); // Check every 2 seconds
    
    return () => clearInterval(interval);
  }, [selectedEvent]);

  // In a real app, we'd fetch data based on the selected event
  const handleEventChange = (event: string) => {
    setSelectedEvent(event);
  };

  // Get top 3 competitors for the podium
  const topThree = competitors.sort((a, b) => a.average - b.average).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-cube-purple-darker">{t('leaderboard')}</h1>
        
        <CompetitionStatus status={competitionStatus} />
        
        <div className="flex justify-center">
          <EventSelector 
            selectedEvent={selectedEvent}
            onEventChange={handleEventChange}
          />
        </div>
        
        {selectedEvent ? (
          <>
            <PodiumDisplay topThree={topThree} />
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <LeaderboardTable competitors={competitors} />
            </div>
          </>
        ) : (
          <div className="text-center mt-10 py-20 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl text-gray-500">{t('selectEvent')}</h2>
            <p className="text-gray-400 mt-2">{t('noResultsWithoutEvent')}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
