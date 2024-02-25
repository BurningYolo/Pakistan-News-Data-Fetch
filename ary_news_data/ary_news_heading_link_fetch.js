const axios = require('axios');
const cheerio = require('cheerio');
const removeLineSpacing = require('../data_normalization/normalize')
var ary_href_arr=[] ; 
var ary_title_arr=[]; 
async function aryNewsHeadingFetch() {
  try {
    const url = 'https://arynews.tv/';
    const response = await axios.get(url);


    if (response.status === 200) {
      const $ = cheerio.load(response.data);


      $('.td-module-title a').each((index, element) => {
        const title = $(element).text().replace(/\s+/g, ' ').trim();
        const href = $(element).attr('href').replace(/\s+/g, ' ').trim();
        const title_with_spaced_removed = removeLineSpacing(title); 
        const href_with_spaces_removed = removeLineSpacing(href); 
        console.log(`Title ${index + 1}: ${title}`);
        //console.log(`  Href ${index + 1}: ${href}`);
      
        ary_href_arr[index] = href_with_spaces_removed; 
        ary_title_arr[index] = title_with_spaced_removed; //ARY TITLE STORER 
      });
    } else {
      console.log('Failed to retrieve the webpage. Status code:', response.status);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));


    require('./ary_news_article_data_fetch').aryNewsArticleFetch(ary_href_arr); 


    

  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = { aryNewsHeadingFetch , ary_title_arr, ary_href_arr} ;
