const filters = require('./filters')
const translator = require('./translate')
const { makeItalic } = require('./styleFormatters')

const {
  getBookReference,
  getCollectionReference,
  getConferenceProceedingsReference,
  getPatentReference,
  getReportReference,
  getChapterReference,
  getConferencePaperReference,
  getOtherReference,
  getThesisReference
} = require('./referenceFormatters')

module.exports = {
  getDescription: _getDescription
}

function _getHost (publication) {
  if (publication.publicationTypeCode === 'article' || publication.publicationTypeCode === 'review' || publication.publicationTypeCode === 'bookReview') {
    // Host title
    if (publication.hostTitle) {
      if (publication.hostSubTitle) {
        return makeItalic(publication.hostTitle + ' : ' + publication.hostSubTitle)
      }
      return makeItalic(publication.hostTitle)
    }
  }
  return ''
}

function _getHostVolume (publication, lang, style) {
  // Host volume
  if (publication.hostVolume) {
    var tmp = ', '
    if (style === 'ieee') {
      return tmp + translator.message('host_volume', lang) + publication.hostVolume
    }
    return tmp + makeItalic(publication.hostVolume)
  }
  return ''
}

function _getHostIssue (publication, lang, style) {
  // Host Issue
  if (publication.hostIssue) {
    if (style === 'ieee') {
      return ', ' + translator.message('host_issue', lang) + publication.hostIssue
    }
    return '(' + publication.hostIssue + ')'
  }
  return ''
}

function _getHostExtent (publication, lang, style) {
  // --Host pages/extent--
  if (publication.hostExtentStart) {
    var tmp = ', ' + (style === 'ieee' ? translator.message('host_pages', lang) : '') + publication.hostExtentStart
    if (publication.hostExtentEnd) {
      return tmp + '-' + publication.hostExtentEnd
    }
    return tmp
  }

  return ''
}

function _getDescription (publicationType, publication, lang, style) {
  var publicationDescription = ''

  if (filters.isScienceThesis(publication)) {
    return publicationDescription.concat(getThesisReference(publication, lang, style))
  }

  switch (publication.publicationTypeCode) {
    case 'book':
      // publicationDescription = ''
      publicationDescription = publicationDescription.concat(getBookReference(publication, lang, style))
      break
    case 'chapter':
      // publicationDescription = ''
      publicationDescription = publicationDescription.concat(getChapterReference(publication, lang, style))
      break
    case 'collection':
      publicationDescription = publicationDescription.concat(getCollectionReference(publication, lang, style))
      break
    case 'conferencePaper':
      publicationDescription = publicationDescription.concat(getConferencePaperReference(publication, lang, style))
      break
    case 'conferenceProceedings':
      publicationDescription = publicationDescription.concat(getConferenceProceedingsReference(publication, lang, style))
      break
    case 'other':
      publicationDescription = publicationDescription.concat(getOtherReference(publication, style))
      break
    case 'patent':
      publicationDescription = publicationDescription.concat(getPatentReference(publication, style))
      break
    case 'report':
      // publicationDescription = ''
      publicationDescription = publicationDescription.concat(getReportReference(publication, style))
      break
    default:
      publicationDescription = _getHost(publication) +
        _getHostVolume(publication, lang, style) +
        _getHostIssue(publication, lang, style) +
        _getHostExtent(publication, lang, style)
      if (publication.dateIssued && style === 'ieee') {
        publicationDescription = publicationDescription.concat(', ' + publication.dateIssued)
      }
      break
  }

  return publicationDescription
}
