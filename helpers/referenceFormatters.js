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

function _getBookReference (publication, lang) {
  // Book edition
  var tmp = ''
  if (publication.bookEdition) {
    tmp = tmp.concat(getEdition(publication.bookEdition, lang))
  }
  // City of publisher
  if (publication.bookPlace) {
    tmp = tmp.concat(publication.bookPlace + ' : ')
  }
  // Publisher
  if (publication.bookPublisher) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher)
    }
  }
  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}

function _getChapterReference (publication, lang) {
  var tmp = ''
  // Book title
  if (publication.hostTitle) {
    if (publication.hostSubTitle) {
      if (
        publication.statementOfResponsibility ||
        publication.bookEdition ||
        publication.bookPlace ||
        publication.bookPublisher
      ) {
        tmp = tmp.concat(
          translator.message('chapter_in', lang) +
            makeItalic(
              publication.hostTitle + ' : ' + publication.hostSubTitle + ', '
            )
        )
      } else {
        tmp = tmp.concat(
          translator.message('chapter_in', lang) +
            makeItalic(publication.hostTitle + ' : ' + publication.hostSubTitle)
        )
      }
    } else {
      if (
        publication.statementOfResponsibility ||
        publication.bookEdition ||
        publication.bookPlace ||
        publication.bookPublisher
      ) {
        tmp = tmp.concat(
          translator.message('chapter_in', lang) +
            makeItalic(publication.hostTitle + ', ')
        )
      } else {
        tmp = tmp.concat(
          translator.message('chapter_in', lang) + makeItalic(publication.hostTitle)
        )
      }
    }
  }

  // Statement of responsibility
  if (publication.statementOfResponsibility) {
    tmp = tmp.concat(
      publication.statementOfResponsibility + translator.message('editor', lang)
    )
    if (
      publication.bookEdition ||
      publication.bookPlace ||
      publication.bookPublisher
    ) {
      tmp += ', '
    }
  }
  // Book edition
  if (publication.bookEdition) {
    tmp = tmp.concat(
      getEdition(publication.bookEdition, lang) + translator.message('edition', lang)
    )
  }
  // City of publisher
  if (publication.bookPlace) {
    if (publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    } else {
      tmp = tmp.concat(publication.bookPlace)
    }
  }
  // Publisher
  if (publication.bookPublisher) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher)
    }
  }
  // Date issued
  if (publication.dateIssued) {
    if (publication.hostExtentStart) {
      tmp = tmp.concat(publication.dateIssued + ', ')
    } else {
      tmp = tmp.concat(publication.dateIssued)
    }
  }

  // Host pages/extent
  if (publication.hostExtentStart) {
    if (publication.hostExtentEnd) {
      tmp = tmp.concat(
        translator.message('host_pages', lang) +
          publication.hostExtentStart +
          '-' +
          publication.hostExtentEnd
      )
    } else {
      tmp = tmp.concat(
        translator.message('host_page', lang) + publication.hostExtentStart
      )
    }
  }
  return tmp
}

function _getCollectionReference (publication, lang) {
  var tmp = ''
  // Book edition
  if (publication.bookEdition) {
    if (publication.bookPlace) {
      tmp = tmp.concat(
        getEdition(publication.bookEdition, lang) +
          translator.message('edition', lang) +
          ', '
      )
    } else {
      tmp = tmp.concat(
        getEdition(publication.bookEdition, lang) +
          translator.message('edition', lang)
      )
    }
  }
  // City of publisher
  if (publication.bookPlace) {
    if (publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ', ')
    } else {
      tmp = tmp.concat(publication.bookPlace)
    }
  }
  // Publisher
  if (publication.bookPublisher) {
    if (
      publication.seriesTitle ||
      publication.seriesIssueNr ||
      publication.dateIssued
    ) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher)
    }
  }
  // Series title
  if (publication.seriesTitle) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.seriesTitle + ', ')
    } else {
      tmp = tmp.concat(publication.seriesTitle)
    }
  }
  // Series issue nr
  if (publication.seriesIssueNr) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.seriesIssueNr + ', ')
    } else {
      tmp = tmp.concat(publication.seriesIssueNr)
    }
  }
  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}

