
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { allSevaOpportunities, SevaOpportunity, Peetham } from '@/lib/seva-data';
import { HandHeart, MapPin, Briefcase, Globe } from 'lucide-react';

const peethams: Peetham[] = ['Sringeri', 'Dwaraka', 'Puri', 'Jyotirmath'];

export default function SevaPage() {
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
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Seva & Community Hub
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Discover opportunities for selfless service (Seva) and connect with the community. Your participation strengthens Dharma.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filters Column */}
                <div className="md:col-span-1">
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
                </div>

                {/* Opportunities List */}
                <div className="md:col-span-3">
                    {filteredOpportunities.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {filteredOpportunities.map(opp => (
                                <Card key={opp.id}>
                                    <AccordionItem value={`item-${opp.id}`} className="border-b-0">
                                        <CardHeader>
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <CardTitle className="font-headline text-lg">{opp.title}</CardTitle>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                                        <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {opp.peetham}</span>
                                                        <span className="flex items-center gap-1.5">{opp.locationType === 'On-site' ? <MapPin className="h-4 w-4" /> : <Globe className="h-4 w-4" />} {opp.cityRegion}</span>
                                                    </div>
                                                </div>
                                                <Button asChild>
                                                    <a href={opp.applicationLink === '#' ? `mailto:${opp.contactEmail}` : opp.applicationLink} target="_blank" rel="noopener noreferrer">
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
                             <HandHeart className="h-16 w-16 mb-4" />
                            <p className="text-lg">No matching Seva opportunities found.</p>
                            <p>Try adjusting your filters or check back later.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
