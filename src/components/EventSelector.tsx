
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';

interface EventSelectorProps {
  selectedEvent: string;
  onEventChange: (event: string) => void;
}

const EventSelector = ({ selectedEvent, onEventChange }: EventSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="mb-6">
      <Select value={selectedEvent} onValueChange={onEventChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder={t('selectEvent')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="3x3">3x3 {t('cube')}</SelectItem>
            <SelectItem value="2x2">2x2 {t('cube')}</SelectItem>
            <SelectItem value="4x4">4x4 {t('cube')}</SelectItem>
            <SelectItem value="pyraminx">Pyraminx</SelectItem>
            <SelectItem value="skewb">Skewb</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventSelector;
