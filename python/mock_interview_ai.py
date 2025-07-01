#!/usr/bin/env python3
"""
Mock Interview AI - Python Implementation
A comprehensive mock interview system with AI-powered feedback
"""

import json
import random
import datetime
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
from enum import Enum

class QuestionType(Enum):
    TECHNICAL = "technical"
    BEHAVIORAL = "behavioral"
    SITUATIONAL = "situational"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    MIXED = "mixed"

@dataclass
class Question:
    id: str
    text: str
    type: QuestionType
    difficulty: Difficulty
    skill: str
    follow_ups: List[str]

@dataclass
class InterviewDomain:
    id: str
    title: str
    description: str
    icon: str
    skills: List[str]

@dataclass
class Answer:
    question_id: str
    text: str
    timestamp: datetime.datetime
    follow_up_answers: List[Dict[str, str]]

@dataclass
class SkillFeedback:
    skill: str
    score: int
    feedback: str

@dataclass
class Feedback:
    score: int
    strengths: List[str]
    improvements: List[str]
    overall_feedback: str
    next_steps: List[str]
    skill_breakdown: List[SkillFeedback]

@dataclass
class InterviewSettings:
    number_of_questions: int = 8
    include_follow_ups: bool = True
    difficulty: Difficulty = Difficulty.MIXED

