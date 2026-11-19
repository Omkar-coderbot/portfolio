import {
  CaseStudy,
  EducationItem,
  ExperienceItem,
  HowIWorkPillar,
  ProfileData,
  TechCategory,
} from '../models/portfolio.model';

/**
 * =========================================================================
 * CANDIDATE PROFILE & POSITIONING
 * =========================================================================
 * Grounded candidate information and personal placeholders.
 * Update these paths and URLs when adding personal assets or data changes.
 */
export const PROFILE_DATA: ProfileData = {
  name: 'Omkar Marwadi',
  title: 'Senior Software Engineer', // Set strictly to "Senior Software Engineer"
  company: 'Neilsoft Ltd.',
  location: 'Pune, India',
  tenure: 'Jul 2026 – Present',
  totalExperience: '3+ Years',
  summary:
    'Senior Software Engineer at Neilsoft Ltd. with 3+ years of software engineering experience. Focused on high-throughput backend data pipelines (.NET 8, TPL Dataflow), PostGIS GiST spatial indexing, serverless Azure pipelines (including Azure Container Apps and ACA Jobs), and browser-based 2D/3D layout tools.',
  email: 'omkar.marwadi11@gmail.com', // Contact placeholder
  phone: '+91 9075914867', // Phone placeholder
  resumeUrl: '/assets/Omkar_Marwadi_Resume.pdf', // PDF download placeholder
  github: 'https://github.com/Omkar-coderbot', // GitHub profile placeholder
  linkedin: 'https://linkedin.com/in/omkarmarwadi', // LinkedIn profile placeholder
  coreStack: [
    'C#',
    '.NET 8',
    'ASP.NET Core',
    'Angular 17',
    'TypeScript',
    'MS SQL Server',
    'PostgreSQL',
    'PostGIS',
    'Azure Container Apps',
    'Azure Container Apps Jobs',
    'Azure Blob Storage',
    'Azure Key Vault',
    'Docker',
    'Git',
    'Claude',
    'OpenAI API',
  ],
  telemetryHighlights: [
    {
      value: '2M+',
      label: 'LA County Parcels Processed',
      subtext: 'Evaluated with multi-threaded TPL Dataflow engine',
    },
    {
      value: '13x',
      label: 'Faster Data Ingestion',
      subtext: 'Parcel selection reduced to under 2 minutes',
    },
    {
      value: '~15 Min',
      label: 'Layout Prep Turnaround',
      subtext: 'Reduced from ~2 months via browser 2D/3D geometry',
    },
    {
      value: '<120ms',
      label: 'Spatial Query Latency',
      subtext: 'PostGIS GiST indexing & custom Koop.js service',
    },
  ],
};

