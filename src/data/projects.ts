/**
 * Projects.
 *
 * ACCURACY NOTES — read before editing:
 *
 * Every screenshot referenced here was captured from a real running app, not
 * mocked up. Most were captured by building the app for web from its own
 * source; the Notes shots come from an Android emulator, because sqflite has
 * no web implementation. Live data in the Potter Library and CineVerse shots
 * comes from the real potterapi and TMDB endpoints the apps call.
 *
 * Rahala's frames are the real app too: built for web from its own source and
 * run against its live Supabase project. They stop at the sign-in wall, so the
 * catalogue, booking and profile screens are described but not shown.
 *
 * The FoodLens clip is a screen recording of the real app on a device. It is
 * trimmed to 37s-67s of the original and stripped of audio, because the
 * opening signup sequence showed a real person's name, email address and
 * phone number. Do not restore the untrimmed recording.
 *
 * Where the CV described a stack the repository does not contain, the
 * repository won:
 *   - Rahala (formerly "Travel Booking App"): rebuilt Sep-Oct 2026 and now a
 *     different application. Supabase, GoRouter, FCM and Arabic/RTL are no
 *     longer CV claims to discount — every one was read in the source, and the
 *     catalogue counts below were queried from the live Supabase project
 *     (4 categories, 20 destinations, 40 packages). Firebase Auth, Cloud
 *     Firestore, Google Sign-In and sqflite are gone; Firebase is kept only
 *     for Cloud Messaging. CAVEAT: the rebuild is local and unpushed, so the
 *     linked repository still serves the previous version. Keep the note on
 *     the entry until it is pushed.
 *   - CineVerse: the CV describes Firebase favourites with SQLite caching.
 *     The source keeps favourites in an in-memory list and depends on neither,
 *     so the entry describes what the code does.
 *   - FoodLens: the public repository is the Laravel backend. The Flutter
 *     client is not pushed, so the mobile-side description is attributed to
 *     the CV rather than presented as verified from source.
 */

/**
 * One media system for every project: a screenshot and a screen recording are
 * both just a `MediaItem`, and both render through the same device frame.
 */
