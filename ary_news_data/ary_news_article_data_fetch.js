const axios = require('axios');
const cheerio = require('cheerio');
var ary_article_arr = []; // ARY ARTICLE STORER  

async function aryNewsArticleFetch(href) {
  try {
    for (var i = 0; i < 10; i++) {    
      ary_article_arr[i] = " "; // Initialize as an empty string for each article
      
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        const paragraphs = $('.tdb-block-inner p').filter(function () {
          return $(this).text().trim().length > 0;
        });

        paragraphs.each((index, element) => {
          const paragraphText = $(element).text();
          ary_article_arr[i] += paragraphText;
        });

        console.log(ary_article_arr);
      } else {
        console.log('Failed to retrieve the webpage. Status code:', response.status);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    require('../geo_news_data/geo_news_heading_link_fetch').geoNewsHeadingFetch(); 
  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = { aryNewsArticleFetch, ary_article_arr };
