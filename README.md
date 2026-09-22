# Agustin Diaz-Cano | https://www.agustindiazcano.com
**Software Engineer | Backend & AI Developer** |
MSc Candidate in Information Systems Engineering (UTN) | Buenos Aires, Argentina

Python Developer with 4+ years of experience in software development, specializing in AI/ML and Backend Development, having contributed to the development and maintenance of 10+ production projects used by hundreds of thousands of users across Spain and Latin America. My interest in machine learning goes back to 2020, when I completed an introductory Machine Learning course, and deepened in March 2021, when I gave a [bootcamp presentation on AI](https://www.agustindiazcano.com/writing/predicting-generative-ai-boom) covering generative AI and deep learning, well before the field entered the mainstream. Currently pursuing an M.Sc. in Systems Engineering at UTN, focused on Artificial Intelligence and Data Analysis. My technical focus is building backend architectures that integrate GenAI in production-realistic conditions, not just prototypes, working with Python, Retrieval-Augmented Generation (RAG), and the Model Context Protocol (MCP) to explore LLM orchestration and AI agent design.

Before pivoting to AI backend engineering, I spent 4 years as a Fullstack Developer and Sole QA Owner governing large-scale e-commerce platforms, with full Go/No-Go authority on production releases and no dedicated QA team.

Transitioned from zero coding background in the pre-AI era: wrote my first line of code in October 2020, received a job offer on May 14, 2021, and shipped my first production PR in June 2021 at Hello Auto, a Spanish fintech (insurtech).

## Projects

**[Agentic MCP Engine and RAG Gateway](https://github.com/agustindiazcano/mcp-transactional-agent)**

![Dashboard: judges debate](https://github.com/agustindiazcano/mcp-transactional-agent/blob/main/assets/dashboard-judges-debate-2.png?raw=true)
*(dashboard built with Streamlit)*

*Python, FastAPI, PostgreSQL, pgvector, RabbitMQ, Docker, MCP, LangChain, Google Cloud (Cloud Run, Cloud SQL), Vertex AI*
* An asynchronous workflow engine for running LLM agents against transactional business logic (e.g., refunds, fraud checks), built around one question: how much of an AI system's decisions can be made deterministic and auditable instead of left probabilistic.
* MCP server as the only path to side-effecting tools, secured with token authentication, per-tool authorization, sliding-window rate limiting, and a fail-closed audit log; a dedicated test verifies that a prompt-injection attempt cannot extend a caller's tool access.
* RAG over business rules via pgvector, with a provider-agnostic embeddings pipeline validated end-to-end against real claims; caught and fixed my own use of the wrong distance operator (Euclidean instead of cosine) before it could silently corrupt retrieval ranking.
* Provider-agnostic LLM routing (OpenAI, Gemini, Vertex AI, Bedrock, Groq) via an Abstract Factory, so different agents and judges can run on different providers at the same time.
* "Asymmetric Double LLM-as-a-Judge" consensus with a Supreme Court cascade for tie-breaking, plus pessimistic row locking (`SELECT ... FOR UPDATE`) and a recovery sweeper for crashed workers.
* Diagnosed and fixed a real concurrency bug found under Locust distributed load testing (an unhandled import error masquerading as an MCP transport failure), backed by measured results: 111 tests (81 unit, 30 integration against real PostgreSQL and RabbitMQ) at 80% coverage, 10 ranked failure-injection scenarios, validated P95 latency of 87ms at 45+ req/s with zero failures, and cost tracked per transaction (~$0.0004).
* Architected for zero-trust cloud deployment via Google Cloud Platform (Cloud Run, Cloud SQL), leveraging the Vertex AI SDK to ensure enterprise-grade data privacy (Zero Data Retention) over public APIs.

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

**Software Engineer in Test & QA Lead - Pocima** *(Contractor for GDU, Uruguay's #1 retailer)*
*2022 – 2025*

Fullstack engineer and technical owner of the release pipeline, test automation architecture, and production stability for Grupo GDU's e-commerce platforms (Disco, Devoto, Geant), serving hundreds of thousands of users monthly across web and mobile.

- Built pages and features in React, and maintained a 5,000+ line jQuery checkout flow in production, serving hundreds of thousands of users.
- Held full Go/No-Go and rollback authority on production releases with no dedicated QA team, working directly with backend teams to diagnose and resolve issues before deployment.
- Designed and built the automation architecture from scratch (Selenium, then Cypress; +75 E2E tests) integrated into CI/CD pipelines with GitHub Actions and LambdaTest, running continuously against production.
- Developed and maintained custom internal tooling and integrations to support release monitoring and cross-device validation.
- Contributed to the platforms' nominations for the eCommerce Awards Uruguay in 2024 and 2025.

**Frontend Engineer, Hello Auto** *(Fintech / Insurtech, Spain, remote)*
*2021 – 2022*

- Contributed to the development, production deployment, and maintenance of the real-time premium calculation logic and asynchronous data handling behind a live insurance quoting engine used by real customers, not an internal tool.
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

## Research

**Artificial Intelligence Based Bug Triage System**
*Knowledge Engineering & Fuzzy Logic, UTN MSc, November 2024*

[View Repository](https://github.com/agustindiazcano/fuzzy-logic-expert-system-qa-triage) · [Write-up](https://www.agustindiazcano.com/research/bug-triage-system)

Group project applying knowledge-based systems methodology (ontology design, rule-based inference, fuzzy logic) to reduce false positives in e-commerce bug triage. I served as domain expert during knowledge acquisition, drawing on real QA/e-commerce experience. All case data is fictional.

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
