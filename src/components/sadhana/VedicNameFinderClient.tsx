
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Baby, Calendar, Clock, MapPin, Calculator, Sparkles, Star, Sun, Moon, Download, Info, Check, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const nameSuggestions = {
    boy: [
        { name: "Vihaan", meaning: "Morning, dawn" },
        { name: "Aarav", meaning: "Peaceful" },
        { name: "Reyansh", meaning: "A part of the Sun" },
        { name: "Vivaan", meaning: "Full of life" },
        { name: "Aditya", meaning: "Sun" },
        { name: "Ishaan", meaning: "Lord Shiva" },
        { name: "Dhruv", meaning: "Pole star" },
        { name: "Kiaan", meaning: "Grace of God" },
        { name: "Arjun", meaning: "Bright, shining" },
        { name: "Rudra", meaning: "Lord Shiva" },
    ],
    girl: [
        { name: "Saanvi", meaning: "Goddess Lakshmi" },
        { name: "Aadhya", meaning: "First power" },
        { name: "Myra", meaning: "Sweet, admirable" },
        { name: "Ananya", meaning: "Unique" },
        { name: "Diya", meaning: "Lamp, light" },
        { name: "Pari", meaning: "Fairy" },
        { name: "Ira", meaning: "Goddess Saraswati" },
        { name: "Riya", meaning: "Singer" },
        { name: "Siya", meaning: "Goddess Sita" },
        { name: "Tara", meaning: "Star" },
    ],
    neutral: [
        { name: "Arya", meaning: "Noble" },
        { name: "Dev", meaning: "Deity" },
        { name: "Noor", meaning: "Light" },
        { name: "Kai", meaning: "Ocean" },
        { name: "Jia", meaning: "Heart" },
        { name: "Shaan", meaning: "Pride, splendor" },
    ]
}

const simulatedResults = {
    rashi: "Simha (Leo)",
    nakshatra: "Rohini",
    pada: 4,
    rashiSyllables: ["Ma", "Mi", "Mu", "Me"],
    nakshatraSyllables: ["O", "Va", "Vi", "Vu"]
}


