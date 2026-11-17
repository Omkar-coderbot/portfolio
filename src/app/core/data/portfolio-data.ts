import { CaseStudy, EducationItem, ExperienceItem, TechCategory } from '../models/portfolio.model';

export const PROFILE_DATA = {
  name: 'Omkar Marwadi',
  role: 'Senior Software Engineer',
  specialty: 'Full-Stack, Distributed Systems & Geospatial Cloud Architect',
  location: 'Pune, India',
  email: 'omkar.marwadi11@gmail.com',
  phone: '+91 9075914867',
  resumeUrl: '/assets/Omkar_Marwadi_Resume.pdf',
  github: 'https://github.com/omkarmarwadi',
  linkedin: 'https://linkedin.com/in/omkarmarwadi',
  summary:
    'I architect high-throughput backend data pipelines, geospatial cloud platforms, and AI-powered web applications—turning week-long batch workloads into sub-hour distributed pipelines.',
  metrics: [
    { value: '2M+', label: 'LA County Parcels Processed', subtext: '25+ spatial & zoning rules evaluated' },
    { value: '~1 Wk → Hours', label: 'Pipeline Acceleration', subtext: 'Sub-hour distributed processing via TPL Dataflow' },
    { value: '<120ms', label: 'Spatial Query Latency', subtext: 'PostGIS GiST indexing & Koop.js Feature Server' },
    { value: '99.9%', label: 'Pipeline Reliability', subtext: 'Polly resilience & bounded backpressure' },
  ],
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tpl-pipeline',
    title: 'High-Volume Parcel Synchronization & Multi-Factor Scoring Engine',
    subtitle: 'Transforming a multi-day blocking batch pipeline into a sub-hour, bounded asynchronous streaming engine.',
    scaleBadge: '2M+ Parcels | 25+ Spatial Factors | Sub-Hour Processing',
    tags: ['.NET 8', 'TPL Dataflow', 'C#', 'PostgreSQL', 'Polly Resilience', 'Azure ACA'],
    diagramType: 'tpl-dataflow',
    metrics: [
      { label: 'Runtime Reduction', value: '~1 Wk → 3.8 Hrs', detail: '97% wall-clock latency reduction' },
      { label: 'Throughput', value: '1,450 / sec', detail: 'Multi-factor evaluation rate' },
      { label: 'Memory Ceiling', value: 'Bounded 1.2 GB', detail: 'Zero OOM errors with 500-slot buffer' },
    ],
    problem:
      'The legacy sync system processed 2M+ land parcels sequentially across 25+ zoning, topographical, and price scoring algorithms. API timeouts, unbounded memory allocations, and thread-pool starvations meant runs frequently stalled after 48 hours, corrupting intermediate state and requiring full manual restarts.',
    hardDecision:
      'Rather than introducing heavyweight external distributed message brokers (Kafka/RabbitMQ) which would introduce operational cluster maintenance and serialization tax for a single compute node, I architected an in-process, actor-style data pipeline using .NET Task Parallel Library (TPL Dataflow). We chose bounded in-memory channels with explicit backpressure, pairing BufferBlock, TransformBlock, and ActionBlock to saturate multi-core CPU capacity without overwhelming database connection pools.',
    whatBrokeFirstAndFix: {
      broke:
        'During initial load testing, unbounded Parallel.ForEachAsync exhausted the 32GB host RAM in 40 minutes as millions of pending async tasks accumulated un-garbage-collected JSON payloads, causing PostgreSQL connection pool starvation (500+ open sockets).',
      fix:
        'Configured strict BoundedCapacity = 500 across all blocks, enforced immutable C# record types to prevent context mutation, tuned MaxDegreeOfParallelism to exactly match the database connection pool limit, and wrapped outbound writes with Polly retry policies (exponential jitter).',
      outcome:
        'Peak memory stabilized at 1.2 GB with steady 100% CPU core utilization. Total batch execution dropped from ~7 days to 3.8 hours with zero data corruption.',
    },
    architectureHighlights: [
      'Bounded BufferBlock acts as ingestion valve to prevent memory overflow from upstream batch dumps',
      'Concurrent TransformBlock handles CPU-bound multi-factor scoring with zero shared mutable state',
      'ActionBlock batches bulk PostgreSQL COPY operations into chunked transactions of 1,000 records',
      'Polly Resilience policies intercept transient database lockups with jittered exponential retry',
    ],
  },
  {
    id: 'koop-spatial-etl',
    title: 'External Parameter ETL & Custom ArcGIS Feature Service Platform',
    subtitle: 'Decoupling mission-critical geospatial analytics from expensive, rate-limited vendor FeatureServers.',
    scaleBadge: 'Enterprise Spatial Data | Sub-Second Lookups | Zero Throttling',
    tags: ['.NET 8', 'PostGIS', 'Koop.js', 'Azure Container Apps Jobs', 'Azure Blob', 'Azure Key Vault'],
    diagramType: 'koop-spatial',
    metrics: [
      { label: 'Query Latency', value: '<120ms', detail: 'Down from 15+ seconds external API wait' },
      { label: 'Availability', value: '99.99%', detail: 'Decoupled from third-party vendor downtime' },
      { label: 'Cost Savings', value: '85% / mo', detail: 'Eliminated per-query external meter costs' },
    ],
    problem:
      'Client GIS analysts relied on third-party commercial ArcGIS FeatureServers for flood zones, wetlands, and zoning overlays. The external services throttled requests, suffered frequent 504 gateway timeouts during business hours, and charged high per-query metering costs that capped automated analytical workflows.',
    hardDecision:
      'Decoupled client applications entirely from external vendor endpoints. Built an autonomous, scheduled .NET 8 ETL worker deployed on Azure Container Apps Jobs that securely fetches and checkpoints delta datasets into Azure Blob Storage, loads them into an Azure Flexible PostgreSQL/PostGIS database, and serves them via an in-house custom Node.js/Koop.js Geoservices provider matching the Esri FeatureServer specification.',
    whatBrokeFirstAndFix: {
      broke:
        'Complex multi-polygon spatial intersections (ST_Intersects) across nationwide environmental boundary tables pegged PostgreSQL CPU at 100%, causing queries to timeout after 30 seconds.',
      fix:
        'Engineered GiST (Generalized Search Tree) spatial indices on geometry columns, pre-simplified polygon vertex densities using ST_SimplifyPreserveTopology for low-zoom views, and partitioned high-density zoning layers by county FIPS codes.',
      outcome:
        'Spatial intersection queries dropped from 15+ seconds down to sub-120 milliseconds. The internal Koop.js service handled 500+ concurrent analyst requests with zero third-party rate-limiting.',
    },
    architectureHighlights: [
      'Azure Container Apps Jobs execute on cron triggers to process incremental geospatial deltas',
      'PostgreSQL with PostGIS extension provides GiST-indexed spatial operators (ST_Contains, ST_Intersects)',
      'Custom Koop.js adapter translates GeoJSON streams into standard ArcGIS FeatureServer GeoServices REST specs',
      'Azure Key Vault securely manages ETL secrets, API tokens, and database credentials',
    ],
  },
  {
    id: 'ai-spatial-massing',
    title: 'Automated Spatial Massing & AI Site Intelligence Engine',
    subtitle: 'Bridging browser computational geometry with LLM zoning intelligence for instant site feasibility.',
    scaleBadge: 'Real-Time 2D/3D GIS | LLM Feasibility Extraction | Sub-4s Analysis',
    tags: ['Angular', 'ArcGIS SDK', 'Cesium.js', 'Konva.js', 'OpenAI API', 'TypeScript'],
    diagramType: 'ai-massing',
    metrics: [
      { label: 'Feasibility Turnaround', value: '4 seconds', detail: 'Down from 3-5 business days' },
      { label: 'Rendering Rate', value: '60 FPS', detail: 'Smooth 3D building envelope extrusions' },
      { label: 'Extraction Accuracy', value: '96.4%', detail: 'Structured zoning code JSON extraction' },
    ],
    problem:
      'Urban land developers and architectural teams required days to manually decipher municipal zoning bylaws, calculate allowable building footprints with setbacks, and produce 3D conceptual massing models for site investment decisions.',
    hardDecision:
      'Constructed a client-side computational geometry engine using Konva.js for interactive 2D setback sketching and Cesium.js for volumetric 3D massing, coupled to a backend OpenAI API reasoning pipeline that parses unstructured municipal code into strictly validated JSON zoning constraints.',
    whatBrokeFirstAndFix: {
      broke:
        'Complex concave and multi-ring parcel boundaries produced polygon self-intersections during automated inward setback buffering, freezing the browser thread for up to 8 seconds.',
      fix:
        'Offloaded spatial polygon computations to dedicated HTML5 Web Workers using robust sweep-line offset algorithms. Structured OpenAI API calls with JSON Schema enforcement and system prompt boundary validations to eliminate hallucinatory dimensional parameters.',
      outcome:
        'Users generate 3D massing envelopes and complete zoning risk summaries in under 4 seconds at 60 FPS directly inside the browser.',
    },
    architectureHighlights: [
      '2D Setback & Lot Coverage calculation rendered via high-performance HTML5 Canvas with Konva.js',
      '3D Volumetric Massing Extrusion utilizing Cesium.js glTF primitives with dynamic shadow casting',
      'OpenAI API pipeline structured with Pydantic/Zod-style JSON schemas for zero-hallucination zoning rules',
      'ArcGIS JavaScript SDK basemap integration for real-time parcel boundary and parcel FIPS streaming',
    ],
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'backend',
    title: 'Backend & Distributed Systems',
    subtitle: 'High-throughput pipelines, actor-style async streams, and resilient APIs.',
    skills: [
      { name: 'C# / .NET 8', description: 'High-throughput async backends, memory efficiency & modern runtime optimizations' },
      { name: 'ASP.NET Core Web API', description: 'REST services, middleware pipelines, and performant request lifecycles' },
      { name: '.NET TPL Dataflow', description: 'In-process actor-model bounded data pipelines with backpressure control' },
      { name: 'Polly Resilience Policies', description: 'Retry with decorrelated exponential jitter, circuit breakers, and fallback policies' },
      { name: 'Node.js & Koop.js', description: 'Custom GeoServices REST translation servers replacing vendor ArcGIS services' },
      { name: 'REST APIs & Webhooks', description: 'Contract-first design, OpenAPI specifications, and idempotency key patterns' },
      { name: 'OAuth 2.0 / OIDC / SSO', description: 'Claims-based authentication, RBAC authorization, and secure JWT handling' },
    ],
  },
  {
    id: 'spatial',
    title: 'Spatial & Relational Data',
    subtitle: 'Geospatial indexing, spatial algorithms, and query performance tuning.',
    skills: [
      { name: 'PostgreSQL & PostGIS', description: 'GiST spatial indexing, ST_Intersects, ST_Contains, and boundary analytics' },
      { name: 'Azure Flexible Server', description: 'Managed PostgreSQL provisioning, high availability, and connection pool sizing' },
      { name: 'MS SQL Server', description: 'Query tuning, execution plan analysis, and stored procedure optimization' },
      { name: 'MySQL', description: 'Relational data modeling, schema design, and transactional integrity' },
      { name: 'Spatial Query Optimization', description: 'R-Tree / GiST tuning, vertex simplification (ST_Simplify), and spatial partitioning' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    subtitle: 'Serverless container runtimes, scheduled jobs, and infrastructure automation.',
    skills: [
      { name: 'Azure Container Apps (ACA)', description: 'Containerized micro-runtimes with dynamic scaling and environment isolation' },
      { name: 'ACA Scheduled Jobs', description: 'Cron-triggered, event-driven batch ETL pipelines with automatic teardown' },
      { name: 'Azure Blob Storage', description: 'Data lake staging for large-scale GeoJSON, Parquet, and checkpoint datasets' },
      { name: 'Azure Key Vault', description: 'Hardware-backed secrets rotation, managed identities, and zero-leak configuration' },
      { name: 'Docker & OCI Containers', description: 'Multi-stage lean builds, minimal attack surfaces, and reproducible environments' },
      { name: 'CI/CD Automation', description: 'Automated test execution, artifact compilation, and multi-stage deployment pipelines' },
      { name: 'AWS Cloud Services (S3, ECS, IAM)', description: 'S3 object storage, ECS containerized task execution, and least-privilege IAM policies' },
    ],
  },
  {
    id: 'frontend-ai',
    title: 'Frontend & AI Engineering',
    subtitle: 'Reactive client architectures, 3D WebGL simulation, and applied LLM workflows.',
    skills: [
      { name: 'Angular (Standalone + Signals)', description: 'Fine-grained reactive state, standalone component topology, and zoneless performance' },
      { name: 'TypeScript', description: 'Strict type systems, domain interfaces, and scalable enterprise architectural models' },
      { name: 'ArcGIS JS SDK', description: 'Dynamic feature layers, spatial query execution, and high-density map rendering' },
      { name: 'Cesium.js (3D WebGL)', description: 'Volumetric building massing, dynamic solar shadows, and glTF asset rendering' },
      { name: 'Konva.js (HTML5 Canvas)', description: 'Interactive 2D spatial layouts, sweep-line setbacks, and hardware-accelerated canvas' },
      { name: 'Tailwind CSS', description: 'Design token architecture, modern utility composition, and executive-grade aesthetics' },
      { name: 'Cloudflare Workers AI', description: 'Edge LLM inference using Llama 3.2 with global routing and zero-cold-start latency' },
      { name: 'OpenAI API & JSON Schemas', description: 'Zoning bylaw parsing, structured outputs, and zero-hallucination constraint validation' },
      { name: 'Claude (Opus/Sonnet)', description: 'Agentic workflows, context engineering, and automated integration test harnesses' },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'neilsoft-sr',
    role: 'Senior Software Engineer',
    company: 'Neilsoft Ltd.',
    location: 'Pune, India',
    period: 'Jul 2026 – Present',
    isCurrent: true,
    description:
      'Lead backend and spatial cloud architect driving high-throughput data processing platforms, resilient cloud infrastructure, and AI engineering workflows.',
    achievements: [
      'Architected cloud-native backend systems and spatial data pipelines using .NET 8, Azure Container Apps, and ACA Scheduled Jobs.',
      'Designed PostgreSQL/PostGIS databases on Azure Flexible Server with GiST spatial indexing, reducing spatial lookup times to under 120ms.',
      'Served as primary technical client POC, translating complex spatial business requirements into technical system specifications.',
      'Mentored junior engineers on distributed data pipelines, Polly resilience policies, and clean code standards.',
      'Accelerated engineering velocity and architectural review cycles using Claude (Opus/Sonnet) for automated test harness generation and edge-case validation.',
    ],
    technologies: ['.NET 8', 'C#', 'Azure ACA', 'PostgreSQL / PostGIS', 'Azure Blob', 'Key Vault', 'Claude', 'Polly'],
  },
  {
    id: 'neilsoft-jr',
    role: 'Junior Software Engineer',
    company: 'Neilsoft Ltd.',
    location: 'Pune, India',
    period: 'Dec 2024 – Jun 2026',
    description:
      'Core full-stack engineer implementing geospatial web applications, Koop.js Feature Servers, and data synchronization workers.',
    achievements: [
      'Engineered high-concurrency .NET TPL Dataflow pipelines that evaluated 2M+ LA County land parcels across 25+ zoning factors.',
      'Replaced rate-limited vendor FeatureServers with internal Node.js Koop.js services, saving 85% monthly API costs.',
      'Developed 2D/3D site visualization tools using Angular, ArcGIS JavaScript SDK, Cesium.js, and Konva.js.',
      'Integrated OAuth 2.0 / OIDC authentication and role-based access control across enterprise client portals.',
    ],
    technologies: ['C#', 'ASP.NET Core', 'Angular', 'Koop.js', 'ArcGIS SDK', 'Cesium.js', 'PostGIS', 'Docker'],
  },
  {
    id: 'neilsoft-get',
    role: 'Graduate Engineer Trainee',
    company: 'Neilsoft Ltd.',
    location: 'Pune, India',
    period: 'Dec 2023 – Dec 2024',
    description:
      'Engineering residency focused on enterprise .NET development, spatial databases, and automated testing.',
    achievements: [
      'Built automated data validation pipelines and unit test suites achieving 85%+ code coverage on core domain services.',
      'Optimized SQL Server stored procedures and execution plans, reducing long-running reports from 12 minutes to 45 seconds.',
      'Created reusable Angular UI components following modular, accessible design principles.',
    ],
    technologies: ['C#', '.NET', 'MS SQL Server', 'TypeScript', 'Angular', 'Git', 'CI/CD'],
  },
  {
    id: 'imagine-intern',
    role: 'Software Developer Intern',
    company: 'Imagine Multiservices Pvt. Ltd.',
    location: 'Pune, India',
    period: '2022 – 2023',
    description:
      'Developed full-stack web applications, REST APIs, and database schemas for commercial client deliverables.',
    achievements: [
      'Implemented responsive web interfaces and RESTful backend APIs with secure user authentication.',
      'Collaborated on database schema design, normalization, and indexing in MySQL and PostgreSQL.',
      'Contributed to code reviews, bug fixes, and continuous delivery pipelines.',
    ],
    technologies: ['JavaScript', 'TypeScript', 'Node.js', 'MySQL', 'REST APIs', 'Git'],
  },
];

export const EDUCATION_DATA: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech)',
  institution: 'Sanjeevan Engineering and Technology Institute',
  board: 'Dr. Babasaheb Ambedkar Technological University (DBATU)',
  period: '2019 – 2023',
  cgpa: '8.68 / 10.0',
  highlights: [
    'Specialized in Computer Science & Engineering with distinction',
    'Core Coursework: Data Structures & Algorithms, Distributed Systems, Relational Databases, Computer Networks, Software Architecture',
    'Graduated with 8.68 CGPA',
  ],
};

export const AI_SUGGESTED_PROMPTS = [
  'How did you scale the 2M parcel pipeline with TPL Dataflow?',
  'Why did you build a custom Koop.js server instead of using ArcGIS Online?',
  'Explain your PostGIS GiST indexing strategy for sub-second queries.',
  'What Polly resilience policies do you use in .NET 8?',
  'Walk me through the 3D Massing & Cesium.js feasibility engine.',
  'What is your experience with Azure Container Apps (ACA)?',
];
