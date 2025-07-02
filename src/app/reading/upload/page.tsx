
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload a Book | Sanatana Peethams Portal',
  description: 'Contribute to our community library by uploading a book by an Acharya of the Shankara lineage. All submissions are reviewed by our team.',
};

export default function UploadBookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !description || !pdfFile) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields and select a PDF file to upload.',
      });
      return;
    }
    
    // This is a placeholder for the actual upload logic.
    // In a real application, this would involve:
    // 1. Authenticating the user.
    // 2. Getting secure upload URLs from a serverless function.
    // 3. Uploading the files to a service like Firebase Storage.
    // 4. Saving the book metadata (title, author, description, file URLs) to a database like Firestore.

    setIsSubmitting(true);
    console.log('Submitting book:', { 
        title, 
        author, 
        description, 
        pdfFileName: pdfFile.name,
        coverImageFileName: coverImageFile?.name 
    });

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    toast({
      title: 'Submission Received!',
      description: "Thank you for your contribution. Your book will be reviewed before being added to the library.",
    });

    // Reset form
    setTitle('');
    setAuthor('');
    setDescription('');
    setPdfFile(null);
    setCoverImageFile(null);
    const pdfInput = document.getElementById('pdf-file') as HTMLInputElement;
    if(pdfInput) pdfInput.value = '';
    const imageInput = document.getElementById('cover-image-file') as HTMLInputElement;
    if(imageInput) imageInput.value = '';
  };

  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Upload a Book
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Contribute to our community library by sharing a valuable text.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
            <CardDescription>
              Please provide the details for the book you wish to upload. All submissions will be reviewed. Note that user authentication will be required for this feature in the future.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Vivekachudamani"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Adi Shankaracharya"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief summary of the book's content and significance."
                disabled={isSubmitting}
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf-file">PDF File</Label>
              <Input
                id="pdf-file"
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
                disabled={isSubmitting}
                required
              />
               {pdfFile && <p className="text-sm text-muted-foreground mt-2">Selected PDF: {pdfFile.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover-image-file">Book Cover Image (Optional)</Label>
              <Input
                id="cover-image-file"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => setCoverImageFile(e.target.files ? e.target.files[0] : null)}
                disabled={isSubmitting}
              />
               {coverImageFile && <p className="text-sm text-muted-foreground mt-2">Selected Image: {coverImageFile.name}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" asChild>
                <Link href="/reading">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Submit for Review
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