function _getConferencePaperReference (publication, lang) {
  var tmp = ''
  // Host/conference title
  if (publication.hostTitle) {
    if (publication.hostSubTitle) {
      if (publication.dateIssued) {
        tmp = tmp.concat(
          translator.message('conference_in', lang) +
            makeItalic(
              publication.hostTitle + ' : ' + publication.hostSubTitle
            ) +
            ', '
        )
      } else {
        tmp = tmp.concat(
          translator.message('conference_in', lang) +
            makeItalic(publication.hostTitle + ' : ' + publication.hostSubTitle)
        )
      }
    } else {
      if (publication.dateIssued !== null && publication.dateIssued !== '') {
        tmp = tmp.concat(
          translator.message('conference_in', lang) +
            makeItalic(publication.hostTitle + ', ')
        )
      } else {
        tmp = tmp.concat(
          translator.message('conference_in', lang) +
            makeItalic(publication.hostTitle)
        )
      }
    }
  } else {
    if (publication.conferenceName) {
      if (publication.dateIssued) {
        tmp = tmp.concat(
          translator.message('conference_in', lang) +
            makeItalic(publication.conferenceName + ', ')
        )
      } else {
        tmp = tmp.concat(
          translator.message('conference_in', lang) +
            makeItalic(publication.conferenceName)
        )
      }
    }
  }

  // Date issued
  if (publication.dateIssued) {
    if (publication.hostExtentStart) {
      tmp = tmp.concat(publication.dateIssued + ', ')
    } else {
      tmp = tmp.concat(publication.dateIssued)
    }
  }

  // Host pages/extent
  if (publication.hostExtentStart) {
    if (publication.hostExtentEnd) {
      tmp = tmp.concat(
        translator.message('host_pages', lang) +
          publication.hostExtentStart +
          '-' +
          publication.hostExtentEnd
      )
    } else {
      tmp = tmp.concat(
        translator.message('host_page', lang) + publication.hostExtentStart
      )
    }
  }
  return tmp
}

function _getConferenceProceedingsReference (publication) {
  var tmp = ''
  // City of publisher
  if (publication.bookPlace) {
    if (publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ', ')
    } else {
      tmp = tmp.concat(publication.bookPlace)
    }
  }

  // Publisher
  if (publication.bookPublisher) {
    if (
      publication.seriesTitle ||
      publication.seriesIssueNr ||
      publication.dateIssued
    ) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher)
    }
  }

  // Series title
  if (publication.seriesTitle) {
    if (publication.seriesIssueNr) {
      tmp = tmp.concat(publication.seriesTitle + ', ')
    } else {
      tmp = tmp.concat(publication.seriesTitle)
    }
  }

  // Series issue nr
  if (publication.seriesIssueNr) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.seriesIssueNr + ', ')
    } else {
      tmp = tmp.concat(publication.seriesIssueNr)
    }
  }

  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}

function _getOtherReference (publication) {
  var tmp = ''
  // Publisher
  if (publication.bookPublisher) {
    if (publication.bookPlace) {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    }
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher)
    }
  }
  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}
function _getPatentReference (publication) {
  // Patent
  var tmp = ''
  if (publication.patent) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.patent + ', ')
    } else {
      tmp = tmp.concat(publication.patent)
    }
  }
  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}

function _getReportReference (publication) {
  var tmp = ''
  // City of publisher
  if (publication.bookPlace) {
    if (!publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ', ')
    } else if (publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    } else {
      tmp = tmp.concat(publication.bookPlace)
    }
  }

  // Publisher
  if (publication.bookPublisher) {
    if (publication.seriesTitle || publication.seriesIssueNr) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher + ' ')
    }
  }

  // Series title
  if (publication.seriesTitle) {
    if (!publication.seriesIssuenr && publication.dateIssued) {
      tmp = tmp.concat(publication.seriesTitle + ', ')
    } else {
      tmp = tmp.concat(publication.seriesTitle)
    }
  }

  // Series issue nr
  if (publication.seriesIssueNr) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.seriesIssueNr + ', ')
    } else {
      tmp = tmp.concat(publication.seriesIssueNr)
    }
  }

  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}

function _getThesisReference (publication, lang) {
  var tmp = ''
  // Thesis type
  if (
    publication.publicationTypeCode === 'comprehensiveDoctoralThesis' ||
    publication.publicationTypeCode === 'monographDoctoralThesis'
  ) {
    if (publication.bookPlace) {
      tmp = tmp.concat(translator.message('thesis_doctoral', lang) + ', ')
    } else {
      tmp = tmp.concat(translator.message('thesis_doctoral', lang))
    }
  } else {
    if (publication.bookPlace) {
      tmp = tmp.concat(translator.message('thesis_licentiate', lang) + ', ')
    } else {
      tmp = tmp.concat(translator.message('thesis_licentiate', lang))
    }
  }

  // City of publisher
  if (publication.bookPlace) {
    if (publication.bookPublisher) {
      tmp = tmp.concat(publication.bookPlace + ' : ')
    } else {
      tmp = tmp.concat(publication.bookPlace)
    }
  }

  // Publisher
  if (publication.bookPublisher) {
    if (publication.seriesTitle) {
      tmp = tmp.concat(publication.bookPublisher + ', ')
    } else {
      tmp = tmp.concat(publication.bookPublisher + ' ')
    }
  }

  // Series title
  if (publication.seriesTitle) {
    tmp = tmp.concat(publication.seriesTitle)
  }

  // Series issue nr
  if (publication.seriesIssueNr) {
    if (publication.dateIssued) {
      tmp = tmp.concat(publication.seriesIssueNr + ', ')
    } else {
      tmp = tmp.concat(publication.seriesIssueNr)
    }
  }

  // Date issued
  if (publication.dateIssued) {
    tmp = tmp.concat(publication.dateIssued)
  }
  return tmp
}

function getEdition (text, lang) {
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