export type MediaItem =
  | {
      kind: 'image';
      src: string;
      /** 'contain' for a source whose shape is not 9:19.5, so it is letterboxed rather than clipped. */
      fit?: 'cover' | 'contain';
      alt: string;
      /** Short caption shown under the frame. */
      caption: string;
    }
  | {
      kind: 'video';
      /** MP4 (H.264) — the universally supported fallback. */
      src: string;
      /** WebM (VP9), offered first where supported. */
      srcWebm: string;
      /** Still shown before the clip loads; also the poster on reduced motion. */
      poster: string;
      alt: string;
      caption: string;
    };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  period: string;
  role: string;
  /** Set when the project is the centrepiece case study. */
  featured?: boolean;
  caseStudy?: boolean;
  repo?: string;
  /** Extra actions beside the repo button. Only real destinations belong here. */
  links?: { label: string; href: string; icon?: 'github' | 'arrow-up-right' | 'code' }[];
  /** Rendered as an accent-coloured mark when there are no screenshots. */
  logo?: { src: string; alt: string };
  problem: string;
  solution: string;
  features: string[];
  technical: { label: string; value: string }[];
  stack: string[];
  media: MediaItem[];
  /** Shown verbatim when a claim comes from the CV rather than the source. */
  note?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: 'vcare',
    name: 'VCare',
    tagline: 'Doctor appointment booking on a live Laravel REST API',
    category: 'Healthcare',
    period: 'Jul 2025 — Sep 2026',
    role: 'Sole developer — architecture, UI, API integration, tests',
    featured: true,
    caseStudy: true,
    repo: 'https://github.com/mohamdhassan1/vcare',
    logo: { src: '/brand/vcare-logo.png', alt: 'VCare app icon' },
    problem:
      'Booking a doctor usually means a phone call. VCare turns the whole path — finding a specialist, picking a slot, keeping track of what you booked — into one app, running against a real backend rather than a prototype.',
    solution:
      'A Flutter client built in Clean Architecture over a live Laravel REST API. Every screen is API-backed: the endpoint list was taken from the backend Postman collection, and features without an endpoint were left out instead of faked. Twelve BLoCs drive state, ten repositories own data access, and a Dio interceptor attaches the JWT and tears the session down on a 401.',
    features: [
      'Register, login and logout against the live API, with the JWT held in flutter_secure_storage',
      'Sessions that expire cleanly — a 401 clears the token and returns the user to sign-in',
      'Doctor browsing, specialization listing, filtering and search',
      'Appointment booking with slot selection, plus appointment history',
      'Profile viewing and editing, including a locally stored profile photo',
      'A Gemini-backed in-app assistant for health questions and app guidance',
      'Favourite doctors, stored per account on-device',
      'Light and dark themes, and an Arabic/English switch — both persisted across restarts',
    ],
    technical: [
      {
        label: 'Architecture',
        value: 'Clean Architecture across core, data, logic and presentation. Repositories own data access, BLoCs own state, screens stay declarative.',
      },
      {
        label: 'State management',
        value: '12 BLoCs — auth, home, doctor, doctor details, specialization, search, favorites, booking, my appointments, profile, update profile and AI chat.',
      },
      {
        label: 'Networking',
        value: 'A shared Dio client with an auth interceptor, timeouts, and an error mapper turning transport failures into typed exceptions the UI can render.',
      },
      {
        label: 'Security',
        value: 'Tokens in encrypted storage, the Gemini key injected via --dart-define so it is never committed, and neither value ever written to logs.',
      },
      {
        label: 'Localization',
        value: 'Complete Arabic and English translation through Flutter l10n with ARB files, right-to-left layout, and a persisted locale controller.',
      },
      {
        label: 'Testing',
        value: '21 test files covering blocs, form validators, appointment slot logic, localization and UI components.',
      },
    ],
    stack: [
      'Flutter',
      'Dart',
      'BLoC',
      'Clean Architecture',
      'Dio',
      'REST API',
      'JWT',
      'flutter_secure_storage',
      'Gemini API',
      'Flutter l10n',
      'flutter_test',
    ],
    media: [
      {
        kind: 'image',
        src: '/projects/vcare-home.webp',
        alt: 'VCare home screen with a search field, a Find Nearby banner, a doctor-specialties row and a recommended-doctors list',
        caption: 'Home',
      },
      {
        kind: 'image',
        src: '/projects/vcare-search.webp',
        alt: 'VCare doctor search filtered to cardiology, showing six results with rate and location',
        caption: 'Search & filter',
      },
      {
        kind: 'image',
        src: '/projects/vcare-doctor-details.webp',
        alt: 'VCare doctor details screen with the consultation fee, working hours, an about section and a Book Appointment button',
        caption: 'Doctor details',
      },
      {
        kind: 'image',
        src: '/projects/vcare-booking.webp',
        alt: 'VCare book-appointment screen with a date strip, a grid of times, a notes field and a Confirm Booking button',
        caption: 'Booking',
      },
      {
        kind: 'image',
        src: '/projects/vcare-appointments.webp',
        alt: 'VCare my-appointments list with pending bookings showing doctor, specialty, date and time',
        caption: 'My appointments',
      },
      {
        kind: 'image',
        src: '/projects/vcare-ai-assistant.webp',
        alt: 'VCare AI assistant screen with a medical-advice disclaimer, suggested questions and a message field',
        caption: 'AI assistant',
      },
    ],
    note: 'Screenshots are the running app driven end to end, signed in as a test account against a seeded database — the doctor names, fees and appointment times are generated fixture data, not real clinic listings.',
  },

  {
    slug: 'potter-library',
    name: 'Potter Library',
    tagline: 'Books, characters, houses and spells, browsed over a live public API',
    category: 'Entertainment',
    period: '2026',
    role: 'Sole developer',
    featured: true,
    repo: 'https://github.com/mohamdhassan1/library',
    problem:
      'A catalogue app is a good test of the unglamorous parts: several endpoints, list and detail screens, search, saved items, and images that have to load without the UI stuttering.',
    solution:
      'A Flutter client over the public Potter API, split into datasource, repository and BLoC layers. Four BLoC families cover all books, top books, a random featured pick and search, with separate datasources for characters, houses and spells. Covers are cached, loading has its own state, and failures render an error view instead of an empty screen.',
    features: [
      'All eight books with covers, page counts and release dates from the live API',
      'A featured book that can be re-rolled, backed by the random-book endpoint',
      'Search with quick-suggestion chips, served by the search endpoint',
      'Character, house and spell browsing from their own endpoints',
      'Saved books kept on device through SharedPreferences',
      'Cached cover images, dedicated loading and error views',
    ],
    technical: [
      {
        label: 'Architecture',
        value: 'core / data / logic / presentation, with a dedicated DioClient and every endpoint declared in one ApiUrl constants class.',
      },
      {
        label: 'State management',
        value: 'Seven BLoCs — all books, top books, random book, search, characters, houses and spells.',
      },
      {
        label: 'Data flow',
        value: 'Datasources make raw calls, repositories parse and map errors, BLoCs expose states. The UI never touches Dio directly.',
      },
      {
        label: 'Media',
        value: 'cached_network_image for covers and portraits so scrolling stays smooth and repeat visits do not refetch.',
      },
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'Dio', 'REST API', 'SharedPreferences', 'cached_network_image'],
    media: [
      {
        kind: 'image',
        src: '/projects/library-home.webp',
        alt: 'Potter Library home screen showing character avatars, a featured book and a popular books row',
        caption: 'Home — live API data',
      },
      {
        kind: 'image',
        src: '/projects/library-books.webp',
        alt: 'Potter Library all-books grid showing the Harry Potter series covers',
        caption: 'All books',
      },
      {
        kind: 'image',
        src: '/projects/library-book-details.webp',
        alt: 'Potter Library detail screen for Harry Potter and the Chamber of Secrets with page count, release date and description',
        caption: 'Book details',
      },
      {
        kind: 'image',
        src: '/projects/library-explore.webp',
        alt: 'Potter Library explore screen',
        caption: 'Explore',
      },
      /* Search and onboarding are captured but not shown — four frames keeps
         this project level with the others instead of dominating the page. */
    ],
  },

  {
    slug: 'cineverse',
    name: 'CineVerse',
    tagline: 'Movie discovery against the TMDB API',
    category: 'Entertainment',
    period: 'Nov — Dec 2025',
    role: 'Sole developer',
    featured: true,
    repo: 'https://github.com/mohamdhassan1/movie',
    problem:
      'Film browsing is all lists — now playing, popular, top rated, upcoming, search — each paginated, image-heavy and slow to load if handled naively.',
    solution:
      'A Flutter client over the TMDB REST API using Cubits for each feed. A carousel fronts the home screen, shimmer placeholders cover loading, and posters are cached so scrolling between the Most Popular and Top Rated rows stays smooth.',
    features: [
      'Now playing, popular, top rated and upcoming feeds from TMDB',
      'A featured carousel with ratings and release years',
      'Explore with a search field and genre filter chips',
      'Detail screens with backdrops, ratings and overviews',
      'Shimmer loading placeholders and cached poster images',
      'Bottom navigation across home, explore, bookmarks and profile',
    ],
    technical: [
      {
        label: 'State management',
        value: 'Cubits per feed — now playing, popular and top rated — each with its own state class, kept separate so one failing request cannot blank the screen.',
      },
      {
        label: 'Networking',
        value: 'TMDB v3 over http with bearer auth, and image URLs built from separate poster, backdrop and low-resolution bases.',
      },
      {
        label: 'Performance',
        value: 'cached_network_image for posters and shimmer placeholders sized to the final layout, so rows do not jump as images arrive.',
      },
      {
        label: 'Scope note',
        value: 'Favourites are held in memory for the session. The app has no Firebase or SQLite dependency, so they do not survive a restart.',
      },
    ],
    stack: ['Flutter', 'Dart', 'Cubit', 'TMDB REST API', 'http', 'carousel_slider', 'shimmer', 'cached_network_image'],
    media: [
      {
        kind: 'image',
        src: '/projects/movie-home.webp',
        alt: 'CineVerse home screen with a featured film carousel and Most Popular and Top Rated rows of real film posters',
        caption: 'Home — live TMDB data',
      },
      {
        kind: 'image',
        src: '/projects/movie-explore.webp',
        alt: 'CineVerse explore screen with a search field, genre chips and a grid of rated film posters',
        caption: 'Explore & search',
      },
      /* The profile screen is not shown: it renders placeholder account data
         rather than anything the app actually computes. */
    ],
  },

  {
    slug: 'rahala',
    name: 'Rahala',
    tagline: 'Destination discovery and trip booking on a Supabase backend',
    category: 'Travel',
    period: 'Sep — Oct 2026',
    role: 'Sole developer — Flutter client, Postgres schema and Edge Function',
    featured: true,
    repo: 'https://github.com/mohamdhassan1/Travel',
    problem:
      'A booking app is only as trustworthy as its server. Prices have to be computed somewhere the client cannot reach, a booking has to survive a dropped connection without turning into two, and one account must never see another account’s trips.',
    solution:
      'A Flutter app over Supabase — Postgres with row-level security, Auth, Storage and an Edge Function. The server is the authority: a trigger prices and validates every booking, RLS enforces ownership, a SQL function handles cancellation, and push is dispatched server-side. The client stays a thin Cubit layer over repositories that throw only typed failures, with GoRouter tabs and a complete English/Arabic interface.',
    features: [
      'Email sign-up with confirmation, sign-in, password reset by email link, password change, sign-out and in-app account deletion',
      'Session restored on launch, with an expired session explained rather than dropped',
      'A catalogue of 4 categories, 20 destinations and 40 packages served from Postgres',
      'Search across English and Arabic text, with diacritics, tatweel and alef variants normalised, plus category, price and trip-length filters and sorting',
      'Destination detail with a full-screen photo gallery, live weather from Open-Meteo, packages, sharing and favourites',
      'Booking flow where the database validates the request and computes the price — a retried submit cannot create a duplicate',
      'Trips split into upcoming, past and cancelled, with cancellation through a server-side function',
      'In-app notification centre fed by database triggers, FCM push sent from a Supabase Edge Function, and local trip reminders on the device',
      'Profile with a private photo served through signed URLs, travel statistics and a traveller level derived only from the user’s own bookings',
      'Light and dark themes, English and Arabic with right-to-left layout, a bottom bar on phones and a side rail on wide windows',
    ],
    technical: [
      {
        label: 'Backend',
        value: 'Supabase Postgres — 8 tables, 13 SQL functions and 8 triggers behind row-level security, applied as 5 ordered migrations, plus a Deno Edge Function that sends FCM over HTTP v1.',
      },
      {
        label: 'Booking integrity',
        value: 'Price and status are computed by a database trigger, never sent by the client. An idempotency key on (user, request) means a retry after a lost response returns the original booking instead of creating a second one.',
      },
      {
        label: 'State management',
        value: '20 Cubits across session, catalog, explore, booking, favourites, profile, notifications and settings. App-wide cubits follow the session and clear on sign-out, so one account’s data never appears under another.',
      },
      {
        label: 'Architecture',
        value: 'app / core / data / logic / presentation / routing, with an architecture test that fails the build if a widget talks to Supabase, Firebase or the notification plugin directly.',
      },
      {
        label: 'Errors',
        value: 'Repositories throw only a typed AppFailure, which the UI maps to localized messages — a user never sees raw SQL or exception text.',
      },
      {
        label: 'Navigation',
        value: 'GoRouter StatefulShellRoute tabs with a redirect policy kept free of Flutter types so it can be unit-tested exhaustively, and rahala:// deep links including the auth callback.',
      },
      {
        label: 'Localization',
        value: '382 strings in English and Arabic ARB files — full parity, with right-to-left layout and Arabic-aware search normalisation.',
      },
      {
        label: 'Testing',
        value: '41 Dart test files across unit, widget and architecture suites, plus a Node test for the Edge Function’s FCM sender.',
      },
    ],
    stack: [
      'Flutter',
      'Dart',
      'Supabase',
      'PostgreSQL',
      'Row-Level Security',
      'Edge Functions',
      'Supabase Storage',
      'Cubit',
      'GoRouter',
      'Firebase Cloud Messaging',
      'Local Notifications',
      'Dio',
      'Flutter l10n',
    ],
    media: [
      {
        kind: 'image',
        src: '/projects/rahala-onboarding.webp',
        alt: 'Rahala onboarding screen with a photograph of Oia in Santorini, the heading Discover places that move you, and a language toggle',
        caption: 'Onboarding',
      },
      {
        kind: 'image',
        src: '/projects/rahala-signin.webp',
        alt: 'Rahala sign-in screen in dark mode with email and password fields and a forgot-password link',
        caption: 'Sign in',
      },
      {
        kind: 'image',
        src: '/projects/rahala-signin-ar.webp',
        alt: 'The same Rahala sign-in screen in Arabic, with the whole layout mirrored right-to-left and the brand shown as رحلة',
        caption: 'Arabic — RTL',
      },
      {
        kind: 'image',
        src: '/projects/rahala-signup.webp',
        alt: 'Rahala create-account screen with name, email and password fields',
        caption: 'Create account',
      },
    ],
    note: 'Screenshots are the real app, built from its own source and run against the live Supabase project. They cover the screens reachable without a session — the catalogue, booking and profile screens sit behind sign-in, so they are described here rather than shown. No money is taken anywhere in the app: bookings are real database records with server-computed prices, and the app says so wherever a price appears. The linked repository still holds the previous version of this project; the rebuild described here has not been pushed yet.',
  },

  {
    slug: 'foodlens',
    name: 'FoodLens',
    tagline: 'AI nutrition and health tracking — graduation project',
    category: 'Health & AI',
    period: 'Feb — Jul 2025',
    role: 'Mobile front-end lead in a 5-person team (frontend, backend, AI)',
    featured: true,
    repo: 'https://github.com/mohamdhassan1/Graduation-project-Foodlens',
    logo: { src: '/brand/foodlens-logo.png', alt: 'FoodLens app logo' },
    problem:
      'Calorie tracking fails when logging a meal takes too long. FoodLens aimed to replace typing out every item with pointing a camera at the plate.',
    solution:
      'A Flutter client against a Laravel REST backend. A scan endpoint takes a photo, runs food recognition over it and writes the result to the user’s daily totals, which are tracked against calorie, water and sleep goals and charted over the week.',
    features: [
      'Food scanning from the camera, with scan history and deletion',
      'Daily calorie, water and sleep totals against per-user goals',
      'A weekly view and a calorie-status check endpoint',
      'Registration, login and OTP-based password reset',
      'Charted progress over time',
    ],
    technical: [
      {
        label: 'Backend (verified)',
        value: 'Laravel REST API — user and user-goal resources, daily-data with weekly and calorie-status endpoints, food scan create, list and delete, and a three-step OTP password reset.',
      },
      {
        label: 'Data model (verified)',
        value: 'Users, user goals, daily data, scan history and foods, with recognised items mapped from the model output onto food records.',
      },
      {
        label: 'Mobile client',
        value: 'Flutter with BLoC and Provider, Dio, get_it for dependency injection, camera and image_picker for capture, and fl_chart and Syncfusion charts for the progress views.',
      },
      {
        label: 'AI',
        value: 'Food recognition built by the team’s AI members using YOLOv11, reported in the project at roughly 90% accuracy.',
      },
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'Dio', 'Laravel REST API', 'Firebase', 'SQLite', 'YOLOv11'],
    media: [
      {
        kind: 'video',
        src: '/projects/foodlens-demo.mp4',
        srcWebm: '/projects/foodlens-demo.webm',
        poster: '/projects/foodlens-poster.webp',
        alt: 'Screen recording of FoodLens running on a phone: the daily dashboard, photographing a banana in the food scanner, and the recognised item appearing in the scan history',
        caption: 'Recorded on device',
      },
      /* Only one still alongside the clip: the recording already walks through
         the dashboard, so a dashboard screenshot beside it just repeats what is
         playing. Scan history is the one screen the clip passes through quickly. */
      {
        kind: 'image',
        src: '/projects/foodlens-history.webp',
        alt: 'FoodLens scan history listing recognised foods with their calorie values',
        caption: 'Scan history',
      },
    ],
    note: 'The clip is a screen recording of the real app, trimmed to the tracking and scanning flow. The public repository holds the Laravel backend; the Flutter client is not pushed. The backend, data model and endpoints above were read from the repository. The mobile stack, the team role and the YOLOv11 accuracy figure come from the CV and the project documentation.',
  },

  {
    slug: 'notes',
    name: 'Notes App',
    tagline: 'Offline note-taking on SQLite',
    category: 'Productivity',
    period: '2026',
    role: 'Sole developer',
    repo: 'https://github.com/mohamdhassan1/notes-',
    problem:
      'A small app with no backend at all — everything lives on the device, so the database layer has to carry the whole feature.',
    solution:
      'A Flutter notes app with a sqflite database helper handling create, read, update and delete, a staggered grid for the note list, Lottie animations for loading and onboarding, and a confirmation dialog before anything is deleted.',
    features: [
      'Create, edit and delete notes with local SQLite persistence',
      'Staggered grid layout for varying note lengths',
      'Onboarding and splash flow with Lottie animations',
      'Delete confirmation dialog and an empty state',
    ],
    technical: [
      {
        label: 'Storage',
        value: 'A sqflite database helper owning the schema and all CRUD, kept separate from the screens.',
      },
      {
        label: 'UI',
        value: 'flutter_staggered_grid_view for the list, Lottie for motion, and intl for date formatting.',
      },
    ],
    stack: ['Flutter', 'Dart', 'SQLite', 'sqflite', 'Lottie'],
    media: [
      {
        kind: 'image',
        src: '/projects/notes-onboarding.webp',
        alt: 'Notes app onboarding screen with a Lottie illustration and a Get Started button',
        caption: 'Onboarding',
      },
      {
        kind: 'image',
        src: '/projects/notes-list.webp',
        alt: 'Notes app home screen with saved notes in a staggered grid of coloured cards',
        caption: 'Note list',
      },
      {
        kind: 'image',
        src: '/projects/notes-new-note.webp',
        alt: 'Notes app new-note screen with title and description fields and a save action',
        caption: 'New note',
      },
      {
        kind: 'image',
        src: '/projects/notes-delete.webp',
        alt: 'Notes app delete-confirmation dialog over the note grid',
        caption: 'Delete confirmation',
      },
    ],
    note: 'Screenshots are the running app on an Android emulator. sqflite has no web implementation, so these could not be captured through the web build used for the other projects.',
  },
];

export const moreProjects: Project[] = [];
