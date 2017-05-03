module.exports = {
  getLinkText: _getLinkText,
  getLinkUrl: _getLinkUrl
}

function _getLinkText (publicationType, publication) {
  if (publication.publicationTypeCode === 'book') {
    if (publication.subTitle !== null && publication.subTitle !== '') {
      return (
        '<i>' + publication.title + ' : ' + publication.subTitle + '.' + '</i>'
      )
    } else {
      return '<i>' + publication.title + '.' + '</i>'
    }
  } else {
    if (publication.subTitle !== null && publication.subTitle !== '') {
      return '"' + publication.title + ' : ' + publication.subTitle + ',"'
    } else {
      return '"' + publication.title + ',"'
    }
  }
}

function _getLinkUrl (publicationType, publication) {
  return (
    'http://kth.diva-portal.org/smash/record.jsf?dswid=3396&pid=' +
    publication.publicationId
  )
}
