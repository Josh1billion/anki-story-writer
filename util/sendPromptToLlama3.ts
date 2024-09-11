import axios from 'axios';
import http from 'http';
import https from 'https';

axios.defaults.httpAgent = new http.Agent({ family: 4 });
axios.defaults.httpsAgent = new https.Agent({ family: 4 });

export async function sendPromptToLlama3(prompt: string): Promise<string> {
    const apiUrl = 'http://localhost:11434/api/generate';
    const requestData = {
        model: 'llama3',
        prompt: prompt,
    };

    let resultString = '';
    try {
        const startTime = new Date();
        const response = await axios.post(apiUrl, requestData);
        const endTime = new Date();
        const strings = response.data.split('\n');
        for (let i = 0; i < strings.length; i++) {
            if (strings[i] === '') {
                continue;
            }

            const responseObj = JSON.parse(strings[i]);
            resultString += responseObj.response;
        }

    } catch (error) {
        console.error('Error calling Llama3 API:', error);
        throw error;
    }

    return resultString.trim();
}
