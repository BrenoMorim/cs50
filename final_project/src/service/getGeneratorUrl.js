// Gets the proper URL based on the current language
const urls = {
    "portuguese": "http://www.palabrasaleatorias.com/palavras-aleatorias.php?fs=1",
    "english": "https://www.palabrasaleatorias.com/random-words.php?fs=1",
    "spanish": "http://www.palabrasaleatorias.com/index.php?fs=1"
};

export default function getGeneratorUrl(language) {
    return urls[language];
}