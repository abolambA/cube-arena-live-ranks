
import React, { useEffect, useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { Event, DEFAULT_EVENTS } from '@/models/event';

interface EventSelectorProps {
  selectedEvent: string | null;
  onEventChange: (event: string) => void;
}

const EventSelector = ({ selectedEvent, onEventChange }: EventSelectorProps) => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  
  // Load events from localStorage or use defaults, with real-time updates
  useEffect(() => {
    // Load initial events
    const loadEvents = () => {
      const savedEvents = localStorage.getItem('events');
      const loadedEvents = savedEvents 
        ? JSON.parse(savedEvents) 
        : DEFAULT_EVENTS;
      
      // Filter only active events
      setEvents(loadedEvents.filter((event: Event) => event.active));
    };
    
    loadEvents();
    
    // Set up interval to check for updates
    const interval = setInterval(loadEvents, 2000); // Check every 2 seconds
    
    // In a real Firebase implementation, we would use:
    // const eventsRef = ref(db, 'events');
    // const unsubscribe = onValue(eventsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     setEvents(Object.values(data).filter(event => event.active));
    //   }
    // });
    
    return () => {
      clearInterval(interval);
      // In Firebase implementation: unsubscribe();
    };
  }, []);

  return (
    <div className="mb-6">
      <Select 
        value={selectedEvent || ''} 
        onValueChange={onEventChange}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder={t('selectEvent')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {events.length > 0 ? (
              events.map((event) => (
                <SelectItem key={event.id} value={event.code}>
                  {event.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-events" disabled>
                {t('noEvents')}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventSelector;
