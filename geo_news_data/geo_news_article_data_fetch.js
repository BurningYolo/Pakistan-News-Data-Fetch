const axios = require('axios');
const cheerio = require('cheerio');
const removeLineSpacing = require('../data_normalization/normalize')
var geo_article_arr= []; // ARY ARTICLE STORER  

async function geoNewsArticleFetch(href) {




  for (var i = 0; i < href.length - 3; i++)  // IF GET VALUE OF ALL ARTICLES NEED TO CHANGE 10 to Length of href arr .... gotten from param. 
  {
    geo_article_arr[i] = ' '    
    try {
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Select only <p> tags that contain text


        const paragraphs = $('.content-area p').filter(function () {
          return $(this).text().trim().length > 0;
        });
        
        paragraphs.each((index, element) => {
          const paragraphText = $(element).text().replace(/\s+/g, ' ').trim(); // Remove line breaks and extra spaces
          const cleaned_text_content = removeLineSpacing(paragraphText); 
          geo_article_arr[i] += cleaned_text_content;
        });

        geo_article_arr[i] = removeLineSpacing(geo_article_arr[i]); 


        
        console.log(geo_article_arr[i]);
      } else {
        console.log('Failed to retrieve the webpage. Status code:', response.status);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to retrieve the webpage.', error.message);
    }
  }
    require('../bol_news_data/bol_news_heading_link_fetch').bolNewsHeadingFetch(); 
}

function removeLineSpacing_commas(text) {
  // Replace line breaks with an empty string
  return text.replace(/[\r\n,]/g, ' ');
}

module.exports = { geoNewsArticleFetch , geo_article_arr };
