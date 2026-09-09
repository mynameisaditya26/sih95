# SIH 2026 – DoSJE Smart Monitoring & Compliance Platform

**Problem Statement #95** | Complete Hackathon Prototype

A full-stack platform for surprise inspections, evidence capture, AI analysis, risk scoring, and real-time monitoring of institutions.

## Features
- Role-based access (Admin / Inspector / Institution)
- Random surprise inspections + GPS verification
- Evidence upload with geo-tagging
- AI-powered image analysis (mock + abstraction layer)
- Risk & Compliance scoring
- AI-generated inspection reports
- Real-time notifications (Socket.IO)
- CCTV / Demo monitoring
- Violation management + Corrective Actions
- Audit logs
- Interactive dashboards, maps & charts
- Fully Dockerized

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind + Recharts + Lucide
- **Backend**: Node.js + Express + MongoDB + Socket.IO
- **AI Service**: Python + FastAPI (mock analysis)
- **Infra**: Docker Compose

---

## Quick Start (Recommended – Docker)

```bash
# 1. Clone / unzip the project
cd sih95-main

# 2. Start everything
docker-compose up --build