/**
 * =========================================================================
 * CASE STUDIES (SPLIT CARDS WITH DEDICATED IMAGE SLOTS)
 * =========================================================================
 * Dedicated visual slots with easy-to-swap asset paths, clean aspect ratios,
 * and structured captions (no generic placeholders or fake telemetry cards).
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'parcel-sync-platform',
    title: 'Geospatial Real Estate & Parcel Platform',
    subtitle: 'High-Throughput Land Parcel Valuation & Synchronization Engine',
    description:
      'Web application for working with 2M+ LA County parcels, including automated financial reporting, OpenAI-assisted site summaries, and Google/Microsoft SSO with role-based access control. Built a multi-threaded TPL Dataflow sync engine that improved ingestion speed by 13x and reduced parcel selection time to under 2 minutes.',
    scaleBadge: '2M+ LA County Parcels • 13x Speedup',
    tags: [
      'C#',
      '.NET 8 Web API',
      'TPL Dataflow',
      'Angular 17',
      'TypeScript',
      'PostgreSQL',
      'PostGIS',
      'OpenAI API',
      'SSO / RBAC',
    ],
    // Dedicated Media Slot for parcel/map/report visual
    mediaSlot: {
      type: 'single',
      defaultViewId: 'parcel-map',
      views: [
        {
          id: 'parcel-map',
          label: 'Parcel Boundary & Report View',
          assetUrl: '/assets/projects/parcel-platform.png',
          caption: 'LA County Parcel Boundary Valuation & Automated Pro-Forma Report View',
          alt: 'LA County 2M+ parcel valuation and zoning report interface',
          description:
            'Interactive boundary selection, zoning classification (LAR3-1-CDO), lot coverage constraints, and automated OpenAI underwriting summary.',
        },
      ],
    },
    metrics: [
      {
        label: 'Ingestion Speedup',
        value: '13x Faster',
        detail: 'TPL Dataflow bounded parallel streaming',
      },
      {
        label: 'Parcel Selection',
        value: '< 2 Minutes',
        detail: 'Reduced from hours of blocking batch queries',
      },
      {
        label: 'Dataset Scale',
        value: '2M+ Parcels',
        detail: 'Continuous LA County parcel evaluations',
      },
    ],
    columnLeft: {
      title: 'Operational Performance',
      badge: 'METRICS',
      items: [
        {
          label: 'Data Ingestion Rate',
          value: '13x Ingestion Speedup',
          detail: 'Migrated from sequential loops to bounded TPL Dataflow actor pipelines.',
        },
        {
          label: 'Parcel Selection Latency',
          value: '< 2 Minutes',
          detail: 'County-wide multi-polygon filtering reduced from hours to under two minutes.',
        },
        {
          label: 'Dataset Scale',
          value: '2,000,000+ Parcels',
          detail: 'Full LA County parcel boundaries with zoning and valuation factors evaluated.',
        },
        {
          label: 'Automated Reports',
          value: 'Pro-Forma Generation',
          detail: 'Automated municipal zoning allowances, density bonuses, and tax assessments.',
        },
      ],
    },
    columnRight: {
      title: 'Technical Implementation',
      badge: 'SYSTEM SPECS',
      items: [
        {
          label: 'Backend Pipeline',
          value: 'C# / .NET 8 Web API & TPL Dataflow',
          detail: 'Bounded BufferBlocks and TransformBlocks preventing memory starvation under load.',
        },
        {
          label: 'Spatial Store',
          value: 'PostgreSQL & PostGIS (GiST Indexed)',
          detail: 'GiST spatial trees and chunked COPY batch commits avoiding pool exhaustion.',
        },
        {
          label: 'AI Site Summaries',
          value: 'OpenAI API with Structured JSON',
          detail: 'Automated municipal zoning and property summaries with validated constraint schemas.',
        },
        {
          label: 'Access Control',
          value: 'Google & Microsoft SSO with RBAC',
          detail: 'Claims-based OAuth 2.0 / OIDC authentication with fine-grained role permissions.',
        },
      ],
    },
    problem:
      'The legacy appraisal workflow processed 2M+ LA County parcels through sequential blocking routines. API timeouts, unbounded memory allocations, and connection pool starvation caused weekly batch jobs to stall after 48 hours, leaving parcel selection and financial reporting unusable during business hours.',
    hardDecision:
      'Rather than introducing external message brokers that added operational overhead for this single compute node, I architected an in-process bounded pipeline using .NET Task Parallel Library (TPL Dataflow). We enforced explicit backpressure through bounded in-memory channels (BufferBlock -> TransformBlock -> ActionBlock), matching parallel workers directly to PostgreSQL connection limits.',
    whatBrokeFirstAndFix: {
      broke:
        'Unbounded Parallel.ForEachAsync in initial testing saturated 32GB server RAM within 40 minutes as millions of pending async tasks accumulated uncollected payloads, starving PostgreSQL connection sockets.',
      fix:
        'Enforced strict BoundedCapacity = 500 across pipeline blocks, tuned MaxDegreeOfParallelism to match PostgreSQL pool capacity, and wrapped external write transactions with Polly exponential jitter retries.',
      outcome:
        'Memory stabilized at a flat 1.2 GB ceiling with sustained multi-core CPU saturation. Sync ingestion ran 13x faster, parcel selection dropped to under 2 minutes, and zero runs failed.',
    },
    architectureHighlights: [
      'Bounded BufferBlock throttles upstream parcel dumps to eliminate memory overflow',
      'Concurrent TransformBlock handles CPU-intensive financial and zoning rule evaluations',
      'ActionBlock batches PostgreSQL bulk COPY operations into chunked 1,000-record transactions',
      'OpenAI API integration generates automated, structured site summaries from parcel zoning data',
      'Angular 17 reactive client with Signals provides responsive search across 2M+ parcels',
    ],
  },
  {
    id: 'spatial-massing-tool',
    title: 'Spatial Massing & Floor-Plan Layout Tool',
    subtitle: 'Automated 2D/3D Feasibility & Zoning Layout Generator',
    description:
      'Browser-based 2D and 3D layout tool generating spatial massing and floor plans from parcel boundaries and zoning rules, reducing initial building layout preparation from roughly 2 months to around 15 minutes. Combines ArcGIS JS API for parcel layers, Konva.js for interactive 2D drafting, and Cesium.js for volumetric 3D massing.',
    scaleBadge: '~2 Mos → ~15 Min Turnaround • 60 FPS',
    tags: [
      'Angular 17',
      'ArcGIS SDK & JS API',
      'Cesium.js',
      'Konva.js',
      'TypeScript',
      'Computational Geometry',
    ],
    // Dedicated Media Slot with Switcher for 3D Cesium.js Model & 2D Konva.js Floor-Plan
    mediaSlot: {
      type: 'switcher',
      defaultViewId: 'cesium-3d',
      views: [
        {
          id: 'cesium-3d',
          label: '3D Cesium.js Model',
          assetUrl: '/assets/projects/spatial-massing-3d.png',
          caption: 'Cesium.js 3D Volumetric Massing Extrusion with Zoning & Setback Constraints',
          alt: 'Cesium.js 3D volumetric building massing model with solar shadows',
          description:
            'Parametric 3D building envelope extrusion with dynamic solar angles, podium step-backs, and floor slab divisions at 60 FPS.',
        },
        {
          id: 'konva-2d',
          label: '2D Konva.js Floor Plan',
          assetUrl: '/assets/projects/floor-plan-2d.png',
          caption: 'Konva.js 2D Interactive Floor-Plan Drafting & Offset Boundary Buffer',
          alt: 'Konva.js 2D interactive floor plan layout with setback buffer',
          description:
            'Hardware-accelerated HTML5 canvas floor-plan partitioning, unit breakdowns (Studio, 1-Bed, 2-Bed), and setback offsets.',
        },
      ],
    },
    metrics: [
      {
        label: 'Layout Prep Time',
        value: '~2 Mos → ~15 Min',
        detail: '99% faster site feasibility turnover',
      },
      {
        label: 'Rendering Frame Rate',
        value: '60 FPS WebGL',
        detail: 'Smooth volumetric massing in browser',
      },
      {
        label: 'Zoning Constraint Sync',
        value: 'Real-Time',
        detail: 'Automated setbacks, FAR, & height limits',
      },
    ],
    columnLeft: {
      title: 'Operational Impact',
      badge: 'METRICS',
      items: [
        {
          label: 'Layout Prep Velocity',
          value: '~2 Months → ~15 Minutes',
          detail: 'Replaced manual CAD iterations with rapid client-side geometry generation.',
        },
        {
          label: 'Browser Rendering',
          value: '60 FPS in WebGL',
          detail: 'GPU-accelerated 3D extrusion of building envelopes directly in modern browsers.',
        },
        {
          label: '2D Setback Math',
          value: 'Real-Time Canvas Updates',
          detail: 'Interactive dragging of setback buffers, building footprints, and floor plans.',
        },
        {
          label: 'Zoning Compliance',
          value: 'Automated Constraints',
          detail: 'Real-time validation against maximum lot coverage, FAR limits, and step-back angles.',
        },
      ],
    },
    columnRight: {
      title: 'Graphics & Geometry Stack',
      badge: 'SYSTEM SPECS',
      items: [
        {
          label: '2D Canvas Engine',
          value: 'Konva.js & HTML5 Canvas',
          detail: 'Interactive 2D drafting with sweep-line boundary offset algorithms.',
        },
        {
          label: '3D Extrusion Engine',
          value: 'Cesium.js WebGL Engine',
          detail: 'Parametric 3D building envelopes with dynamic solar shadow analysis.',
        },
        {
          label: 'Geospatial Context',
          value: 'ArcGIS SDK & JS API',
          detail: 'Real-time streaming of authoritative county parcel boundaries and zoning layers.',
        },
        {
          label: 'Frontend State',
          value: 'Angular 17 Signals & Web Workers',
          detail: 'Non-blocking geometry computations offloaded to background Web Workers.',
        },
      ],
    },
    problem:
      'Urban planners and real estate development teams spent up to 2 months manually cross-referencing zoning bylaws, drawing setback buffers in desktop CAD software, and extruding conceptual 3D massing for initial site feasibility evaluations.',
    hardDecision:
      'Engineered an entirely browser-native computational geometry pipeline. Rather than round-tripping heavy CAD files to a server, we combined Konva.js for interactive 2D setback sketching with Cesium.js for volumetric 3D building extrusion, driven by reactive Angular 17 Signals state.',
    whatBrokeFirstAndFix: {
      broke:
        'Complex non-convex and multi-ring parcel boundaries produced polygon self-intersections during inward setback buffering, freezing the main browser thread for 6 to 8 seconds.',
      fix:
        'Offloaded spatial polygon offset calculations to dedicated background Web Workers using robust sweep-line offset algorithms with polygon validation before rendering.',
      outcome:
        'Initial layout feasibility turnaround collapsed from ~2 months to ~15 minutes. Architects generate 3D massing envelopes and complete floor-plan layouts at 60 FPS inside the browser.',
    },
    architectureHighlights: [
      'Interactive 2D setback calculation using hardware-accelerated HTML5 Canvas with Konva.js',
      'Volumetric 3D massing extrusion using Cesium.js glTF primitives with sun-angle shadow analysis',
      'ArcGIS JavaScript SDK basemap integration for real-time parcel boundary streaming',
      'Web Workers offload polygon decomposition and setback math from UI render cycles',
      'Angular 17 standalone architecture with Signals providing sub-millisecond reactive UI sync',
    ],
  },
  {
    id: 'serverless-gis-etl',
    title: 'Serverless GIS ETL & Spatial Feature Service',
    subtitle: 'High-Performance Spatial Data Ingestion & Custom FeatureServer',
    description:
      'Serverless pipeline on Azure using Azure services (including Azure Container Apps Jobs) with .NET 8 and Polly retry policies to ingest ArcGIS APIs into PostGIS, served through Node.js and Koop.js with GiST spatial indexing for sub-second spatial queries.',
    scaleBadge: 'Sub-Second (<120ms) Spatial Lookups • 99.99% Uptime',
    tags: [
      'Azure Container Apps Jobs',
      '.NET 8',
      'Polly Resilience',
      'PostgreSQL',
      'PostGIS',
      'GiST Indexing',
      'Node.js',
      'Koop.js',
      'Azure Blob',
      'Azure Key Vault',
    ],
    // Dedicated Media Slot for pipeline / feature layer visual
    mediaSlot: {
      type: 'single',
      defaultViewId: 'pipeline-map',
      views: [
        {
          id: 'pipeline-map',
          label: 'Pipeline Architecture & Feature Layer View',
          assetUrl: '/assets/projects/serverless-gis-pipeline.png',
          caption: 'Serverless Azure Container Apps Jobs ETL Ingestion to PostGIS GiST & Koop.js Feature Layer',
          alt: 'Serverless GIS ETL pipeline and Koop.js feature server architecture',
          description:
            'Scheduled ACA Jobs worker pulling ArcGIS REST endpoints, staging deltas in Azure Blob, loading PostGIS with GiST spatial indexing, and serving sub-second spatial queries.',
        },
      ],
    },
    metrics: [
      {
        label: 'Spatial Query Latency',
        value: '< 120ms',
        detail: 'Sub-second GiST indexed geospatial queries',
      },
      {
        label: 'Service Uptime',
        value: '99.99%',
        detail: 'Decoupled from third-party vendor downtime',
      },
      {
        label: 'Monthly API Cost',
        value: '-85% Savings',
        detail: 'Eliminated per-query external meter fees',
      },
    ],
    columnLeft: {
      title: 'Reliability & Latency',
      badge: 'METRICS',
      items: [
        {
          label: 'Spatial Query Latency',
          value: 'Sub-Second (<120ms)',
          detail: 'Reduced from 15+ second waits on commercial third-party ArcGIS endpoints.',
        },
        {
          label: 'Operational Reliability',
          value: '99.99% Availability',
          detail: 'Client applications insulated from upstream vendor rate limits and gateway timeouts.',
        },
        {
          label: 'Fault Tolerance',
          value: 'Polly Retry Resilience',
          detail: 'Decorrelated exponential jitter and circuit breakers on transient upstream failures.',
        },
        {
          label: 'Cloud Cost Optimization',
          value: '85% Cost Reduction',
          detail: 'Eliminated commercial per-query metering costs by hosting internal Koop.js endpoints.',
        },
      ],
    },
    columnRight: {
      title: 'Cloud & Spatial Stack',
      badge: 'SYSTEM SPECS',
      items: [
        {
          label: 'Serverless ETL Workers',
          value: 'Azure Container Apps Jobs',
          detail: 'Scheduled cron-triggered container executions running .NET 8 with automatic scale-to-zero.',
        },
        {
          label: 'Resilience Library',
          value: '.NET 8 & Polly Policies',
          detail: 'Automated retry with jitter and circuit breaker policies protecting ingestion threads.',
        },
        {
          label: 'Spatial Storage',
          value: 'PostgreSQL & PostGIS (GiST)',
          detail: 'GiST (Generalized Search Tree) indexed geometry columns with topology simplification.',
        },
        {
          label: 'GeoServices REST Layer',
          value: 'Node.js & Koop.js Provider',
          detail: 'Translates PostGIS spatial data into standard ArcGIS FeatureServer GeoServices REST specs.',
        },
      ],
    },
    problem:
      'Internal GIS applications relied directly on commercial third-party ArcGIS FeatureServers. Upstream rate limiting, periodic 504 gateway timeouts during peak hours, and steep per-query metering bills restricted analytical query capacity and created external single points of failure.',
    hardDecision:
      'Decoupled client applications completely from external vendor endpoints. Designed an autonomous, scheduled serverless ETL pipeline on Azure using Azure Container Apps Jobs and .NET 8 to ingest external ArcGIS endpoints, stage delta payloads in Azure Blob Storage, load PostGIS tables, and expose standard FeatureServer endpoints via an in-house Node.js and Koop.js GeoServices provider.',
    whatBrokeFirstAndFix: {
      broke:
        'Complex nationwide spatial intersections (ST_Intersects) across multi-polygon environmental boundary layers caused PostgreSQL CPU to max at 100%, timing out client queries after 30 seconds.',
      fix:
        'Engineered GiST spatial indices on geometry columns, pre-simplified polygon vertex densities using ST_SimplifyPreserveTopology for zoom-dependent views, and partitioned high-density zoning layers by county FIPS codes.',
      outcome:
        'Spatial queries dropped to sub-second (<120ms) execution times. The internal Koop.js service reliably handled concurrent analyst workflows with 99.99% availability and 85% reduced monthly costs.',
    },
    architectureHighlights: [
      'Azure Container Apps Jobs execute on scheduled cron triggers to pull spatial deltas',
      '.NET 8 worker uses Polly for decorrelated exponential retry against vendor rate limits',
      'Azure Key Vault securely manages API keys, connection strings, and rotation policies',
      'Azure Blob Storage stages intermediate GeoJSON datasets for idempotent replay',
      'PostgreSQL with PostGIS extension provides GiST-indexed spatial operators (ST_Contains, ST_Intersects)',
      'Custom Koop.js adapter exposes standard Esri FeatureServer GeoServices REST endpoints',
    ],
  },
];

/**
 * =========================================================================
 * HOW I WORK (3-COLUMN SECTION)
 * =========================================================================
 * 1. Client Technical Point of Contact
 * 2. Mentoring
 * 3. Practical Performance
 */
