/**
 * Skills.
 *
 * Only entries that are backed by code, or by tooling the CV lists.
 *
 * Supabase, GoRouter and Firebase Cloud Messaging were absent here for a long
 * time because no project actually used them. The Rahala rebuild (Sep-Oct
 * 2026) does: its source was read directly and its Supabase project queried,
 * so those entries are now earned rather than claimed. The matching caveat in
 * `projects.ts` records what is and is not verified.
 */

export type SkillGroup = {
  title: string;
  /** Where these show up, shown under the group title. */
  seenIn: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Mobile Development',
    seenIn: 'Every project',
    items: ['Flutter', 'Dart', 'Android', 'iOS', 'Cross-platform', 'Responsive UI', 'Material Design'],
  },
  {
    title: 'Architecture & State',
    seenIn: 'VCare, Potter Library, Rahala',
    items: [
      'Clean Architecture',
      'BLoC',
      'Cubit',
      'Provider',
      'Repository Pattern',
      'OOP',
      'SOLID',
      'MVC / MVVM',
    ],
  },
  {
    title: 'Backend & APIs',
    seenIn: 'VCare, Potter Library, CineVerse',
    items: ['REST API', 'Dio', 'http', 'JSON serialization', 'Interceptors', 'Error mapping', 'Postman'],
  },
  {
    title: 'Backend as a service',
    seenIn: 'Rahala, FoodLens',
    items: [
      'Supabase',
      'PostgreSQL',
      'Row-Level Security',
      'SQL functions & triggers',
      'Edge Functions (Deno)',
      'Supabase Storage',
      'Firebase Cloud Messaging',
      'Laravel REST backend',
    ],
  },
  {
    title: 'Data & Storage',
    seenIn: 'Notes, VCare, Potter Library',
    items: ['SQLite', 'sqflite', 'SharedPreferences', 'flutter_secure_storage', 'CRUD', 'Local persistence'],
  },
  {
    title: 'Auth & Security',
    seenIn: 'VCare, Rahala',
    items: [
      'JWT',
      'Login / Register / Logout',
      'Secure session management',
      'Token interceptors',
      'Encrypted storage',
    ],
  },
  {
    title: 'AI Integration',
    seenIn: 'VCare',
    items: ['Gemini API', 'Prompt design', 'Streaming-safe timeouts', 'Key injection via dart-define'],
  },
  {
    title: 'Navigation',
    seenIn: 'Rahala',
    items: ['GoRouter', 'Declarative routing', 'Nested tab shells', 'Route guards', 'Deep linking'],
  },
  {
    title: 'Localization',
    seenIn: 'VCare, Rahala',
    items: ['Arabic & English', 'RTL layout', 'Flutter l10n', 'ARB files', 'Persisted locale', 'Arabic search normalisation'],
  },
  {
    title: 'Testing & Tooling',
    seenIn: 'VCare and across repos',
    items: ['flutter_test', 'Widget tests', 'Bloc tests', 'Git', 'GitHub', 'Android Studio', 'VS Code', 'Figma', 'Agile / Scrum'],
  },
  {
    title: 'Languages',
    seenIn: 'CV',
    items: ['Dart (Advanced)', 'Python', 'Java', 'C#', 'C++'],
  },
];
