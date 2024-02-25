function removeLineSpacing(text) {
    // Replace line breaks and commas with spaces
    return text.replace(/[\r\n,]/g, ' ');
  }
  
  module.exports = removeLineSpacing;