export const HOW_I_WORK: HowIWorkPillar[] = [
  {
    id: 'poc',
    title: 'Client Technical Point of Contact',
    tagline: 'Requirement Alignment & Delivery',
    summary:
      'Direct involvement in client requirement discussions, clarifying scope and trade-offs, and supporting steady delivery.',
    keyPractices: [
      'Direct stakeholder collaboration to clarify ambiguous business and spatial requirements',
      'Evaluating performance vs. delivery timelines to recommend grounded technical trade-offs',
      'Translating high-level client objectives into clear, measurable engineering specifications',
      'Maintaining consistent communication and milestone demos throughout development cycles',
    ],
    icon: 'poc',
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    tagline: 'Code Reviews & Engineering Standards',
    summary:
      'Guiding junior engineers through code reviews, debugging support, backend structure, and database/query optimization.',
    keyPractices: [
      'Conducting thorough, actionable code reviews emphasizing maintainability and type safety',
      'Hands-on debugging guidance across complex asynchronous logic and concurrency issues',
      'Establishing clean backend structure and modular patterns in .NET 8 and Angular 17',
      'Guiding developers on SQL query tuning, execution plans, and spatial indexing techniques',
    ],
    icon: 'mentor',
  },
  {
    id: 'performance',
    title: 'Practical Performance',
    tagline: 'Reliability, Indexing & Clean Execution',
    summary:
      'Focusing on reliable execution, spatial indexing, parallel/batch processing, and clean, maintainable code.',
    keyPractices: [
      'Strategic GiST spatial indexing in PostGIS for sub-second geospatial query execution',
      'Designing bounded parallel pipelines with backpressure control using TPL Dataflow',
      'Defensive resilience engineering with Polly retries, exponential jitter, and fallbacks',
      'Clean, maintainable codebases adhering to domain-driven design and strict typing',
    ],
    icon: 'performance',
  },
];

