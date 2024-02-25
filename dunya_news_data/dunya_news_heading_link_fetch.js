const axios = require('axios');
const cheerio = require('cheerio');
const removeLineSpacing = require('../data_normalization/normalize')

var dunya_href_arr = [];
var dunya_title_arr = [];

async function dunyaNewsHeadingFetch() {
  try {
    const url = 'https://dunyanews.tv/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      // Adjust the selector to target elements with class "media__title media__title--threelines" inside h3 tags
      $('.media__title.media__title--threelines a').each((index, element) => {
        const dataArticleName = $(element).text().trim(); // Use .text() to get the text content
        var href = $(element).attr('href');


        console.log(`data-article_name ${index + 1}: ${dataArticleName}`);
       

        href=href.replace('/index.php/', 'https://dunyanews.tv/');
        console.log(`  Href ${index + 1}: ${href}`);

        const cleaned_article_text = removeLineSpacing(dataArticleName); 
        const cleaned_href_content = removeLineSpacing(href); 

        dunya_href_arr[index] = cleaned_href_content;
        dunya_title_arr[index] = cleaned_article_text; 
      });
    } else {
      console.log('Failed to retrieve the webpage. Status code:', response.status);
    }

    // If you need a delay, uncomment the following line
     await new Promise(resolve => setTimeout(resolve, 1000));

    // Adjust the module import to use dunya_href_arr
    require('./dunya_news_article_data_fetch').duynaNewsArticleFetch(dunya_href_arr); 

  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = {  dunyaNewsHeadingFetch, dunya_title_arr, dunya_href_arr };
