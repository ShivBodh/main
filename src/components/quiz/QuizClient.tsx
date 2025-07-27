
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { peethamQuiz, QuizQuestion } from '@/lib/quiz-data';
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function QuizClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuizQuestion[]>(peethamQuiz);
  const [isClient, setIsClient] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Shuffle questions and set client-side flag
    setIsClient(true);
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);
  
  useEffect(() => {
      // Save score to local storage only on the client side when the quiz is finished.
      if (isClient && quizFinished && user) {
        const key = `quizScore_${user.uid}`;
        const scoreStr = localStorage.getItem(key);
        const existingScore = scoreStr ? parseInt(scoreStr, 10) : 0;
        if (score > existingScore) {
          localStorage.setItem(key, score.toString());
          toast({
            title: 'New High Score!',
            description: `Your new score of ${score} has been saved. Check your achievements on your profile!`,
          });
        }
      }
  }, [quizFinished, score, user, toast, isClient]);


  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);

    // Auto-advance if correct
    if (correct) {
      setTimeout(() => {
        handleNextQuestion();
      }, 1500);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setShowResult(false);
    setIsCorrect(null);
    // Re-shuffle questions for a new game
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
  };
  
  if (!isClient) {
    return (
        <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
           <div className="text-center mb-12">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 flex justify-center">
        <Card className="w-full text-center">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-muted-foreground">Your Final Score:</p>
            <p className="text-6xl font-bold text-primary my-4">
              {score} / {questions.length}
            </p>
            <p className="text-2xl font-semibold text-accent">{percentage}%</p>
          </CardContent>
          <CardFooter>
            <Button onClick={restartQuiz} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
       <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                Peetham Knowledge Quiz
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Test your knowledge about the four cardinal Peethams.
            </p>
        </div>
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
            <span className="mx-2">|</span>
            Score: {score}
          </p>
          <CardTitle className="font-headline text-2xl mt-2">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selectedAnswer ?? ''} onValueChange={setSelectedAnswer} disabled={showResult}>
            {currentQuestion.options.map((option, index) => {
              const isSelectedCorrect = showResult && option === currentQuestion.correctAnswer;
              const isSelectedIncorrect = showResult && option === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer;
              
              return (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-md border transition-colors 
                  ${isSelectedIncorrect ? 'border-destructive bg-destructive/10' : ''} 
                  ${isSelectedCorrect ? 'border-primary bg-primary/10' : ''}`
                }>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                  {isSelectedCorrect && <CheckCircle className="h-5 w-5 text-primary" />}
                  {isSelectedIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
                </div>
              );
            })}
          </RadioGroup>
          {showResult && (
            <div className="p-4 bg-muted/50 rounded-md text-sm animate-in fade-in">
                <p className="font-semibold">Explanation:</p>
                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
            {showResult ? (
                isCorrect === false && (
                    <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )
            ) : (
                <Button onClick={handleCheckAnswer} disabled={!selectedAnswer} className="w-full">
                    Check Answer
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}

    