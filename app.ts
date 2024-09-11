import { sendPromptToLLM } from './util/sendPromptToLLM';
import fs from 'fs';
import { CONFIG } from './config';

interface VocabWord {
    wordInTargetLanguage: string;
    wordInNativeLanguage: string;
}

async function run() {
    // open the contents of input.txt
    console.log('Reading input.txt...');
    const input = fs.readFileSync('input.txt', 'utf8');
    console.log(`Done reading input.txt. It has ${input.length} characters.`);

    // split the input into an array of lines
    const lines = deleteLinesThatStartWithHashtag(input).split('\n');
    let vocabList: VocabWord[] = [];
    lines.forEach((line: string) => {
        const [wordInTargetLanguage, wordInNativeLanguage] = line.split(' - ');
        vocabList.push({ wordInTargetLanguage, wordInNativeLanguage });
    });

    // choose up to CONFIG.howManyTargetWordsToUse words that we'll actually tell the LLM to use in its storywriting
    vocabList = vocabList.sort(() => 0.5 - Math.random()).slice(0, CONFIG.howManyTargetWordsToUse);

    let prompt = `Write a short story in ${CONFIG.targetLanguage} consisting of ${CONFIG.howManySentencesToWrite} sentences. The story should make use of the following ${CONFIG.targetLanguage} words/phrases. After each word/phraase, I've included a translation into English for your personal reference.`;
    vocabList.forEach((word: VocabWord) => {
        prompt += `\n${word.wordInTargetLanguage} - ${word.wordInNativeLanguage}`;
    });
    console.log(`Writing story...`);
    const outputContents = await sendPromptToLLM(prompt);
    fs.writeFileSync('output.txt', outputContents, 'utf8');
    console.log(`Story written to output.txt`);
}

function deleteLinesThatStartWithHashtag(contents: string): string {
    const lines = contents.split('\n');
    const newLines: string[] = [];
    for (const line of lines) {
        if (line.trim().length > 0 && !line.startsWith('#')) {
            newLines.push(line);
        }
    }
    return newLines.join('\n');
}

run();
