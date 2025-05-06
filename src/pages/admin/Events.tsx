
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Pencil, Trash, Check, X } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from '@/hooks/use-language';
import { useToast } from "@/hooks/use-toast";
import { Event, DEFAULT_EVENTS } from '@/models/event';

const Events = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : DEFAULT_EVENTS;
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventCode, setNewEventCode] = useState('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');

  // Save events to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);
  
  const handleToggleEvent = (id: string, active: boolean) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, active: !active } : event
    );
    setEvents(updatedEvents);
    toast({
      title: active ? t('eventDisabled') : t('eventEnabled'),
      description: `${events.find(event => event.id === id)?.name}`,
    });
  };
  
  const handleAddEvent = () => {
    if (newEventName.trim() && newEventCode.trim()) {
      const newEvent: Event = {
        id: Date.now().toString(),
        name: newEventName.trim(),
        code: newEventCode.trim(),
        active: true
      };
      setEvents([...events, newEvent]);
      setNewEventName('');
      setNewEventCode('');
      setIsAddDialogOpen(false);
      toast({
        title: t('eventAdded'),
        description: newEventName,
      });
    }
  };
  
  const handleEditStart = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setEditMode(id);
      setEditName(event.name);
      setEditCode(event.code);
    }
  };
  
  const handleEditSave = (id: string) => {
    if (editName.trim() && editCode.trim()) {
      setEvents(events.map(event => 
        event.id === id ? { ...event, name: editName, code: editCode } : event
      ));
      setEditMode(null);
      toast({
        title: t('eventUpdated'),
        description: editName,
      });
    }
  };
  
  const handleEditCancel = () => {
    setEditMode(null);
  };
  
  const handleDelete = (id: string) => {
    const event = events.find(e => e.id === id);
    setEvents(events.filter(e => e.id !== id));
    toast({
      title: t('eventRemoved'),
      description: event?.name || '',
      variant: "destructive",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-cube-purple-darker">{t('events')}</h1>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> {t('addEvent')}
              </Button>
            </DialogTrigger>
            <DialogContent dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <DialogHeader>
                <DialogTitle>{t('addEvent')}</DialogTitle>
                <DialogDescription>
                  Enter the event details below.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventName">{t('eventName')}</Label>
                  <Input
                    id="eventName"
                    placeholder="3x3 Cube"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventCode">{t('eventCode')}</Label>
                  <Input
                    id="eventCode"
                    placeholder="333"
                    value={newEventCode}
                    onChange={(e) => setNewEventCode(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleAddEvent}>
                  {t('save')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Table dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <TableHeader>
              <TableRow className="bg-cube-purple/10">
                <TableHead>{t('eventName')}</TableHead>
                <TableHead>{t('eventCode')}</TableHead>
                <TableHead>{t('active')}</TableHead>
                <TableHead className="w-[150px]">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    {editMode === event.id ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      event.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === event.id ? (
                      <Input
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                      />
                    ) : (
                      event.code
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={event.active}
                      onCheckedChange={() => handleToggleEvent(event.id, event.active)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editMode === event.id ? (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEditSave(event.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleEditCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEditStart(event.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    {t('noEvents')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Events;

// Missing Label component added
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium">
    {children}
  </label>
);

