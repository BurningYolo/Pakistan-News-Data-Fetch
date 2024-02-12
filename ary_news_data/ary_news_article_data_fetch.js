const axios = require('axios');
const cheerio = require('cheerio');
var ary_article_arr= []; // ARY ARTICLE STORER  

async function aryNewsArticleFetch(href) {




  for (var i = 0; i < 10; i++)  // IF GET VALUE OF ALL ARTICLES NEED TO CHANGE 10 to Length of href arr .... gotten from param. 
  {    
    try {
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Select only <p> tags that contain text


        const paragraphs = $('.tdb-block-inner p').filter(function () {
          return $(this).text().trim().length > 0;
        });
       
        // Extract and print the text content of selected <p> tags


        paragraphs.each((index, element) => {
          const paragraphText = $(element).text();
          ary_article_arr[i] += paragraphText; 
        });

        console.log(ary_article_arr); 
      } else {
        console.log('Failed to retrieve the webpage. Status code:', response.status);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to retrieve the webpage.', error.message);
    }
  }
}

module.exports = { aryNewsArticleFetch , ary_article_arr };