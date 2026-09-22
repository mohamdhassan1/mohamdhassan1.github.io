/**
 * Skills.
 *
 * Only entries that are backed by code in the repositories, or by tooling the
 * CV lists. Three things the CV mentions are deliberately absent because no
 * repository contains them: Supabase, GoRouter and Firebase Cloud Messaging.
 * Add them back once the source that uses them is pushed.
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
    seenIn: 'VCare, Potter Library, Travel',
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
    title: 'Firebase & Cloud',
    seenIn: 'Travel, FoodLens',
    items: ['Firebase Auth', 'Cloud Firestore', 'Firebase Core', 'Google Sign-In', 'Laravel REST backend'],
  },
  {
    title: 'Data & Storage',
    seenIn: 'Notes, VCare, Potter Library',
    items: ['SQLite', 'sqflite', 'SharedPreferences', 'flutter_secure_storage', 'CRUD', 'Local persistence'],
  },
  {
    title: 'Auth & Security',
    seenIn: 'VCare, Travel',
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
    title: 'Localization',
    seenIn: 'VCare',
    items: ['Arabic & English', 'RTL layout', 'Flutter l10n', 'ARB files', 'Persisted locale'],
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
