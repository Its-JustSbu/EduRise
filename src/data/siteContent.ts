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
    summary:
      'Chess is used as a powerful learning tool as a constructive hobby and to develop important thinking skills in the brain.',
    develops: [
      'Strategic thinking — thinking ahead, evaluating possibilities and making purposeful decisions.',
      'Problem-solving — analysing challenges and developing effective solutions.',
      'Concentration & patience — staying focused and avoiding rushed decisions.',
      'Planning & decision-making — weighing consequences before acting.',
      'Discipline & competitive growth — resilience, sportsmanship and learning from both success and failure.',
    ],
  },
  {
    id: 'cognitive-development',
    title: 'Cognitive Development',
    summary:
      'Structured activities designed to strengthen the thinking and learning skills that support learners in school and everyday life.',
    develops: [
      'Memory — retaining, recalling and using information.',
      'Attention & concentration — focusing and completing tasks effectively.',
      'Logical reasoning — recognising patterns, relationships and sequences.',
      'Problem-solving — approaching unfamiliar challenges independently.',
      'Mental flexibility — adapting when a first solution doesn’t work.',
    ],
  },
  {
    id: 'schoolwork-support',
    title: 'Schoolwork Support',
    summary:
      'Academic support designed to help learners understand their schoolwork, improve their study habits and become more independent learners.',
    develops: [
      'Academic understanding — grasping concepts, not just completing work.',
      'Study skills — revision, organisation and assessment preparation.',
      'Homework & assignment support with guided ownership.',
      'Time & task management — organising responsibilities and deadlines.',
      'Computer literacy — file management, typing, research and digital collaboration.',
    ],
  },
  {
    id: 'life-coaching-mentorship',
    title: 'Life Coaching & Mentorship',
    summary:
      'Personal guidance that helps learners develop positive habits, confidence, responsibility and character.',
    develops: [
      'Good habits — routines that support consistency and organisation.',
      'Goal setting — turning meaningful goals into achievable steps.',
      'Confidence & self-belief — recognising strengths and facing challenges positively.',
      'Responsibility & accountability for choices and behaviour.',
      'Character & life skills — respect, discipline, perseverance and communication.',
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
  { name: 'Mpho Mabesela', phone: '078 356 1729', email: 'mphomabesela26@gmail.com' },
  { name: 'Ofentse Molombwa', phone: '071 825 8781', email: 'ofentsemolombwa@gmail.com' },
]

export const orgInfo = {
  name: 'EduRise Academy',
  tagline: 'Develop the learner, not just the skill.',
  outcomeStatement: 'Developing Minds. Building Character. Empowering Futures.',
  location: 'Potchefstroom, Ikageng, South Africa',
}
