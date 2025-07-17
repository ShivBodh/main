'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPanchangDetails, PanchangOutput } from '@/ai/flows/panchang-generator-flow';
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay, setDate } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Sun, Moon, Star, Sunrise, Sunset, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Settings, Code, CheckCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function AdminPanel() {
  const { toast } = useToast();

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Access Granted (Simulated)",
      description: "In a real application, this would create an access key in Firestore.",
    });
  };

  return (
    <Card className="h-fit sticky top-24">
      <CardHeader>
        <CardTitle className="text-primary">Access Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGrantAccess} className="space-y-4">
          <div>
            <Label htmlFor="clientName">Client Name/Organization</Label>
            <Input id="clientName" placeholder="Enter name" />
          </div>
          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input id="websiteUrl" type="url" placeholder="https://example.com" />
          </div>
          <div>
            <Label htmlFor="accessPeriod">Access Period</Label>
            <Select defaultValue="12">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Grant Access</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function CalendarWidget({ currentDate, setCurrentDate, setSelectedDay, selectedDay }: { 
    currentDate: Date, 
    setCurrentDate: (d: Date) => void, 
    selectedDay: Date,
    setSelectedDay: (d: Date) => void 
}) {
  const monthName = format(currentDate, 'MMMM yyyy');
  const firstDay = getDay(startOfMonth(currentDate));
  const daysInMonth = getDaysInMonth(currentDate);

  const days = Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>);
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = format(new Date(), 'yyyy-MM-dd') === format(setDate(currentDate, day), 'yyyy-MM-dd');
    const isSelected = format(selectedDay, 'yyyy-MM-dd') === format(setDate(currentDate, day), 'yyyy-MM-dd');

    days.push(
      <div 
        key={day} 
        className={`p-2 border rounded-md text-center cursor-pointer transition-colors ${isToday ? 'bg-primary/20 border-primary' : 'border-border'} ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
        onClick={() => setSelectedDay(setDate(currentDate, day))}
      >
        {day}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-primary">{monthName}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}><ChevronRight /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </CardContent>
    </Card>
  );
}

function PanchangDetails({ details, date }: { details: PanchangOutput | null, date: Date }) {
    if (!details) {
        return (
             <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
             </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-primary">Panchang for {format(date, 'MMMM d, yyyy')}</CardTitle>
                <CardDescription>{details.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Sunrise/>Sunrise</div><p className="text-lg font-bold">{details.sunrise}</p></div>
                    <div className="p-4 bg-muted rounded-lg"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Sunset/>Sunset</div><p className="text-lg font-bold">{details.sunset}</p></div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Sun/>Tithi</div><p className="text-lg font-bold">{details.tithi.name}</p><span className="text-xs">ends {details.tithi.endTime}</span></div>
                    <div className="p-4 bg-muted rounded-lg"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Star/>Nakshatra</div><p className="text-lg font-bold">{details.nakshatra.name}</p><span className="text-xs">ends {details.nakshatra.endTime}</span></div>
                    <div className="p-4 bg-muted rounded-lg"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Moon/>Yoga</div><p className="text-lg font-bold">{details.yoga.name}</p><span className="text-xs">ends {details.yoga.endTime}</span></div>
                 </div>
                 {details.specialDays.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg my-2 text-primary">Special Days</h3>
                        {details.specialDays.map(day => (
                            <div key={day.name} className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                                <h4 className="font-bold">{day.name}</h4>
                                <p className="text-sm text-foreground/80">{day.description}</p>
                            </div>
                        ))}
                    </div>
                 )}
            </CardContent>
        </Card>
    )
}

function EmbedSection() {
    const { toast } = useToast();
    const embedCode = `<div id="shivbodh-panchang-widget"></div>\n<script src="https://panchang.shivbodhtrust.in/widget.js"></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        toast({
            description: "Embed code copied to clipboard.",
        });
    }

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2"><Code/>Embed Panchang on Your Website</CardTitle>
                <CardDescription>Copy the code below to embed the widget.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                    <pre><code>{embedCode}</code></pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}><Copy className="h-4 w-4"/></Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function PanchangaClient() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [panchangDetails, setPanchangDetails] = useState<PanchangOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const dateStr = format(selectedDay, 'yyyy-MM-dd');
    getPanchangDetails({ date: dateStr, location: 'Ujjain, India' })
      .then(data => {
        setPanchangDetails(data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, [selectedDay]);

  return (
    <div className="bg-muted/30">
        <header className="bg-primary text-primary-foreground shadow-md sticky top-16 z-40">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold font-headline">Panchang Service Dashboard</h1>
                <Button variant="secondary">Admin Login</Button>
            </div>
        </header>

        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <AdminPanel />
                </div>
                <main className="lg:col-span-2 space-y-8">
                    <CalendarWidget currentDate={currentDate} setCurrentDate={setCurrentDate} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                    <PanchangDetails details={panchangDetails} date={selectedDay} />
                    <EmbedSection />
                </main>
            </div>
        </div>
    </div>
  );
}
