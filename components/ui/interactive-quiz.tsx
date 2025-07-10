"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface InteractiveQuizProps {
  title: string
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

export function InteractiveQuiz({ title, questions, onComplete }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? score + 1 : score
      onComplete?.(finalScore)
    }
  }

  const handleShowResult = () => {
    setShowResult(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (currentQuestion >= questions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-gray-600">You scored {Math.round((score / questions.length) * 100)}%</p>
          </div>
          <Button onClick={() => window.location.reload()}>Take Quiz Again</Button>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>
              Score: {score}/{currentQuestion}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-500 bg-red-50 text-red-700"
                    : "border-blue-500 bg-blue-50"
                  : showResult && index === question.correctAnswer
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <div>
                    {index === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-2">
          {selectedAnswer !== null && !showResult && (
            <Button onClick={handleShowResult} variant="outline">
              Show Answer
            </Button>
          )}
          {showResult && (
            <Button onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
