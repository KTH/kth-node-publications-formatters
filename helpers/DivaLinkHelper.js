const apaStyle = require('./DivaLinkHelperAPA')
const ieeeStyle = require('./DivaLinkHelperIEEE')

module.exports = {
  getLinkText: _getLinkText,
  getLinkUrl: _getLinkUrl
}

function _getLinkText (publicationType, publication, style) {
  if (style === 'apa') {
    return apaStyle.getLinkText(publicationType, publication)
  } else {
    return ieeeStyle.getLinkText(publicationType, publication)
  }
}

function _getLinkUrl (publicationType, publication) {
  return ('http://kth.diva-portal.org/smash/record.jsf?dswid=3396&pid=' + publication.publicationId)
}
