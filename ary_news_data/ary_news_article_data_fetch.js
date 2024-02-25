const axios = require('axios');
const cheerio = require('cheerio');
const removeLineSpacing = require('../data_normalization/normalize')
var ary_article_arr = []; // ARY ARTICLE STORER  

async function aryNewsArticleFetch(href) {
  try {
    for (var i = 0; i <= href.length - 3  ; i++) {    
      ary_article_arr[i] = ''; // Initialize as an empty string for each article
      
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        const paragraphs = $('.td-post-content p').filter(function () {
          return $(this).text().trim().length > 0;
        });

        paragraphs.each((index, element) => {
          const paragraphText = $(element).text();
          const cleanedText = removeLineSpacing(paragraphText);
          const artilce_with_spaces_removed = removeLineSpacing(cleanedText); 
          ary_article_arr[i] += artilce_with_spaces_removed;
        });

        console.log(ary_article_arr[i]);
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
