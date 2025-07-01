export interface InterviewDomain {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface Question {
  id: string;
  text: string;
  type: 'technical' | 'behavioral' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
  followUps?: string[];
}

export interface Answer {
  questionId: string;
  text: string;
  timestamp: Date;
  followUpAnswers?: { question: string; answer: string }[];
}

export interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  overallFeedback: string;
  nextSteps: string[];
  skillBreakdown: { skill: string; score: number; feedback: string }[];
}

export interface InterviewSession {
  id: string;
  domain: InterviewDomain;
  selectedSkills: string[];
  questions: Question[];
  answers: Answer[];
  feedback?: Feedback;
  status: 'setup' | 'skill-selection' | 'in-progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
}

export interface InterviewSettings {
  numberOfQuestions: number;
  includeFollowUps: boolean;
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
}