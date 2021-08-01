const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
//Get quotes fro api and its declare global array
 let apiQuotes = [];  //get from api

 //  loading function
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
//Hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
 //show new quotes
function newQuote()
{
    loading();
// pick a random Quotes from api quotes array
const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //for local quotes of array instead of api we will used a localQuotes change into apiQuotes
//console.log(quotes);

//Check if author field is blank and replace it with unknown;

if(!quote.author)
{
    authorText.textContent='Unknown';
}else{
    authorText.textContent=quote.author;
}
//check quote text to determine a styling
if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
//Set a quote and hide loader
quoteText.textContent=quote.text;
complete();
}

async  function getQuotes()     //get from api   //getQuotes=>() arrow function
{
    loading();//call loading function
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    } catch (error) {
        //Catch error here

    }
}
//tweet quote
function tweetQuote()  {
const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuotes();  //get from api


//newQuotes();  //for local we used
