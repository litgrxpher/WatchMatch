
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { watchMatchQuiz, type WatchMatchQuizOutput } from '@/ai/flows/watch-match-quiz';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

const formSchema = z.object({
  lifestyle: z.string().min(10, { message: 'Please describe your lifestyle in a bit more detail.' }),
  stylePreferences: z.string().min(5, { message: 'Please describe your style preferences.' }),
  budget: z.string().min(1, { message: 'Budget is required.' }),
  desiredFeatures: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function WatchMatchQuiz() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WatchMatchQuizOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lifestyle: '',
      stylePreferences: '',
      budget: '',
      desiredFeatures: '',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const quizResult = await watchMatchQuiz(values);
      setResult(quizResult);
    } catch (e) {
      setError('An error occurred while getting recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <Card className="bg-card/10 backdrop-blur-2xl border-white/10 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <Wand2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">WatchMatch</CardTitle>
          <CardDescription className="text-md">Answer a few questions and our AI will find your perfect watch.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="lifestyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your lifestyle?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Office worker, enjoy hiking on weekends, attend formal events occasionally." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stylePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your style?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Minimalist, vintage, bold and modern, classic elegance." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your budget?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ₹50,000 - ₹1,00,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any desired features? (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Water resistance, automatic movement, sapphire crystal." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-center p-0 pt-4">
                <Button type="submit" disabled={loading} size="lg">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding your match...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get My Recommendations
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {error && (
        <div className="mt-8 text-center text-destructive">
          {error}
        </div>
      )}

      {result && (
        <Card className="mt-8 animate-fade-in bg-card/10 backdrop-blur-2xl border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Your Watch Recommendations</CardTitle>

          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Suggested Watches:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {result.suggestedWatches.split(',').map((watch, index) => (
                  <li key={index} className="p-4 bg-background/50 rounded-lg border border-white/10">
                    {watch.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Why they're a match:</h3>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
