import { CONFIG } from "../config";
import { sendPromptToChatGPT } from "./sendPromptToChatGPT";
import { sendPromptToLlama3 } from "./sendPromptToLlama3";

export async function sendPromptToLLM(prompt: string): Promise<string> {
    // other LLMs can be added here later if needed, but for now, always send to Llama3
    if (CONFIG.useChatGPT) {
        return sendPromptToChatGPT(prompt);
    }
    return sendPromptToLlama3(prompt);
}