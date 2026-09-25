# Agustin Diaz-Cano | https://www.agustindiazcano.com
**Software Engineer | Backend & AI Developer** | MSc Candidate in Information Systems Engineering [UTN](https://frba.utn.edu.ar) | Buenos Aires, Argentina

Python Developer with 4+ years of experience in software development, specializing in AI/ML and Backend Development, having contributed to the development and maintenance of 10+ production projects used by hundreds of thousands of users across Spain and Latin America. My interest in machine learning goes back to 2020, when I completed an introductory Machine Learning course, and deepened in March 2021, when I gave a [bootcamp presentation on AI covering generative AI and deep learning](https://www.agustindiazcano.com/writing/predicting-generative-ai-boom), well before the field entered the mainstream. Currently pursuing an M.Sc. in Information Systems Engineering at UTN (CONEAU-accredited, Category A). My thesis investigates LLM-guided reinforcement learning for legged robot navigation, evaluating RBF networks as an interpretable alternative to standard MLP policies, benchmarked in MuJoCo and grid-based environments. My technical focus is building backend architectures that integrate GenAI in production-realistic conditions, not just prototypes, working with Python, Retrieval-Augmented Generation (RAG), and the Model Context Protocol (MCP) to explore LLM orchestration and AI agent design.

Before pivoting to AI backend engineering, I spent 4 years as a Full-Stack Test Automation Engineer and Sole QA Owner governing large-scale e-commerce platforms (frontend, database, and backend automation), with full Go/No-Go authority on production releases and no dedicated QA team.

Transitioned from zero coding background in the pre-AI era: wrote my first line of code in October 2020, received a job offer on May 14, 2021, and shipped my first production PR in June 2021 at Hello Auto, a Spanish fintech (insurtech).

<p align="left">
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=flat-square&logo=googlecloud&logoColor=white" alt="Google Cloud" />
</p>

## Research

**M.Sc. Thesis [UTN](https://frba.utn.edu.ar)**

*LLM-Guided Reinforcement Learning for Legged Robot Navigation, UTN MSc, Jan 2026 - Present*

Investigating a hierarchical neuro-symbolic architecture for quadruped robots: an RBF-based perceptual layer generates interpretable concept activations, and an LLM resolves navigation decisions only in ambiguous cases where multiple concepts compete, analogous to the hierarchical escalation approach used by NVIDIA. Currently in the experimental phase, benchmarking RBF vs. MLP policies (curriculum learning, grid-based navigation) prior to full integration in MuJoCo.

[View Repository](https://github.com/agustindiazcano/msc-thesis-neurosymbolic-llm-rl-navigation)

**Artificial Intelligence Based Bug Triage System, [UTN](https://frba.utn.edu.ar) MSc Project**

*Knowledge Engineering & Fuzzy Logic, November 2024*

[View Repository](https://github.com/agustindiazcano/fuzzy-logic-expert-system-qa-triage) · [Write-up](https://www.agustindiazcano.com/research/bug-triage-system)

Group project applying knowledge-based systems methodology (ontology design, rule-based inference, fuzzy logic) to reduce false positives in e-commerce bug triage. I served as domain expert during knowledge acquisition, drawing on real QA/e-commerce experience. All case data is fictional.

## Projects

**[Agentic MCP Engine and RAG Gateway](https://github.com/agustindiazcano/mcp-transactional-agent)**

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

**[AI Crypto Trading Agent](https://github.com/agustindiazcano/algorithmic-trading-engine)**

*Python, WebSockets, Binance API, PostgreSQL, Redis, FastAPI (roadmap), pgvector + RAG (roadmap)*
* A quantitative trading system for Binance evolving from rule-based scripts into a service-oriented decision-making agent: real-time market ingestion, technical-signal scoring (MACD/DEA, Bollinger, ADX, RSI, ATR), risk management, and order execution.
* Phased roadmap from stabilization and infrastructure (Postgres/Redis/Docker) through backtesting-driven calibration, RAG-based sentiment intelligence, and genetic-algorithm strategy optimization, each phase gated behind empirical validation before promotion.
* Currently in simulation mode (`REAL_TRADES=False`) pending Phase 1 stabilization and backtest validation, with an 18-item known-bugs log tracked openly in the README.

**[OpenAI Parameter Golf, LLM Optimizer Experiments](https://github.com/agustindiazcano/openai-llm-optimizers-parameter-golf)** *(repo under construction, March-April 2026)*

*Python, PyTorch, RunPod (H100 clusters)*
* Participated in OpenAI's 16MB Parameter Golf Challenge: training LLMs under extreme 16MB memory constraints using custom optimizers.
* Ran experiments over two-plus weeks on RunPod H100 GPU clusters, investing $200+ in compute to iterate on optimizer design.

## Professional Experience

**Full Stack Developer | SDET | QA Lead** *(Contractor for GDU, Uruguay's #1 retailer)*
*Aug 2022 – Jun 2025*

Fullstack engineer and technical owner of the release pipeline, test automation architecture, and production stability for Grupo GDU's e-commerce platforms (Disco, Devoto, Geant), serving hundreds of thousands of users monthly across web and mobile.

**Full Stack Developer | SDET | QA Lead** *(Feb 2023 – Jun 2025)*
- Built pages and features in React, and maintained a 5,000+ line jQuery checkout flow in production, handling API integrations and JSON data modeling, serving hundreds of thousands of users.
- Held full Go/No-Go and rollback authority on production releases with no dedicated QA team, working directly with backend teams to diagnose and resolve issues before deployment.
- Designed and built the automation architecture from scratch (Selenium, then Cypress; +75 E2E tests) integrated into CI/CD pipelines with GitHub Actions and LambdaTest, running continuously against production.
- Developed and maintained custom internal tooling and integrations to support release monitoring and cross-device validation.
- Contributed to the platforms' nominations for the eCommerce Awards Uruguay in 2024 and 2025.

**Full Stack Developer** *(Aug 2022 – Feb 2023)*
- Built and maintained custom integrations and architectures across BigCommerce, VTEX IO, and Odoo (React, Node.js).
- Led the end-to-end migration of the flagship site from legacy jQuery to React + VTEX IO.

**Frontend Developer, Hello Auto** *(Fintech / Insurtech, Spain, remote)*
*2021 – 2022*

- Built, maintained, and tested the real-time premium calculation logic, API integrations, and JSON data handling behind a live insurance quoting engine — external-user UI and internal CRM — used by real customers, not an internal tool. Stack: React, Node.js, JavaScript, Azure DevOps, Git.
- Shipped my first production PR 6 months after writing my first line of code (pre-AI era).

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
