let quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('new-quote');
let loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function onComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (!quote.author) {
    authorText.textContent = 'Unknown';
    } else {
    authorText.textContent = quote.author;
    }
    if (quote.text.length > 100) {
    quoteText.classList.add('long-quote')
    } else {
    quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    onComplete();
}

async function getQuotes(){
    loading();
    const apiUrl = 'https://run.mocky.io/v3/a34d2a69-cbf9-4d37-bda2-fc761bcba2ff';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        } catch (error) {
        console.error(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// Quando carregar a página - On Load
getQuotes();





