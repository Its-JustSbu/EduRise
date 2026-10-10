export interface NavLink {
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'educational-support', label: 'Support' },
  { id: 'approach', label: 'Approach' },
  { id: 'chess-club', label: 'Chess Club' },
  { id: 'chess-lessons', label: 'Lessons' },
  { id: 'difference', label: 'Difference' },
  { id: 'signup', label: 'Sign Up' },
]

export interface Module {
  id: string
  title: string
  summary: string
  develops: string[]
}

// The academy's paid service: personalised, structured programmes.
export const educationalSupportModules: Module[] = [
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

// The academy's free community initiative — not part of the paid programmes above.
export const chessClub: Module = {
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
}

export interface ChessLessonPackage {
  id: string
  lessons: string
  price: string
  rateNote: string
  name: string
  highlights: string[]
  featured: boolean
}

export const chessLessonsInfo = {
  eyebrow: 'Chess Lessons for Adults',
  title: 'Package rates',
  tagline: 'Learn chess • Improve strategy • Master the game',
  note: 'One-on-one coaching for adults — whether you are learning the moves for the first time or sharpening a game you already play.',
}

// Paid adult offering — separate from the free Chess Club for kids above.
export const chessLessonPackages: ChessLessonPackage[] = [
  {
    id: 'single-lesson',
    lessons: '1 Lesson',
    price: 'R150',
    rateNote: '/ an hour',
    name: 'Single Lesson',
    highlights: ['Pay per session', 'Ideal for a first lesson'],
    featured: false,
  },
  {
    id: 'starter-package',
    lessons: '4 Lessons',
    price: 'R480',
    rateNote: 'R120 / lesson',
    name: 'Starter Package',
    highlights: ['Flexible scheduling', 'Focus on fundamentals'],
    featured: true,
  },
  {
    id: 'skill-master-package',
    lessons: '8 Lessons',
    price: 'R880',
    rateNote: 'R110 / lesson',
    name: 'Skill Master Package',
    highlights: ['Advanced strategies', 'Comprehensive learning', 'Best value & progress'],
    featured: false,
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

// Addresses are Cloudflare Email Routing aliases on the academy domain that
// forward to each director's personal inbox, so no private address is
// published. Both routes must exist in Email Routing before this ships or
// mail to them is rejected.
export const directors: Director[] = [
  { name: 'Mpho Mabelesa', phone: '078 356 1729', email: 'mpho@tlhokomelabokamosoacademy.co.za' },
  { name: 'Ofentse Molombwa', phone: '071 825 8781', email: 'ofentse@tlhokomelabokamosoacademy.co.za' },
]

export const orgInfo = {
  name: 'Tlhokomela Bokamoso Academy',
  tagline: 'Develop the learner, not just the skill.',
  outcomeStatement: 'Developing Minds. Building Character. Empowering Futures.',
  location: 'Boitshoko High School, Lekhele Street, Ikageng, Potchefstroom',
  // Broken out so the structured data can publish a full postal address and
  // coordinates rather than a single display string.
  address: {
    venue: 'Boitshoko High School',
    street: 'Lekhele Street',
    locality: 'Ikageng, Potchefstroom',
    region: 'North West',
    postalCode: '2539',
    country: 'ZA',
  },
  geo: { latitude: -26.7193426, longitude: 27.0462796 },
  mapUrl: 'https://maps.app.goo.gl/FJffno9esJPMSvRB6',
}
