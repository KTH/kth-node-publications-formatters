'use strict'

const translator = require('./translate')
const { makeItalic } = require('./styleFormatters')
const apaStyle = require('./referenceFormattersAPA')
const ieeeStyle = require('./referenceFormattersIEEE')

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

function _getBookReference (publication, lang, style) {
  if (style === 'apa') {
    return apaStyle.getBookReference(publication, lang)
  }

  return ieeeStyle.getBookReference(publication, lang)
}

function _getChapterReference (publication, lang, style) {
  if (style === 'apa') {
    return apaStyle.getChapterReference(publication, lang)
  }

  return ieeeStyle.getChapterReference(publication, lang)
}

function _getCollectionReference (publication, lang, style) {
  if (style === 'apa') {
    return apaStyle.getCollectionReference(publication, lang)
  }

  return ieeeStyle.getCollectionReference(publication, lang)
}

function _getConferencePaperReference (publication, lang, style) {
  if (style === 'apa') {
    return apaStyle.getConferencePaperReference(publication, lang)
  }

  return ieeeStyle.getConferencePaperReference(publication, lang)
}

function _getConferenceProceedingsReference (publication, lang, style) {
  if (style === 'apa') {
    return apaStyle.getConferenceProceedingsReference(publication, lang)
  }

  return ieeeStyle.getConferenceProceedingsReference(publication, lang)
}

function _getOtherReference (publication, style) {
  if (style === 'apa') {
    return apaStyle.getOtherReference(publication)
  }

  return ieeeStyle.getOtherReference(publication)
}

function _getPatentReference (publication, style) {
  if (style === 'apa') {
    return apaStyle.getPatentReference(publication)
  }

  return ieeeStyle.getPatentReference(publication)
}

function _getReportReference (publication, style) {
  if (style === 'apa') {
    return apaStyle.getReportReference(publication)
  }

  return ieeeStyle.getReportReference(publication)
}

function _getThesisReference (publication, lang, style) {
  if (style === 'apa') {
    return apaStyle.getThesisReference(publication, lang)
  }

  return ieeeStyle.getThesisReference(publication, lang)
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
