
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Trash, Pencil } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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

// Mock data for initial development
const mockCompetitors = [
  { id: '1', name: 'Ahmed Mohammed' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Chen' },
  { id: '4', name: 'Fatima Al-Sayed' },
  { id: '5', name: 'David Wilson' },
];

const Competitors = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [competitors, setCompetitors] = useState(mockCompetitors);
  const [newCompetitorName, setNewCompetitorName] = useState('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const handleAddCompetitor = () => {
    if (newCompetitorName.trim()) {
      const newCompetitor = {
        id: Date.now().toString(),
        name: newCompetitorName.trim()
      };
      setCompetitors([...competitors, newCompetitor]);
      setNewCompetitorName('');
      setIsAddDialogOpen(false);
      toast({
        title: "Competitor Added",
        description: `${newCompetitorName} has been added successfully`,
      });
    }
  };
  
  const handleEditStart = (id: string, name: string) => {
    setEditMode(id);
    setEditName(name);
  };
  
  const handleEditSave = (id: string) => {
    if (editName.trim()) {
      setCompetitors(competitors.map(c => 
        c.id === id ? { ...c, name: editName } : c
      ));
      setEditMode(null);
      toast({
        title: "Competitor Updated",
        description: "The competitor's name has been updated",
      });
    }
  };
  
  const handleDelete = (id: string, name: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
    toast({
      title: "Competitor Removed",
      description: `${name} has been removed from the list`,
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
            <h1 className="text-3xl font-bold text-cube-purple-darker">{t('competitors')}</h1>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> {t('addCompetitor')}
              </Button>
            </DialogTrigger>
            <DialogContent dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <DialogHeader>
                <DialogTitle>{t('addCompetitor')}</DialogTitle>
                <DialogDescription>
                  Enter the competitor's name below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder={t('name')}
                  value={newCompetitorName}
                  onChange={(e) => setNewCompetitorName(e.target.value)}
                  className="mb-4"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleAddCompetitor}>
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
                <TableHead className="w-16">#</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead className="w-[150px]">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((competitor, index) => (
                <TableRow key={competitor.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {editMode === competitor.id ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      competitor.name
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editMode === competitor.id ? (
                        <>
                          <Button size="sm" onClick={() => handleEditSave(competitor.id)}>
                            {t('save')}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditMode(null)}
                          >
                            {t('cancel')}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEditStart(competitor.id, competitor.name)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(competitor.id, competitor.name)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {competitors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
                    {t('noCompetitors')}
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

export default Competitors;
