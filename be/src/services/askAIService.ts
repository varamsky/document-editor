import { OpenAI } from "openai";

const openAIConfig = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const getCompletion = async (
  prompt: string,
  model = process.env["LLM"] || "gpt-3.5-turbo"
) => {
  try {
    const response = await openAIConfig.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });
    return { status: true, data: response.choices };
  } catch (error: unknown) {
    console.log(`Error in getCompletion service`, error);
    if (error instanceof OpenAI.APIError) {
      return { status: 2, statusCode: error.status, message: error.name };
    } else {
      return { status: false, message: error };
    }
  }
};

export default getCompletion;
