'use strict'

const translator = require('./translate')
const { makeItalic } = require('./styleFormatters')

module.exports = {
  getConferencePaperReference: _getConferencePaperReference,
  getBookReference: _getBookReference,
  getChapterReference: _getChapterReference,
  getThesisReference: _getThesisReference,
  getReportReference: _getReportReference,
  getConferenceProceedingsReference: _getConferenceProceedingsReference,
  getCollectionReference: _getCollectionReference,
  getPatentReference: _getPatentReference,
  getOtherReference: _getOtherReference
}

function _getBookReference (publication, lang) {
  // Book edition
  var tmp = ''
  tmp = _getEdition(publication, tmp, lang)

  // City of publisher
  if (publication.bookPlace) {
    tmp = tmp.concat(publication.bookPlace + ' : ')
  }

  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

function _getChapterReference (publication, lang) {
  var tmp = ''
  // Book title
  if (publication.hostTitle) {
    if (publication.hostSubTitle) {
      if (publication.statementOfResponsibility || publication.bookEdition || publication.bookPlace || publication.bookPublisher) {
        tmp = tmp.concat(translator.message('chapter_in', lang) + makeItalic(publication.hostTitle + ' : ' + publication.hostSubTitle + ', ')
        )
      } else {
        tmp = tmp.concat(translator.message('chapter_in', lang) + makeItalic(publication.hostTitle + ' : ' + publication.hostSubTitle))
      }
    } else {
      if (publication.statementOfResponsibility || publication.bookEdition || publication.bookPlace || publication.bookPublisher) {
        tmp = tmp.concat(translator.message('chapter_in', lang) + makeItalic(publication.hostTitle + ', '))
      } else {
        tmp = tmp.concat(translator.message('chapter_in', lang) + makeItalic(publication.hostTitle))
      }
    }
  }

  // Statement of responsibility
  if (publication.statementOfResponsibility) {
    tmp = tmp.concat(publication.statementOfResponsibility + translator.message('editor', lang))
    if (publication.bookEdition || publication.bookPlace || publication.bookPublisher) {
      tmp += ', '
    }
  }

  // Book edition
  tmp = _getEdition(publication, tmp, lang)

  // City of publisher
  tmp = _addBookPlace(publication, 'chapter', tmp)
  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  // Date issued
  tmp = _addDateIssued(publication, tmp)

  // Host pages/extent
  tmp = _addHostStartEnd(publication, lang, tmp)
  return tmp
}

function _getCollectionReference (publication, lang) {
  var tmp = ''

  // Book edition
  tmp = _getEdition(publication, tmp, lang)

  // City of publisher
  tmp = _addBookPlace(publication, 'collection', tmp)
  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  // Series title
  tmp = _addSeriesTitle(publication, tmp)
  // Series issue nr
  tmp = _addSeriesIssueNumber(publication, tmp)
  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

function _getConferencePaperReference (publication, lang) {
  var tmp = ''
  // Host/conference title
  if (publication.hostTitle) {
    if (publication.hostSubTitle) {
      tmp = tmp.concat(translator.message('conference_in', lang) + makeItalic(publication.hostTitle + ' : ' + publication.hostSubTitle))
    } else {
      tmp = tmp.concat(translator.message('conference_in', lang) + makeItalic(publication.hostTitle))
    }
  } else {
    if (publication.conferenceName) {
      tmp = tmp.concat(translator.message('conference_in', lang) + makeItalic(publication.conferenceName))
    }
  }

  // Date issued
  tmp = _addDateIssued(publication, tmp)

  // Host pages/extent
  tmp = _addHostStartEnd(publication, lang, tmp)
  return tmp
}

function _getConferenceProceedingsReference (publication) {
  var tmp = ''
  // City of publisher
  tmp = _addBookPlace(publication, 'conferenceProceedings', tmp)

  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  if (publication.seriesTitle || publication.seriesIssueNr || publication.dateIssued) {
    tmp = tmp + ', '
  }

  // Series title
  tmp = _addSeriesTitle(publication, tmp)

  // Series issue nr
  tmp = _addSeriesIssueNumber(publication, tmp)

  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

function _getOtherReference (publication) {
  var tmp = ''
  // Publisher
  if (publication.bookPublisher) {
    if (publication.bookPlace) {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    }
    tmp = tmp.concat(publication.bookPublisher)
  }
  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

function _getPatentReference (publication) {
  // Patent
  var tmp = ''
  if (publication.patent) {
    tmp = tmp.concat(publication.patent)
  }
  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

function _getReportReference (publication) {
  var tmp = ''
  // City of publisher
  if (publication.bookPlace) {
    if (!publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ', ')
    } else {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    }
  }

  // Publisher
  tmp = _addBookPublisher(publication, tmp)

  // Series title
  tmp = _addSeriesTitle(publication, tmp)

  // Series issue nr
  tmp = _addSeriesIssueNumber(publication, tmp)

  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

function _getThesisReference (publication, lang) {
  var tmp = ''
  // Thesis type
  var i18nThesisType = 'thesis_licentiate'
  if (publication.publicationTypeCode === 'comprehensiveDoctoralThesis' || publication.publicationTypeCode === 'monographDoctoralThesis') {
    i18nThesisType = 'thesis_doctoral'
  }

  tmp = tmp.concat(translator.message(i18nThesisType, lang))
  // City of publisher
  tmp = _addBookPlace(publication, 'thesis', tmp)

  // Publisher
  tmp = _addBookPublisher(publication, tmp)

  // Series title
  tmp = _addSeriesTitle(publication, tmp)

  // Series issue nr
  tmp = _addSeriesIssueNumber(publication, tmp)

  // Date issued
  tmp = _addDateIssued(publication, tmp)

  return tmp
}

/**
 *  UTILITY FUNCTIONS
 * The idea is to decide as much as possible about the formatting as late as possible to avoid a lot of branching.
 * Example: if we have a publisherPlace, we should append a comma and the publisherPlace to the formatted string,
 * not decide in publisher whether or not we should append the comma.
 * This doesn't always work, some things have either a colon or comma depending on some parameter.
*/

function _getEdition (publication, tmpString, lang) {
  if (!publication.bookEdition) {
    return tmpString
  }
  var text = publication.bookEdition
  var value = 0
  try {
    value = parseInt(text)
  } catch (e) {
    return tmpString
  }

  switch (value) {
    case 1:
      return tmpString.concat(value + translator.message('suffix_one', lang) + translator.message('edition', lang))
    case 2:
      return tmpString.concat(value + translator.message('suffix_two', lang) + translator.message('edition', lang))
    case 3:
      return tmpString.concat(value + translator.message('suffix_three', lang) + translator.message('edition', lang))
    default:
      return tmpString.concat(value + translator.message('suffix_default', lang) + translator.message('edition', lang))
  }
}

function _addDateIssued (publication, tmpString) {
  if (publication.dateIssued) {
    var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas
    return tmpString.concat(prepend + publication.dateIssued)
  }
  return tmpString
}

const _bookPlaceSuffix = {
  'book': ' : ',
  'chapter': ' : ',
  'thesis': ' : ',
  'collection': ', ',
  'conferenceProceedings': ', '
}

function _addBookPlace (publication, type, tmpString) {
  var addition = _bookPlaceSuffix[type]
  if (publication.bookPublisher) {
    return tmpString.concat(publication.bookPlace + addition)
  }
  var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas
  return tmpString.concat(prepend + publication.bookPlace)
}

function _addBookPublisher (publication, tmpString) {
  if (!publication.bookPublisher) {
    return tmpString
  }
  return tmpString.concat(publication.bookPublisher)
}

function _addSeriesIssueNumber (publication, tmpString) {
  if (!publication.seriesIssueNr) {
    return tmpString
  }
  var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas

  return tmpString.concat(prepend + publication.seriesIssueNr)
}

function _addSeriesTitle (publication, tmpString) {
  if (!publication.seriesTitle) {
    return tmpString
  }
  var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas

  return tmpString.concat(prepend + publication.seriesTitle)
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
