import axios from 'axios';

export const todo = async (url, method, title) => {
    const config = {
        method: method,
        url: url,
       data: { title } // Request body data
    };
    console.log(config);

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for handling at the caller level
    }
};
