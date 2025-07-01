import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DailyPracticeWidget } from '@/components/dashboard/DailyPracticeWidget';
import { QuoteOfTheDayWidget } from '@/components/dashboard/QuoteOfTheDayWidget';
import { FollowedEventsWidget } from '@/components/dashboard/FollowedEventsWidget';
import { ContinueLearningWidget } from '@/components/dashboard/ContinueLearningWidget';

export default function SadhanaDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <DailyPracticeWidget />
            <ContinueLearningWidget />
          </div>

          <div className="space-y-6">
            <QuoteOfTheDayWidget />
            <FollowedEventsWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
