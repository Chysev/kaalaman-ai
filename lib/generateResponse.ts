import axios from "axios";

const generateResponse = async (userInput: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/kaalaman",
      { userInput },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.KaalamanAIResponse;
  } catch (error) {
    console.error("Error Fetching Kaalaman AI Response:", error);
    throw error;
  }
};

export default generateResponse;
