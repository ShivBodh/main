
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { peethamQuiz, QuizQuestion } from '@/lib/quiz-data';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export default function QuizPage() {
  const [questions] = useState<QuizQuestion[]>(peethamQuiz.sort(() => Math.random() - 0.5));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (showResult) { // only count score if result was shown
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    }
    
    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswerSelection = () => {
    if (!selectedAnswer) return;
    setShowResult(true);

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        // If correct, we can move to the next question automatically after a short delay
        setTimeout(() => {
            handleNext();
        }, 1500);
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setShowResult(false);
  };

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
          <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <CardTitle className="font-headline text-2xl mt-2">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selectedAnswer ?? ''} onValueChange={setSelectedAnswer} disabled={showResult}>
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              return (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-md border transition-colors ${showResult && isSelected && !isCorrect ? 'border-destructive bg-destructive/10' : ''} ${showResult && isCorrect ? 'border-primary bg-primary/10' : ''}`}>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                  {showResult && isCorrect && <CheckCircle className="h-5 w-5 text-primary" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
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
                 <Button onClick={handleNext} className="w-full">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            ) : (
                <Button onClick={handleAnswerSelection} disabled={!selectedAnswer} className="w-full">
                    Check Answer
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
