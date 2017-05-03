const translator = require('./translate')
const { makeItalic } = require('./styleFormatters')

const {
  _getBookReference,
  _getCollectionReference,
  _getConferenceProceedingsReference,
  _getPatentReference,
  _getReportReference,
  _getChapterReference,
  _getConferencePaperReference,
  _getOtherReference,
  _getThesisReference
} = require('./referenceFormatters')

module.exports = {
  getDescription: _getDescription
}

function _getHost (publication) {
  if (
    publication.publicationTypeCode === 'article' ||
    publication.publicationTypeCode === 'review' ||
    publication.publicationTypeCode === 'bookReview'
  ) {
    // Host title
    if (publication.hostTitle) {
      if (publication.hostSubTitle) {
        if (
          publication.hostVolume ||
          publication.hostIssue ||
          publication.hostExtentStart ||
          publication.dateIssued
        ) {
          return makeItalic(
            publication.hostTitle + ' : ' + publication.hostSubTitle + ', '
          )
        } else {
          return makeItalic(
            publication.hostTitle + ' : ' + publication.hostSubTitle
          )
        }
      } else {
        if (
          publication.hostVolume ||
          publication.hostIssue ||
          publication.hostExtentStart ||
          publication.dateIssued
        ) {
          return makeItalic(publication.hostTitle + ', ')
        } else {
          return makeItalic(publication.hostTitle)
        }
      }
    }
  } else {
    return ''
  }
}

function _getHostVolume (publication, lang) {
  // Host volume
  if (publication.hostVolume) {
    if (
      publication.hostIssue ||
      publication.hostExtentStart ||
      publication.dateIssued
    ) {
      return translator.message('host_volume', lang) + publication.hostVolume + ', '
    } else {
      return translator.message('host_volume', lang) + publication.hostVolume
    }
  } else {
    return ''
  }
}

function _getHostIssue (publication, lang) {
  // Host Issue
  if (publication.hostIssue) {
    if (publication.hostExtentStart || publication.dateIssued) {
      return translator.message('host_issue', lang) + publication.hostIssue + ', '
    } else {
      return translator.message('host_issue', lang) + publication.hostIssue
    }
  } else {
    return ''
  }
}

function _getHostExtent (publication, lang) {
  // --Host pages/extent--
  if (publication.hostExtentStart) {
    if (publication.hostExtentEnd) {
      if (publication.dateIssued) {
        return (
          translator.message('host_pages', lang) +
          publication.hostExtentStart +
          '-' +
          publication.hostExtentEnd +
          ', '
        )
      } else {
        return (
          translator.message('host_pages', lang) +
          publication.hostExtentStart +
          '-' +
          publication.hostExtentEnd
        )
      }
    } else {
      if (publication.dateIssued) {
        return (
          translator.message('host_page', lang) + publication.hostExtentStart + ', '
        )
      } else {
        return translator.message('host_page', lang) + publication.hostExtentStart
      }
    }
  } else {
    return ''
  }
}

function _getDescription (publicationType, publication, lang) {
  // console.log('publication!: ' + JSON.stringify(publication))
  var publicationDescription =
    _getHost(publication) +
    _getHostVolume(publication, lang) +
    _getHostIssue(publication, lang) +
    _getHostExtent(publication, lang)

  // Date issued
  if (publication.dateIssued) {
    publicationDescription = publicationDescription.concat(
      publication.dateIssued
    )
  }

  switch (publication.publicationTypeCode) {
    case 'book':
      publicationDescription = publicationDescription.concat(
        _getBookReference(publication, lang)
      )
      break
    case 'chapter':
      publicationDescription = publicationDescription.concat(
        _getChapterReference(publication, lang)
      )
      break
    case 'collection':
      publicationDescription = publicationDescription.concat(
        _getCollectionReference(publication, lang)
      )
      break
    case 'conferencePaper':
      publicationDescription = publicationDescription.concat(
        _getConferencePaperReference(publication, lang)
      )
      break
    case 'conferenceProceedings':
      publicationDescription = publicationDescription.concat(
        _getConferenceProceedingsReference(publication, lang)
      )
      break
    case 'other':
      publicationDescription = publicationDescription.concat(
        _getOtherReference(publication, lang)
      )
      break
    case 'patent':
      publicationDescription = publicationDescription.concat(
        _getPatentReference(publication, lang)
      )
      break

    case 'report':
      publicationDescription = publicationDescription.concat(
        _getReportReference(publication, lang)
      )
      break
  }

  if (publicationType === 'scienceThesis') {
    publicationDescription = publicationDescription.concat(
      _getThesisReference(publication, lang)
    )
  }

  return publicationDescription
}
