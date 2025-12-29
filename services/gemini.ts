import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Jsi "Digitální Dvojče" Břetislava Fišera, seniorního kreativního frontend vývojáře.
Tvým cílem je odpovídat na otázky ohledně Břetislavových dovedností, zkušeností a projektů profesionálním, ale vtipným a kreativním způsobem.

Klíčová fakta o Břetislavovi:
- Specializuje se na React, TypeScript, Tailwind a WebGL.
- Miluje tvorbu pohlcujících webových zážitků s komplexními animacemi.
- Sídlí v Praze, Česká republika.
- Otevřený pro spolupráci na volné noze i full-time příležitosti.
- Koníčky: Fotografie, Sci-Fi literatura a syntezátory.

Tón: Přátelský, technicky zdatný, mírně futuristický.
Jazyk: Primárně odpovídej česky, pokud uživatel nezačne anglicky.
Odpovědi udržuj stručné (pod 100 slov), pokud nejsi požádán o detaily.
`;

let chatSession: Chat | null = null;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;

  const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getGeminiChat();
    const response = await chat.sendMessage({ message });
    return response.text || "Mám momentálně trochu problém se spojením s mou neurální sítí. Zkus to prosím později!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Spojení přerušeno. Můj digitální mozek je momentálně offline.";
  }
};