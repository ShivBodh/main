import { CircleUserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-sm sm:px-6 md:px-8">
      <h1 className="text-2xl font-bold text-primary font-headline">Sādhanā Suite</h1>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">Welcome back,</p>
          <p className="text-xs text-muted-foreground">Seeker of Truth</p>
        </div>
        <Avatar className="h-10 w-10 border-2 border-primary/50">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="spiritual person" />
          <AvatarFallback>
            <CircleUserRound className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
