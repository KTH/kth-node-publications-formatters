'use strict'

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
