import { InterviewDomain } from '../types/interview';

export const interviewDomains: InterviewDomain[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Technical questions covering algorithms, data structures, system design, and coding best practices.',
    icon: 'Code',
    skills: ['Algorithms', 'Data Structures', 'System Design', 'Object-Oriented Programming', 'Problem Solving']
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Questions focused on React, JavaScript, CSS, web performance, and user experience.',
    icon: 'Monitor',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Web Performance', 'Responsive Design']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Statistical analysis, machine learning, Python, data visualization, and business analytics.',
    icon: 'BarChart3',
    skills: ['Machine Learning', 'Statistics', 'Python', 'SQL', 'Data Visualization']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Product strategy, user research, roadmap planning, stakeholder management, and metrics.',
    icon: 'Target',
    skills: ['Product Strategy', 'User Research', 'Analytics', 'Roadmap Planning', 'Stakeholder Management']
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    description: 'Digital marketing, campaign strategy, analytics, brand management, and growth hacking.',
    icon: 'TrendingUp',
    skills: ['Digital Marketing', 'Campaign Strategy', 'Analytics', 'Brand Management', 'Growth Marketing']
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'User research, wireframing, prototyping, usability testing, and design systems.',
    icon: 'Palette',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems']
  }
];