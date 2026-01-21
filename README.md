---
title: MatchScoring V0.1
emoji: 🚀
colorFrom: green
colorTo: purple
sdk: docker
pinned: false
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# AI Match Scoring & Scheduling App

A premium, AI-powered web application for managing sports matches and generating tournament schedules.

![Banner](https://img.shields.io/badge/Status-Beta-blueviolet) ![Stack](https://img.shields.io/badge/Tech-Next.js_14_Docker-black)

## Features

*   **Live Scoring Board**: Premium, glassmorphic UI for real-time match scoring.
*   **AI Scheduler**: Chat with an AI assistant to generate complex tournament brackets (Single/Double Elimination, Round Robin).
*   **Handwriting Recognition**: Upload a photo of a hand-drawn bracket, and the AI will digitize it.
*   **Time Travel**: Built-in Undo/Redo/History for match states.
*   **Production Ready**: Fully dockerized for easy deployment (e.g., Hugging Face Spaces).

## Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS + CSS Variables (Dark Mode by default)
*   **State**: Zustand
*   **AI Integration**: Google Gemini / OpenAI (configurable via API)
*   **Containerization**: Docker

## Getting Started

### Local Development (with Docker)

1.  Ensure Docker Desktop is running.
2.  Run the development server:
    ```bash
    docker compose up
    ```
3.  Open [http://localhost:3000](http://localhost:3000).

### Deployment (Hugging Face Spaces)

1.  Create a new Space (Select "Docker" as the SDK).
2.  Push this repository to the Space.
3.  Set the following **Secret** in your Space settings if you want real AI features:
    *   `GEMINI_API_KEY` or `OPENAI_API_KEY`
4.  The app will build and serve automatically on port 7860.

## Project Structure

*   `/app`: Next.js pages and API routes.
*   `/lib`: Utilities and State Management.
*   `/public`: Static assets.

---
*Built with ❤️ for the future of sports management.*
