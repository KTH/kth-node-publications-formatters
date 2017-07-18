'use strict'

const translator = require('./translate')
const util = require('./AuthorHelperUtil')
const filters = require('./filters')

module.exports = {
  getAuthors: _getAPAAuthors
}

function _getAPAAuthors (publicationType, publication, lang) {
  let authors = publication.authors
  let authorRole = 'aut'
  if (publicationType === 'collection' || publicationType === 'conferenceProceedings' || publicationType === 'scienceCollections' || publicationType === 'otherCollections' || publicationType === 'scienceConferenceProceedings' || publicationType === 'otherConferenceProceedings') {
    authorRole = 'edt'
  }
  if (authors === null) return ''

  let authorNames = authors.filter((author) => {
    let include = (author.role !== null && author.role.toLowerCase() === authorRole)
    return include
  })
  .map((author) => {
    const name = formatAuthorName(author)
    return name
  })
  let formattedAuthorNames = formatAuthors(publication, authorNames, lang)
  var formattedDate = publication.dateIssued

  return formattedAuthorNames.concat(' ').concat('(' + formattedDate + '). ')
}

function formatAuthors (publication, authorNames, lang) {
  // article
  if (filters.isRefereedArticle(publication) ||
    filters.isScienceArticle(publication) ||
    filters.isArticle(publication) ||
    filters.isOtherArticle(publication)) {
    return formatArticleAuthors(authorNames)
  }

  // book
  if (filters.isRefereedBook(publication) ||
    filters.isScienceBook(publication) ||
    filters.isOtherBook(publication)) {
    return formatBookAuthors(authorNames)
  }

  // chapter
  if (filters.isRefereedChapter(publication) ||
    filters.isScienceChapter(publication) ||
    filters.isOtherChapter(publication)) {
    return formatArticleAuthors(authorNames)
  }

  // conference paper
  if (filters.isRefereedConferencePaper(publication) ||
    filters.isScienceConferencePaper(publication) ||
    filters.isOtherConferencePaper(publication)) {
    return authorNames.join(', ')
  }

  // report
  if (filters.isScienceReport(publication) ||
    filters.isOtherReport(publication)) {
    return formatArticleAuthors(authorNames)
  }

  // proceedings
  if (filters.isScienceConferenceProceeding(publication, lang) ||
    filters.isOtherConferenceProceeding(publication)) {
    return formatCollectionAuthors(authorNames, lang)
  }

  // thesis
  if (filters.isScienceThesis(publication)) {
    return formatArticleAuthors(authorNames)
  }

  // patent
  if (filters.isPatent(publication) ||
    filters.isPendingPatent(publication)) {
    return formatArticleAuthors(authorNames)
  }

  // collection
  if (filters.isScienceCollection(publication) ||
    filters.isOtherCollection(publication)) {
    return formatCollectionAuthors(authorNames, lang)
  }

  // others = articles, for now
  if (filters.isRefereedOthers(publication) ||
    filters.isScienceOthers(publication) ||
    filters.isOtherOther(publication)) {
    return formatArticleAuthors(authorNames)
  }

  return authorNames.join(', ')
}

function formatArticleAuthors (authorNames) {
  return authorNames.reduce((names, authorName, idx, arr) => {
    if (idx === 0) {
      return authorName
    }
    if (arr.length > 7 && idx >= 6 && idx + 1 < arr.length) {
      return names
    } else if (idx + 1 === arr.length && arr.length > 7) {
      return names + ' ... ' + authorName
    } else if (idx + 1 === arr.length) {
      return names + ' & ' + authorName
    } else {
      return names + ', ' + authorName
    }
  }, '')
}

function formatBookAuthors (authorNames) {
  return authorNames.reduce((names, authorName, idx, arr) => {
    if (idx === 0) {
      return authorName
    }
    if (idx + 1 === arr.length) {
      return names + ' & ' + authorName
    } else {
      return names + ', ' + authorName
    }
  }, '')
}

function formatCollectionAuthors (authorNames, lang) {
  let editorLabel = authorNames.length > 1 ? translator.message('editors_apa', lang) : translator.message('editor_apa', lang)
  return authorNames.join(', ').concat(' ' + editorLabel + '.')
}

function formatAuthorName (author) {
  /*
    if (names.length != 2) {
    // No first- or lastname, just one name
    returnNames.push(authors[index]); */
  // } else {
  if (author.givenName.indexOf(' ') !== -1) {
    // Space separated name, eg Anna Lisa
    return author.familyName + ', ' + util.splitAndFixNameParts(author.givenName, ' ')
  } else if (author.givenName.indexOf('-') !== -1) {
    // Line separated name, eg Anna-Lisa
    return author.familyName + ', ' + util.splitAndFixNameParts(author.givenName, '-')
  } else {
    // Standard single name, eg Anna
    let formattedName = util.shortenAndPunctuate(author.givenName)
    if (formattedName.length === 1) {
      formattedName += '.' // all given names should be initials and ended with a period
    }
    return author.familyName + ', ' + formattedName
  }
}
