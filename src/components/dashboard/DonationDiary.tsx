'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle, Trash2, NotebookPen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// In a real application, this data would come from Firestore.
// We'd have functions like:
// - getDonationsForUser(userId)
// - addDonationForUser(userId, donationData)
// - deleteDonation(donationId)

export type Donation = {
  id: string;
  date: Date;
  amount: number;
  notes?: string;
  status: 'completed' | 'planned';
};

const initialDonations: Donation[] = [
    { id: '1', amount: 501, date: new Date('2024-05-20'), status: 'completed', notes: 'For Annadana Seva at Sringeri.' },
    { id: '2', amount: 108, date: new Date('2024-07-21'), status: 'completed', notes: 'Guru Purnima offering.' },
    { id: '3', amount: 251, date: new Date(), status: 'planned', notes: 'For upcoming Goshala project.' },
];


export function DonationDiary() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    
    // Form state for new donation
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState<'completed' | 'planned'>('completed');
    
    // In a real app, you would fetch data for the logged-in user.
    // For this prototype, we'll use localStorage to persist data per-user.
    useEffect(() => {
        if (user) {
            const savedDonations = localStorage.getItem(`donations_${user.uid}`);
            if (savedDonations) {
                const parsedDonations = JSON.parse(savedDonations).map((d: any) => ({...d, date: new Date(d.date)}));
                setDonations(parsedDonations);
            } else {
                setDonations(initialDonations);
            }
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(`donations_${user.uid}`, JSON.stringify(donations));
        }
    }, [donations, user]);

    const handleAddDonation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ variant: 'destructive', title: 'Not Logged In', description: 'You must be logged in to add an entry.' });
            return;
        }
        if (!amount || !date) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please provide at least an amount and a date.',
            });
            return;
        }

        const newDonation: Donation = {
            id: new Date().toISOString(), // Use a better ID in production (e.g., from Firestore)
            amount: parseFloat(amount),
            date,
            notes,
            status,
        };

        setDonations(prev => [newDonation, ...prev].sort((a,b) => b.date.getTime() - a.date.getTime()));

        toast({
            title: 'Entry Added',
            description: `Your ${status} donation has been recorded.`,
        });

        // Reset form
        setAmount('');
        setDate(new Date());
        setNotes('');
        setIsAdding(false);
    };

    const handleDeleteDonation = (id: string) => {
        setDonations(prev => prev.filter(d => d.id !== id));
        toast({
            title: 'Entry Deleted',
            description: 'The donation entry has been removed from your diary.',
        });
    };

    const completedDonations = donations.filter(d => d.status === 'completed');
    const plannedDonations = donations.filter(d => d.status === 'planned');

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <NotebookPen className="h-6 w-6 text-accent" />
                    Donation Diary & Planner
                </CardTitle>
                <CardDescription>
                    Keep a personal record of your past contributions and plan future offerings. Your data is saved in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isAdding ? (
                    <form onSubmit={handleAddDonation} className="p-4 border rounded-lg bg-muted/50 space-y-4">
                       <h3 className="text-lg font-semibold text-primary">New Entry</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (₹)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="e.g., 101"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label>Status</Label>
                            <Tabs value={status} onValueChange={(val) => setStatus(val as 'completed' | 'planned')} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="completed">Completed Donation</TabsTrigger>
                                    <TabsTrigger value="planned">Planned Offering</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="e.g., For Goshala maintenance at Puri."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" type="button" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit">Save Entry</Button>
                        </div>
                    </form>
                ) : (
                    <Tabs defaultValue="completed" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="completed">Completed Donations ({completedDonations.length})</TabsTrigger>
                            <TabsTrigger value="planned">Planned Offerings ({plannedDonations.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="completed" className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2">
                           {completedDonations.length > 0 ? completedDonations.map(d => (
                                <DonationItem key={d.id} donation={d} onDelete={handleDeleteDonation} />
                           )) : (
                            <p className="text-muted-foreground text-center p-4">No completed donations recorded yet.</p>
                           )}
                        </TabsContent>
                        <TabsContent value="planned" className="mt-4 space-y-3  max-h-96 overflow-y-auto pr-2">
                            {plannedDonations.length > 0 ? plannedDonations.map(d => (
                                <DonationItem key={d.id} donation={d} onDelete={handleDeleteDonation} />
                           )) : (
                            <p className="text-muted-foreground text-center p-4">No planned offerings recorded yet.</p>
                           )}
                        </TabsContent>
                    </Tabs>
                )}
            </CardContent>
            <CardFooter>
                 {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Entry
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

function DonationItem({ donation, onDelete }: { donation: Donation, onDelete: (id: string) => void }) {
    return (
        <div className="flex items-start justify-between p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
            <div className="flex-grow">
                <p className="font-semibold text-primary">₹{donation.amount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">{format(donation.date, "MMMM d, yyyy")}</p>
                {donation.notes && <p className="text-sm text-foreground/80 mt-1 italic">"{donation.notes}"</p>}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0" onClick={() => onDelete(donation.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete entry</span>
            </Button>
        </div>
    )
}
