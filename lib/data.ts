interface KeywordWeights {
  [key: string]: number;
}

interface MatchStrategy {
  primaryFocus: string[];
  secondaryFocus: string[];
}

export interface MentorProfile {
  id: string;
  name: string;
  profession: string;
  keywordWeights: KeywordWeights;
  matchStrategy: MatchStrategy;
  bio: string;
  specialties: string[];
  availableTimes: string[];
  testimonials: string[];
}

export interface ImpulseCategory {
  id: string;
  name: string;
  description: string;
  details: string[];
  watchFeature: string;
  supportResources: string[];
}

export interface Skill {
  id: string;
  label: string;
}

export interface SkillCategories {
  technical: Skill[];
  business: Skill[];
  soft: Skill[];
}

export interface JobDatabase {
  [key: string]: string[];
}

export const MENTOR_PROFILES: MentorProfile[] = [
  {
    id: 'social-butterfly',
    name: 'Emily Rodriguez',
    profession: 'Community Outreach Coordinator',
    keywordWeights: {
      lonely: 0.9,
      'social-anxiety': 1.0,
      connection: 0.8,
      communication: 0.7,
      introversion: 0.6
    },
    matchStrategy: {
      primaryFocus: ['social-skills', 'emotional-support'],
      secondaryFocus: ['personal-growth']
    },
    bio: "Emily is a vibrant community connector with a passion for helping people build meaningful relationships. She's overcome her own social challenges and loves creating supportive environments.",
    specialties: ['Active Listening', 'Social Skill Development', 'Group Facilitation'],
    availableTimes: ['Weekday evenings', 'Weekend mornings'],
    testimonials: [
      "Emily helped me overcome my social anxiety and build lasting friendships.",
      "Her approach to social skills development is practical and effective."
    ]
  },
  {
    id: 'wellness-guide',
    name: 'Michael Chen',
    profession: 'Mental Health Counselor',
    keywordWeights: {
      depression: 1.0,
      anxiety: 0.9,
      'stress-management': 0.8,
      mindfulness: 0.7,
      'cognitive-behavioral': 0.6
    },
    matchStrategy: {
      primaryFocus: ['mental-health', 'coping-strategies'],
      secondaryFocus: ['professional-development']
    },
    bio: "Michael specializes in holistic wellness approaches, combining professional counseling with practical life strategies. He believes in empowering individuals through personalized support.",
    specialties: ['CBT Techniques', 'Stress Reduction', 'Mindfulness Practice'],
    availableTimes: ['Weekday afternoons', 'Weekend afternoons'],
    testimonials: [
      "Michael's mindfulness techniques changed my life completely.",
      "His approach to anxiety management is both practical and effective."
    ]
  },
  {
    id: 'tech-balance',
    name: 'Sarah Thompson',
    profession: 'Digital Wellness Coach',
    keywordWeights: {
      'tech-addiction': 1.0,
      'screen-time': 0.9,
      'work-life-balance': 0.8,
      productivity: 0.7,
      'digital-detox': 0.9
    },
    matchStrategy: {
      primaryFocus: ['digital-wellness', 'behavior-modification'],
      secondaryFocus: ['productivity-optimization']
    },
    bio: "Sarah is a certified digital wellness coach who helps people develop healthier relationships with technology. She combines behavioral psychology with practical strategies to achieve digital balance.",
    specialties: ['Digital Detox Planning', 'Mindful Technology Use', 'Productivity Optimization'],
    availableTimes: ['Flexible scheduling', 'Virtual sessions available'],
    testimonials: [
      "Sarah helped me break free from my social media addiction.",
      "Her digital wellness strategies improved both my work and personal life."
    ]
  }
];

