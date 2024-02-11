const axios = require('axios');
const cheerio = require('cheerio');

var geo_href_arr = [];
var geo_title_arr = [];

async function geoNewsHeadingFetch() {
  try {
    const url = 'https://geo.tv/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      $('.heading a').each((index, element) => {
        const dataArticleName = $(element).attr('data-article_name');
        const href = $(element).attr('href');

        console.log(`data-article_name ${index + 1}: ${dataArticleName}`);
        console.log(`  Href ${index + 1}: ${href}`);

        geo_href_arr[index] = href;
        geo_title_arr[index] = dataArticleName; // You may want to use data-article_name instead of title
      });
    } else {
      console.log('Failed to retrieve the webpage. Status code:', response.status);
    }

    // If you need a delay, uncomment the following line
    // await new Promise(resolve => setTimeout(resolve, 1000));

    require('./geo_news_article_data_fetch').geoNewsArticleFetch(geo_href_arr);

  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = { geoNewsHeadingFetch, geo_title_arr };
