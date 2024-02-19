const axios = require('axios');
const cheerio = require('cheerio');

var hum_href_arr=[] ; 
var hum_title_arr=[]; 
async function humNewsHeadingFetch() {
  try {
    const url = 'https://humnews.pk/';
    const response = await axios.get(url);


    if (response.status === 200) {
      const $ = cheerio.load(response.data);


        $( 'a[style="text-transform: none;"]').each((index, element) => {

        const title = $(element).attr('title');
        const href = $(element).attr('href');

        console.log(`Title ${index + 1}: ${title}`);
        console.log(`  Href ${index + 1}: ${href}`);

       hum_href_arr[index] = href; 
        hum_title_arr[index] = title; //ARY TITLE STORER 
      });
    } else {
      console.log('Failed to retrieve the webpage. Status code:', response.status);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));


    require('./hum_news_article_data_fetch').humNewsArticleFetch(hum_href_arr); 


    

  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = { humNewsHeadingFetch , hum_title_arr} ;
