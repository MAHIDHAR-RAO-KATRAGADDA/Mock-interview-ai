import { Question, InterviewDomain, InterviewSettings } from '../types/interview';
import { questionBank } from '../data/questionBank';

export const generateQuestions = (
  domain: InterviewDomain,
  selectedSkills: string[],
  settings: InterviewSettings
): Question[] => {
  const availableQuestions: Question[] = [];
  
  // Collect questions for selected skills
  selectedSkills.forEach(skill => {
    if (questionBank[skill]) {
      availableQuestions.push(...questionBank[skill]);
    }
  });

  // Filter by difficulty if not mixed
  let filteredQuestions = availableQuestions;
  if (settings.difficulty !== 'mixed') {
    filteredQuestions = availableQuestions.filter(q => q.difficulty === settings.difficulty);
  }

  // If we don't have enough questions after filtering, fall back to all questions for the skills
  if (filteredQuestions.length < settings.numberOfQuestions) {
    filteredQuestions = availableQuestions;
  }

  // Shuffle and select the required number of questions
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  
  // Ensure we have a good mix of question types and skills
  const selected: Question[] = [];
  const usedSkills = new Set<string>();
  const questionTypes = new Set<string>();

  // First pass: try to get diverse questions
  for (const question of shuffled) {
    if (selected.length >= settings.numberOfQuestions) break;
    
    // Prefer questions from skills we haven't covered yet
    if (!usedSkills.has(question.skill) || usedSkills.size >= selectedSkills.length) {
      selected.push(question);
      usedSkills.add(question.skill);
      questionTypes.add(question.type);
    }
  }

  // Second pass: fill remaining slots if needed
  for (const question of shuffled) {
    if (selected.length >= settings.numberOfQuestions) break;
    
    if (!selected.find(q => q.id === question.id)) {
      selected.push(question);
    }
  }

  return selected.slice(0, settings.numberOfQuestions);
};

export const getFollowUpQuestions = (question: Question, includeFollowUps: boolean): string[] => {
  if (!includeFollowUps || !question.followUps) {
    return [];
  }
  
  // Randomly select 1-2 follow-up questions
  const shuffled = [...question.followUps].sort(() => Math.random() - 0.5);
  const numFollowUps = Math.min(Math.floor(Math.random() * 2) + 1, shuffled.length);
  
  return shuffled.slice(0, numFollowUps);
};