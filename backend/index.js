import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handler = async (event) => {
    try {
        const { userId, code, language, problemDescription, hintLevel } = JSON.parse(event.body);

        // 1. Gemini Socratic Configuration
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemPrompt = `You are a strict Socratic coding mentor for a student working on: ${problemDescription}.
        Current Hint Level: ${hintLevel}/3. 
        Rules: 
        - DO NOT provide the full solution code.
        - Analyze the student's code for logical errors or complexity issues.
        - Ask leading questions to help them fix the code themselves.`;

        const result = await model.generateContent([systemPrompt, `Code (${language}):\n${code}`]);
        const feedback = result.response.text();
        const attemptId = `att_${Date.now()}`;

        // 2. DynamoDB Logging
        await docClient.send(new PutCommand({
            TableName: "CodeMentorAttempts",
            Item: {
                userId,
                attemptId,
                code,
                hintLevel,
                feedback,
                timestamp: new Date().toISOString()
            }
        }));

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ feedback, attemptId })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};