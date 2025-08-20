import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config()
const groq = new Groq({ apiKey: `${process.env.API_KEY}` })

export async function generateAiBasedTest(prompt: string): Promise<string> {
    const completion = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: prompt,
        },

        ],
        model: "llama-3.3-70b-versatile",
    })
    return completion.choices[0].message.content || ''
}