const translator = require('./translate')

var reservedNameParts = ['von', 'van', 'der', 'af']
module.exports = {
  getAuthors: _getAuthors,
  splitAndFixNameParts: _splitAndFixNameParts
}

function _getAPAAuthors (publicationType, publication) {
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
          author.familyName + ' ' + _splitAndFixNameParts(author.givenName, ' ')
        )
      } else if (author.givenName.indexOf('-') !== -1) {
        // Line separated name, eg Anna-Lisa
        returnNames.push(
          author.familyName + ' ' + _splitAndFixNameParts(author.givenName, '-')
        )
      } else {
        // Standard single name, eg Anna
        returnNames.push(
          author.familyName + '. ' + shortenAndPunctuate(author.givenName)
        )
      }
    }
  }
  var formattedDate = publication.dateIssued

  return returnNames.join(', ').concat(', ').concat('(' + formattedDate + '), ')
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
          _splitAndFixNameParts(author.givenName, ' ') + ' ' + author.familyName
        )
      } else if (author.givenName.indexOf('-') !== -1) {
        // Line separated name, eg Anna-Lisa
        returnNames.push(
          _splitAndFixNameParts(author.givenName, '-') + ' ' + author.familyName
        )
      } else {
        // Standard single name, eg Anna
        returnNames.push(
          shortenAndPunctuate(author.givenName) + '. ' + author.familyName
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

function _getAuthors (publicationType, publication, lang, style) {
  switch (style) {
    case 'ieee':
      return _getIEEEAuthors(publicationType, publication, lang)
    case 'apa':
      return _getAPAAuthors(publicationType, publication, lang)
    default:
      return _getIEEEAuthors(publicationType, publication, lang)
  }
}

function getEtAl (lang) {
  return makeItalic(translator.message('author_et_al', lang))
}

function makeItalic (text) {
  return '<i>' + text + '</i>'
}

function shortenAndPunctuate (text) {
  if (text.length < 1) {
    return text.toUpperCase()
  }
  return text.substring(0, 1).toUpperCase()
}

function _splitAndFixNameParts (text, separator) {
  // console.log(text)
  var nameParts = text.split(separator)
  var firstNameBuilder = ''
  // console.log(firstNameBuilder)
  for (var index = 0; index < nameParts.length; index++) {
    if (index !== 0) {
      // Space between first names
      firstNameBuilder = firstNameBuilder.concat(separator)
    }
    if (nameParts[index].indexOf('.') !== -1) {
      // Name part already has punctuation
      firstNameBuilder = firstNameBuilder.concat(nameParts[index])
      // console.log(nameParts[index])
    } else {
      // Name part shortened and punctuation added
      if (!namePartIsReserved(nameParts[index])) {
        firstNameBuilder = firstNameBuilder.concat(
          shortenAndPunctuate(nameParts[index])
        )
        firstNameBuilder = firstNameBuilder.concat('.')
      } else {
        firstNameBuilder = firstNameBuilder.concat(nameParts[index])
      }
    }
  }
  return firstNameBuilder.toString()
}

function namePartIsReserved (namePart) {
  for (var index = 0; index < reservedNameParts.length; index++) {
    if (namePart.toLowerCase() === reservedNameParts[index]) {
      return true
    }
  }
  return false
}
