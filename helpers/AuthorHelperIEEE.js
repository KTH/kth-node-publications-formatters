const translator = require('./translate')
const styleFormatters = require('./styleFormatters')
const util = require('./AuthorHelperUtil')

module.exports = {
  getAuthors: _getIEEEAuthors
}

function _getIEEEAuthors (publicationType, publication, lang) {
  var authors = publication.authors
  var authorRole = 'aut'
  if (publicationType === 'scienceCollections' || publicationType === 'otherCollections' || publicationType === 'scienceConferenceProceedings' || publicationType === 'otherConferenceProceedings') {
    authorRole = 'edt'
  }
  if (authors === null) return ''
  var returnNames = []

  for (var index = 0; index < authors.length; index++) {
    var author = authors[index]
    if (author.role !== null && author.role.toLowerCase() === authorRole) {
      /*
        if (names.length != 2) {
        // No first- or lastname, just one name
        returnNames.push(authors[index]); */
      // } else {
      if (author.givenName.indexOf(' ') !== -1) {
        // Space separated name, eg Anna Lisa
        returnNames.push(
          util.splitAndFixNameParts(author.givenName, ' ') + ' ' + author.familyName
        )
      } else if (author.givenName.indexOf('-') !== -1) {
        // Line separated name, eg Anna-Lisa
        returnNames.push(
          util.splitAndFixNameParts(author.givenName, '-') + ' ' + author.familyName
        )
      } else {
        // Standard single name, eg Anna
        returnNames.push(
          util.shortenAndPunctuate(author.givenName) + '. ' + author.familyName
        )
      }
    }
  }

  var authorNames = ''
  if (returnNames.length === 1) {
    authorNames = returnNames[0] + ','
  } else if (returnNames.length === 2) {
    authorNames =
      returnNames[0] +
      ' ' +
      translator.message('author_and', lang) +
      ' ' +
      returnNames[1] +
      ', '
  } else if (returnNames.length === 3) {
    authorNames =
      returnNames[0] +
      ', ' +
      returnNames[1] +
      ' ' +
      translator.message('author_and', lang) +
      ' ' +
      returnNames[2] +
      ', '
  } else if (returnNames.length > 3) {
    authorNames = returnNames[0] + ' ' + getEtAl(lang) + ', '
  }

  if (authorRole === 'edt') {
    if (returnNames.length === 1) {
      authorNames += ' Ed.'
    } else if (returnNames.length > 1) {
      authorNames += ' Eds.'
    }
  }
  return authorNames
}

function getEtAl (lang) {
  return styleFormatters.makeItalic(translator.message('author_et_al', lang))
}