export default function VedicNameFinderClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<typeof simulatedResults | null>(null);
    const [gender, setGender] = useState<'boy' | 'girl' | 'neutral' | 'all'>('all');

    const handleCalculate = () => {
        setIsLoading(true);
        setTimeout(() => {
            setResults(simulatedResults);
            setIsLoading(false);
        }, 1500);
    };

    const getFilteredNames = () => {
        if (!results) return [];
        
        const allSyllables = [...results.rashiSyllables, ...results.nakshatraSyllables].map(s => s.toLowerCase());

        let namesToFilter = [];
        if (gender === 'all') {
            namesToFilter = [...nameSuggestions.boy, ...nameSuggestions.girl, ...nameSuggestions.neutral];
        } else {
            namesToFilter = nameSuggestions[gender];
        }

        return namesToFilter.filter(item => allSyllables.some(syl => item.name.toLowerCase().startsWith(syl)));
    };

    const filteredNames = getFilteredNames();

    return (
        <div className="bg-muted/30">
            <div className="container mx-auto max-w-7xl py-16 px-4">
                <Card className="shadow-2xl border w-full">
                    <CardHeader className="text-center bg-card rounded-t-lg p-8">
                        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                            Vedic Name Finder
                        </h1>
                        <p className="mt-2 text-lg text-muted-foreground">
                            Discover auspicious names based on Rashi and Nakshatra Pada.
                        </p>
                    </CardHeader>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                             <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Baby /> Birth Details</CardTitle>
                                    <CardDescription>Enter the newborn's information to calculate auspicious starting syllables.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate"><Calendar className="inline-block mr-2 h-4 w-4" /> Date of Birth</Label>
                                        <Input id="birthDate" type="date" defaultValue="2023-11-15" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birthTime"><Clock className="inline-block mr-2 h-4 w-4" /> Time of Birth</Label>
                                        <Input id="birthTime" type="time" defaultValue="08:30" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birthPlace"><MapPin className="inline-block mr-2 h-4 w-4" /> Place of Birth</Label>
                                        <Input id="birthPlace" placeholder="e.g., Varanasi, India" defaultValue="Varanasi, India"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <RadioGroup defaultValue="boy" className="flex gap-4 pt-2">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="boy" id="r_boy" /><Label htmlFor="r_boy">Boy</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="girl" id="r_girl" /><Label htmlFor="r_girl">Girl</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="neutral" id="r_neutral" /><Label htmlFor="r_neutral">Neutral</Label></div>
                                        </RadioGroup>
                                    </div>

                                    <Button onClick={handleCalculate} disabled={isLoading} className="w-full">
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Calculating...
                                            </>
                                        ) : (
                                            <><Calculator className="mr-2 h-4 w-4" /> Find Names</>
                                        )}
                                    </Button>
                                    <div className="text-xs text-muted-foreground p-3 bg-muted rounded-md flex items-start gap-2">
                                        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                        <span>For newborns, the app simulates real-time planetary calculations to find the most accurate results.</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Results Section */}
                        <div className="lg:col-span-3">
                           {isLoading && (
                                <Card className="h-full">
                                    <CardHeader><CardTitle>Calculating...</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <Skeleton className="h-24 w-full" />
                                        <Skeleton className="h-40 w-full" />
                                    </CardContent>
                                </Card>
                           )}
                           {!isLoading && !results && (
                                <Card className="h-full flex flex-col items-center justify-center text-center p-8 border-dashed">
                                    <CardHeader>
                                        <CardTitle className="text-muted-foreground">Auspicious Names Await</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">Fill in the birth details and click "Find Names" to begin.</p>
                                    </CardContent>
                                </Card>
                           )}
                           {!isLoading && results && (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2"><Check /> Calculation Complete</CardTitle>
                                            <CardDescription>Based on the birth details provided, here are the astrological parameters for naming.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-semibold flex items-center gap-2"><Star /> Nakshatra Syllables</h4>
                                                <div className="flex gap-2">
                                                    {results.nakshatraSyllables.map(s => <div key={s} className="flex-1 text-center p-3 bg-primary text-primary-foreground rounded-lg font-bold text-xl">{s}</div>)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">{results.nakshatra} (Pada {results.pada})</p>
                                            </div>
                                             <div className="space-y-4">
                                                <h4 className="font-semibold flex items-center gap-2"><Sun /> Rashi Syllables</h4>
                                                <div className="flex gap-2">
                                                    {results.rashiSyllables.map(s => <div key={s} className="flex-1 text-center p-3 bg-secondary text-secondary-foreground rounded-lg font-bold text-xl">{s}</div>)}
                                                </div>
                                                 <p className="text-xs text-muted-foreground">{results.rashi}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="flex items-center gap-2"><Filter /> Suggested Names</CardTitle>
                                                <div className="flex items-center gap-2 rounded-full bg-muted p-1">
                                                    <Button size="sm" variant={gender === 'all' ? 'default' : 'ghost'} className="rounded-full" onClick={() => setGender('all')}>All</Button>
                                                    <Button size="sm" variant={gender === 'boy' ? 'default' : 'ghost'} className="rounded-full" onClick={() => setGender('boy')}>Boy</Button>
                                                    <Button size="sm" variant={gender === 'girl' ? 'default' : 'ghost'} className="rounded-full" onClick={() => setGender('girl')}>Girl</Button>
                                                    <Button size="sm" variant={gender === 'neutral' ? 'default' : 'ghost'} className="rounded-full" onClick={() => setGender('neutral')}>Neutral</Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {filteredNames.length > 0 ? filteredNames.map(item => (
                                                    <div key={item.name} className="p-3 border rounded-lg hover:bg-accent/10 cursor-pointer">
                                                        <p className="font-semibold text-primary">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground italic">{item.meaning}</p>
                                                    </div>
                                                )) : <p className="col-span-full text-center text-muted-foreground p-4">No names match the filter and syllables.</p>}
                                            </div>
                                             <Button variant="outline" className="w-full mt-6"><Download className="mr-2 h-4 w-4"/> Download Name List</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                           )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
