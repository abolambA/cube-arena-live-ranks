
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
  selectedEvent: string;
  onEventChange: (event: string) => void;
}

const EventSelector = ({ selectedEvent, onEventChange }: EventSelectorProps) => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  
  // Load events from localStorage or use defaults
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    const loadedEvents = savedEvents 
      ? JSON.parse(savedEvents) 
      : DEFAULT_EVENTS;
    
    // Filter only active events
    setEvents(loadedEvents.filter((event: Event) => event.active));
  }, []);

  return (
    <div className="mb-6">
      <Select value={selectedEvent} onValueChange={onEventChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder={t('selectEvent')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.code}>
                {event.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventSelector;
