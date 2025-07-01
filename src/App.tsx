import React, { useState } from 'react';
import { Header } from './components/Header';
import { DomainSelector } from './components/DomainSelector';
import { InterviewSetup } from './components/InterviewSetup';
import { SkillSelector } from './components/SkillSelector';
import { InterviewSession } from './components/InterviewSession';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { InterviewDomain, Answer, Feedback, InterviewSettings } from './types/interview';
import { generateMockFeedback } from './utils/mockFeedback';

type AppState = 'domain-selection' | 'interview-setup' | 'skill-selection' | 'interview-session' | 'feedback';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('domain-selection');
  const [selectedDomain, setSelectedDomain] = useState<InterviewDomain | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [interviewSettings, setInterviewSettings] = useState<InterviewSettings>({
    numberOfQuestions: 8,
    includeFollowUps: true,
    difficulty: 'mixed'
  });
  const [interviewAnswers, setInterviewAnswers] = useState<Answer[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleDomainSelect = (domain: InterviewDomain) => {
    setSelectedDomain(domain);
    setCurrentState('interview-setup');
  };

  const handleStartInterview = () => {
    setCurrentState('skill-selection');
  };

  const handleSkillsSelected = (skills: string[], settings: InterviewSettings) => {
    setSelectedSkills(skills);
    setInterviewSettings(settings);
    setCurrentState('interview-session');
  };

  const handleInterviewComplete = async (answers: Answer[]) => {
    setInterviewAnswers(answers);
    
    // Generate comprehensive feedback
    const generatedFeedback = generateMockFeedback(answers, selectedDomain!, selectedSkills);
    setFeedback(generatedFeedback);
    
    setCurrentState('feedback');
  };

  const handleStartNew = () => {
    setCurrentState('domain-selection');
    setSelectedDomain(null);
    setSelectedSkills([]);
    setInterviewAnswers([]);
    setFeedback(null);
  };

  const handleBack = () => {
    switch (currentState) {
      case 'interview-setup':
        setCurrentState('domain-selection');
        setSelectedDomain(null);
        break;
      case 'skill-selection':
        setCurrentState('interview-setup');
        break;
      case 'interview-session':
        setCurrentState('skill-selection');
        break;
      case 'feedback':
        setCurrentState('domain-selection');
        setSelectedDomain(null);
        setSelectedSkills([]);
        setInterviewAnswers([]);
        setFeedback(null);
        break;
    }
  };

  const getHeaderTitle = () => {
    switch (currentState) {
      case 'interview-setup':
        return selectedDomain?.title;
      case 'skill-selection':
        return `${selectedDomain?.title} - Customize`;
      case 'interview-session':
        return `${selectedDomain?.title} Interview`;
      case 'feedback':
        return 'Interview Results';
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        showBackButton={currentState !== 'domain-selection'}
        onBack={handleBack}
        title={getHeaderTitle()}
      />
      
      <main className="pb-8">
        {currentState === 'domain-selection' && (
          <DomainSelector onDomainSelect={handleDomainSelect} />
        )}
        
        {currentState === 'interview-setup' && selectedDomain && (
          <InterviewSetup 
            domain={selectedDomain}
            onStartInterview={handleStartInterview}
          />
        )}

        {currentState === 'skill-selection' && selectedDomain && (
          <SkillSelector
            domain={selectedDomain}
            onSkillsSelected={handleSkillsSelected}
            onBack={handleBack}
          />
        )}
        
        {currentState === 'interview-session' && selectedDomain && (
          <InterviewSession 
            domain={selectedDomain}
            selectedSkills={selectedSkills}
            settings={interviewSettings}
            onComplete={handleInterviewComplete}
          />
        )}
        
        {currentState === 'feedback' && feedback && selectedDomain && (
          <FeedbackDisplay 
            feedback={feedback}
            domain={selectedDomain}
            onStartNew={handleStartNew}
          />
        )}
      </main>
    </div>
  );
}

export default App;