class MockInterviewAI:
    def __init__(self):
        self.domains = self._initialize_domains()
        self.question_bank = self._initialize_question_bank()
        self.current_session = None
    
    def _initialize_domains(self) -> List[InterviewDomain]:
        """Initialize interview domains"""
        return [
            InterviewDomain(
                id="software-engineer",
                title="Software Engineer",
                description="Technical questions covering algorithms, data structures, system design, and coding best practices.",
                icon="Code",
                skills=["Algorithms", "Data Structures", "System Design", "Object-Oriented Programming", "Problem Solving"]
            ),
            InterviewDomain(
                id="frontend-developer",
                title="Frontend Developer",
                description="Questions focused on React, JavaScript, CSS, web performance, and user experience.",
                icon="Monitor",
                skills=["React", "JavaScript", "HTML/CSS", "Web Performance", "Responsive Design"]
            ),
            InterviewDomain(
                id="data-scientist",
                title="Data Scientist",
                description="Statistical analysis, machine learning, Python, data visualization, and business analytics.",
                icon="BarChart3",
                skills=["Machine Learning", "Statistics", "Python", "SQL", "Data Visualization"]
            ),
            InterviewDomain(
                id="product-manager",
                title="Product Manager",
                description="Product strategy, user research, roadmap planning, stakeholder management, and metrics.",
                icon="Target",
                skills=["Product Strategy", "User Research", "Analytics", "Roadmap Planning", "Stakeholder Management"]
            )
        ]
    
    def _initialize_question_bank(self) -> Dict[str, List[Question]]:
        """Initialize the question bank with sample questions"""
        return {
            "Algorithms": [
                Question(
                    id="algo-1",
                    text="Explain how you would approach solving a problem where you need to find the shortest path between two nodes in a graph.",
                    type=QuestionType.TECHNICAL,
                    difficulty=Difficulty.MEDIUM,
                    skill="Algorithms",
                    follow_ups=[
                        "What if the graph has negative edge weights?",
                        "How would you optimize this for very large graphs?",
                        "Can you implement Dijkstra's algorithm from scratch?"
                    ]
                ),
                Question(
                    id="algo-2",
                    text="Walk me through your thought process for optimizing a recursive solution that has overlapping subproblems.",
                    type=QuestionType.TECHNICAL,
                    difficulty=Difficulty.HARD,
                    skill="Algorithms",
                    follow_ups=[
                        "What's the difference between memoization and tabulation?",
                        "When would you choose one approach over the other?",
                        "Can you give me a real-world example where you've used dynamic programming?"
                    ]
                )
            ],
            "Data Structures": [
                Question(
                    id="ds-1",
                    text="When would you choose a hash table over a binary search tree, and vice versa?",
                    type=QuestionType.TECHNICAL,
                    difficulty=Difficulty.MEDIUM,
                    skill="Data Structures",
                    follow_ups=[
                        "How do you handle hash collisions?",
                        "What's the worst-case time complexity for hash table operations?",
                        "Can you implement a hash table from scratch?"
                    ]
                )
            ],
            "Python": [
                Question(
                    id="python-1",
                    text="Explain the difference between lists and tuples in Python, and when you'd use each.",
                    type=QuestionType.TECHNICAL,
                    difficulty=Difficulty.EASY,
                    skill="Python",
                    follow_ups=[
                        "What are the performance implications of each?",
                        "How do you handle large datasets efficiently in Python?",
                        "When would you use a set instead of a list?"
                    ]
                )
            ],
            "Machine Learning": [
                Question(
                    id="ml-1",
                    text="Explain the bias-variance tradeoff and how it affects model performance.",
                    type=QuestionType.TECHNICAL,
                    difficulty=Difficulty.MEDIUM,
                    skill="Machine Learning",
                    follow_ups=[
                        "How do you detect if your model is overfitting?",
                        "What techniques can you use to reduce overfitting?",
                        "When would you prefer a high-bias, low-variance model?"
                    ]
                )
            ]
        }
    
    def get_domains(self) -> List[InterviewDomain]:
        """Get all available interview domains"""
        return self.domains
    
    def generate_questions(self, domain: InterviewDomain, selected_skills: List[str], 
                          settings: InterviewSettings) -> List[Question]:
        """Generate questions based on domain, skills, and settings"""
        available_questions = []
        
        # Collect questions for selected skills
        for skill in selected_skills:
            if skill in self.question_bank:
                available_questions.extend(self.question_bank[skill])
        
        # Filter by difficulty if not mixed
        if settings.difficulty != Difficulty.MIXED:
            available_questions = [q for q in available_questions if q.difficulty == settings.difficulty]
        
        # Shuffle and select required number of questions
        random.shuffle(available_questions)
        
        # Ensure diversity in skills and question types
        selected_questions = []
        used_skills = set()
        
        for question in available_questions:
            if len(selected_questions) >= settings.number_of_questions:
                break
            
            # Prefer questions from skills we haven't covered yet
            if question.skill not in used_skills or len(used_skills) >= len(selected_skills):
                selected_questions.append(question)
                used_skills.add(question.skill)
        
        return selected_questions[:settings.number_of_questions]
    
    def get_follow_up_questions(self, question: Question, include_follow_ups: bool) -> List[str]:
        """Get follow-up questions for a given question"""
        if not include_follow_ups or not question.follow_ups:
            return []
        
        # Randomly select 1-2 follow-up questions
        num_follow_ups = min(random.randint(1, 2), len(question.follow_ups))
        return random.sample(question.follow_ups, num_follow_ups)
    
    def generate_feedback(self, answers: List[Answer], domain: InterviewDomain, 
                         selected_skills: List[str]) -> Feedback:
        """Generate comprehensive feedback based on answers"""
        if not answers:
            return Feedback(
                score=0,
                strengths=[],
                improvements=["Complete the interview to receive feedback"],
                overall_feedback="No answers provided",
                next_steps=["Start the interview"],
                skill_breakdown=[]
            )
        
        # Calculate metrics
        answer_lengths = [len(answer.text) for answer in answers]
        avg_length = sum(answer_lengths) / len(answer_lengths)
        total_follow_ups = sum(len(answer.follow_up_answers) for answer in answers)
        
        # Base scoring algorithm
        score = 50  # Base score
        
        # Answer quality scoring
        if avg_length > 150:
            score += 15
        if avg_length > 250:
            score += 10
        if avg_length > 350:
            score += 5
        
        # Completion bonus
        if len(answers) >= 5:
            score += 10
        if len(answers) >= 8:
            score += 5
        
        # Follow-up engagement bonus
        if total_follow_ups > 0:
            score += min(total_follow_ups * 3, 15)
        
        # Early completion penalty (if ended early)
        completion_ratio = len(answers) / max(1, len(selected_skills) * 2)  # Rough estimate
        if completion_ratio < 0.5:
            score -= 10
            
        # Cap at 100
        score = min(score, 100)
        
        # Generate skill breakdown
        skill_breakdown = []
        for skill in selected_skills:
            skill_score = max(40, score + random.randint(-10, 10))
            skill_breakdown.append(SkillFeedback(
                skill=skill,
                score=skill_score,
                feedback=self._generate_skill_feedback(skill, skill_score)
            ))
        
        return Feedback(
            score=score,
            strengths=self._generate_strengths(score, domain, total_follow_ups, avg_length, len(answers)),
            improvements=self._generate_improvements(score, domain, avg_length, len(answers)),
            overall_feedback=self._generate_overall_feedback(score, domain, total_follow_ups, avg_length, len(answers)),
            next_steps=self._generate_next_steps(domain, selected_skills, score),
            skill_breakdown=skill_breakdown
        )
    
    def _generate_skill_feedback(self, skill: str, score: int) -> str:
        """Generate feedback for a specific skill"""
        if score >= 80:
            return f"Excellent demonstration of {skill} knowledge with clear examples and deep understanding."
        elif score >= 65:
            return f"Good grasp of {skill} concepts with room for more specific examples and technical depth."
        else:
            return f"Basic understanding of {skill} shown. Focus on building more hands-on experience and specific examples."
    
    def _generate_strengths(self, score: int, domain: InterviewDomain, 
                           follow_ups: int, avg_length: float, num_answers: int) -> List[str]:
        """Generate list of strengths"""
        strengths = []
        
        if avg_length > 200:
            strengths.append("Provided detailed and comprehensive answers")
        
        if follow_ups > 0:
            strengths.append("Engaged well with follow-up questions, showing depth of knowledge")
        
        if score >= 75:
            strengths.append(f"Demonstrated strong understanding of {domain.title} concepts")
        
        if num_answers >= 3:
            strengths.append("Maintained professional communication throughout the interview")
        
        if avg_length > 300:
            strengths.append("Showed ability to elaborate on complex topics with specific examples")
        
        if num_answers < 5:
            strengths.append("Made efficient use of time by providing focused answers")
        
        return strengths[:4]
    
    def _generate_improvements(self, score: int, domain: InterviewDomain, 
                              avg_length: float, num_answers: int) -> List[str]:
        """Generate list of improvements"""
        improvements = []
        
        if avg_length < 150:
            improvements.append("Provide more detailed explanations with specific examples")
        
        if score < 70:
            improvements.append("Deepen technical knowledge in core areas")
        
        if num_answers < 5:
            improvements.append("Consider completing more questions for comprehensive evaluation")
        
        improvements.append("Consider using the STAR method (Situation, Task, Action, Result) for behavioral questions")
        
        if avg_length < 200:
            improvements.append("Include quantifiable results and metrics in your examples")
        
        improvements.append("Practice explaining complex concepts in simpler terms")
        
        return improvements[:3]
    
    def _generate_overall_feedback(self, score: int, domain: InterviewDomain, 
                                  follow_ups: int, avg_length: float, num_answers: int) -> str:
        """Generate overall feedback"""
        completion_note = f" You completed {num_answers} questions" + (
            " - consider completing more questions next time for a more comprehensive evaluation." 
            if num_answers < 5 else " which provided a good assessment of your skills."
        )
        
        if score >= 85:
            return f"Excellent performance! You demonstrated strong expertise in {domain.title} with detailed, well-structured answers.{completion_note} {'Your engagement with follow-up questions showed impressive depth of knowledge. ' if follow_ups > 0 else ''}You're well-prepared for interviews in this domain."
        elif score >= 70:
            return f"Good job! You showed solid understanding of {domain.title} concepts and provided thoughtful answers.{completion_note} {'Your detailed responses demonstrate good preparation. ' if avg_length > 200 else ''}With some additional practice on specific examples and technical depth, you'll be very competitive."
        elif score >= 55:
            return f"You're on the right track! You have a foundation in {domain.title}, but there's room for improvement.{completion_note} Focus on providing more detailed examples and deepening your technical knowledge. {'Try to engage more with follow-up questions to show your thinking process. ' if follow_ups == 0 else ''}Keep practicing!"
        else:
            return f"This interview highlighted areas for growth in {domain.title}.{completion_note} Focus on building stronger foundational knowledge and preparing specific examples from your experience. Consider additional study and practice before your next interview."
    
    def _generate_next_steps(self, domain: InterviewDomain, skills: List[str], score: int) -> List[str]:
        """Generate next steps recommendations"""
        steps = []
        
        if score < 70:
            steps.append(f"Review fundamental concepts in {skills[0]} and {skills[1] if len(skills) > 1 else 'core areas'}")
        
        steps.append("Practice more behavioral questions using structured frameworks")
        steps.append("Prepare 3-5 detailed examples from your experience for different question types")
        
        if domain.id == "software-engineer":
            steps.append("Practice coding problems and system design scenarios")
        elif domain.id == "data-scientist":
            steps.append("Work on explaining statistical concepts and ML algorithms clearly")
        elif domain.id == "product-manager":
            steps.append("Develop case studies showing product thinking and user empathy")
        
        steps.append("Record yourself answering questions to improve delivery and confidence")
        steps.append("Try completing a full interview session for more comprehensive feedback")
        
        return steps[:5]

