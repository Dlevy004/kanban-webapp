const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateTaskDescription = async (taskTitle) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Írj egy rövid, tömör, szakmai feladatleírást egy szoftverfejlesztési projekthez (Kanban tábla). 
        A feladat címe: "${taskTitle}". 
        A leírás legyen magyar nyelvű, maximum 2-3 mondat, és tartalmazza a teendő lényegét. Ne használj formázást (markdown), csak sima szöveget.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("AI Generation Error Detailed:", JSON.stringify(error, null, 2));
        throw new Error("Failed to generate description!");
    }
};

module.exports = {
    generateTaskDescription
};
