'use strict'
module.exports = {
  splitAndFixNameParts: _splitAndFixNameParts,
  shortenAndPunctuate: _shortenAndPunctuate
}

const reservedNameParts = ['von', 'van', 'der', 'af']

function _shortenAndPunctuate (text) {
  if (text.length < 1) {
    return text.toUpperCase()
  }
  return text.substring(0, 1).toUpperCase()
}

function _splitAndFixNameParts (text, separator) {
  // console.log(text)
  let nameParts = text.split(separator)
  let firstNameBuilder = ''
  // console.log(firstNameBuilder)
  for (let index = 0; index < nameParts.length; index++) {
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
          _shortenAndPunctuate(nameParts[index])
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
  for (let index = 0; index < reservedNameParts.length; index++) {
    if (namePart.toLowerCase() === reservedNameParts[index]) {
      return true
    }
  }
  return false
}