class InterviewSession:
    """Manages a single interview session"""
    
    def __init__(self, domain: InterviewDomain, skills: List[str], settings: InterviewSettings):
        self.domain = domain
        self.skills = skills
        self.settings = settings
        self.questions = []
        self.answers = []
        self.current_question_index = 0
        self.start_time = datetime.datetime.now()
        self.end_time = None
        self.ai = MockInterviewAI()
        self.is_ended_early = False
        
        # Generate questions
        self.questions = self.ai.generate_questions(domain, skills, settings)
    
    def get_current_question(self) -> Optional[Question]:
        """Get the current question"""
        if self.current_question_index < len(self.questions):
            return self.questions[self.current_question_index]
        return None
    
    def submit_answer(self, answer_text: str, follow_up_answers: List[Dict[str, str]] = None) -> bool:
        """Submit an answer and move to next question"""
        if self.current_question_index >= len(self.questions):
            return False
        
        current_question = self.questions[self.current_question_index]
        answer = Answer(
            question_id=current_question.id,
            text=answer_text,
            timestamp=datetime.datetime.now(),
            follow_up_answers=follow_up_answers or []
        )
        
        self.answers.append(answer)
        self.current_question_index += 1
        return True
    
    def end_interview_early(self) -> bool:
        """End the interview early"""
        if len(self.answers) > 0:
            self.is_ended_early = True
            self.end_time = datetime.datetime.now()
            return True
        return False
    
    def is_complete(self) -> bool:
        """Check if interview is complete"""
        return self.current_question_index >= len(self.questions) or self.is_ended_early
    
    def get_progress(self) -> Tuple[int, int]:
        """Get current progress (current, total)"""
        return (self.current_question_index, len(self.questions))
    
    def get_duration(self) -> int:
        """Get interview duration in minutes"""
        end_time = self.end_time or datetime.datetime.now()
        duration = (end_time - self.start_time).total_seconds() / 60
        return int(duration)
    
    def generate_feedback(self) -> Feedback:
        """Generate final feedback"""
        return self.ai.generate_feedback(self.answers, self.domain, self.skills)

