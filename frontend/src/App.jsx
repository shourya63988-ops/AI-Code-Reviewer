import axios from 'axios';

const API_URL = 'https://ai-code-reviewer-backend-0njd.onrender.com/api/review';

export const generateCodeReview = async (code, language) => {
  try {
    const response = await axios.post(API_URL, {
      code,
      language,
      model: 'llama-3.1-8b-instant'
    });
    return response.data;
  } catch (error) {
    console.error('Error generating review:', error);
    throw error;
  }
};
