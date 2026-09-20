export interface NavLink {
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Modules' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'difference', label: 'The EduRise Difference' },
  { id: 'signup', label: 'Sign Up' },
]

export interface Module {
  id: string
  title: string
  summary: string
  develops: string[]
}

export const modules: Module[] = [
  {
    id: 'chess-coaching',
    title: 'Chess Coaching',
    summary: 'Chess builds focus and sharp thinking, one move at a time.',
    develops: [
      'Strategic thinking',
      'Problem-solving',
      'Focus & patience',
      'Planning ahead',
      'Discipline & resilience',
    ],
  },
  {
    id: 'cognitive-development',
    title: 'Cognitive Development',
    summary: 'Simple exercises that strengthen how learners think and learn.',
    develops: [
      'Memory',
      'Focus & attention',
      'Logical reasoning',
      'Problem-solving',
      'Adaptability',
    ],
  },
  {
    id: 'schoolwork-support',
    title: 'Schoolwork Support',
    summary: 'Guided help that builds real understanding, not just finished homework.',
    develops: [
      'Understanding concepts',
      'Study skills',
      'Homework support',
      'Time management',
      'Computer skills',
    ],
  },
  {
    id: 'life-coaching-mentorship',
    title: 'Life Coaching & Mentorship',
    summary: 'Personal guidance that builds confidence, good habits and character.',
    develops: [
      'Good habits',
      'Goal setting',
      'Confidence',
      'Responsibility',
      'Life skills',
    ],
  },
]

export interface TimelineStep {
  id: string
  title: string
  description: string
}

export const timelineSteps: TimelineStep[] = [
  { id: 'assess', title: 'Assess', description: 'Understand the learner’s strengths, needs and development areas.' },
  { id: 'plan', title: 'Plan', description: 'Identify goals and select the appropriate development modules.' },
  { id: 'develop', title: 'Develop', description: 'Provide structured and purposeful learning sessions.' },
  { id: 'monitor', title: 'Monitor', description: 'Observe progress, participation, strengths and challenges.' },
  { id: 'review', title: 'Review', description: 'Evaluate development and identify areas requiring further attention.' },
  { id: 'progress', title: 'Progress', description: 'Set new goals and continue building the learner’s potential.' },
]

export interface Director {
  name: string
  phone: string
  email: string
}

export const directors: Director[] = [
  { name: 'Mpho Mabelesa', phone: '078 356 1729', email: 'mphomabelesa26@gmail.com' },
  { name: 'Ofentse Molombwa', phone: '071 825 8781', email: 'ofentsemolombwa@gmail.com' },
]

export const orgInfo = {
  name: 'EduRise Academy',
  tagline: 'Develop the learner, not just the skill.',
  outcomeStatement: 'Developing Minds. Building Character. Empowering Futures.',
  location: 'Potchefstroom, Ikageng, South Africa',
}