def main():
    """Example usage of the Mock Interview AI system with early ending capability"""
    print("🤖 Mock Interview AI - Python Implementation")
    print("=" * 50)
    
    # Initialize the AI system
    ai = MockInterviewAI()
    
    # Display available domains
    print("\nAvailable Interview Domains:")
    domains = ai.get_domains()
    for i, domain in enumerate(domains, 1):
        print(f"{i}. {domain.title}")
        print(f"   {domain.description}")
        print(f"   Skills: {', '.join(domain.skills)}")
        print()
    
    # Example: Start a software engineering interview
    domain = domains[0]  # Software Engineer
    selected_skills = ["Algorithms", "Data Structures", "Problem Solving"]
    settings = InterviewSettings(
        number_of_questions=5,
        include_follow_ups=True,
        difficulty=Difficulty.MIXED
    )
    
    print(f"Starting {domain.title} interview...")
    print(f"Selected skills: {', '.join(selected_skills)}")
    print(f"Settings: {settings.number_of_questions} questions, follow-ups: {settings.include_follow_ups}")
    print()
    
    # Create interview session
    session = InterviewSession(domain, selected_skills, settings)
    
    # Simulate interview with early ending
    sample_answers = [
        "I would use Dijkstra's algorithm for finding the shortest path. First, I'd initialize distances to all nodes as infinity except the source. Then I'd use a priority queue to always process the node with minimum distance. For each node, I'd update distances to its neighbors if a shorter path is found.",
        "Hash tables provide O(1) average case lookup time, which is great for frequent access operations. Binary search trees provide O(log n) operations but maintain sorted order. I'd choose hash tables for caching and quick lookups, and BSTs when I need sorted iteration or range queries."
    ]
    
    # Process questions (simulating early end after 2 questions)
    for i, answer_text in enumerate(sample_answers):
        question = session.get_current_question()
        if question:
            print(f"Question {i+1}: {question.text}")
            print(f"Answer: {answer_text}")
            
            # Get follow-up questions
            follow_ups = ai.get_follow_up_questions(question, settings.include_follow_ups)
            follow_up_answers = []
            
            if follow_ups:
                print("Follow-up questions:")
                for j, follow_up in enumerate(follow_ups):
                    print(f"  {j+1}. {follow_up}")
                    # Simulate follow-up answer
                    follow_up_answer = f"Follow-up answer {j+1} for question {i+1}"
                    follow_up_answers.append({
                        "question": follow_up,
                        "answer": follow_up_answer
                    })
                    print(f"     Answer: {follow_up_answer}")
            
            session.submit_answer(answer_text, follow_up_answers)
            print()
    
    # Simulate early ending
    print("🔴 Interview ended early by user")
    session.end_interview_early()
    
    # Generate and display feedback
    if session.is_complete():
        print("Interview Complete! Generating feedback...")
        print("=" * 50)
        
        feedback = session.generate_feedback()
        progress = session.get_progress()
        duration = session.get_duration()
        
        print(f"Interview Summary:")
        print(f"  Duration: {duration} minutes")
        print(f"  Questions Completed: {progress[0]} of {progress[1]}")
        print(f"  Ended Early: {'Yes' if session.is_ended_early else 'No'}")
        print()
        
        print(f"Overall Score: {feedback.score}/100")
        print(f"Overall Feedback: {feedback.overall_feedback}")
        print()
        
        print("Strengths:")
        for strength in feedback.strengths:
            print(f"  • {strength}")
        print()
        
        print("Areas for Improvement:")
        for improvement in feedback.improvements:
            print(f"  • {improvement}")
        print()
        
        print("Skill Breakdown:")
        for skill_feedback in feedback.skill_breakdown:
            print(f"  {skill_feedback.skill}: {skill_feedback.score}% - {skill_feedback.feedback}")
        print()
        
        print("Next Steps:")
        for step in feedback.next_steps:
            print(f"  • {step}")

if __name__ == "__main__":
    main()