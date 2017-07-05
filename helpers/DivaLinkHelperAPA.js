const { makeItalic } = require('./styleFormatters')
const filters = require('./filters')
module.exports = {
  getLinkText: _getLinkText
}

function _getLinkText (publicationType, publication) {
  let title = ''
  if (publication.subTitle !== null && publication.subTitle !== '') {
    title = publication.title + ' : ' + publication.subTitle
  } else {
    title = publication.title
  }
  // always remove trailing period in title if Book or so
  // since they need edition or so before the period
  if (isBookOrSo(publication)) {
    if (title.length > 1 && title.endsWith('.')) {
      title = title.substring(0, title.length -2)
    }
  } else {
    if (!title.endsWith('.')) {
      title += '.'
    }
  }

  if (isBookOrSo(publication)) {
    return makeItalic(title)
  } else {
    return title
  }
}

function isBookOrSo (publication) {
  return (publication.publicationTypeCode === 'book' 
      || filters.isScienceThesis(publication)
      || filters.isScienceReport(publication)
      || filters.isOtherReport(publication)
      || filters.isScienceConferenceProceeding(publication)
      || filters.isOtherConferenceProceeding(publication)
      || filters.isScienceCollection(publication)
      || filters.isOtherCollection(publication))
}