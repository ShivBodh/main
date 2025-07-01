
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Video, Camera, MapPin, Mail, Briefcase, Globe } from 'lucide-react';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const dwarakaSeva = allSevaOpportunities.filter(o => o.peetham === 'Dwaraka');

export default function DwarakaPeethamPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Dwaraka Sharada Peetham"
            width={800}
            height={600}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
            data-ai-hint="coastal temple"
          />
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              Dwaraka Sharada Peetham
            </h1>
            <p className="text-lg text-foreground/80 mb-2">
              The Western Āmnāya Pīṭham, overlooking the Arabian Sea.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Sri Sri Sadananda Saraswatiji Maharaj</p>
              <p><span className="font-semibold">Associated Veda:</span> Sama Veda</p>
              <p><span className="font-semibold">Mahāvākya:</span> Tat Tvam Asi</p>
            </div>
            <Button asChild variant="outline">
              <Link href="https://shreesharadapithmathdwarka.org/" target="_blank">
                Official Website <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
            <TabsTrigger value="seva">Community & Seva</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">History and Significance</h2>
            <p>
              The Dwaraka Sharada Peetham, also known as the Kalika Matha, is the western cardinal peetham established by Sri Adi Shankaracharya. Located in the sacred city of Dwaraka, Gujarat, it holds immense significance as a centre for the preservation of the Sama Veda. The Peetham's mission is to uphold the tenets of Advaita Vedanta and guide devotees on the path of Dharma.
            </p>
            <p>
              The city of Dwaraka itself is famously associated with Lord Krishna, making the Peetham a site of great spiritual power and pilgrimage. The lineage of Shankaracharyas at Dwaraka has been responsible for the spiritual welfare of Western India for centuries, fostering a deep-rooted culture of devotion and knowledge.
            </p>
            <h3 className="font-headline text-primary/90">Main Ashram Details</h3>
            <p>
              Shree Sharada Peeth,
              <br />
              Near Iskon Gate, Dwarka,
              <br />
              Gujarat - 361335, India.
            </p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>
                       The Dwaraka Peetham is a bastion of the Sama Veda and the Mahāvākya "Tat Tvam Asi" (That Thou Art). The teachings focus on guiding the seeker to realize the inherent identity between the individual consciousness and the universal consciousness. The philosophy emphasizes Bhakti (devotion) as a powerful means to purify the mind, making it receptive to the ultimate truth of non-duality.
                    </p>
                </CardContent>
             </Card>
             <h3 className="font-headline text-2xl text-primary mt-8 mb-4">Wisdom from the Lineage</h3>
             <div className="space-y-4">
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Realize that you are not the body, but the eternal, blissful consciousness that witnesses all." - A Teaching from the Dwaraka Lineage
                </blockquote>
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Service to humanity is service to God. See the divine in every being and act with compassion." - A Teaching from the Dwaraka Lineage
                </blockquote>
             </div>
          </TabsContent>

          <TabsContent value="events">
             <p className="text-center text-muted-foreground mb-8">A filtered view of upcoming and recent events related to the Dwaraka Peetham. (This is placeholder data)</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Janmashtami Mahotsav</CardTitle>
                        <p className="text-sm text-muted-foreground">August 26, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>Grand celebrations for Sri Krishna Janmashtami, attracting devotees from across the globe for special pujas and festivities.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Shankara Jayanti</CardTitle>
                        <p className="text-sm text-muted-foreground">May 12, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>Celebrations marking the birth anniversary of Jagadguru Sri Adi Shankaracharya, with special lectures on Advaita Vedanta.</p>
                    </CardContent>
                </Card>
             </div>
          </TabsContent>
          
          <TabsContent value="gallery">
             <div className="space-y-12">
                <div>
                    <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 1" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="dwaraka temple" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 2" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="acharya giving discourse" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 3" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="ganges river" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 4" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="ancient scripture" />
                    </div>
                </div>
                <div>
                    <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Archive</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Understanding 'Tat Tvam Asi'</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Video Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Glimpses of Daily Puja</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Video Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
             </div>
          </TabsContent>
           <TabsContent value="seva">
            <h3 className="font-headline text-2xl text-primary mb-6">Seva Opportunities at Dwaraka</h3>
            {dwarakaSeva.length > 0 ? (
                <div className="space-y-4">
                    {dwarakaSeva.map(opp => (
                        <Card key={opp.id}>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">{opp.title}</CardTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                                    <span className="flex items-center gap-1.5">{opp.locationType === 'On-site' ? <MapPin className="h-4 w-4" /> : <Globe className="h-4 w-4" />} {opp.cityRegion}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80 mb-4">{opp.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {opp.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                </div>
                                <Button asChild size="sm">
                                    <a href={opp.applicationLink === '#' ? `mailto:${opp.contactEmail}` : opp.applicationLink} target="_blank" rel="noopener noreferrer">I'm Interested</a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">There are currently no specific Seva opportunities listed for Dwaraka. Please check the main <Link href="/seva" className="text-accent underline">Seva Hub</Link> for remote opportunities or contact the Peetham directly.</p>
            )}

            <Separator className="my-12" />

            <h3 className="font-headline text-2xl text-primary mb-6">Main Ashram & Center</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Shree Sharada Peeth</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0"/><span>Near Iskon Gate, Dwarka, Gujarat - 361335, India.</span></p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/><a href="mailto:info.dwaraka@example.com" className="text-accent hover:underline">info.dwaraka@example.com</a></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                     <Image src="https://placehold.co/1200x600.png" alt="Map of Dwaraka Peetham" width={1200} height={600} className="rounded-lg object-cover w-full h-full" data-ai-hint="city map" />
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
