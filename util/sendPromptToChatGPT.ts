import axios from 'axios';
import http from 'http';
import https from 'https';
import { CONFIG } from '../config';

axios.defaults.httpAgent = new http.Agent({ family: 4 });
axios.defaults.httpsAgent = new https.Agent({ family: 4 });

export async function sendPromptToChatGPT(prompt: string): Promise<string> {
    const apiUrl = `${CONFIG.openAIBaseURL}chat/completions`;
    const headers = {
        'Authorization': `Bearer ${CONFIG.openAIApiKey}`,
        'Content-Type': 'application/json',
    };

    const modelName: string = 'gpt-4o';

    const requestData = {
        model: modelName,
        messages: [
        {
            role: 'user',
            content: prompt,
        }],
    };
  
    try {
        console.log('Calling ChatGPT API...');
        const startTime = new Date();
        const response = await axios.post(apiUrl, requestData, { headers });
        const endTime = new Date();
        console.log(`ChatGPT API call took ${((endTime.getTime() - startTime.getTime())/1000)} seconds`);
        const resultString = response.data.choices[0].message.content.trim();
        console.log('Input words: ' + prompt.split(' ').length + '. Output words: ' + resultString.split(' ').length + '.');
        return resultString;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw error;
    }
}
