
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import { BookOpen, Calendar, Activity, MessageSquareQuote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sādhanā Suite Dashboard',
  description: 'Your personal dashboard for daily spiritual practice, tracking, and inspiration.',
};

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8 px-4">
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline text-primary">
            Sādhanā Suite
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            Your personal space for spiritual growth and practice.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Main Sadhana Tracker */}
          <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl">Daily Tracker</CardTitle>
              <Activity className="w-6 h-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your daily practices will be tracked here. (Coming soon)</p>
              {/* Placeholder for checkboxes and inputs */}
            </CardContent>
          </Card>

          {/* Quote of the Day */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl">Quote of the Day</CardTitle>
              <MessageSquareQuote className="w-6 h-6 text-accent" />
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground italic">"The Self is not to be known by the study of the scriptures..." (Coming soon)</p>
            </CardContent>
          </Card>

           {/* Streak Visualization */}
           <Card className="shadow-lg flex flex-col items-center justify-center text-center p-6 bg-secondary text-secondary-foreground">
             <CardTitle className="font-headline text-2xl">Practice Streak</CardTitle>
             <p className="text-6xl font-bold font-mono">0</p>
             <p className="text-lg">Days</p>
          </Card>


          {/* Followed Events */}
          <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl">Followed Events</CardTitle>
              <Calendar className="w-6 h-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upcoming events you're interested in will appear here. (Coming soon)</p>
            </CardContent>
          </Card>

          {/* Learning Suggestions */}
           <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl">Learning Suggestions</CardTitle>
              <BookOpen className="w-6 h-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Based on your activity, we will suggest new articles and discourses for you here. (Coming soon)</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
