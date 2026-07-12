# AI Investment Research Agent

## Overview
The AI Investment Research Agent is an intelligent, full-stack platform that autonomously analyzes publicly traded companies. By synthesizing real-time financial data (price, market cap, ROE, net margins) with live market news, it generates expert-level investment reports. It leverages powerful LLMs to evaluate a company's business moat, revenue concentration, competitive risks, and future trends, ultimately providing a data-backed "INVEST" or "PASS" recommendation.

## How to Run

### 1. Clone the Project
```bash
git clone https://github.com/BhagirathPrasad/ai-investment-research-agent.git
cd ai-investment-research-agent
```

### 2. Install Dependencies
You need to install dependencies for both the frontend and the backend.
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure `.env`
In the `backend` directory, create a `.env` file and add the following keys:
```env
PORT=4000
CLIENT_URL=http://localhost:5173
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your Secret Key>
NODE_ENV=development
OPENROUTER_API_KEY=<Your OpenRouter API Key>
```

### 4. Start Backend
Open a terminal and start the backend development server:
```bash
cd backend
npm run dev
```

### 5. Start Frontend
Open a new terminal and start the frontend development server:
```bash
cd frontend
npm run dev
```
The application will be running at `http://localhost:5173`.

## Architecture
The application is built on a modern JavaScript stack tailored for speed, scalability, and AI integration.

- **React Frontend**: Built with React and Vite. Styled utilizing modern Tailwind CSS for a premium, dark-mode glassmorphism aesthetic. It uses Recharts for rendering intraday financial charts, and Framer Motion for smooth UI transitions.
- **Node/Express Backend**: A robust REST API that handles user authentication (JWT), MongoDB data persistence (saving reports), and orchestrates third-party API fetching. 
- **LLM Integration**: Integrated with **OpenRouter (OpenAI GPT-3.5-Turbo)**. The backend constructs a highly detailed prompt containing live financial metrics and feeds it to the LLM to synthesize the qualitative analysis (moats, management, risk concentration).
- **APIs Used**:
  - `yahoo-finance2`: Scrapes real-time stock quotes, financial summaries, and recent news articles.
  - `OpenRouter API`: Powers the generative AI capabilities for the research report.

## Key Decisions & Trade-offs
- **Why React + Node**: Selected for full-stack JavaScript unity. It allowed for rapid prototyping and seamless JSON data flow between the backend AI agent and the frontend UI.
- **Why OpenRouter / GPT-3.5**: OpenRouter provides a unified interface for multiple LLMs. GPT-3.5-Turbo was chosen for its excellent balance of reasoning capability, low latency, and cost-efficiency when generating structured JSON reports.
- **Features Prioritized**: 
  - Accuracy of financial data (real-time Yahoo Finance integration).
  - Premium User Experience (glassmorphism UI, interactive charts, PDF export).
  - Reliable AI JSON structuring (to ensure the frontend dashboard doesn't break).
- **What was intentionally left out**:
  - Complex authentication flows (OAuth) were mocked/simplified to focus on the core AI research engine.
  - Granular historical financial statements (10-Ks) processing, as it would require extensive token limits and wait times.

## Example Runs
The agent performs incredibly well across various sectors:
- **Apple (AAPL)**: Successfully identifies its massive ecosystem moat and high margins, generally resulting in a high-confidence "INVEST" recommendation.
- **Tesla (TSLA)**: Highlights strong brand presence but correctly flags competitive risks and cyclical automotive trends, leading to a nuanced confidence score.
- **Microsoft (MSFT)**: Evaluates cloud dominance and recurring revenue streams as a highly resilient business model.
- **NVIDIA (NVDA)**: Parses the rapid revenue growth in AI hardware, while flagging potential supply chain concentration risks.

## Future Improvements
- **Streaming Responses**: Implementing Server-Sent Events (SSE) to stream the LLM's reasoning in real-time, reducing perceived wait times.
- **Better Financial Data**: Migrating from Yahoo Finance scraping to enterprise APIs like Bloomberg, Alpha Vantage, or FMP for institutional-grade reliability.
- **Multi-Agent Workflow**: Deploying a "Red Team" LLM to explicitly debate and critique the primary agent's investment thesis before presenting the final report.
- **RAG Support**: Implementing Retrieval-Augmented Generation (RAG) by scraping and embedding live SEC 10-K and 10-Q filings for the LLM to cite directly.
- **PDF Report Generation**: Further enhancing the `window.print()` functionality with a dedicated backend PDF rendering engine (like Puppeteer) for highly polished institutional downloads.

## LLM Chat Logs (Bonus)
Throughout the development of this project, LLM agents were heavily utilized to architect the backend services, design the Tailwind CSS frontend, and debug API integrations. 
*See the attached project transcripts or repository history to view the detailed pairing sessions that built this platform!*
