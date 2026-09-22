/**
 * Profile, contact and narrative copy.
 *
 * Sourcing rule for this whole directory: every factual claim traces to either
 * the CV, the public GitHub repositories, or source code that was read
 * directly. Where the CV and the code disagreed, the code won and the claim
 * was narrowed — see `projects.ts` for the specific cases.
 */

export const site = {
  name: 'Mohamed Hassan',
  /** Full name as it appears on the CV. */
  fullName: 'Mohamed Hassan Fayk',
  title: 'Flutter Developer | Mobile Application Developer',
  location: 'Cairo, Egypt',

  /** Used for <title>, meta description and Open Graph. */
  seo: {
    title: 'Mohamed Hassan — Flutter Developer & Mobile Application Developer',
    description:
      'Flutter developer in Cairo building cross-platform Android and iOS apps on Clean Architecture, BLoC and live REST APIs. Case studies, source code and CV.',
    ogAlt:
      'Mohamed Hassan — Flutter Developer and Mobile Application Developer, Cairo, Egypt',
  },

  hero: {
    headline: 'I build cross-platform apps that run on real backends.',
    lede:
      'Flutter developer with 3+ years building Android and iOS applications across healthcare, entertainment and travel. I work in Clean Architecture with BLoC, wire screens to live REST APIs rather than mock data, and ship apps that handle auth, offline state, errors and two languages properly.',
  },

  contact: {
    email: 'mohamed.hassan.software1@gmail.com',
    github: 'https://github.com/mohamdhassan1',
    githubHandle: 'mohamdhassan1',
    linkedin: 'https://linkedin.com/in/muhamedhassan1',
    linkedinHandle: 'muhamedhassan1',
  },

  cv: {
    href: '/cv/Mohamed-Hassan-Flutter-Developer-CV.pdf',
    filename: 'Mohamed-Hassan-Flutter-Developer-CV.pdf',
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

/**
 * About section. Written from the CV summary and expanded only with things
 * that are visible in the repositories.
 */
export const about = {
  paragraphs: [
    'I am a Flutter developer based in Cairo. Since graduating in July 2025 I have been working freelance, building cross-platform applications for Android and iOS and taking them from an empty project to something wired to a real backend.',
    'Most of my work sits in the same shape: a Clean Architecture split between presentation, logic and data, BLoC or Cubit driving state, a repository layer over a Dio or http client, and typed models over the JSON. I care about the parts users notice when things go wrong — loading skeletons, empty states, error messages that say something useful, sessions that expire cleanly.',
    'My largest project, VCare, is a doctor appointment app running against a live Laravel REST API. It covers JWT authentication with secure token storage, doctor and specialization browsing, appointment booking and history, profile editing, a Gemini-backed assistant, a persisted light and dark theme, and a complete Arabic and English translation with right-to-left layout.',
  ],
  /** Every figure here was counted from the source tree, not estimated. */
  facts: [
    { value: '3+', label: 'years with Flutter', detail: 'Android and iOS, since 2022' },
    { value: '6', label: 'public repositories', detail: 'Flutter apps and one Laravel backend' },
    { value: '21', label: 'test files in VCare', detail: 'bloc, widget and localization tests' },
    { value: '2', label: 'languages, fully localized', detail: 'Arabic and English with RTL' },
  ],
} as const;

/** Experience timeline — taken from the CV, not extended beyond it. */
export const experience = [
  {
    role: 'Freelance Flutter Developer',
    period: 'Aug 2025 — Present',
    location: 'Cairo, Egypt',
    current: true,
    points: [
      'Designing, developing and delivering Flutter applications for Android and iOS across healthcare, entertainment and travel.',
      'Integrating real REST APIs, Firebase and SQLite, and handling authentication, local persistence and localization across projects.',
      'Applying Clean Architecture and BLoC so codebases stay scalable and testable from the UI down to the data layer.',
    ],
  },
  {
    role: 'Flutter Developer — Project-Based & Academic Experience',
    period: '2022 — Jul 2025',
    location: 'Cairo, Egypt',
    current: false,
    points: [
      'Built 3+ Flutter applications during academic years, covering health tech and e-learning.',
      'Led the mobile front-end in a 5-person cross-functional team (frontend, backend, AI) working to Agile delivery with code reviews.',
      'Maintained Git repositories with structured branching and pull-request conventions.',
    ],
  },
] as const;

export const education = {
  degree: 'B.Sc. in Computer Science',
  institution: 'Misr Higher Institute for Computer & Commerce',
  location: 'Mansoura, Egypt',
  graduated: 'Graduated July 2025',
  grade: 'Grade: Very Good',
} as const;

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'B2 Upper-Intermediate — Business English, MCIT/DECI certified' },
] as const;

