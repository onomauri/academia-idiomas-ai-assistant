AI Language Academy Assistant
An intelligent, automated customer support system designed for language academies. It combines a local Retrieval-Augmented Generation (RAG) backend with n8n workflow automation, a Telegram bot interface, and an automated Gmail escalation protocol for complex or unresolvable queries.

Architecture & Workflow
User Interface: A Telegram bot receives user inquiries regarding language courses, schedules, and pricing.

Workflow Automation: n8n (running locally on port 5678 and exposed securely via a Pinggy HTTPS tunnel) orchestrates webhook event handling.

Backend Processing: A Node.js & Express server (http://localhost:3000/api/query) processes queries against local academy documents using OpenAI.

Decision Engine: An If node evaluates the response flag (escalate).

Automated Reply (false): Sends the RAG-generated answer directly back to the user on Telegram.

Human Escalation (true): Triggers an instant alert email via Gmail SMTP to administrators with the user's inquiry, while notifying the student on Telegram that an advisor has been assigned.

Tech Stack
Backend: Node.js, Express, OpenAI API, custom vector/document stores (pricing.txt, schedules.txt, levels.txt)

Automation: n8n, Pinggy (HTTPS tunneling)

Integrations: Telegram Bot API, Gmail SMTP

Quick Start & Installation
Setup and Run Backend:

Bash
cd backend
npm install
npm run dev
The backend runs on http://localhost:3000.

Establish an HTTPS Tunnel:
Expose your local n8n instance so Telegram can send webhooks safely:

Bash
ssh -p 443 -R0:localhost:5678 qr@free.pinggy.io
Copy the generated https:// public URL.

Start n8n:
Launch n8n binding your public tunnel URL:

Bash
WEBHOOK_URL=<your-pinggy-https-url></your> npx n8n start
Configure n8n Workflow:

Set up the Telegram Trigger (On message) connected to an HTTP Request node pointing to http://localhost:3000/api/query.

Route the output through an If node to split between automated responses and Gmail SMTP notifications.

Provide your BotFather API token and Gmail App Password credentials.

Project Structure
/backend - Core server logic, controller routes, RAG engine, and academy knowledge base documents.

README.md - Technical documentation and setup guide.
