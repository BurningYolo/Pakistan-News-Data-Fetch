const axios = require('axios');
const cheerio = require('cheerio');

var bol_article_arr = []; // bol ARTICLE STORER

async function bolNewsArticleFetch(href) {
  for (var i = 0; i < 10; i++) {
    try {
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Find all paragraphs inside the article tag and concatenate their text content
        const articleText = $('.typo-txt p').map((index, element) => $(element).text()).get().join('\n');

        console.log(`Article ${i + 1} Text:\n${articleText}`);

        // Store the article text in the array
        bol_article_arr[i] = articleText;
      } else {
        console.log('Failed to retrieve the webpage. Status code:', response.status);
      }

      // If you need a delay, uncomment the following line
       await new Promise(resolve => setTimeout(resolve, 1000));

       
    } catch (error) {
      console.error('Failed to retrieve the webpage.', error.message);
    }
  }
  require('../dunya_news_data/dunya_news_heading_link_fetch').dunyaNewsHeadingFetch(); 
}

module.exports = { bolNewsArticleFetch, bol_article_arr };
