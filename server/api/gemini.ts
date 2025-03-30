// server/api/gemini.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  
  if (!body.prompt) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prompt is required'
    });
  }
  
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: body.prompt
          }]
        }]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw createError({
        statusCode: response.status,
        statusMessage: `API error: ${errorData}`
      });
    }
    
    return await response.json();
  } catch (error) {
    
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi gọi API.'
    });
  }
});