/**
 * =========================================================================
 * CORE TECHNICAL STACK MATRIX
 * =========================================================================
 * Categorized view of candidate core technologies.
 */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'backend',
    title: 'Backend & Systems Engineering',
    subtitle: 'High-throughput pipelines, async streaming, and resilient APIs.',
    skills: [
      {
        name: 'C# / .NET 8',
        description: 'High-throughput async backends, memory-efficient streaming, and modern runtime features',
        highlight: true,
      },
      {
        name: 'ASP.NET Core Web API',
        description: 'REST services, middleware pipelines, model validation, and high-concurrency request lifecycles',
        highlight: true,
      },
      {
        name: '.NET TPL Dataflow',
        description: 'In-process bounded actor-model pipelines with explicit backpressure control',
        highlight: true,
      },
      {
        name: 'Polly Resilience Policies',
        description: 'Retry with decorrelated exponential jitter, circuit breakers, and fallback mechanisms',
      },
      {
        name: 'Node.js & Koop.js',
        description: 'Custom GeoServices REST translation servers replacing third-party vendor ArcGIS services',
      },
      {
        name: 'OAuth 2.0 / SSO & RBAC',
        description: 'Google & Microsoft SSO with claims-based authentication and role-based access control',
      },
    ],
  },
  {
    id: 'spatial',
    title: 'Spatial & Relational Data',
    subtitle: 'Geospatial indexing, spatial algorithms, and query performance tuning.',
    skills: [
      {
        name: 'PostgreSQL & PostGIS',
        description: 'GiST spatial indexing, ST_Intersects, ST_Contains, boundary analytics, and topology',
        highlight: true,
      },
      {
        name: 'MS SQL Server',
        description: 'Query tuning, execution plan analysis, stored procedure optimization, and indexing',
        highlight: true,
      },
      {
        name: 'GiST Spatial Indexing',
        description: 'Generalized Search Tree index optimization on multi-polygon boundary tables',
      },
      {
        name: 'Spatial Optimization',
        description: 'R-Tree tuning, vertex simplification (ST_SimplifyPreserveTopology), and county partitioning',
      },
      {
        name: 'MySQL',
        description: 'Relational data modeling, schema normalization, and transactional integrity',
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    subtitle: 'Serverless container runtimes, scheduled jobs, and secure cloud staging.',
    skills: [
      {
        name: 'Azure Container Apps (ACA)',
        description: 'Containerized application runtimes with dynamic scaling and environment isolation',
        highlight: true,
      },
      {
        name: 'ACA Scheduled Jobs',
        description: 'Cron-triggered, event-driven batch ETL pipelines with automatic scale-to-zero',
        highlight: true,
      },
      {
        name: 'Azure Blob Storage',
        description: 'Object staging for large-scale GeoJSON, Parquet, and delta checkpoint datasets',
      },
      {
        name: 'Azure Key Vault',
        description: 'Hardware-backed secrets rotation, managed identities, and secure credentials management',
      },
      {
        name: 'Docker',
        description: 'Multi-stage lean container builds, minimal attack surfaces, and reproducible environments',
      },
      {
        name: 'Git & CI/CD Pipelines',
        description: 'Automated test execution, artifact compilation, and multi-stage deployment workflows',
      },
    ],
  },
  {
    id: 'frontend-ai',
    title: 'Frontend & Applied AI',
    subtitle: 'Reactive client architectures, 2D/3D geometry rendering, and applied LLM workflows.',
    skills: [
      {
        name: 'Angular 17 (Standalone + Signals)',
        description: 'Fine-grained reactive state, @for/@if control flow, and standalone component architecture',
        highlight: true,
      },
      {
        name: 'TypeScript',
        description: 'Strict type systems, domain interfaces, and scalable enterprise architectural models',
        highlight: true,
      },
      {
        name: 'ArcGIS SDK & JS API',
        description: 'Dynamic feature layers, spatial query execution, and high-density map rendering',
      },
      {
        name: 'Cesium.js (3D WebGL)',
        description: 'Volumetric building massing, dynamic solar shadows, and glTF asset rendering at 60 FPS',
      },
      {
        name: 'Konva.js (HTML5 Canvas)',
        description: 'Interactive 2D spatial layouts, sweep-line setbacks, and hardware-accelerated canvas',
      },
      {
        name: 'Tailwind CSS',
        description: 'Clean design token architecture, crisp borders, and technical UI aesthetics',
      },
      {
        name: 'OpenAI API',
        description: 'Zoning bylaw parsing, structured outputs, and automated parcel site summaries',
      },
      {
        name: 'Claude',
        description: 'Context engineering, test harness generation, and architectural validation workflows',
      },
    ],
  },
];

/**
 * =========================================================================
 * EXPERIENCE TIMELINE
 * =========================================================================
 * Tenure at Neilsoft Ltd. (3+ years experience).
 */
export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'neilsoft-sr',
    role: 'Senior Software Engineer',
    company: 'Neilsoft Ltd.',
    location: 'Pune, India',
    period: 'Jul 2026 – Present',
    isCurrent: true,
    description:
      'Senior full-stack and geospatial software engineer leading high-throughput data processing platforms, Azure serverless pipelines, and client technical discussions.',
    achievements: [
      'Architected serverless spatial data pipelines using .NET 8, Azure Container Apps, and Azure Container Apps Jobs with Polly retry policies.',
      'Designed PostgreSQL/PostGIS databases with GiST spatial indexing, achieving sub-second (<120ms) spatial query execution.',
      'Served as primary client technical point of contact, driving requirements discussions, trade-offs, and steady feature delivery.',
      'Mentored junior developers through structured code reviews, concurrency debugging, backend structure, and SQL optimization.',
      'Applied Claude and OpenAI APIs for test harness generation, validation, and automated property intelligence.',
    ],
    technologies: [
      'C#',
      '.NET 8',
      'ASP.NET Core',
      'Angular 17',
      'PostgreSQL',
      'PostGIS',
      'Azure Container Apps',
      'Azure Container Apps Jobs',
      'Azure Blob',
      'Azure Key Vault',
      'Docker',
      'Claude',
    ],
  },
  {
    id: 'neilsoft-jr',
    role: 'Junior Software Engineer',
    company: 'Neilsoft Ltd.',
    location: 'Pune, India',
    period: 'Dec 2024 – Jun 2026',
    description:
      'Full-stack and geospatial engineer developing parcel evaluation platforms, custom Koop.js Feature Servers, and 2D/3D spatial tools.',
    achievements: [
      'Engineered multi-threaded .NET TPL Dataflow sync engine evaluating 2M+ LA County parcels, cutting ingestion time 13x and parcel selection to <2 minutes.',
      'Built custom Node.js and Koop.js GeoServices REST providers replacing rate-limited vendor ArcGIS endpoints with sub-second queries.',
      'Developed browser-based 2D/3D layout tool using Angular 17, ArcGIS JS API, Cesium.js, and Konva.js, reducing layout prep from ~2 months to ~15 minutes.',
      'Implemented Google and Microsoft SSO with enterprise role-based access control (RBAC).',
    ],
    technologies: [
      'C#',
      'ASP.NET Core',
      'TPL Dataflow',
      'Angular 17',
      'TypeScript',
      'ArcGIS SDK',
      'Cesium.js',
      'Konva.js',
      'PostGIS',
      'Docker',
    ],
  },
  {
    id: 'neilsoft-get',
    role: 'Graduate Engineer Trainee',
    company: 'Neilsoft Ltd.',
    location: 'Pune, India',
    period: 'Dec 2023 – Dec 2024',
    description:
      'Engineering residency focused on enterprise .NET backend development, spatial database optimization, and Angular component systems.',
    achievements: [
      'Developed automated backend data validation pipelines and test suites with 85%+ coverage on core services.',
      'Optimized MS SQL Server stored procedures and query execution plans, reducing report generation times by over 80%.',
      'Built reusable Angular UI components following standalone component conventions and accessible design patterns.',
    ],
    technologies: [
      'C#',
      '.NET',
      'MS SQL Server',
      'TypeScript',
      'Angular',
      'Git',
      'CI/CD',
    ],
  },
];

/**
 * =========================================================================
 * EDUCATION
 * =========================================================================
 */
export const EDUCATION_DATA: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech)',
  institution: 'Sanjeevan Engineering and Technology Institute',
  board: 'Dr. Babasaheb Ambedkar Technological University (DBATU)',
  period: '2019 – 2023',
  cgpa: '8.68 / 10.0',
  highlights: [
    'Computer Science & Engineering with distinction (CGPA: 8.68 / 10.0)',
    'Coursework: Data Structures & Algorithms, Database Systems, Distributed Systems, Software Engineering, Computer Networks',
  ],
};

/**
 * =========================================================================
 * AI ASSISTANT PROMPTS
 * =========================================================================
 */
export const AI_SUGGESTED_PROMPTS = [
  'How did you achieve 13x faster ingestion with TPL Dataflow?',
  'Explain your PostGIS GiST spatial indexing strategy for sub-second queries.',
  'How does the Spatial Massing Tool reduce prep from ~2 months to ~15 minutes?',
  'Why did you use Azure Container Apps Jobs with Polly retries for the GIS ETL?',
  'Walk me through your experience as a Client Technical Point of Contact.',
  'What are your primary backend engineering patterns in .NET 8?',
];
