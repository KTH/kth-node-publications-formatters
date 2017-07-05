'use strict'

const translator = require('./translate')
const { makeItalic } = require('./styleFormatters')

module.exports = {
  getBookReference: _getBookReference,
  getChapterReference: _getChapterReference,
  getCollectionReference: _getCollectionReference,
  getConferencePaperReference: _getConferencePaperReference,
  getConferenceProceedingsReference: _getConferenceProceedingsReference,
  getOtherReference: _getOtherReference,
  getPatentReference: _getPatentReference,
  getReportReference: _getReportReference,
  getThesisReference: _getThesisReference
}

function _getBookReference (publication, lang) {
  // Book edition
  var tmp = ''
  tmp = tmp.concat(_getEdition(publication, lang) + '. ')

  // City and publisher
  let placeAndPublisher = _getPlaceAndPublisher(publication)
  if (placeAndPublisher && tmp) {
    tmp += ' '
  }
  tmp += placeAndPublisher

  return tmp
}

function _getChapterReference (publication, lang) {
  var tmp = ' ' + translator.message('chapter_in_apa', lang) + ' '

  // editor
  let editor = publication.statementOfResponsibility
  if (editor) {
    tmp += editor + translator.message('editor', lang) + ', '
  }

  // title
  let bookTitle = publication.hostTitle
  if (publication.hostSubTitle) bookTitle += ': ' + publication.hostSubTitle
  if (bookTitle) tmp += makeItalic(bookTitle)

  // Book edition
  let edition = _getEdition(publication, lang)

  // pages, extent
  let pages = ''
  if (publication.hostExtentStart) {
    if (publication.hostExtentEnd) {
      pages = translator.message('host_pages', lang) + publication.hostExtentStart + '-' + publication.hostExtentEnd
    } else {
      pages = translator.message('host_page', lang) + publication.hostExtentStart
    }
  }

  if (edition || pages) {
    tmp += '('
    if (edition && pages) {
      tmp += edition + ' ' + pages
    } else if (edition) {
      tmp += edition
    } else {
      tmp += pages
    }
    tmp += '). '
  } else {
    tmp += '. '
  }

  // City and publisher
  tmp += _getPlaceAndPublisher(publication)

  return tmp
}

function _getCollectionReference (publication, lang) {
  // Book edition
  var tmp = ''
  tmp = tmp.concat(_getEdition(publication, lang) + '. ')

  // City and publisher
  let placeAndPublisher = _getPlaceAndPublisher(publication)
  if (placeAndPublisher && tmp) {
    tmp += ' '
  }
  tmp += placeAndPublisher

  return tmp
}

function _getConferencePaperReference (publication, lang) {
  var tmp = ''
  // Host/conference title
  // This is not according to PI suggestion
  // Since values for host title and conference most often contain "Proceedings of" Just list the title and hope for the best
  if (publication.hostTitle) {
    tmp = tmp.concat(translator.message('conference_in_apa', lang) + makeItalic(publication.hostTitle))
  } else {
    if (publication.conferenceName) {
      tmp = tmp.concat(translator.message('presented_at', lang))
      tmp = tmp.concat(makeItalic(publication.conferenceName))
    }
  }

  // Host pages/extent
  tmp = _addHostStartEnd(publication, lang, tmp)
  return tmp
}

function _getConferenceProceedingsReference (publication, lang) {
  return _getCollectionReference(publication, lang)
}

function _getOtherReference (publication) {
  var tmp = ''
  // City and publisher
  let placeAndPublisher = _getPlaceAndPublisher(publication)
  if (placeAndPublisher) {
    tmp += ' '
    tmp += placeAndPublisher
  }

  return tmp
}

function _getPatentReference (publication) {
  // Patent
  var tmp = ''
  if (publication.patent) {
    tmp = tmp.concat(' ' + publication.patent)
  }

  return tmp
}

function _getReportReference (publication) {
  var tmp = ''
  // Series info
  const seriesInfo = _getSeriesInfo(publication)
  if (seriesInfo) {
    tmp += ' ('
    tmp += seriesInfo
    tmp += '). '
  } else {
    tmp += '. '
  }

  // City and publisher
  tmp += _getPlaceAndPublisher(publication)

  return tmp
}

function _getThesisReference (publication, lang) {
  var tmp = ''
  // Thesis type
  var i18nThesisType = 'thesis_licentiate'
  if (publication.publicationTypeCode === 'comprehensiveDoctoralThesis' || publication.publicationTypeCode === 'monographDoctoralThesis') {
    i18nThesisType = 'thesis_doctoral'
  }
  const thesisType = translator.message(i18nThesisType, lang)

  // University and/or City of thesis
  const thesisOrigin = _getThesisOrigin(publication)
  // Series
  const thesisSeries = _getSeriesInfo(publication)
  tmp += '('
  tmp += thesisType
  tmp += (!thesisOrigin) ? '' : ', '
  tmp += thesisOrigin
  tmp += (!thesisSeries) ? '' : ', '
  tmp += thesisSeries
  tmp += ')'
  if (publication.identifierUri) {
    tmp += '. '
    tmp += translator.message('thesis_retrieved_from', lang)
    tmp += ' ' + publication.identifierUri
  }

  return tmp
}

/**
 *  UTILITY FUNCTIONS
 * The idea is to decide as much as possible about the formatting as late as possible to avoid a lot of branching.
 * Example: if we have a publisherPlace, we should append a comma and the publisherPlace to the formatted string,
 * not decide in publisher whether or not we should append the comma.
 * This doesn't always work, some things have either a colon or comma depending on some parameter.
*/

function _getEdition (publication, lang) {
  let result = ''
  if (!publication.bookEdition) {
    return ''
  }
  var text = publication.bookEdition
  var value = 0
  try {
    value = parseInt(text)
    switch (value) {
      case 1:
        result = ''
        break
      case 2:
        result = value + translator.message('suffix_two', lang)
        break
      case 3:
        result = value + translator.message('suffix_three', lang)
        break
      default:
        result = value + translator.message('suffix_default', lang)
    }
  } catch (e) {
    result = text
  }

  if (result) {
    return ' (' + result + ')'
  }
  return ''
}

function _getThesisOrigin (publication) {
  let university = ''
  if (publication.bookPublisher) {
    university = publication.bookPublisher
  }
  if (publication.bookPlace) {
    if (university) {
      return university + ', ' + publication.bookPlace
    }
    return publication.bookPlace
  }
  return university
}

function _getPlaceAndPublisher (publication) {
  let result = publication.bookPlace
  if (publication.bookPublisher) {
    if (result) {
      result += ': '
      result += publication.bookPublisher
    } else {
      result = publication.bookPublisher
    }
  }

  return result || ''
}

function _getSeriesInfo (publication) {
  let space = ''
  let thesisSeries = ''
  if (publication.seriesTitle) {
    thesisSeries += publication.seriesTitle
    space = ' '
  }
  if (publication.seriesIssueNr) {
    thesisSeries += (space + publication.seriesIssueNr)
  }
  return thesisSeries
}

function _addHostStartEnd (publication, lang, tmpString) {
  if (!publication.hostExtentStart) {
    return tmpString
  }
  var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas
  if (publication.hostExtentEnd) {
    return tmpString.concat(prepend + translator.message('host_pages', lang) + publication.hostExtentStart + '-' + publication.hostExtentEnd)
  } else {
    return tmpString.concat(prepend + translator.message('host_page', lang) + publication.hostExtentStart)
  }
}
