const axios = require('axios');
const cheerio = require('cheerio');

var dunya_article_arr = []; // DUNYA ARTICLE STORER

async function duynaNewsArticleFetch(href) {
  for (var i = 0; i < 10; i++) {
    try {
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Find all paragraphs inside the article tag and concatenate their text content
        const articleText = $('article p').map((index, element) => $(element).text()).get().join('\n');

        console.log(`Article ${i + 1} Text:\n${articleText}`);

        // Store the article text in the array
        dunya_article_arr[i] = articleText;
      } else {
        console.log('Failed to retrieve the webpage. Status code:', response.status);
      }

      // If you need a delay, uncomment the following line
       await new Promise(resolve => setTimeout(resolve, 1000));

       
    } catch (error) {
      console.error('Failed to retrieve the webpage.', error.message);
    }
  }
  require('../hum_news_data/hum_news_heading_link_fetch').humNewsHeadingFetch(); 
}

module.exports = { duynaNewsArticleFetch, dunya_article_arr };
