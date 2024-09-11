# About

Given an Anki deck (`input.txt`) and some options (`config.ts`), uses AI to generate a short story that makes use of a random selection of the vocab the user is learning in a foreign language.

# Installation

Decide whether you want to use Llama3 (running locally, free but requires a beefy GPU) or ChatGPT (using their API, which is not free).

If you want to use Llama3, install Ollama and use that to get Llama3 running locally on port 11434.

If you want to use ChatGPT instead, make the following two changes in `config.ts`, First, change `useChatGPT` to `true`. Second, paste your OpenAI API key into `openAIApiKey`.

Install Node.js

Run `npm install`

# Usage
Export an Anki deck's cards into `input.txt`. You can do this in the desktop version of Anki (not AnkiWeb) by clicking `Browse`, then (from the menu) Notes -> Export Notes.  Set the export format to `Notes in Plain Text (.txt)`, and uncheck the box that says `Include HTML and media references`.

That resulting text file should have one card per line, with a tab separating the question and answer.

Optionally, edit `config.ts` to configure how long you want the story to be.

Run `npm start`. The output will be in `output.txt`.

# Troubleshooting
Ensure you've exported into `input.txt` in the correct format.
