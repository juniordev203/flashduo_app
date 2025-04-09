import { readBody, getQuery } from "h3";
import vi from "~/locales/vi.json";
import en from "~/locales/en.json";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const body = await readBody(event);
  
  if (!body.prompt) {
    throw createError({ statusCode: 400, statusMessage: "Prompt is required" });
  }

  const locale = query.lang || "vi";

  const systemPrompt = locale === "en" ? en.system_prompt_flashduo : vi.system_prompt_flashduo;

  const finalPrompt = `${systemPrompt}\n\n${body.prompt}`;

  const config = useRuntimeConfig();
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: finalPrompt }] }],
      }),
    });

    if (!response.ok) {
      throw createError({ statusCode: response.status, statusMessage: await response.text() });
    }

    return await response.json();
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error instanceof Error ? error.message : "Lỗi khi gọi API" });
  }
});
