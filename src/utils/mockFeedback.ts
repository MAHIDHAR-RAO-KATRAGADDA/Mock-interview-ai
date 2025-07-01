import { Feedback, Answer, InterviewDomain } from '../types/interview';

export const generateMockFeedback = (
  answers: Answer[], 
  domain: InterviewDomain,
  selectedSkills: string[]
): Feedback => {
  // Enhanced feedback generation with skill-specific analysis
  
  const answerLengths = answers.map(a => a.text.length);
  const avgLength = answerLengths.reduce((a, b) => a + b, 0) / answerLengths.length;
  
  // Calculate follow-up engagement
  const totalFollowUps = answers.reduce((sum, answer) => 
    sum + (answer.followUpAnswers?.length || 0), 0
  );
  
  // Base scoring
  let score = 50; // Base score
  
  // Answer quality scoring
  if (avgLength > 150) score += 15; // Detailed answers
  if (avgLength > 250) score += 10; // Very detailed answers
  if (avgLength > 350) score += 5;  // Exceptionally detailed
  
  // Completion bonus
  if (answers.length >= 5) score += 10;
  if (answers.length >= 8) score += 5;
  
  // Follow-up engagement bonus
  if (totalFollowUps > 0) score += Math.min(totalFollowUps * 3, 15);
  
  // Consistency bonus (similar answer lengths indicate consistent effort)
  const lengthVariance = Math.sqrt(answerLengths.reduce((sum, len) => 
    sum + Math.pow(len - avgLength, 2), 0) / answerLengths.length);
  if (lengthVariance < avgLength * 0.5) score += 5;
  
  // Cap at 100
  score = Math.min(score, 100);

  // Generate skill-specific breakdown
  const skillBreakdown = selectedSkills.map(skill => {
    const skillAnswers = answers.filter(answer => {
      // Find the question for this answer and check if it matches the skill
      return true; // Simplified for mock - in real implementation, would match question to skill
    });
    
    const skillScore = Math.max(40, score + (Math.random() * 20 - 10)); // Add some variance
    
    return {
      skill,
      score: Math.round(skillScore),
      feedback: generateSkillFeedback(skill, skillScore)
    };
  });

  const strengths = generateStrengths(score, domain, totalFollowUps, avgLength);
  const improvements = generateImprovements(score, domain, avgLength);
  const nextSteps = generateNextSteps(domain, selectedSkills, score);

  return {
    score: Math.round(score),
    strengths,
    improvements,
    overallFeedback: generateOverallFeedback(score, domain, totalFollowUps, avgLength),
    nextSteps,
    skillBreakdown
  };
};

const generateSkillFeedback = (skill: string, score: number): string => {
  if (score >= 80) {
    return `Excellent demonstration of ${skill} knowledge with clear examples and deep understanding.`;
  } else if (score >= 65) {
    return `Good grasp of ${skill} concepts with room for more specific examples and technical depth.`;
  } else {
    return `Basic understanding of ${skill} shown. Focus on building more hands-on experience and specific examples.`;
  }
};

const generateStrengths = (score: number, domain: InterviewDomain, followUps: number, avgLength: number): string[] => {
  const strengths = [];
  
  if (avgLength > 200) {
    strengths.push('Provided detailed and comprehensive answers');
  }
  
  if (followUps > 0) {
    strengths.push('Engaged well with follow-up questions, showing depth of knowledge');
  }
  
  if (score >= 75) {
    strengths.push(`Demonstrated strong understanding of ${domain.title} concepts`);
  }
  
  strengths.push('Maintained professional communication throughout the interview');
  
  if (avgLength > 300) {
    strengths.push('Showed ability to elaborate on complex topics with specific examples');
  }
  
  return strengths.slice(0, 4); // Limit to top strengths
};

const generateImprovements = (score: number, domain: InterviewDomain, avgLength: number): string[] => {
  const improvements = [];
  
  if (avgLength < 150) {
    improvements.push('Provide more detailed explanations with specific examples');
  }
  
  if (score < 70) {
    improvements.push('Deepen technical knowledge in core areas');
  }
  
  improvements.push('Consider using the STAR method (Situation, Task, Action, Result) for behavioral questions');
  
  if (avgLength < 200) {
    improvements.push('Include quantifiable results and metrics in your examples');
  }
  
  improvements.push('Practice explaining complex concepts in simpler terms');
  
  return improvements.slice(0, 3); // Limit to top improvements
};

const generateNextSteps = (domain: InterviewDomain, skills: string[], score: number): string[] => {
  const steps = [];
  
  if (score < 70) {
    steps.push(`Review fundamental concepts in ${skills[0]} and ${skills[1] || 'core areas'}`);
  }
  
  steps.push('Practice more behavioral questions using structured frameworks');
  steps.push('Prepare 3-5 detailed examples from your experience for different question types');
  
  if (domain.id === 'software-engineer') {
    steps.push('Practice coding problems and system design scenarios');
  } else if (domain.id === 'data-scientist') {
    steps.push('Work on explaining statistical concepts and ML algorithms clearly');
  } else if (domain.id === 'product-manager') {
    steps.push('Develop case studies showing product thinking and user empathy');
  }
  
  steps.push('Record yourself answering questions to improve delivery and confidence');
  
  return steps.slice(0, 4);
};

const generateOverallFeedback = (score: number, domain: InterviewDomain, followUps: number, avgLength: number): string => {
  if (score >= 85) {
    return `Excellent performance! You demonstrated strong expertise in ${domain.title} with detailed, well-structured answers. ${followUps > 0 ? 'Your engagement with follow-up questions showed impressive depth of knowledge. ' : ''}You're well-prepared for interviews in this domain.`;
  } else if (score >= 70) {
    return `Good job! You showed solid understanding of ${domain.title} concepts and provided thoughtful answers. ${avgLength > 200 ? 'Your detailed responses demonstrate good preparation. ' : ''}With some additional practice on specific examples and technical depth, you'll be very competitive.`;
  } else if (score >= 55) {
    return `You're on the right track! You have a foundation in ${domain.title}, but there's room for improvement. Focus on providing more detailed examples and deepening your technical knowledge. ${followUps === 0 ? 'Try to engage more with follow-up questions to show your thinking process. ' : ''}Keep practicing!`;
  } else {
    return `This interview highlighted areas for growth in ${domain.title}. Focus on building stronger foundational knowledge and preparing specific examples from your experience. Consider additional study and practice before your next interview.`;
  }
};