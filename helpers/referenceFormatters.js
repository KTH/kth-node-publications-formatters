const translator = require('./translate')
const { makeItalic } = require('./styleFormatters')

module.exports = {
  _getBookReference: _getBookReference,
  _getChapterReference: _getChapterReference,
  _getCollectionReference: _getCollectionReference,
  _getConferencePaperReference: _getConferencePaperReference,
  _getConferenceProceedingsReference: _getConferenceProceedingsReference,
  _getOtherReference: _getOtherReference,
  _getPatentReference: _getPatentReference,
  _getReportReference: _getReportReference,
  _getThesisReference: _getThesisReference
}

function _getBookReference (publication, lang, style) {
  // Book edition
  var tmp = ''
  tmp = tmp.concat(_getEdition(publication, lang))

  // City of publisher
  if (publication.bookPlace) {
    tmp = tmp.concat(publication.bookPlace + ' : ')
  }

  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  if (style === 'ieee') {
  // Date issued
    tmp = _addDateIssued(publication, tmp)
  }
  return tmp
}

function _getChapterReference (publication, lang, style) {
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
  tmp = tmp.concat(_getEdition(publication, lang) + translator.message('edition', lang))

  // City of publisher
  tmp = _addBookPlace(publication, 'chapter', tmp)
  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  // Date issued
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }

  // Host pages/extent
  tmp = _addHostStartEnd(publication, lang, tmp, style)
  return tmp
}

function _getCollectionReference (publication, lang, style) {
  var tmp = ''

  // Book edition
  if (publication.bookEdition) {
    if (publication.bookPlace) {
      tmp = tmp.concat(_getEdition(publication, lang) + translator.message('edition', lang) + ', ')
    } else {
      tmp = tmp.concat(_getEdition(publication, lang) + translator.message('edition', lang))
    }
  }
  // City of publisher
  tmp = _addBookPlace(publication, 'collection', tmp)
  // Publisher
  tmp = _addBookPublisher(publication, tmp)
  // Series title
  tmp = _addSeriesTitle(publication, tmp)
  // Series issue nr
  tmp = _addSeriesIssueNumber(publication, tmp)
  // Date issued
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }
  return tmp
}

function _getConferencePaperReference (publication, lang, style) {
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
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }

  // Host pages/extent
  tmp = _addHostStartEnd(publication, lang, tmp, style)
  return tmp
}

function _getConferenceProceedingsReference (publication, style) {
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
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }
  return tmp
}

function _getOtherReference (publication, style) {
  var tmp = ''
  // Publisher
  if (publication.bookPublisher) {
    if (publication.bookPlace) {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    }
    tmp = tmp.concat(publication.bookPublisher)
  }
  // Date issued
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }

  return tmp
}

function _getPatentReference (publication, style) {
  // Patent
  var tmp = ''
  if (publication.patent) {
    tmp = tmp.concat(publication.patent)
  }
  // Date issued
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }

  return tmp
}

function _getReportReference (publication, style) {
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
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
  }

  return tmp
}

function _getThesisReference (publication, lang, style) {
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
  if (style === 'ieee') {
    tmp = _addDateIssued(publication, tmp)
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
  if (!publication.bookEdition) {
    return ''
  }
  var text = publication.bookEdition
  var value = 0
  try {
    value = parseInt(text)
  } catch (e) {
    return text
  }
  switch (value) {
    case 1:
      return value + translator.message('suffix_one', lang)
    case 2:
      return value + translator.message('suffix_two', lang)
    case 3:
      return value + translator.message('suffix_three', lang)
    default:
      return value + translator.message('suffix_default', lang)
  }
}

function _addDateIssued (publication, tmpString) {
  if (publication.dateIssued) {
    var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas
    return tmpString.concat(prepend + publication.dateIssued)
  }
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

function _addHostStartEnd (publication, lang, tmpString, style) {
  if (!publication.hostExtentStart) {
    return tmpString
  }
  var prepend = tmpString.endsWith(', ') ? '' : ', ' // safety check to avoid double commas
  if (publication.hostExtentEnd) {
    return tmpString.concat(prepend + (style === 'ieee' ? translator.message('host_pages', lang) : '') + publication.hostExtentStart + '-' + publication.hostExtentEnd)
  } else {
    return tmpString.concat(prepend + (style === 'ieee' ? translator.message('host_page', lang) : '') + publication.hostExtentStart)
  }
}
