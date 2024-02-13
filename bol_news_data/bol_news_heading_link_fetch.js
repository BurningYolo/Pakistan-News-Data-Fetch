const axios = require('axios');
const cheerio = require('cheerio');
var bol_href_arr=[] ; 
var bol_title_arr=[]; 
async function bolNewsHeadingFetch() {
  try {
    const url = 'https://www.bolnews.com/top-headlines/';
    const response = await axios.get(url);


    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      
      $('li.border-bottom-dashed a').each((index, element) => {
        const $element = $(element);
    
        const textContent = $element.text(); // Extracting text content from the <a> element and its descendants
        const href = $element.attr('href'); // Extracting href from the <a> element
    
        console.log(`Title ${index + 1}: ${textContent}`);
        console.log(`  Href ${index + 1}: ${href}`);
    
        bol_href_arr[index] = href;
        bol_title_arr[index] = textContent.trim(); // Trim to remove extra whitespace
    });
    
    
    
    } else {
      console.log('Failed to retrieve the webpage. Status code:', response.status);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));


    require('./bol_news_article_data_fetch').bolNewsArticleFetch(bol_href_arr); 


    

  } catch (error) {
    console.error('Failed to retrieve the webpage.', error.message);
  }
}

module.exports = { bolNewsHeadingFetch , bol_title_arr} ;
