# Mock Interview AI - Python Implementation

A comprehensive mock interview system with AI-powered feedback, implemented in Python.

## Features

- **Multiple Interview Domains**: Software Engineering, Data Science, Product Management, etc.
- **Dynamic Question Generation**: Non-repetitive questions based on selected skills
- **Follow-up Questions**: Intelligent follow-up questions for deeper evaluation
- **Comprehensive Feedback**: Detailed scoring and improvement suggestions
- **Skill-specific Analysis**: Individual skill breakdown and recommendations

## Installation

```bash
# Clone or download the files
# No external dependencies required for basic functionality
python mock_interview_ai.py
```

## Usage

### Basic Usage

```python
from mock_interview_ai import MockInterviewAI, InterviewSession, InterviewSettings, Difficulty

# Initialize the AI system
ai = MockInterviewAI()

# Get available domains
domains = ai.get_domains()
domain = domains[0]  # Select Software Engineer

# Configure interview settings
settings = InterviewSettings(
    number_of_questions=5,
    include_follow_ups=True,
    difficulty=Difficulty.MIXED
)

# Start interview session
selected_skills = ["Algorithms", "Data Structures"]
session = InterviewSession(domain, selected_skills, settings)

# Process questions
while not session.is_complete():
    question = session.get_current_question()
    print(f"Question: {question.text}")
    
    # Get user answer (in real app, this would be user input)
    answer = input("Your answer: ")
    
    # Submit answer
    session.submit_answer(answer)

# Generate feedback
feedback = session.generate_feedback()
print(f"Score: {feedback.score}/100")
print(f"Feedback: {feedback.overall_feedback}")
```

### Advanced Features

```python
# Custom question generation
questions = ai.generate_questions(domain, selected_skills, settings)

# Get follow-up questions
follow_ups = ai.get_follow_up_questions(questions[0], True)

# Generate detailed feedback
feedback = ai.generate_feedback(answers, domain, selected_skills)
```

## Class Structure

### Core Classes

- **MockInterviewAI**: Main AI system for question generation and feedback
- **InterviewSession**: Manages a single interview session
- **Question**: Represents an interview question with metadata
- **Answer**: Stores user responses with timestamps
- **Feedback**: Comprehensive feedback with scores and recommendations

### Data Classes

- **InterviewDomain**: Defines interview categories (Software Engineer, etc.)
- **InterviewSettings**: Configuration for interview sessions
- **SkillFeedback**: Individual skill assessment

## Extending the System

### Adding New Domains

```python
new_domain = InterviewDomain(
    id="custom-domain",
    title="Custom Role",
    description="Description of the role",
    icon="Icon",
    skills=["Skill1", "Skill2", "Skill3"]
)
```

### Adding New Questions

```python
new_question = Question(
    id="custom-1",
    text="Your custom question here",
    type=QuestionType.TECHNICAL,
    difficulty=Difficulty.MEDIUM,
    skill="Custom Skill",
    follow_ups=["Follow-up 1", "Follow-up 2"]
)
```

## Integration Options

### Web API with Flask

```python
from flask import Flask, request, jsonify

app = Flask(__name__)
ai = MockInterviewAI()

@app.route('/api/domains', methods=['GET'])
def get_domains():
    domains = ai.get_domains()
    return jsonify([asdict(domain) for domain in domains])

@app.route('/api/interview/start', methods=['POST'])
def start_interview():
    data = request.json
    # Implementation here
    return jsonify({"session_id": "unique_id"})
```

### Database Integration

```python
# Using SQLAlchemy for persistence
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class InterviewRecord(Base):
    __tablename__ = 'interviews'
    
    id = Column(Integer, primary_key=True)
    domain_id = Column(String(50))
    score = Column(Integer)
    created_at = Column(DateTime)
    # Additional fields...
```

## Testing

```python
# Run the example
python mock_interview_ai.py

# Expected output:
# - Domain selection
# - Question generation
# - Simulated interview
# - Comprehensive feedback
```

## License

MIT License - Feel free to use and modify for your projects.