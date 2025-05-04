
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/hooks/use-language';
import { useToast } from "@/hooks/use-toast";

const Status = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
  
  const handleStatusChange = (value: 'not-started' | 'in-progress' | 'finished') => {
    setStatus(value);
  };
  
  const handleSubmit = () => {
    // In a real app, this would save to Firebase
    toast({
      title: "Status Updated",
      description: `Competition status has been updated to "${getStatusText()}"`,
    });
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-cube-purple-darker">{t('updateStatus')}</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('competitionStatus')}</CardTitle>
            <CardDescription>Set the current status of the competition</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={status} 
              onValueChange={(value) => 
                handleStatusChange(value as 'not-started' | 'in-progress' | 'finished')
              }
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-started" id="not-started" />
                <Label 
                  htmlFor="not-started" 
                  className={status === 'not-started' ? 'font-medium' : ''}
                >
                  {t('notStarted')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-progress" id="in-progress" />
                <Label 
                  htmlFor="in-progress"
                  className={status === 'in-progress' ? 'font-medium' : ''}
                >
                  {t('inProgress')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="finished" id="finished" />
                <Label 
                  htmlFor="finished"
                  className={status === 'finished' ? 'font-medium' : ''}
                >
                  {t('finished')}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              {t('updateStatus')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Status;
