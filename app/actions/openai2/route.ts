"use server"
import OpenAI from "openai";
import { match } from "../query/route";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function getresponse() {
    try {
        const content= await match();
        const invalidresponse ="invalid"
        const prompt = content === invalidresponse ? "convey the message to the user that I cannot respond with that question" : "When did Krishna kill Naragasura?";

        const response = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": content },
                { "role": "user", "content": prompt },
          ],
            model: "gpt-3.5-turbo",
        });
        console.log(response.choices[0].message);
    }
    catch (error) {
        console.log("error calling openai embeddings api", error);
        throw error;
    }

}