import React, { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle, MessageSquare, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { InterviewDomain, Question, Answer, InterviewSettings } from '../types/interview';
import { generateQuestions, getFollowUpQuestions } from '../utils/questionGenerator';

interface InterviewSessionProps {
  domain: InterviewDomain;
  selectedSkills: string[];
  settings: InterviewSettings;
  onComplete: (answers: Answer[]) => void;
}

export const InterviewSession: React.FC<InterviewSessionProps> = ({ 
  domain, 
  selectedSkills,
  settings,
  onComplete 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
  const [followUpAnswers, setFollowUpAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [currentFollowUpAnswer, setCurrentFollowUpAnswer] = useState('');
  const [startTime] = useState(new Date());
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);

  useEffect(() => {
    initializeInterview();
  }, [domain, selectedSkills, settings]);

  const initializeInterview = async () => {
    setIsLoading(true);
    try {
      const generatedQuestions = generateQuestions(domain, selectedSkills, settings);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return;

    setIsSubmitting(true);
    
    const answer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      text: currentAnswer.trim(),
      timestamp: new Date(),
      followUpAnswers: []
    };

    // Generate follow-up questions for this answer
    const followUps = getFollowUpQuestions(questions[currentQuestionIndex], settings.includeFollowUps);
    
    if (followUps.length > 0) {
      setFollowUpQuestions(followUps);
      setCurrentFollowUpIndex(0);
      setFollowUpAnswers([]);
      setCurrentAnswer('');
      setIsSubmitting(false);
      return;
    }

    // No follow-ups, proceed to next question
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setCurrentAnswer('');
    
    moveToNextQuestion(newAnswers);
    setIsSubmitting(false);
  };

  const handleSubmitFollowUp = async () => {
    if (!currentFollowUpAnswer.trim()) return;

    const newFollowUpAnswer = {
      question: followUpQuestions[currentFollowUpIndex],
      answer: currentFollowUpAnswer.trim()
    };

    const updatedFollowUpAnswers = [...followUpAnswers, newFollowUpAnswer];
    setFollowUpAnswers(updatedFollowUpAnswers);
    setCurrentFollowUpAnswer('');

    if (currentFollowUpIndex < followUpQuestions.length - 1) {
      // More follow-ups to go
      setCurrentFollowUpIndex(currentFollowUpIndex + 1);
    } else {
      // All follow-ups completed, save the main answer with follow-ups
      const mainAnswer: Answer = {
        questionId: questions[currentQuestionIndex].id,
        text: currentAnswer,
        timestamp: new Date(),
        followUpAnswers: updatedFollowUpAnswers
      };

      const newAnswers = [...answers, mainAnswer];
      setAnswers(newAnswers);
      
      // Reset follow-up state
      setFollowUpQuestions([]);
      setCurrentFollowUpIndex(0);
      setFollowUpAnswers([]);
      setCurrentAnswer('');
      
      moveToNextQuestion(newAnswers);
    }
  };

  const moveToNextQuestion = (newAnswers: Answer[]) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleEndInterview = () => {
    setShowEndConfirmation(true);
  };

  const confirmEndInterview = () => {
    // If user has answered at least one question, provide feedback
    if (answers.length > 0) {
      onComplete(answers);
    } else {
      // If no answers, go back to domain selection or show a message
      setShowEndConfirmation(false);
      // You might want to add a callback prop to handle this case
    }
  };

  const cancelEndInterview = () => {
    setShowEndConfirmation(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Shift+Enter to submit
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      if (followUpQuestions.length > 0) {
        handleSubmitFollowUp();
      } else {
        handleSubmitAnswer();
      }
    }
    // Allow Ctrl+Enter as alternative (backward compatibility)
    else if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      if (followUpQuestions.length > 0) {
        handleSubmitFollowUp();
      } else {
        handleSubmitAnswer();
      }
    }
  };

  const getElapsedTime = () => {
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60);
    return elapsed;
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Preparing Your Interview
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Generating personalized questions for {selectedSkills.join(', ')}...
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isInFollowUp = followUpQuestions.length > 0;

  // End Interview Confirmation Modal
  if (showEndConfirmation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-fit mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            End Interview Early?
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            {answers.length > 0 
              ? `You've answered ${answers.length} out of ${questions.length} questions. You'll receive feedback based on your current progress.`
              : "You haven't answered any questions yet. Are you sure you want to end the interview?"
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={cancelEndInterview}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Continue Interview
            </button>
            
            <button
              onClick={confirmEndInterview}
              disabled={answers.length === 0}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span>{answers.length > 0 ? 'End & Get Feedback' : 'End Interview'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress and Stats */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            {isInFollowUp && (
              <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                Follow-up {currentFollowUpIndex + 1} of {followUpQuestions.length}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{getElapsedTime()} min</span>
            </div>
            <span>{Math.round(progress)}% Complete</span>
            <button
              onClick={handleEndInterview}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors duration-200"
            >
              End Interview
            </button>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        {!isInFollowUp ? (
          // Main Question
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md text-xs font-medium">
                {currentQuestion.type.toUpperCase()}
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium">
                {currentQuestion.skill}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed mb-4">
              {currentQuestion.text}
            </h3>

            {currentAnswer && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Answer:</h4>
                <p className="text-gray-800 dark:text-gray-200">{currentAnswer}</p>
              </div>
            )}
          </div>
        ) : (
          // Follow-up Question
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Follow-up Question</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed mb-4">
              {followUpQuestions[currentFollowUpIndex]}
            </h3>

            {/* Show previous follow-up answers */}
            {followUpAnswers.map((fa, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Q: {fa.question}</h4>
                <p className="text-gray-800 dark:text-gray-200">A: {fa.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Answer Input */}
        <div className="space-y-4">
          <textarea
            value={isInFollowUp ? currentFollowUpAnswer : currentAnswer}
            onChange={(e) => isInFollowUp ? setCurrentFollowUpAnswer(e.target.value) : setCurrentAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here... (Shift+Enter to submit)"
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            disabled={isSubmitting}
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-1">
                {isInFollowUp 
                  ? "Provide additional details for this follow-up question."
                  : "Take your time to provide a detailed answer."
                }
              </p>
              <p className="text-xs">
                💡 <strong>Tip:</strong> Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Shift</kbd> + <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Enter</kbd> to submit
              </p>
            </div>
            
            <button
              onClick={isInFollowUp ? handleSubmitFollowUp : handleSubmitAnswer}
              disabled={(!currentAnswer.trim() && !isInFollowUp) || (!currentFollowUpAnswer.trim() && isInFollowUp) || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : isInFollowUp ? (
                currentFollowUpIndex === followUpQuestions.length - 1 ? (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Continue</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Next Follow-up</span>
                  </>
                )
              ) : currentQuestionIndex === questions.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Interview</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Next Question</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Interview Progress Summary */}
      {answers.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interview Progress</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {answers.map((answer, index) => {
              const question = questions.find(q => q.id === answer.questionId);
              return (
                <div key={answer.questionId} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Q{index + 1}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{question?.skill}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {question?.text}
                  </p>
                  {answer.followUpAnswers && answer.followUpAnswers.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                        +{answer.followUpAnswers.length} follow-up{answer.followUpAnswers.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};