const translator = require('./translate')
const apaStyle = require('./AuthorHelperAPA')
const ieeeStyle = require('./AuthorHelperIEEE')
const util = require('./AuthorHelperUtil')

module.exports = {
  getAuthors: _getAuthors,
  splitAndFixNameParts: util.splitAndFixNameParts
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