export const IMPULSE_CATEGORIES: ImpulseCategory[] = [
  {
    id: 'drug-addiction',
    name: 'Drug Addiction',
    description: 'Wearable Device Support for Substance Abuse Recovery',
    details: [
      'Real-time craving detection',
      'Gentle vibration alerts when high-risk situations are detected',
      'Immediate access to support resources',
      'Optional emergency contact notification',
      'Progress tracking and milestone celebrations'
    ],
    watchFeature: 'The watch provides a mild, attention-grabbing vibration when detecting physiological signs of drug craving, helping interrupt potentially harmful thought patterns.',
    supportResources: [
      '24/7 Crisis Hotline',
      'Local Support Group Finder',
      'Medical Professional Directory',
      'Recovery Progress Journal'
    ]
  },
  {
    id: 'gambling',
    name: 'Gambling Addiction',
    description: 'Financial and Behavioral Impulse Control',
    details: [
      'Proximity alerts near gambling establishments',
      'Spending pattern monitoring',
      'Stress level tracking',
      'Immediate financial counseling connection',
      'Budget management tools'
    ],
    watchFeature: 'Monitors heart rate and skin conductance to detect heightened excitement typical of gambling urges, providing discrete alerts to help maintain control.',
    supportResources: [
      'Financial Advisory Services',
      'Gambling Blocker Tools',
      'Support Group Locator',
      'Recovery Timeline Tracker'
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media Addiction',
    description: 'Digital Wellness and Screen Time Management',
    details: [
      'Screen time tracking and alerts',
      'App usage pattern analysis',
      'Mindful browsing reminders',
      'Social media-free period scheduling',
      'Alternative activity suggestions',
      'Digital wellbeing score'
    ],
    watchFeature: 'Tracks screen time patterns and provides haptic feedback when usage exceeds healthy limits, encouraging breaks and mindful technology use.',
    supportResources: [
      'Digital Detox Guidelines',
      'Productivity Apps',
      'Mindfulness Exercises',
      'Offline Activity Suggestions'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategories = {
  technical: [
    { id: 'coding', label: 'Coding' },
    { id: 'computer', label: 'Computer Literacy' },
    { id: 'design', label: 'Design' },
    { id: 'data-analysis', label: 'Data Analysis' },
    { id: 'digital-marketing', label: 'Digital Marketing' }
  ],
  business: [
    { id: 'finance', label: 'Finance/Accounting' },
    { id: 'analytical', label: 'Analytical Skills' },
    { id: 'research', label: 'Research' },
    { id: 'project-management', label: 'Project Management' },
    { id: 'strategic-planning', label: 'Strategic Planning' }
  ],
  soft: [
    { id: 'communication', label: 'Communication' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'critical', label: 'Critical Thinking' },
    { id: 'emotional-intelligence', label: 'Emotional Intelligence' },
    { id: 'adaptability', label: 'Adaptability' }
  ]
};

export const JOB_DATABASE: JobDatabase = {
  finance: ['Financial Analyst', 'Accountant', 'Investment Banker', 'Financial Planner', 'Risk Analyst'],
  communication: ['Public Relations Manager', 'Content Strategist', 'Corporate Trainer', 'Communications Director', 'Technical Writer'],
  leadership: ['Project Manager', 'Team Lead', 'Department Director', 'Operations Manager', 'Executive Director'],
  computer: ['IT Support Specialist', 'Systems Administrator', 'Digital Marketing Specialist', 'Cloud Engineer', 'DevOps Engineer'],
  design: ['UX Designer', 'Graphic Designer', 'Product Designer', 'UI Developer', 'Art Director'],
  analytical: ['Data Analyst', 'Business Intelligence Analyst', 'Market Research Analyst', 'Operations Analyst', 'Systems Analyst'],
  critical: ['Management Consultant', 'Strategy Analyst', 'Operations Manager', 'Business Strategist', 'Policy Analyst'],
  research: ['Market Researcher', 'Research Scientist', 'Business Analyst', 'UX Researcher', 'Data Scientist'],
  coding: ['Software Developer', 'Full Stack Engineer', 'Mobile App Developer', 'AI Engineer', 'Backend Developer'],
  'data-analysis': ['Data Scientist', 'Analytics Manager', 'Quantitative Analyst', 'Business Intelligence Developer'],
  'digital-marketing': ['Digital Marketing Manager', 'SEO Specialist', 'Social Media Manager', 'Content Marketing Manager'],
  'project-management': ['Project Manager', 'Program Manager', 'Scrum Master', 'Product Owner'],
  'strategic-planning': ['Strategy Consultant', 'Business Development Manager', 'Strategic Planning Director'],
  'emotional-intelligence': ['HR Manager', 'Customer Success Manager', 'Sales Manager', 'Talent Development Specialist'],
  adaptability: ['Change Management Consultant', 'Innovation Manager', 'Agile Coach', 'Digital Transformation Manager']
};
