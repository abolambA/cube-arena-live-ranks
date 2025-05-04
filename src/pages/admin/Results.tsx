
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/hooks/use-language';
import { useToast } from "@/hooks/use-toast";

// Mock data for initial development
const mockCompetitors = [
  { id: '1', name: 'Ahmed Mohammed' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Chen' },
];

const events = ['3x3', '2x2', '4x4', 'pyraminx', 'skewb'];

const Results = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedCompetitor, setSelectedCompetitor] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [solves, setSolves] = useState<(string | null)[]>(Array(5).fill(null));
  const [isDNF, setIsDNF] = useState<boolean[]>(Array(5).fill(false));
  const [calculatedAverage, setCalculatedAverage] = useState<string | null>(null);
  
  const handleSolveChange = (index: number, value: string) => {
    const newSolves = [...solves];
    newSolves[index] = value;
    setSolves(newSolves);
    
    if (allSolvesValid(newSolves)) {
      calculateAverage(newSolves, [...isDNF]);
    }
  };
  
  const handleDNFChange = (index: number, checked: boolean) => {
    const newIsDNF = [...isDNF];
    newIsDNF[index] = checked;
    setIsDNF(newIsDNF);
    
    const newSolves = [...solves];
    if (checked) {
      newSolves[index] = 'DNF';
    } else if (newSolves[index] === 'DNF') {
      newSolves[index] = null;
    }
    setSolves(newSolves);
    
    if (allSolvesValid(newSolves)) {
      calculateAverage(newSolves, newIsDNF);
    }
  };
  
  const allSolvesValid = (currentSolves: (string | null)[]) => {
    return currentSolves.every(solve => solve === 'DNF' || (solve !== null && !isNaN(parseFloat(solve))));
  };
  
  const calculateAverage = (currentSolves: (string | null)[], currentDNFs: boolean[]) => {
    // Convert DNFs to infinitely large values for sorting
    const numericSolves = currentSolves.map((solve, index) => {
      if (currentDNFs[index] || solve === 'DNF') {
        return Infinity;
      }
      return solve ? parseFloat(solve) : Infinity;
    });
    
    // If there are more than one DNF, the average is DNF
    const dnfCount = currentDNFs.filter(Boolean).length;
    if (dnfCount > 1) {
      setCalculatedAverage('DNF');
      return;
    }
    
    // Sort times to eliminate fastest and slowest
    const sortedSolves = [...numericSolves].sort((a, b) => a - b);
    
    // Remove fastest and slowest
    const countingSolves = sortedSolves.slice(1, 4);
    
    // If any of the counting solves are DNF (Infinity), the average is DNF
    if (countingSolves.some(solve => solve === Infinity)) {
      setCalculatedAverage('DNF');
      return;
    }
    
    // Calculate average of middle 3 solves
    const sum = countingSolves.reduce((acc, solve) => acc + solve, 0);
    const avg = sum / 3;
    setCalculatedAverage(avg.toFixed(2));
  };
  
  const handleSubmit = () => {
    if (!selectedCompetitor || !selectedEvent || !allSolvesValid(solves)) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to Firebase
    toast({
      title: "Results Saved",
      description: `Results for ${mockCompetitors.find(c => c.id === selectedCompetitor)?.name} in ${selectedEvent} have been saved`,
    });
    
    // Reset form
    setSelectedCompetitor('');
    setSelectedEvent('');
    setSolves(Array(5).fill(null));
    setIsDNF(Array(5).fill(false));
    setCalculatedAverage(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-cube-purple-darker">{t('addResults')}</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('competitor')} & {t('event')}</CardTitle>
            <CardDescription>Select the competitor and event first</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="competitor">{t('competitor')}</Label>
                <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
                  <SelectTrigger id="competitor">
                    <SelectValue placeholder="Select competitor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCompetitors.map(competitor => (
                      <SelectItem key={competitor.id} value={competitor.id}>
                        {competitor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event">{t('event')}</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger id="event">
                    <SelectValue placeholder={t('selectEvent')} />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map(event => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('solves')}</CardTitle>
            <CardDescription>Enter the 5 solve times (in seconds)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {solves.map((solve, index) => (
                <div key={index} className="grid grid-cols-[1fr_auto] gap-4 items-center">
                  <div className="space-y-2">
                    <Label htmlFor={`solve-${index}`}>
                      {t('solve')} {index + 1}
                    </Label>
                    <Input
                      id={`solve-${index}`}
                      placeholder={t('enterTime')}
                      value={solve === 'DNF' ? '' : solve || ''}
                      onChange={(e) => handleSolveChange(index, e.target.value)}
                      disabled={isDNF[index]}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox 
                      id={`dnf-${index}`} 
                      checked={isDNF[index]} 
                      onCheckedChange={(checked) => 
                        handleDNFChange(index, checked === true)
                      }
                    />
                    <Label htmlFor={`dnf-${index}`}>{t('dnf')}</Label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('calculatedAverage')}</CardTitle>
            <CardDescription>Based on the 5 solves (best and worst removed)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold text-center py-4">
              {calculatedAverage || '--.--.--'}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>
            {t('save')} {t('results')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
