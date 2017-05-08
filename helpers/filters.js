const log = require('kth-node-log')
module.exports = {
  isRefereedArticle,
  isRefereedBook,
  isRefereedChapter,
  isRefereedConferencePaper,
  isRefereedOthers,
  isScienceArticle,
  isScienceBook,
  isScienceChapter,
  isScienceCollection,
  isScienceConferencePaper,
  isScienceConferenceProceeding,
  isScienceOthers,
  isScienceReport,
  isScienceThesis,
  isPatent,
  isPendingPatent,
  isArticle,
  isOtherArticle,
  isOtherBook,
  isOtherChapter,
  isOtherCollection,
  isOtherConferencePaper,
  isOtherConferenceProceeding,
  isOtherReport,
  isOtherOther
}

/* * * * * * * * * * * * * Refereed * * * * * * * * * * * * * */

function isRefereedArticle (publication) {
  return (
    isArticle(publication) &&
    publication.publicationSubTypeCode !== 'newsItem' &&
    isPublished(publication) &&
    isPubContentRefereed(publication)
  )
}

function isRefereedConferencePaper (publication) {
  return (
    publication.publicationTypeCode === 'conferencePaper' &&
    isPubContentRefereed(publication)
  )
}

function isRefereedBook (publication) {
  return (
    publication.publicationTypeCode === 'book' &&
    isPubContentRefereed(publication)
  )
}

function isRefereedChapter (publication) {
  return (
    publication.publicationTypeCode === 'chapter' &&
    isPubContentRefereed(publication)
  )
}

function isRefereedOthers (publication) {
  return (
    publication.publicationTypeCode === 'other' &&
    isPubContentRefereed(publication)
  )
}

/* * * * * * * * * * * * * Non refereed * * * * * * * * * * * * * */

function isScienceArticle (publication) {
  return (
    isPubContentScience(publication) &&
    isArticle(publication) &&
    publication.publicationSubTypeCode !== 'newsItem' &&
    isPublished(publication)
  )
}

function isScienceConferencePaper (publication) {
  return (
    publication.publicationTypeCode === 'conferencePaper' &&
    isPubContentScience(publication)
  )
}

function isScienceOthers (publication) {
  return (
    publication.publicationTypeCode === 'other' &&
    isPubContentScience(publication)
  )
}

function isScienceBook (publication) {
  return (
    isPubContentScience(publication) &&
    publication.publicationTypeCode === 'book'
  )
}

function isScienceChapter (publication) {
  return (
    isPubContentScience(publication) &&
    publication.publicationTypeCode === 'chapter'
  )
}

function isScienceThesis (publication) {
  return isPubContentScience(publication) && isThesis(publication)
}

function isScienceReport (publication) {
  return (
    (isPubContentScience(publication) || isPubContentRefereed(publication)) &&
    publication.publicationTypeCode === 'report'
  )
}

function isScienceConferenceProceeding (publication) {
  return (
    (isPubContentScience(publication) || isPubContentRefereed(publication)) &&
    publication.publicationTypeCode === 'conferenceProceedings'
  )
}

function isScienceCollection (publication) {
  return (
    (isPubContentScience(publication) || isPubContentRefereed(publication)) &&
    publication.publicationTypeCode === 'collection'
  )
}

/* * * * * * * * * * * * * Patent * * * * * * * * * * * * * */

function isPatent (publication) {
  return (
    isPubContentOther(publication) &&
    publication.publicationTypeCode === 'patent' &&
    pubHasDateIssued(publication)
  )
}

function isPendingPatent (publication) {
  return (
    isPubContentOther(publication) &&
    publication.publicationTypeCode === 'patent' &&
    !pubHasDateIssued(publication)
  )
}

/*
  * Check if the article is of type other and also includes
  * refereed- and science articles if they are of sub type newsItem.
  */
function isOtherArticle (publication) {
  log.debug(
    ' publicationTypeCode=' +
      publication.publicationTypeCode +
      ' publicationSubTypeCode=' +
      publication.publicationSubTypeCode +
      ' contentTypeCode=' +
      publication.contentTypeCode +
      ' publicationStatus=' +
      publication.publicationStatus
  )

  var isArticleOfTypeOther =
    isPubContentOther(publication) && isArticle(publication)
  var isNewsItem =
    (isPubContentScience(publication) || isPubContentRefereed(publication)) &&
    publication.publicationSubTypeCode === 'newsItem'
  return (isArticleOfTypeOther || isNewsItem) && isPublished(publication)
}

function isOtherConferencePaper (publication) {
  return (
    publication.publicationTypeCode === 'conferencePaper' &&
    isPubContentOther(publication)
  )
}

function isOtherBook (publication) {
  return (
    publication.publicationTypeCode === 'book' && isPubContentOther(publication)
  )
}

function isOtherChapter (publication) {
  return (
    publication.publicationTypeCode === 'chapter' &&
    isPubContentOther(publication)
  )
}

function isOtherConferenceProceeding (publication) {
  return (
    publication.publicationTypeCode === 'conferenceProceedings' &&
    isPubContentOther(publication)
  )
}

function isOtherReport (publication) {
  return (
    publication.publicationTypeCode === 'report' &&
    isPubContentOther(publication)
  )
}

function isOtherCollection (publication) {
  return (
    publication.publicationTypeCode === 'collection' &&
    isPubContentOther(publication)
  )
}

function isOtherOther (publication) {
  return (
    publication.publicationTypeCode === 'other' &&
    isPubContentOther(publication)
  )
}

// Check if the publication is counted as an article.
function isArticle (publication) {
  return (
    publication.publicationTypeCode === 'article' ||
    publication.publicationTypeCode === 'review' ||
    publication.publicationTypeCode === 'bookReview'
  )
}

// Check if the publication is published.
function isPublished (publication) {
  return (
    publication.publicationStatus !== 'Submitted' &&
    publication.publicationStatus !== 'Accepted' &&
    publication.publicationStatus !== 'In press'
  )
}

// Check if the publication is a thesis.
function isThesis (publication) {
  return (
    publication.publicationTypeCode === 'comprehensiveDoctoralThesis' ||
    publication.publicationTypeCode === 'monographDoctoralThesis' ||
    publication.publicationTypeCode === 'monographLicentiateThesis' ||
    publication.publicationTypeCode === 'comprehensiveLicentiateThesis'
  )
}

// Function checks if publication is refereed
function isPubContentRefereed (publication) {
  return publication.contentTypeCode.toLowerCase() === 'refereed'
}

// Function checks if publication is type science
function isPubContentScience (publication) {
  return publication.contentTypeCode.toLowerCase() === 'science'
}

// Function checks if publication is type other
function isPubContentOther (publication) {
  return publication.contentTypeCode.toLowerCase() === 'other'
}

// Function checks if publication has date issued
function pubHasDateIssued (publication) {
  return publication.dateIssued !== null
}
