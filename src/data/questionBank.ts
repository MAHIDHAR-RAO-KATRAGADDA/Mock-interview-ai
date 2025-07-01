import { Question } from '../types/interview';

export const questionBank: Record<string, Question[]> = {
  // Software Engineer Questions
  'Algorithms': [
    {
      id: 'algo-1',
      text: 'Explain how you would approach solving a problem where you need to find the shortest path between two nodes in a graph.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Algorithms',
      followUps: [
        'What if the graph has negative edge weights?',
        'How would you optimize this for very large graphs?',
        'Can you implement Dijkstra\'s algorithm from scratch?'
      ]
    },
    {
      id: 'algo-2',
      text: 'Walk me through your thought process for optimizing a recursive solution that has overlapping subproblems.',
      type: 'technical',
      difficulty: 'hard',
      skill: 'Algorithms',
      followUps: [
        'What\'s the difference between memoization and tabulation?',
        'When would you choose one approach over the other?',
        'Can you give me a real-world example where you\'ve used dynamic programming?'
      ]
    },
    {
      id: 'algo-3',
      text: 'How would you design an algorithm to detect if a linked list has a cycle?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Algorithms',
      followUps: [
        'What\'s the time and space complexity of your solution?',
        'How would you find the start of the cycle?',
        'Can you implement this without using extra space?'
      ]
    }
  ],
  'Data Structures': [
    {
      id: 'ds-1',
      text: 'When would you choose a hash table over a binary search tree, and vice versa?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Data Structures',
      followUps: [
        'How do you handle hash collisions?',
        'What\'s the worst-case time complexity for hash table operations?',
        'Can you implement a hash table from scratch?'
      ]
    },
    {
      id: 'ds-2',
      text: 'Explain the trade-offs between different tree data structures (BST, AVL, Red-Black, B-trees).',
      type: 'technical',
      difficulty: 'hard',
      skill: 'Data Structures',
      followUps: [
        'When would you use a B-tree over a binary search tree?',
        'How do self-balancing trees maintain their balance?',
        'What are the practical applications of each tree type?'
      ]
    },
    {
      id: 'ds-3',
      text: 'How would you implement a stack that supports finding the minimum element in O(1) time?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Data Structures',
      followUps: [
        'What if we also need to support finding the maximum?',
        'How would you handle duplicate minimum values?',
        'Can you extend this to support a queue with min/max operations?'
      ]
    }
  ],
  'System Design': [
    {
      id: 'sys-1',
      text: 'Design a URL shortening service like bit.ly. Walk me through your architecture.',
      type: 'technical',
      difficulty: 'hard',
      skill: 'System Design',
      followUps: [
        'How would you handle 100 million URLs per day?',
        'What database would you choose and why?',
        'How would you implement analytics for click tracking?'
      ]
    },
    {
      id: 'sys-2',
      text: 'How would you design a chat application that supports real-time messaging for millions of users?',
      type: 'technical',
      difficulty: 'hard',
      skill: 'System Design',
      followUps: [
        'How would you handle message ordering?',
        'What about offline message delivery?',
        'How would you implement group chats efficiently?'
      ]
    }
  ],
  'Object-Oriented Programming': [
    {
      id: 'oop-1',
      text: 'Explain the SOLID principles and give me an example of how you\'ve applied one of them in your code.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Object-Oriented Programming',
      followUps: [
        'How does the Single Responsibility Principle improve code maintainability?',
        'Can you show me a violation of the Open/Closed Principle?',
        'When might you intentionally break one of these principles?'
      ]
    },
    {
      id: 'oop-2',
      text: 'Design a class hierarchy for a drawing application that supports different shapes.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Object-Oriented Programming',
      followUps: [
        'How would you add a new shape without modifying existing code?',
        'What design patterns would you use?',
        'How would you handle shape transformations like rotation and scaling?'
      ]
    }
  ],
  'Problem Solving': [
    {
      id: 'ps-1',
      text: 'Tell me about a time when you encountered a complex technical problem that seemed impossible to solve. How did you approach it?',
      type: 'behavioral',
      difficulty: 'medium',
      skill: 'Problem Solving',
      followUps: [
        'What was the most challenging part of the problem?',
        'How did you break down the problem into smaller pieces?',
        'What would you do differently if you faced a similar problem again?'
      ]
    },
    {
      id: 'ps-2',
      text: 'Describe your debugging process when you encounter a bug that you can\'t reproduce consistently.',
      type: 'situational',
      difficulty: 'medium',
      skill: 'Problem Solving',
      followUps: [
        'What tools do you use for debugging?',
        'How do you handle race conditions or timing-related bugs?',
        'When do you decide to ask for help versus continuing to debug alone?'
      ]
    }
  ],
  // Frontend Developer Questions
  'React': [
    {
      id: 'react-1',
      text: 'Explain the difference between controlled and uncontrolled components in React. When would you use each?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'React',
      followUps: [
        'How do you handle form validation in controlled components?',
        'What are the performance implications of each approach?',
        'Can you show me how to convert an uncontrolled component to controlled?'
      ]
    },
    {
      id: 'react-2',
      text: 'How would you optimize a React application that\'s rendering slowly due to frequent re-renders?',
      type: 'technical',
      difficulty: 'hard',
      skill: 'React',
      followUps: [
        'When would you use React.memo vs useMemo vs useCallback?',
        'How do you identify which components are causing performance issues?',
        'What are the trade-offs of using React.lazy for code splitting?'
      ]
    },
    {
      id: 'react-3',
      text: 'Explain how React\'s reconciliation algorithm works and why keys are important in lists.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'React',
      followUps: [
        'What happens when you use array indices as keys?',
        'How does React decide whether to update or replace a component?',
        'Can you explain the virtual DOM and its benefits?'
      ]
    }
  ],
  'JavaScript': [
    {
      id: 'js-1',
      text: 'Explain closures in JavaScript and provide a practical example of when you\'d use them.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'JavaScript',
      followUps: [
        'What are the memory implications of closures?',
        'How do closures relate to the module pattern?',
        'Can you create a function that remembers how many times it\'s been called?'
      ]
    },
    {
      id: 'js-2',
      text: 'What\'s the difference between Promise.all(), Promise.allSettled(), and Promise.race()?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'JavaScript',
      followUps: [
        'When would you use each method?',
        'How do you handle errors in Promise.all()?',
        'Can you implement a simple version of Promise.all() from scratch?'
      ]
    },
    {
      id: 'js-3',
      text: 'Explain event delegation and why it\'s useful in JavaScript.',
      type: 'technical',
      difficulty: 'easy',
      skill: 'JavaScript',
      followUps: [
        'How does event bubbling work?',
        'When might event delegation not be appropriate?',
        'Can you implement a simple event delegation system?'
      ]
    }
  ],
  'HTML/CSS': [
    {
      id: 'css-1',
      text: 'Explain the CSS box model and how box-sizing affects layout calculations.',
      type: 'technical',
      difficulty: 'easy',
      skill: 'HTML/CSS',
      followUps: [
        'What\'s the difference between margin collapse and padding?',
        'How do you center a div both horizontally and vertically?',
        'When would you use box-sizing: border-box?'
      ]
    },
    {
      id: 'css-2',
      text: 'How would you create a responsive layout that works well on both mobile and desktop without using a CSS framework?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'HTML/CSS',
      followUps: [
        'What are the advantages of CSS Grid over Flexbox?',
        'How do you handle images in responsive designs?',
        'What\'s your approach to choosing breakpoints?'
      ]
    }
  ],
  'Web Performance': [
    {
      id: 'perf-1',
      text: 'What strategies would you use to improve the loading performance of a web application?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Web Performance',
      followUps: [
        'How do you measure and monitor web performance?',
        'What\'s the difference between First Contentful Paint and Largest Contentful Paint?',
        'How would you optimize images for web performance?'
      ]
    },
    {
      id: 'perf-2',
      text: 'Explain the critical rendering path and how you can optimize it.',
      type: 'technical',
      difficulty: 'hard',
      skill: 'Web Performance',
      followUps: [
        'What are render-blocking resources?',
        'How does browser caching affect performance?',
        'When would you use a CDN and how does it help?'
      ]
    }
  ],
  'Responsive Design': [
    {
      id: 'resp-1',
      text: 'How do you approach designing for mobile-first versus desktop-first?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Responsive Design',
      followUps: [
        'What are the advantages of mobile-first design?',
        'How do you handle touch interactions on mobile devices?',
        'What tools do you use for testing responsive designs?'
      ]
    }
  ],
  // Data Science Questions
  'Machine Learning': [
    {
      id: 'ml-1',
      text: 'Explain the bias-variance tradeoff and how it affects model performance.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Machine Learning',
      followUps: [
        'How do you detect if your model is overfitting?',
        'What techniques can you use to reduce overfitting?',
        'When would you prefer a high-bias, low-variance model?'
      ]
    },
    {
      id: 'ml-2',
      text: 'How would you approach a classification problem where you have highly imbalanced classes?',
      type: 'technical',
      difficulty: 'hard',
      skill: 'Machine Learning',
      followUps: [
        'What evaluation metrics would you use?',
        'How do sampling techniques like SMOTE work?',
        'When would you use cost-sensitive learning?'
      ]
    }
  ],
  'Statistics': [
    {
      id: 'stats-1',
      text: 'Explain the difference between Type I and Type II errors in hypothesis testing.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Statistics',
      followUps: [
        'How do you choose an appropriate significance level?',
        'What\'s the relationship between power and sample size?',
        'When would you use a one-tailed vs two-tailed test?'
      ]
    },
    {
      id: 'stats-2',
      text: 'How would you determine if a correlation between two variables is statistically significant?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Statistics',
      followUps: [
        'What\'s the difference between correlation and causation?',
        'How do you handle confounding variables?',
        'When would you use Spearman vs Pearson correlation?'
      ]
    }
  ],
  'Python': [
    {
      id: 'python-1',
      text: 'Explain the difference between lists and tuples in Python, and when you\'d use each.',
      type: 'technical',
      difficulty: 'easy',
      skill: 'Python',
      followUps: [
        'What are the performance implications of each?',
        'How do you handle large datasets efficiently in Python?',
        'When would you use a set instead of a list?'
      ]
    },
    {
      id: 'python-2',
      text: 'How would you optimize a Python script that\'s processing large amounts of data slowly?',
      type: 'technical',
      difficulty: 'hard',
      skill: 'Python',
      followUps: [
        'When would you use NumPy vs Pandas vs pure Python?',
        'How do you profile Python code to find bottlenecks?',
        'What\'s the Global Interpreter Lock and how does it affect performance?'
      ]
    }
  ],
  'SQL': [
    {
      id: 'sql-1',
      text: 'Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with examples.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'SQL',
      followUps: [
        'When would you use a self-join?',
        'How do you optimize slow JOIN queries?',
        'What\'s the difference between WHERE and HAVING clauses?'
      ]
    },
    {
      id: 'sql-2',
      text: 'How would you find the second highest salary from an employee table?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'SQL',
      followUps: [
        'What if there are duplicate salary values?',
        'How would you find the Nth highest salary?',
        'Can you solve this using window functions?'
      ]
    }
  ],
  'Data Visualization': [
    {
      id: 'viz-1',
      text: 'How do you choose the right type of visualization for different types of data?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Data Visualization',
      followUps: [
        'When would you use a scatter plot vs a line chart?',
        'How do you handle visualizing high-dimensional data?',
        'What are some common mistakes in data visualization?'
      ]
    }
  ],
  // Product Manager Questions
  'Product Strategy': [
    {
      id: 'prod-1',
      text: 'How would you prioritize features when you have limited development resources?',
      type: 'situational',
      difficulty: 'medium',
      skill: 'Product Strategy',
      followUps: [
        'What frameworks do you use for prioritization?',
        'How do you balance user needs vs business goals?',
        'How do you communicate difficult prioritization decisions to stakeholders?'
      ]
    },
    {
      id: 'prod-2',
      text: 'Walk me through how you would launch a new product in a competitive market.',
      type: 'situational',
      difficulty: 'hard',
      skill: 'Product Strategy',
      followUps: [
        'How do you identify your unique value proposition?',
        'What metrics would you track for a successful launch?',
        'How do you handle competitive responses to your launch?'
      ]
    }
  ],
  'User Research': [
    {
      id: 'research-1',
      text: 'How do you validate a product idea before investing significant development resources?',
      type: 'situational',
      difficulty: 'medium',
      skill: 'User Research',
      followUps: [
        'What\'s the difference between qualitative and quantitative research?',
        'How do you avoid confirmation bias in user research?',
        'When would you use surveys vs interviews vs usability testing?'
      ]
    }
  ],
  'Analytics': [
    {
      id: 'analytics-1',
      text: 'How would you measure the success of a new feature after launch?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Analytics',
      followUps: [
        'What\'s the difference between leading and lagging indicators?',
        'How do you set up proper A/B tests?',
        'How do you handle statistical significance in your experiments?'
      ]
    }
  ],
  'Roadmap Planning': [
    {
      id: 'roadmap-1',
      text: 'How do you create and communicate a product roadmap to different stakeholders?',
      type: 'behavioral',
      difficulty: 'medium',
      skill: 'Roadmap Planning',
      followUps: [
        'How do you handle changing priorities and scope creep?',
        'What level of detail do you include in roadmaps?',
        'How do you balance short-term wins vs long-term vision?'
      ]
    }
  ],
  'Stakeholder Management': [
    {
      id: 'stakeholder-1',
      text: 'Describe a time when you had to manage conflicting requirements from different stakeholders.',
      type: 'behavioral',
      difficulty: 'hard',
      skill: 'Stakeholder Management',
      followUps: [
        'How do you build consensus among disagreeing parties?',
        'What\'s your approach to saying no to stakeholder requests?',
        'How do you keep stakeholders informed without overwhelming them?'
      ]
    }
  ],
  // Marketing Manager Questions
  'Digital Marketing': [
    {
      id: 'digital-1',
      text: 'How would you develop a digital marketing strategy for a new product launch?',
      type: 'situational',
      difficulty: 'medium',
      skill: 'Digital Marketing',
      followUps: [
        'Which channels would you prioritize and why?',
        'How do you allocate budget across different channels?',
        'How do you measure cross-channel attribution?'
      ]
    }
  ],
  'Campaign Strategy': [
    {
      id: 'campaign-1',
      text: 'Walk me through how you would plan and execute a multi-channel marketing campaign.',
      type: 'situational',
      difficulty: 'hard',
      skill: 'Campaign Strategy',
      followUps: [
        'How do you ensure consistent messaging across channels?',
        'What contingency plans do you have if a campaign underperforms?',
        'How do you coordinate with creative and content teams?'
      ]
    }
  ],
  'Brand Management': [
    {
      id: 'brand-1',
      text: 'How do you maintain brand consistency while adapting to different markets or audiences?',
      type: 'situational',
      difficulty: 'medium',
      skill: 'Brand Management',
      followUps: [
        'How do you handle negative brand sentiment?',
        'What\'s your approach to brand positioning against competitors?',
        'How do you measure brand health and awareness?'
      ]
    }
  ],
  'Growth Marketing': [
    {
      id: 'growth-1',
      text: 'Describe your approach to identifying and testing new growth opportunities.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Growth Marketing',
      followUps: [
        'How do you prioritize growth experiments?',
        'What metrics do you use to measure growth?',
        'How do you scale successful growth tactics?'
      ]
    }
  ],
  // UX Designer Questions
  'User Research': [
    {
      id: 'ux-research-1',
      text: 'How do you conduct user research when you have limited time and budget?',
      type: 'situational',
      difficulty: 'medium',
      skill: 'User Research',
      followUps: [
        'What\'s your process for recruiting research participants?',
        'How do you synthesize research findings into actionable insights?',
        'When would you use guerrilla testing vs formal usability studies?'
      ]
    }
  ],
  'Wireframing': [
    {
      id: 'wireframe-1',
      text: 'Walk me through your wireframing process from initial concept to high-fidelity mockups.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Wireframing',
      followUps: [
        'How do you decide on the level of fidelity for different stages?',
        'What tools do you prefer for wireframing and why?',
        'How do you incorporate feedback during the wireframing process?'
      ]
    }
  ],
  'Prototyping': [
    {
      id: 'prototype-1',
      text: 'How do you decide between different prototyping methods (paper, digital, interactive)?',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Prototyping',
      followUps: [
        'What\'s your process for testing prototypes with users?',
        'How do you handle technical constraints during prototyping?',
        'When do you involve developers in the prototyping process?'
      ]
    }
  ],
  'Usability Testing': [
    {
      id: 'usability-1',
      text: 'Describe how you would set up and conduct a usability test for a new feature.',
      type: 'technical',
      difficulty: 'medium',
      skill: 'Usability Testing',
      followUps: [
        'How do you write effective usability test tasks?',
        'What do you do when users struggle with your design during testing?',
        'How do you prioritize usability issues found during testing?'
      ]
    }
  ],
  'Design Systems': [
    {
      id: 'design-system-1',
      text: 'How would you approach creating a design system for a growing product team?',
      type: 'technical',
      difficulty: 'hard',
      skill: 'Design Systems',
      followUps: [
        'How do you ensure adoption of the design system across teams?',
        'What\'s your process for evolving and maintaining a design system?',
        'How do you balance consistency with creative flexibility?'
      ]
    }
  ]
};