/**
 * "What I can build" — for freelance visitors. Each entry names the project
 * that backs it, so nothing here is a capability I have not actually shipped.
 */
export const services = [
  {
    title: 'Booking & appointment apps',
    body: 'Browsing, filtering, search, slot selection, booking and history — backed by your API, with the loading and failure states handled.',
    backedBy: 'VCare',
  },
  {
    title: 'Apps on a REST backend',
    body: 'A typed model and repository layer over your existing endpoints, with interceptors, timeouts and error mapping rather than raw HTTP calls in the UI.',
    backedBy: 'VCare, Potter Library, CineVerse',
  },
  {
    title: 'Authentication & sessions',
    body: 'Register, login and logout against your backend, JWT held in encrypted storage, and expired sessions that clear themselves and return the user to sign-in.',
    backedBy: 'VCare, Travel Booking',
  },
  {
    title: 'Arabic & English apps',
    body: 'Full localization through Flutter l10n with ARB files, right-to-left layout, and a language choice that survives a restart.',
    backedBy: 'VCare',
  },
  {
    title: 'Firebase applications',
    body: 'Firebase Authentication and Cloud Firestore for apps that need accounts and hosted data without you running a server.',
    backedBy: 'Travel Booking, FoodLens',
  },
  {
    title: 'Offline & local storage',
    body: 'SQLite for structured local data, and secure or preference storage for tokens, favourites and settings that must persist on device.',
    backedBy: 'Notes App, Potter Library, VCare',
  },
  {
    title: 'AI-assisted features',
    body: 'Integrating a hosted model into a Flutter app — a Gemini assistant in VCare, with the API key kept out of the bundle and off the logs.',
    backedBy: 'VCare',
  },
  {
    title: 'Theming & design systems',
    body: 'A token-driven theme with light and dark modes, shared components and a consistent type scale, instead of styling bolted onto each screen.',
    backedBy: 'VCare',
  },
] as const;

/**
 * How I build. Each step lists practices that are visible in the repositories,
 * so this reads as a description of the work rather than a generic process.
 */
export const process = [
  {
    n: '01',
    title: 'Understand',
    body: 'Work out what the app has to do and what the backend actually supports. In VCare the endpoint list came straight from the Postman collection — if a feature had no endpoint, it did not get invented.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Settle the screens and the visual language first: colours, spacing, typography and shared components as tokens, so the UI stays consistent as it grows.',
  },
  {
    n: '03',
    title: 'Architect',
    body: 'Split the project into presentation, logic and data. Repositories own the data access, BLoCs own the state, and screens stay declarative.',
  },
  {
    n: '04',
    title: 'Develop',
    body: 'Build screen by screen against the real API, with typed models, and with loading, empty and error states treated as part of the feature rather than an afterthought.',
  },
  {
    n: '05',
    title: 'Integrate',
    body: 'Wire in the cross-cutting pieces: auth interceptors, secure token storage, theme and locale controllers, and anything that has to persist across restarts.',
  },
  {
    n: '06',
    title: 'Test',
    body: 'Cover the logic and the tricky widgets with flutter_test — VCare carries 21 test files across blocs, forms, validators, localization and UI components.',
  },
  {
    n: '07',
    title: 'Deliver',
    body: 'Keep history clean in Git with structured branches and pull requests, and hand over a codebase someone else can pick up and read.',
  },
] as const;
