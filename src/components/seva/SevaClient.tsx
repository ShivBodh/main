
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { allSevaOpportunities, SevaOpportunity, Peetham } from '@/lib/seva-data';
import { HandHeart, MapPin, Landmark, Globe } from 'lucide-react';

const peethams: Peetham[] = ['Sringeri', 'Dwaraka', 'Puri', 'Jyotirmath'];

export default function SevaClient() {
    const [opportunities] = useState<SevaOpportunity[]>(allSevaOpportunities);
    const [locationFilter, setLocationFilter] = useState<{ onsite: boolean; remote: boolean }>({ onsite: true, remote: true });
    const [peethamFilter, setPeethamFilter] = useState<string>('all');
    const [searchFilter, setSearchFilter] = useState<string>('');

    const filteredOpportunities = useMemo(() => {
        return opportunities.filter(opp => {
            const locationMatch = 
                (locationFilter.onsite && opp.locationType === 'On-site') || 
                (locationFilter.remote && opp.locationType === 'Remote');
            
            const peethamMatch = peethamFilter === 'all' || opp.peetham === peethamFilter;

            const searchMatch = searchFilter === '' || 
                opp.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                opp.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                opp.skills.some(skill => skill.toLowerCase().includes(searchFilter.toLowerCase())) ||
                opp.cityRegion.toLowerCase().includes(searchFilter.toLowerCase());

            return locationMatch && peethamMatch && searchMatch;
        });
    }, [opportunities, locationFilter, peethamFilter, searchFilter]);

    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Seva & Community Hub
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Discover meaningful opportunities for selfless service (Seva) and connect with a vibrant community of volunteers. Your participation is a vital contribution to the preservation and propagation of Dharma.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Column */}
                <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Filter Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold">Search</Label>
                                <Input 
                                    placeholder="e.g., 'translation' or 'Puri'"
                                    value={searchFilter}
                                    onChange={e => setSearchFilter(e.target.value)}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label className="text-base font-semibold">Location Type</Label>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="onsite" checked={locationFilter.onsite} onCheckedChange={(checked) => setLocationFilter(f => ({...f, onsite: !!checked}))} />
                                        <Label htmlFor="onsite">On-site</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remote" checked={locationFilter.remote} onCheckedChange={(checked) => setLocationFilter(f => ({...f, remote: !!checked}))} />
                                        <Label htmlFor="remote">Remote</Label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label className="text-base font-semibold">Associated Peetham</Label>
                                 <Select value={peethamFilter} onValueChange={setPeethamFilter}>
                                    <SelectTrigger className="w-full mt-2">
                                        <SelectValue placeholder="Select a Peetham" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Peethams</SelectItem>
                                        {peethams.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="p-6 text-center bg-card">
                        <HandHeart className="mx-auto h-12 w-12 text-primary" />
                        <h3 className="mt-4 font-headline text-lg font-semibold">Why Seva?</h3>
                        <p className="mt-2 text-sm text-foreground/80">
                            Seva, or selfless service, is a cornerstone of spiritual practice. It purifies the heart, cultivates humility, and allows us to offer our skills and time for the greater good of the community and the preservation of Dharma.
                        </p>
                    </Card>
                </aside>

                {/* Opportunities List */}
                <main className="lg:col-span-3">
                    {filteredOpportunities.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {filteredOpportunities.map(opp => (
                                <Card key={opp.id}>
                                    <AccordionItem value={`item-${opp.id}`} className="border-b-0">
                                        <CardHeader>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                                <div className="flex-grow">
                                                    <CardTitle className="font-headline text-lg">{opp.title}</CardTitle>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                                                        <span className="flex items-center gap-1.5"><Landmark className="h-4 w-4" /> {opp.peetham}</span>
                                                        <span className="flex items-center gap-1.5">{opp.locationType === 'On-site' ? <MapPin className="h-4 w-4" /> : <Globe className="h-4 w-4" />} {opp.cityRegion}</span>
                                                    </div>
                                                </div>
                                                <Button asChild className="mt-2 sm:mt-0 flex-shrink-0">
                                                    <a href={opp.applicationLink === '#' ? `mailto:${opp.contactEmail}?subject=Interest in ${opp.title} Seva` : opp.applicationLink} target="_blank" rel="noopener noreferrer">
                                                        I'm Interested
                                                    </a>
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                             <div className="flex flex-wrap gap-2 mb-4">
                                                {opp.skills.map(skill => (
                                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                                ))}
                                            </div>
                                            <AccordionTrigger className="text-accent hover:no-underline -ml-1 p-1 rounded">Learn More</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="prose prose-sm max-w-none text-foreground/80 pt-2">
                                                    <p>{opp.description}</p>
                                                </div>
                                            </AccordionContent>
                                        </CardContent>
                                    </AccordionItem>
                                </Card>
                            ))}
                        </Accordion>
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 text-center text-muted-foreground">
                             <HandHeart className="h-16 w-16 mb-4 text-primary" />
                            <h3 className="text-lg font-semibold">No Matching Seva Opportunities</h3>
                            <p>Your search and filter combination did not return any results. Please try adjusting your filters or check back later for new opportunities.</p>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    );
}
