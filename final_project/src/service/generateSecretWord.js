import axios from "axios";
import { words } from "../data/defaultWords";
import getGeneratorUrl from "./getGeneratorUrl";

export async function generateSecretWord(language) {
    try {
        // Web Scraping
        const response = await axios.get(getGeneratorUrl(language));
        const html = response.data;

        // Extracting generated word from HTML
        const query = `<div style="font-size:3em; color:#6200C5;">`;
        const index1 = html.indexOf(query);
        const index2 = html.indexOf('</div>', index1);
        const secretWord = html.substring(index1 + query.length, index2);

        // Checking for errors and sanitizing the output
        if (secretWord.length == 0) throw new Error("Word not found");
        return secretWord.trim().toUpperCase().split("");
        
    } catch(error) {

        // Guarantee the user will be able to play even if either them or the site is offline
        const randomIndex = Math.floor(Math.random() * words[language].length);
        const secretWord = words[language][randomIndex];
        return secretWord.split("");
    }
}
