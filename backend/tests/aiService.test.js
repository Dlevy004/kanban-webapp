const aiService = require('../services/aiService');
const { GoogleGenerativeAI } = require("@google/generative-ai");

jest.mock("@google/generative-ai");

describe('AI Service Tesztek', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. teszteset: Sikeres generálás
    it('should return generated text when API call is successful', async () => {
        // ARRANGE
        const taskTitle = "Teszt Feladat";
        const fakeDescription = "Ez egy generált leírás.";

        const mockGenerateContent = jest.fn().mockResolvedValue({
            response: {
                text: () => fakeDescription
            }
        });

        const mockGetGenerativeModel = jest.fn().mockReturnValue({
            generateContent: mockGenerateContent
        });

        GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: mockGetGenerativeModel
        }));

        // ACT
        const result = await aiService.generateTaskDescription(taskTitle);

        // ASSERT
        expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: "gemini-2.5-flash" });
        expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining(taskTitle));
        expect(result).toBe(fakeDescription);
    });

    // 2. teszteset: Hiba kezelés
    it('should throw an error if API call fails', async () => {
        // ARRANGE
        const mockGenerateContent = jest.fn().mockRejectedValue(new Error("API Error"));

        const mockGetGenerativeModel = jest.fn().mockReturnValue({
            generateContent: mockGenerateContent
        });

        GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: mockGetGenerativeModel
        }));

        // ACT & ASSERT
        await expect(aiService.generateTaskDescription("Hiba teszt"))
            .rejects
            .toThrow("Failed to generate description!");
    });
});
