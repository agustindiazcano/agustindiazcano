# Agustin Diaz-Cano | https://www.agustindiazcano.com
**Software Engineer | Backend & AI Developer** | MSc Candidate in Information Systems Engineering [UTN](https://frba.utn.edu.ar) | Buenos Aires, Argentina

4+ years in software development, contributing to 10+ production projects used by hundreds of thousands of users across Spain and Latin America. From 2021 to 2025 I worked in full-stack development and test automation on large-scale e-commerce platforms. My interest in machine learning goes back to 2020 with an introductory course, and deepened in March 2021 when I gave a bootcamp presentation on generative AI and deep learning. Since 2025 I've focused on AI backend engineering.

I'm pursuing an M.Sc. in Information Systems Engineering at UTN. My thesis investigates LLM-guided reinforcement learning for legged robot navigation, benchmarked in MuJoCo and grid-based environments.

I wrote my first line of code in November 2020 with zero coding background, received a job offer on May 14, 2021, and shipped my first production PR in June 2021 at Hello Auto, a Spanish fintech (insurtech).

## Projects

### [Anti-Fragile Agentic Workflow (AFAW)](https://github.com/agustindiazcano/afaw-anti-fragile-agentic-workflow)

*AI-Assisted Development Methodology | CI/CD, AST Mutation Testing, GitHub Actions, Agentic Engineering*

A boilerplate and set of rules for AI-assisted development with multiple parallel coding agents (Claude, Gemini, etc.). Built on a single engineering premise: **The AI decides, the engine measures.**

Instead of relying on LLMs to evaluate their own work or to write tests that always pass, AFAW measures every result with deterministic tools (tests, type checkers, mutation testing, CI) and keeps a human approving every PR. Rules are also enforced outside the prompt (branch protection, hooks, CI), because prompt instructions alone are advice.

* **Isolated state, checked by CI:** each agent writes only its own delta and task file. CI rejects code changes that come without a valid delta, and regenerates the shared context (`LASTCONTEXT`, `PENDING`) after each merge through a PR that a human approves, preventing merge conflicts between parallel agents.
* **AST Mutation Testing on the diff:** to catch tests that pass without checking anything, modified files are mutated at the AST level in CI, after validating that the baseline passes. Surviving mutants are fixed by improving tests. It is mandatory in critical modules, where a file below the minimum score blocks the PR.
* **Isolation & Concurrency:** agents work under strict TDD, atomic commits and one isolated branch per task. They share no memory: they communicate through files and system interfaces.
* **Cloud Validation:** tests, type checks (`mypy --strict` in the Python reference implementation) and linters run in parallel in GitHub Actions with path filters, so the local machine is never blocked. With branch protection and required checks, a failing CI blocks the PR.

*the reference rules target a Python backend and can be adapted to other stacks.*

### [TestMind AI – Multi-Agent Mutation Testing System (MCP)](https://github.com/agustindiazcano/ibm-bob-mcp-agent-guard)

![Home](https://github.com/agustindiazcano/credentials/blob/main/certificates/IBM-Bob-2-0-hackathon-certificate-agustin-diaz-cano-app-front.png?raw=true)
*(Home)*

Built from scratch in 48 hours for the **IBM Bob 2.0 Hackathon**. 

 *One of 1,124 successful submissions out of 3,464 teams (15,727 participants) — Top 32% delivery rate.*

**Stack:** Python, FastAPI, Next.js, TypeScript, PostgreSQL, Docker, Terraform, GitHub Actions (CI/CD), Google Cloud Run, Cloud SQL, Vercel, MCP, Vertex AI (Gemini), IBM watsonx.ai, Playwright.

A multi-agent mutation testing system that measures whether your tests actually catch bugs (not just line coverage), then uses AI agents to write the missing ones. Features a custom AST mutation engine, a parallel multi-agent swarm (Writer + Critic + Gate), native MCP server, full CI/CD, and multi-cloud AI infrastructure.

- ~20,000+ lines of code (Python engine + TypeScript frontend + IaC + verification scripts) written in a single weekend.
- **AI-Assisted Development:** Orchestrated almost entirely using IBM Bob IDE 2.0, Claude Code and Google Antigravity.
- **Enterprise Infrastructure:** Full infrastructure as code (IaC) with Terraform + Workload Identity Federation (no service account keys). Backend on Cloud Run + Postgres on Cloud SQL; Frontend on Vercel.
- **Deterministic Guardrails:** 30+ automated verification checks and strong AST-based guardrails against LLM hallucinations and cheating tests.

🔗 **[Live Demo](https://ibm-bob-mcp-agent-guard.vercel.app/)** · **[Video Demo (YouTube)](https://www.youtube.com/watch?v=m64qdd1axV0&t=6s)** · **[Hackathon Certificate](https://lablab.ai/u/@agustin_diazcano6/ai-hackathons/ibm-bob-2-hackathon/certificate)**

### [Agentic MCP Engine and RAG Gateway](https://github.com/agustindiazcano/mcp-transactional-agent)

![Dashboard: judges debate](https://github.com/agustindiazcano/mcp-transactional-agent/blob/main/assets/dashboard-judges-debate-2.png?raw=true)
*(dashboard built with Streamlit)*

**Stack: Python, FastAPI, PostgreSQL, pgvector, RabbitMQ, Docker, MCP, LangChain, Langfuse, Streamlit, Terraform, GitHub Actions (CI/CD), Google Cloud (Cloud Run, Cloud SQL, Secret Manager), Vertex AI**

An asynchronous workflow engine for running LLM agents against transactional business logic (e.g., refunds, fraud checks), built around one question: how much of an AI system's decisions can be made deterministic and auditable instead of left probabilistic. LLMs evaluate; only deterministic code executes side effects.

* The MCP server is the only path to side-effecting tools such as executing refunds. This boundary is secured with 
token authentication, per-tool authorization, sliding-window rate limiting, and a fail-closed audit log, including a
dedicated test that verifies a prompt-injection attempt cannot extend a caller's tool access.                   
Data integrity is enforced with idempotency keys, pessimistic row locking (SELECT ... FOR UPDATE) and asynchronousqueues. Chaos testing (2,000 claims, worker killed twice, RabbitMQ restarted mid-run) ended with zero lost messages and zero double refunds, after finding and fixing two real bugs: non-persistent messages dropped on broker restart, and a worker crash on a closed channel.

* Decisions pass a Prompt Guard pre-filter and an "Asymmetric Double LLM-as-a-Judge" (Gemini + GPT-OSS, two model families) with a Supreme Court cascade for tie-breaking. A Streamlit dashboard handles claim ingestion and shows each judge's reasoning trail.

* The RAG pipeline over business rules uses pgvector and provider-agnostic embeddings, validated end-to-end against real claims. During development, I caught and fixed a distance-operator bug (Euclidean instead of cosine) before it could silently corrupt retrieval ranking.

* A provider factory handles LLM routing (OpenAI, Gemini, Vertex AI, Bedrock, Groq), so each judge role can run on a different provider, or all of them on a mock for cost-free load tests.

* Every claim is traced end to end with Langfuse (guardrail, retrieval, each judge, tool call), with PII masked before export and tracing that can never change a claim's outcome.

* 300 tests (245 unit, 55 integration) against real PostgreSQL and RabbitMQ, 86% coverage, gated in CI. Locust load testing measured a P95 of 87 ms at 45+ req/s with zero failures; inference cost measured at ~$0.0004 per transaction.

* Deployed on Google Cloud with Terraform and full CI/CD: every push is linted, type-checked and tested, and every merge to main is built, pushed and deployed to Cloud Run by GitHub Actions through Workload Identity Federation, with no keys stored in GitHub. Cloud SQL with pgvector, Secret Manager with per-secret access, one least-privilege service account per service, and Vertex AI authenticated by service account instead of API keys. Real claims run end to end in the cloud.

### [AI Crypto Trading Agent](https://github.com/agustindiazcano/algorithmic-trading-engine)

*Python, WebSockets, Binance API, PostgreSQL, Redis, FastAPI (roadmap), pgvector + RAG (roadmap)*
* A quantitative trading system for Binance evolving from rule-based scripts into a service-oriented decision-making agent: real-time market ingestion, technical-signal scoring (MACD/DEA, Bollinger, ADX, RSI, ATR), risk management, and order execution.
* Phased roadmap from stabilization and infrastructure (Postgres/Redis/Docker) through backtesting-driven calibration, RAG-based sentiment intelligence, and genetic-algorithm strategy optimization, each phase gated behind empirical validation before promotion.
* Currently in simulation mode (`REAL_TRADES=False`) pending Phase 1 stabilization and backtest validation, with an 18-item known-bugs log tracked openly in the README.

### [OpenAI Parameter Golf, LLM Optimizer Experiments](https://github.com/agustindiazcano/openai-llm-optimizers-parameter-golf) *(repo under construction, March-April 2026)*

*Python, PyTorch, RunPod (H100 clusters)*
* Participated in OpenAI's 16MB Parameter Golf Challenge: training LLMs under extreme 16MB memory constraints using custom optimizers.
* Ran experiments over two-plus weeks on RunPod H100 GPU clusters, investing $200+ in compute to iterate on optimizer design.

## Research

**M.Sc. Thesis [UTN](https://frba.utn.edu.ar)**

*LLM-Guided Reinforcement Learning for Legged Robot Navigation, UTN MSc, Jan 2026 - Present*

Investigating a hierarchical neuro-symbolic architecture for quadruped robots: an RBF-based perceptual layer generates interpretable concept activations, and an LLM resolves navigation decisions only in ambiguous cases where multiple concepts compete, analogous to the hierarchical escalation approach used by NVIDIA. Currently in the experimental phase, benchmarking RBF vs. MLP policies (curriculum learning, grid-based navigation) prior to full integration in MuJoCo.

[View Repository](https://github.com/agustindiazcano/msc-thesis-neurosymbolic-llm-rl-navigation)

**Artificial Intelligence Based Bug Triage System, [UTN](https://frba.utn.edu.ar) MSc Project**

*Knowledge Engineering & Fuzzy Logic, November 2024*

[View Repository](https://github.com/agustindiazcano/fuzzy-logic-expert-system-qa-triage) · [Write-up](https://www.agustindiazcano.com/research/bug-triage-system)

Group project applying knowledge-based systems methodology (ontology design, rule-based inference, fuzzy logic) to reduce false positives in e-commerce bug triage. I served as domain expert during knowledge acquisition, drawing on real QA/e-commerce experience. All case data is fictional.

## Game Development

I created full modifications for the Men of War series as a solo developer, with no publisher, marketing budget, or paid promotion, reaching over 200,000 organic downloads. Only a small percentage of Steam games, mods, and mobile apps (typically under 2-5%, and often closer to 1% for the 100k threshold) ever reach that level of adoption, and that benchmark already includes titles with paid user acquisition behind them.

**Men of War: Zombie Mod**
**Top 8%** of 65,000+ mods on ModDB · **9.0/10** (93 votes) · **112,900+** verified downloads

Total conversion that transforms the classic World War II strategy game into a zombie apocalypse survival experience.

- [ModDB](https://www.moddb.com/mods/zombie-mod5)
- [Gameplay Video](https://www.youtube.com/watch?v=3P-1hHL5S8U)
- [Grokipedia](https://grokipedia.com/page/Zombie_Mod_Men_of_War)

**Men of War: Zombie Assault**
**Top 8%** on ModDB · **9.4/10** (52 votes) · **83,900+** verified downloads

**Users have even reported buying the base game just to play this mod.**

> "Great mod. I bought men of war for it and I was not disappointed!"
> qwerty2316, Jul 6, 2013

- [ModDB](https://www.moddb.com/mods/men-of-war-zombie-mod)

**Men of War: HD Mod**
**Top 8%** on ModDB · **7.1/10** (28 votes) · **19,200+** verified downloads

- [ModDB](https://www.moddb.com/mods/hd-mod)

## Interests

**[Long-distance running](https://www.agustindiazcano.com/running-agustin-diaz-cano):** Completed 2× Full Marathons (42k) and 8× Half Marathons (21k). Discipline compounds.

## Writing

* **[Predicting the Generative AI Boom (March 2021)](https://www.agustindiazcano.com/writing/predicting-generative-ai-boom)**: A technical talk forecasting how LLM scaling and natural-language code generation would reshape software development, delivered 20 months before ChatGPT's public launch.

* **[Fundamental Principles of Scientific Validation](https://www.agustindiazcano.com/writing/fundamental-principles)**: An essay on the epistemology of predictive models, examining Occam's Razor and the risks of mistaking statistical overfitting for genuine explanatory power.

## Long-Term Trading Experiment

**[10-Year Buy-and-Hold Portfolio, March 2016 to Present](https://www.labolsavirtual.com/marcelogallardiola)**

A paper trading portfolio started in March 2016 with £100,000, built on fundamental and macroeconomic analysis with a buy-and-hold Turtle Trading strategy, including a position in Tesla. Left untouched for over a decade as a live experiment. Current valuation: £634,255.63, a roughly 6.3x return (about 19% annualized). Tesla was added while short interest in the stock hit an all-time record and market consensus was betting against the company; its market cap has since grown roughly 43x (from ~$34B in 2016 to ~$1.48T today).

## Crypto 2017

**[Ethereum Mining Rig (2017)](https://github.com/agustindiazcano/eth-mining-infrastructure-2017)**

Invested early in crypto (XRP, ETH, BTC) and built a dedicated Ethereum mining rig in 2017, when fewer than 0.25% of the world's population held any verified crypto account (Cambridge Centre for Alternative Finance).
