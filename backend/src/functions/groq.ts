import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' })

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