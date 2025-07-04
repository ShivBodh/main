
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { User } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { BookHeart, Feather, ImagePlus, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { acharyaQuotes } from '@/lib/diary-data';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

type DiaryProfile = {
  name: string;
  age: string;
  hobby: string;
  resolutions: string;
};

type DiaryEntry = {
  id: string;
  date: string; // ISO String
  text: string;
  imageUrl?: string;
};

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.string().min(1, { message: 'Please enter your age.' }),
  hobby: z.string().min(2, { message: 'Hobby must be at least 2 characters.' }),
  resolutions: z.string().min(10, { message: 'Resolutions must be at least 10 characters.' }),
});

const entrySchema = z.object({
  date: z.string().min(1, { message: 'Date is required.' }),
  text: z.string().min(1, { message: 'Diary entry cannot be empty.' }),
  image: z.any().optional(),
});

type EntryFormValues = z.infer<typeof entrySchema>;

export default function DainandiniClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [profile, setProfile] = useState<DiaryProfile | null>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);
  const [randomQuote, setRandomQuote] = useState<(typeof acharyaQuotes)[0] | null>(null);

  // This useEffect handles data loading and other logic that should only run on the client.
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Load data from localStorage which is a client-side API
    const savedProfile = localStorage.getItem(`diary_profile_${user.uid}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setIsProfileSetupOpen(true);
    }
    
    const savedEntries = localStorage.getItem(`diary_entries_${user.uid}`);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    
    setIsDataLoading(false);
  }, [user, loading, router]);
  
  // This useEffect generates the random quote once on the client to avoid hydration mismatch.
  useEffect(() => {
    setRandomQuote(acharyaQuotes[Math.floor(Math.random() * acharyaQuotes.length)]);
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    if (user && profile) {
      localStorage.setItem(`diary_profile_${user.uid}`, JSON.stringify(profile));
    }
  }, [profile, user]);
  
  // Save entries to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`diary_entries_${user.uid}`, JSON.stringify(entries));
    }
  }, [entries, user]);
  
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries]);

  const entryForm = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      text: '',
      image: null,
    },
  });

  const handleProfileSave = (values: z.infer<typeof profileSchema>) => {
    setProfile(values);
    setIsProfileSetupOpen(false);
    toast({ title: "Profile Saved", description: "Your Dainandini is ready!" });
  };
  
  const handleEntrySave = async (values: EntryFormValues) => {
    let imageUrl: string | undefined = undefined;
    if (values.image && values.image.length > 0) {
      const file = values.image[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          toast({ variant: 'destructive', title: 'Image too large', description: 'Please upload an image smaller than 2MB.'});
          return;
      }
      const reader = new FileReader();
      imageUrl = await new Promise(resolve => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const newEntry: DiaryEntry = {
      id: new Date().toISOString(),
      date: new Date(values.date).toISOString(),
      text: values.text,
      imageUrl,
    };

    setEntries(prev => [newEntry, ...prev]);
    setIsEntryDialogOpen(false);
    toast({ title: "Entry Saved", description: "Your memory has been recorded in your Dainandini." });
    entryForm.reset();
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast({ title: "Entry Deleted", description: "The entry has been removed from your Dainandini." });
  };

  if (isDataLoading || loading) {
    return <DainandiniSkeleton />;
  }

  return (
    <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
            My Dainandini
          </h1>
          <p className="mt-2 text-lg text-foreground/80 max-w-2xl">
            Your personal diary for reflection and spiritual growth.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsProfileSetupOpen(true)}>
                <Edit className="mr-2" />
                Edit Profile
            </Button>
            <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        New Entry
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">New Diary Entry</DialogTitle>
                        <DialogDescription>Record a new memory or reflection.</DialogDescription>
                    </DialogHeader>
                    <NewEntryForm onSave={handleEntrySave} form={entryForm} />
                </DialogContent>
            </Dialog>
        </div>
      </div>
      
      {!profile ? (
         <Card className="text-center p-8">
            <CardHeader>
                <BookHeart className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="font-headline mt-4">Welcome to Your Dainandini</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Please set up your profile to begin your journaling journey.</p>
                 <Button className="mt-6" onClick={() => setIsProfileSetupOpen(true)}>Setup Profile</Button>
            </CardContent>
        </Card>
      ) : sortedEntries.length === 0 ? (
        <Card className="text-center p-8 border-dashed">
            <CardHeader>
                <Feather className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="font-headline mt-4">Your Diary is Empty</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Click "New Entry" to write down your first memory.</p>
                <Button className="mt-6" onClick={() => setIsEntryDialogOpen(true)}>
                    <PlusCircle className="mr-2" />
                    Create First Entry
                </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
            {sortedEntries.map(entry => (
                <Card key={entry.id} className="shadow-lg overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b p-4 flex flex-row justify-between items-center">
                       <div>
                           <CardTitle className="font-headline text-xl text-primary">{format(parseISO(entry.date), 'EEEE, MMMM d, yyyy')}</CardTitle>
                       </div>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDeleteEntry(entry.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                             {entry.imageUrl && (
                                <div className="md:w-1/3 flex-shrink-0">
                                    <Image src={entry.imageUrl} alt={`Memory for ${entry.date}`} width={400} height={400} className="rounded-md object-cover aspect-square w-full" />
                                </div>
                            )}
                            <div className="prose prose-lg max-w-none text-foreground/90 font-body leading-relaxed whitespace-pre-wrap flex-grow">
                                {entry.text}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
      
      <Card className="mt-12 bg-gradient-to-tr from-card to-muted/20">
          <CardContent className="p-6 text-center">
            {randomQuote ? (
                <>
                    <p className="text-xl italic text-foreground/80 font-headline">"{randomQuote.quote}"</p>
                    <p className="mt-2 font-semibold text-primary">— {randomQuote.author}</p>
                </>
            ) : (
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/4 mx-auto" />
                </div>
            )}
          </CardContent>
      </Card>

      <Dialog open={isProfileSetupOpen} onOpenChange={setIsProfileSetupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Setup Your Dainandini Profile</DialogTitle>
            <DialogDescription>A few details to personalize your diary.</DialogDescription>
          </DialogHeader>
          <ProfileSetupForm user={user} onSave={handleProfileSave} existingProfile={profile} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileSetupForm({ user, onSave, existingProfile }: { user: User | null, onSave: (values: any) => void, existingProfile: DiaryProfile | null }) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: existingProfile?.name || user?.displayName || '',
      age: existingProfile?.age || '',
      hobby: existingProfile?.hobby || '',
      resolutions: existingProfile?.resolutions || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="age" render={({ field }) => (
          <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="hobby" render={({ field }) => (
          <FormItem><FormLabel>Hobby</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="resolutions" render={({ field }) => (
          <FormItem><FormLabel>My Resolutions</FormLabel><FormControl><Textarea {...field} placeholder="My goals for spiritual and personal growth..."/></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </Form>
  );
}

function NewEntryForm({ onSave, form }: { onSave: (values: EntryFormValues) => void, form: UseFormReturn<EntryFormValues> }) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
           <FormField control={form.control} name="text" render={({ field }) => (
            <FormItem><FormLabel>Today's Entry</FormLabel><FormControl><Textarea rows={8} {...field} placeholder="Write your thoughts and reflections..." /></FormControl><FormMessage /></FormItem>
          )} />
           <FormField control={form.control} name="image" render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-primary">
                <ImagePlus className="h-5 w-5" />
                Add a Photo (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) => onChange(event.target.files)}
                  className="hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="w-full">Save Entry</Button>
        </form>
      </Form>  
    )
}

function DainandiniSkeleton() {
    return (
         <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-6 w-80 mt-2" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
             <div className="space-y-8">
                <Card>
                    <CardHeader className="bg-muted/30 border-b p-4">
                       <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent className="p-6">
                       <Skeleton className="h-40 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="bg-muted/30 border-b p-4">
                       <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent className="p-6">
                       <Skeleton className="h-40 w-full" />
                    </CardContent>
                </Card>
            </div>
         </div>
    );
}


    