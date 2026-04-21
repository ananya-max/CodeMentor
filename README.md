# CodeMentor: AI-Powered Socratic Coding Tutor 🚀

CodeMentor is a serverless web application designed to help students master Data Structures and Algorithms (DSA). Unlike traditional platforms that provide immediate solutions, CodeMentor acts as a digital pair-programmer, using the **Socratic Method** to guide users toward the right answer through guided questioning and a progressive hint system.

## 🌟 Core Features

* **Socratic AI Feedback:** Powered by Google Gemini 1.5 Flash, the mentor analyzes logic and complexity without giving away the full code.
* **Progressive Hint Ladder:** Access up to 3 layers of hints (Conceptual, Logic, and Strategy) if you get stuck.
* **In-Browser Code Editor:** Integrated with the Monaco Editor (the engine behind VS Code) for a professional coding experience.
* **Attempt History:** Automatically logs code submissions and AI feedback to AWS DynamoDB for progress tracking.
* **Cloud-Native Architecture:** Fully serverless stack for 100% Free Tier compliance and high scalability.

## 🛠️ Tech Stack

* **Frontend:** React.js, Monaco Editor, CSS3
* **Backend:** Node.js, AWS Lambda (Serverless)
* **Database:** Amazon DynamoDB (NoSQL)
* **AI Engine:** Google Gemini 1.5 Flash API
* **Deployment:** AWS S3 (Static Hosting) + CloudFront (HTTPS/CDN)
* **CI/CD:** GitHub Actions

## 📐 System Architecture

1.  **Frontend:** React app hosted on S3/CloudFront.
2.  **API Layer:** AWS API Gateway routes requests to Lambda.
3.  **Compute:** Lambda processes code, calls Gemini API, and stores logs in DynamoDB.
4.  **AI Logic:** Gemini 1.5 Flash evaluates code based on a custom "Socratic Mentor" system prompt.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* AWS Account (Free Tier)
* Google AI Studio API Key (Gemini)

### Local Development

**1. Clone the repository:**
```bash
git clone https://github.com/ananya-max/CodeMentor.git
cd codementor
**2. Setup Backend:**

Bash
cd backend
npm install
# Set environment variables
export GEMINI_API_KEY='your_key_here'
node local-server.js
**3. Setup Frontend:**

Bash
cd ../frontend
npm install
# Create a .env file
echo "REACT_APP_API_URL=http://localhost:5000/evaluate" > .env
npm start
🤖 CI/CD & Deployment
This project uses GitHub Actions for automated deployment.

Push to main: Triggers a build of the React frontend, syncs it to S3, and updates the AWS Lambda function code.

Secrets Required:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

GEMINI_API_KEY

S3_BUCKET_NAME

AWS_API_ENDPOINT

Developed by Ananya Kukutlapally