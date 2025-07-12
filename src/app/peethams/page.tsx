import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, icons } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import { CurrentAcharyas } from '@/components/peethams/CurrentAcharyas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'The Four Peethams | Sanatana Peethams Portal',
  description: 'Explore the four cardinal Peethams established by Adi Shankaracharya: Sringeri, Dwaraka, Puri, and Jyotirmath. Learn about their history, teachings, and significance.',
};

const peethamTableData = [
    { peetham: 'Dakṣiṇāmnāya Śrī Śāradā Pīṭham', location: 'Sringeri, Karnataka (South)', veda: 'Kṛṣṇa Yajur Veda', mahavakya: 'Ahaṃ Brahmāsmi (I am Brahman)'},
    { peetham: 'Pūrvāmnāya Śrī Govardhana Pīṭham', location: 'Puri, Odisha (East)', veda: 'Ṛg Veda', mahavakya: 'Prajñānaṃ Brahma (Consciousness is Brahman)'},
    { peetham: 'Paścimāmnāya Śrī Śāradā Pīṭham', location: 'Dwaraka, Gujarat (West)', veda: 'Sāma Veda', mahavakya: 'Tattvamasi (That Thou Art)'},
    { peetham: 'Uttarāmnāya Śrī Jyotir Pīṭham', location: 'Joshimath, Uttarakhand (North)', veda: 'Atharva Veda', mahavakya: 'Ayamātmā Brahma (This Self is Brahman)'},
];

export default function PeethamsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <div className="text-center mb-16">
          <div className="mb-8 mx-auto inline-block relative h-[150px] w-[150px]">
            <Image
              src="https://placehold.co/150x150.png"
              alt="A placeholder image of Jagadguru Adi Shankaracharya"
              data-ai-hint="adi shankaracharya"
              width={150}
              height={150}
              className="mx-auto object-cover rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
            The Jagadguru Shankaracharyas of the Four Amnaya Peethams
          </h1>
        </div>

        <article className="prose prose-lg lg:prose-xl max-w-none mx-auto text-foreground/90 leading-relaxed space-y-6 prose-h2:font-headline prose-h2:text-primary/90 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4">
            <section>
              <h2>The Enduring Legacy of the Amnaya Peethams</h2>
              <p>The institutional framework of the four cardinal Maṭhas or Pīṭhams (monastic seats) stands as one of the most enduring organizational structures within Sanatana Dharma. Its establishment is attributed to the 8th-century philosopher-saint Adi Shankaracharya, revered by followers as an Avatāra of Lord Shiva, who traversed the subcontinent to revitalize the Upanishadic philosophy of Advaita Vedanta and unify the diverse spiritual traditions of India.</p>
              
              <h3>The Vision of Adi Shankaracharya: Establishment and Purpose</h3>
              <p>With profound foresight, Adi Shankaracharya established a network of four spiritual epicenters at the cardinal points of the Indian subcontinent. These Amnāya Pīṭhams were designed to preserve and propagate the teachings of the Vedas and the non-dualistic philosophy of Advaita for millennia. The four centers are the Dakṣiṇāmnāya Śrī Śāradā Pīṭham at Sringeri in the South, the Pūrvāmnāya Śrī Govardhana Pīṭham at Puri in the East, the Paścimāmnāya Śrī Śāradā Pīṭham at Dwaraka in the West, and the Uttarāmnāya Śrī Jyotir Pīṭham at Badrinath in the North. In addition to the Maṭhas, Adi Shankaracharya also consecrated major pilgrimage sites, such as the temple at Badrinath, enshrining it as a holy destination for devotees.</p>
              
              <h3>The Four Cardinal Mutts: An Overview</h3>
              <p>Each Maṭha was entrusted with the stewardship of one of the four Vedas and a Mahāvākya (a great Upanishadic utterance) that encapsulates the essence of Advaitic realization. This structure created a robust framework for spiritual education and governance that continues to this day.</p>
              <p>However, a notable point of divergence exists among the Peethams regarding their own historical timelines. This is most apparent in the differing chronologies for Adi Shankaracharya himself. The Govardhana Peetham at Puri, for instance, dates its origins to 486 BC and counts its present pontiff as the 145th in an unbroken lineage. In contrast, the Sringeri Sharada Peetham dates Adi Shankaracharya's life more recently, around 1,200 to 1,500 years ago, and identifies its current senior pontiff as the 36th Acharya. This discrepancy does not represent a simple error but reflects distinct traditional records and lineage counts (guru paramparā) maintained by each institution, which in some cases trace their origins to divine figures preceding Adi Shankaracharya.</p>
            </section>
        </article>

        <div className="my-12 not-prose">
            <Card>
                <CardHeader>
                    <CardTitle>The Four Amnāya Pīṭhams at a Glance</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Peetham (Monastery)</TableHead>
                                <TableHead>Location & Direction</TableHead>
                                <TableHead>Associated Veda</TableHead>
                                <TableHead>Mahavakya (Great Utterance)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {peethamTableData.map((row) => (
                                <TableRow key={row.peetham}>
                                    <TableCell className="font-medium">{row.peetham}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.veda}</TableCell>
                                    <TableCell>{row.mahavakya}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

         <article className="prose prose-lg lg:prose-xl max-w-none mx-auto text-foreground/90 leading-relaxed space-y-6 prose-h2:font-headline prose-h2:text-primary/90 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4">
            <section>
                 <h3>The Role of the Shankaracharya in Contemporary Sanatana Dharma</h3>
                 <p>The title of Shankaracharya denotes the head of one of these four cardinal Maṭhas. The pontiffs who hold this title wield immense spiritual authority and are regarded by millions of Hindus as the foremost protectors and interpreters of Sanatana Dharma. Their pronouncements on religious, social, and sometimes political matters carry significant weight and often shape public discourse. Their duties extend beyond spiritual guidance to include the administration of vast temple networks, educational institutions, and social welfare projects. They undertake extensive tours, known as Vijaya Yatras, to bless devotees, consecrate new temples, and propagate the tenets of Dharma across the country and abroad.</p>
            </section>
        </article>

        <section className="py-16 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">The Living Lineage: Current Shankaracharyas</h2>
                <p className="mt-3 text-lg text-foreground/80 max-w-3xl mx-auto">
                    Meet the present-day pontiffs who uphold the sacred tradition and guide millions of devotees worldwide.
                </p>
            </div>
            <CurrentAcharyas />
        </section>

      </div>
    </div>
  );
}
