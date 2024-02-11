const axios = require('axios');
const cheerio = require('cheerio');
var ary_href_arr=[] ; 
var ary_title_arr=[]; 
async function aryNewsHeadingFetch() {
  try {
    const url = 'https://arynews.tv/';
    const response = await axios.get(url);


    if (response.status === 200) {
      const $ = cheerio.load(response.data);


      $('.td-module-title a').each((index, element) => {

        const title = $(element).text();
        const href = $(element).attr('href');

        console.log(`Title ${index + 1}: ${title}`);
        //console.log(`  Href ${index + 1}: ${href}`);

        ary_href_arr[index] = href; 
        ary_title_arr[index] = href; //ARY TITLE STORER 
      });
    } else {
      console.log('Failed to retrieve the webpage. Status code:', response.status);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));


    require('./ary_news_article_data_fetch').aryNewsArtcileFetch(ary_href_arr); 


    

  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = { aryNewsHeadingFetch , ary_title_arr} ;
