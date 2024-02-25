const axios = require('axios');
const cheerio = require('cheerio');
var hum_article_arr= []; // hum ARTICLE STORER  
const removeLineSpacing = require('../data_normalization/normalize')

async function humNewsArticleFetch(href) {




  for (var i = 0; i < 10; i++)  // IF GET VALUE OF ALL ARTICLES NEED TO CHANGE 10 to Length of href arr .... gotten from param. 
  {    
    hum_article_arr[i]= ''; 
    try {
      const url = href[i];
      console.log(url);
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        


        const paragraphs = $('.wrap__article-detail-content p').filter(function () {
          return $(this).text().trim().length > 0;
        });
       
        


        paragraphs.each((index, element) => {
          const paragraphText = $(element).text();
          const cleaned_paragraph_text = removeLineSpacing(paragraphText); 
          hum_article_arr[i] += cleaned_paragraph_text; 
        });

        hum_article_arr[i] = removeLineSpacing(hum_article_arr[i]) ; 

        console.log(hum_article_arr); 
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log('Failed to retrieve the webpage. Status code:', response.status);
      }

      
    } catch (error) {
      console.error('Failed to retrieve the webpage.', error.message);
    }

  }
  require('../main').gather_data(); 
  
  
}

module.exports = { humNewsArticleFetch , hum_article_arr };
