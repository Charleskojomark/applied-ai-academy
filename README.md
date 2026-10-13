# ⚡ Applied AI Academy

An interactive, gamified serverless learning platform for **Applied AI Engineering**. Master production-grade AI application development through visual architectures, interactive simulators, production code patterns, in-person practice labs, and knowledge-check quizzes.

## 🚀 Overview
Modern AI development has moved beyond making basic API calls to constructing complete application systems that coordinate multi-step tasks, pull context from varied sources, and operate within strict performance, cost, and security guidelines.

**Applied AI Academy** provides a visual, gamified, and code-ready platform to master these engineering skills, with persistent user profiles and progress tracking powered by **Neon PostgreSQL**.

## ☁️ Neon PostgreSQL Serverless Integration
- **Zero-Friction Callsign Creation**: Simple username registration (`@callsign`) requiring no passwords or friction.
- **Serverless PostgreSQL**: Stores user profiles, XP, level, streak, completed sections, and quiz scores in Neon AWS `us-east-2`.
- **Automatic Cloud Sync**: Real-time progress synchronization on section completions and quiz milestones.

## 📚 Curriculum Modules
39 modules spanning the full applied AI engineering lifecycle, including:
- **Foundations** — Applied AI engineering overview, selecting the right LLM, how LLMs work (tokenization, embeddings, attention, sampling), and context/cost/latency tradeoffs.
- **Prompting & Structured Behavior** — Environment setup, instruction hierarchy, few-shot & chain-of-thought, structured outputs & function calling, prompt testing and versioning.
- **Retrieval & Agents** — Embeddings & vector similarity, vector databases, chunking & hybrid search, end-to-end RAG pipelines, RAG failure debugging, tool use, agent frameworks, reasoning/planning/memory, and building a production agent.
- **Fine-Tuning & Evaluation** — Fine-tune vs. prompt vs. RAG, parameter-efficient fine-tuning (LoRA/QLoRA), dataset preparation, fine-tune evaluation, building LLM eval sets, automated evaluation, A/B testing, and hallucination handling.
- **Productionization** — Wrapping models in APIs, caching/limits/costs, logging & observability, and CI/CD for AI apps.
- **Multimodal** — Vision-language models, image generation & editing, speech integration, and multimodal pipeline integration.
- **Safety & Responsible AI** — Adversarial prompt safety, data privacy & PII handling, bias & fairness, guardrails & content moderation, and a capstone conclusion.

## 🎮 Gamification Features
- **XP Progression & Levels**: Level up from Novice to Grandmaster.
- **Achievements & Badges**: Unlock milestones for completing sections, acing quizzes, and running interactive simulators.
- **Knowledge Check Quizzes**: Interactive multiple-choice assessments with instant explanations.
- **In-Person Practice Labs**: Local coding exercises with clickable self-verification checklists.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL Serverless (`@neondatabase/serverless`)
- **Styling**: Vanilla CSS (Modern Dark Glassmorphic Design System)
- **Deployment**: Vercel Serverless Functions
