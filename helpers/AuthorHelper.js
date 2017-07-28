const apaStyle = require('./AuthorHelperAPA')
const ieeeStyle = require('./AuthorHelperIEEE')
const utils = require('./AuthorHelperUtil')

module.exports = {
  getAuthors: _getAuthors,
  splitAndFixNameParts: utils.splitAndFixNameParts
}

function _getAuthors (publicationType, publication, lang, style) {
  switch (style) {
    case 'ieee':
      return ieeeStyle.getAuthors(publicationType, publication, lang)
    case 'apa':
      return apaStyle.getAuthors(publicationType, publication, lang)
    default:
      return ieeeStyle.getAuthors(publicationType, publication, lang)
  }
}
