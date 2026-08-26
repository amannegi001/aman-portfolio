export const architectures = {
  aifinity: {
    projectId: "aifinity",
    projectTitle: "AIFinity",
    subtitle: "Interactive System Architecture & Request Lifecycle",
    description:
      "Explore how system components interact, how data moves through the application, and the engineering rationale behind each component in the AIFinity platform.",
    techBadges: ["React 19", "Node.js", "Express.js", "MongoDB", "JWT", "AI Diagnostics"],
    nodes: [
      {
        id: "client",
        name: "Client Application",
        shortName: "Frontend",
        tier: "Client Tier",
        technology: "React 19 · Vite · Tailwind CSS",
        shortDesc: "Responsive assessment UI, interactive feedback dashboard, and admin staging.",
        responsibility:
          "Renders adaptive assessment interfaces, captures real-time question responses, visualizes learning-gap progress charts, and provides administrative test management.",
        whyItExists:
          "Provides a responsive, low-latency client environment capable of rendering complex learning telemetry and question flows with minimal bundle overhead.",
        engineeringDecision:
          "Leveraged Vite + React 19 for fast HMR and lightweight component composition, paired with utility-first Tailwind CSS for responsive multi-device styling across desktop and mobile.",
        icon: "Globe",
        status: "Active Tier",
        coords: { x: 50, y: 12 }, // % inside viewport
      },
      {
        id: "gateway",
        name: "API Gateway & Server",
        shortName: "API Gateway",
        tier: "Backend Tier",
        technology: "Node.js · Express.js REST API",
        shortDesc: "Central HTTP router handling incoming requests, validation, and orchestrating services.",
        responsibility:
          "Processes incoming assessment payloads, orchestrates communication between auth, AI diagnostic services, and database repositories, and handles global error boundaries.",
        whyItExists:
          "Acts as the single entry point and coordinator for all clientside communications, decoupling client components from internal database models and diagnostic logic.",
        engineeringDecision:
          "Express.js provides a lightweight, modular middleware architecture with minimal overhead for high-throughput JSON endpoint handling.",
        icon: "Server",
        status: "Core Gateway",
        coords: { x: 50, y: 34 },
      },
      {
        id: "auth",
        name: "Auth & Session Security",
        shortName: "Auth & Security",
        tier: "Security Layer",
        technology: "JWT · bcryptjs · cookie-parser",
        shortDesc: "Stateless user authentication, password hashing, and role-based route guard middleware.",
        responsibility:
          "Secures student and administrator access, validates token signatures on protected routes, and encrypts sensitive credentials.",
        whyItExists:
          "Ensures tamper-proof session verification across independent API requests without maintaining expensive server-side session memory.",
        engineeringDecision:
          "Implemented stateless JWT authentication paired with bcrypt hashing to ensure secure credential storage and scalable authorization.",
        icon: "ShieldCheck",
        status: "Security Middleware",
        coords: { x: 18, y: 58 },
      },
      {
        id: "ai_engine",
        name: "ConceptRoot & MistakeMap AI",
        shortName: "Diagnostic Engine",
        tier: "AI & Analytics Tier",
        technology: "Pattern Diagnostics & Analytics Engine",
        shortDesc: "Analyzes incorrect answers to detect root conceptual weaknesses and recurring error trends.",
        responsibility:
          "Executes ConceptRoot AI to isolate missing prerequisite knowledge behind student errors, and MistakeMap AI to generate cumulative accuracy and knowledge-gap telemetry.",
        whyItExists:
          "Transforms static test scores into actionable, personalized conceptual guidance so students understand why they make specific mistakes.",
        engineeringDecision:
          "Decoupled analysis algorithms into dedicated modular services, allowing independent evolution of diagnostic heuristics without affecting core API routing.",
        icon: "Brain",
        status: "Core Intelligence",
        coords: { x: 50, y: 58 },
      },
      {
        id: "database",
        name: "Persistence Layer",
        shortName: "Database Layer",
        tier: "Database Tier",
        technology: "MongoDB · Mongoose ODM",
        shortDesc: "Document-oriented database storing users, assessments, question banks, and attempt logs.",
        responsibility:
          "Persists structured question schemas, student assessment submissions, historical mistake logs, and user profile metadata.",
        whyItExists:
          "Provides durable, indexed storage with flexible document schemas suitable for evolving question types and student response data.",
        engineeringDecision:
          "Selected MongoDB with Mongoose ODM for flexible document hierarchies (nested question objects, variable attempt answers, and diagnostic metadata) without rigid relational table migrations.",
        icon: "Database",
        status: "Data Store",
        coords: { x: 82, y: 58 },
      },
      {
        id: "skill_gap",
        name: "SkillGap Career Engine",
        shortName: "SkillGap Engine",
        tier: "Career Alignment Tier",
        technology: "Role Benchmark & Roadmap Logic",
        shortDesc: "Connects assessment outcomes and student skill profiles with target industry job roles.",
        responsibility:
          "Compares current student competencies against target engineering benchmarks and synthesizes a step-by-step career readiness learning path.",
        whyItExists:
          "Bridges the gap between foundational subject assessments and practical career preparation.",
        engineeringDecision:
          "Structures skill gap metrics as relational competency vectors for straightforward comparison against role requirement profiles.",
        icon: "Compass",
        status: "Roadmap Service",
        coords: { x: 35, y: 84 },
      },
      {
        id: "external_services",
        name: "Notification & External APIs",
        shortName: "Integrations",
        tier: "Integration Layer",
        technology: "EmailJS & Third-Party APIs",
        shortDesc: "External integrations for alert notifications, verification emails, and third-party services.",
        responsibility:
          "Handles asynchronous user alerts, system notifications, and external API hooks.",
        whyItExists:
          "Offloads notification and delivery infrastructure to dedicated external service providers.",
        engineeringDecision:
          "Utilizes lightweight client/server hooks to communicate with external APIs asynchronously without blocking main thread operations.",
        icon: "Zap",
        status: "External Hook",
        coords: { x: 65, y: 84 },
      },
    ],
    edges: [
      { from: "client", fromAnchor: "bottom", to: "gateway", toAnchor: "top", label: "HTTPS / REST API Requests", animated: true },
      { from: "gateway", fromAnchor: "bottom", to: "auth", toAnchor: "top", label: "JWT Token Validation", animated: true },
      { from: "gateway", fromAnchor: "bottom", to: "ai_engine", toAnchor: "top", label: "Attempt Telemetry & Payloads", animated: true },
      { from: "gateway", fromAnchor: "bottom", to: "database", toAnchor: "top", label: "Mongoose Query Operations", animated: true },
      { from: "ai_engine", fromAnchor: "bottom", to: "skill_gap", toAnchor: "top", label: "Competency Output", animated: false },
      { from: "gateway", fromAnchor: "bottom", to: "external_services", toAnchor: "top", label: "Async Event Dispatch", animated: false },
      { from: "ai_engine", fromAnchor: "right", to: "database", toAnchor: "left", label: "Persist Mistake Patterns", animated: true },
    ],
    dataFlowSteps: [
      {
        step: 1,
        title: "User Assessment Submission",
        activeNodes: ["client"],
        activeEdge: { from: "client", to: "gateway" },
        summary: "Student completes a test module on the React frontend. The client bundles question responses, timestamps, and metadata into a structured JSON payload.",
        codeSnippet: "POST /api/assessments/submit\nPayload: { assessmentId, answers: [...], timeSpent }",
      },
      {
        step: 2,
        title: "Gateway & Authentication Verification",
        activeNodes: ["gateway", "auth"],
        activeEdge: { from: "gateway", to: "auth" },
        summary: "The Express API Gateway intercepts the request. JWT verification middleware checks authorization headers/cookies and validates user identity and role.",
        codeSnippet: "verifyToken(req, res, next) -> jwt.verify(token, JWT_SECRET)",
      },
      {
        step: 3,
        title: "ConceptRoot & MistakeMap AI Diagnostics",
        activeNodes: ["gateway", "ai_engine"],
        activeEdge: { from: "gateway", to: "ai_engine" },
        summary: "Payload is routed to the diagnostic engine. ConceptRoot AI isolates the exact conceptual breakdown behind wrong answers, while MistakeMap tracks recurring patterns.",
        codeSnippet: "analyzeLearningGaps(answers) -> { conceptWeakness, recurringErrors, prereqs }",
      },
      {
        step: 4,
        title: "Database Persistence & Historical Indexing",
        activeNodes: ["ai_engine", "database"],
        activeEdge: { from: "ai_engine", to: "database" },
        summary: "Attempt results, score breakdown, and diagnostic vectors are saved to MongoDB via Mongoose schemas for historical tracking and trend analysis.",
        codeSnippet: "Attempt.create({ userId, results, gapAnalysis, timestamp })",
      },
      {
        step: 5,
        title: "Real-Time Actionable Insights Returned",
        activeNodes: ["gateway", "client"],
        activeEdge: { from: "client", to: "gateway" },
        summary: "The API responds with customized feedback: root-cause explanations, recommended revision topics, and updated career-readiness roadmap metrics.",
        codeSnippet: "200 OK -> { score: 85, feedback: [...], roadmapSuggestions: [...] }",
      },
    ],
  },
};
