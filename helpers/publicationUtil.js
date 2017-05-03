'use strict'

const log = require('kth-node-log')


/**
 * Utility functions for publications and lists of publications.
 */

module.exports = {
  filterList: _filterList
}
// Filter the publication list
function _filterList (publicationList, includeHidden) {
  var filteredList = {}
  filteredList.refereedArticles = []
  filteredList.refereedConferencePapers = []
  filteredList.refereedBooks = []
  filteredList.refereedChapters = []
  filteredList.refereedOthers = []
  filteredList.temporaryList = [] // temporary list
  filteredList.scienceArticles = []
  filteredList.scienceConferencePapers = []
  filteredList.scienceBooks = []
  filteredList.scienceChapters = []
  filteredList.scienceThesis = []
  filteredList.scienceReports = []
  filteredList.scienceCollections = []
  filteredList.scienceConferenceProceedings = []
  filteredList.scienceOthers = []
  filteredList.patents = []
  filteredList.pendingPatents = []
  filteredList.otherArticles = []
  filteredList.otherConferencePapers = []
  filteredList.otherBooks = []
  filteredList.otherChapters = []
  filteredList.otherConferenceProceedings = []
  filteredList.otherReports = []
  filteredList.otherCollections = []
  filteredList.otherOthers = []

  if (!publicationList) {
    log.debug('Empty list' + JSON.stringify(publicationList))
    return filteredList
  }

  var publications = publicationList.publications
  for (var index = 0; index < publications.length; index++) {
    var publication = publications[ index ]

    publication.visible = publicationList.hiddenPublications.indexOf(publication.publicationId) === -1

    // Skip hidden publications if not explicitly requested
    if (!(includeHidden === true || publication.visible)) {
      continue
    }

    if (isRefereedArticle(publication)) {
      filteredList.refereedArticles.push(publication)
    } else if (isRefereedConferencePaper(publication)) {
      filteredList.refereedConferencePapers.push(publication)
    } else if (isRefereedChapter(publication)) {
      filteredList.refereedChapters.push(publication)
    } else if (isRefereedBook(publication)) {
      filteredList.refereedBooks.push(publication)
    } else if (isRefereedOthers(publication)) {
      filteredList.refereedOthers.push(publication)
    } else if (isScienceArticle(publication)) {
      filteredList.scienceArticles.push(publication)
    } else if (isScienceConferencePaper(publication)) {
      filteredList.scienceConferencePapers.push(publication)
    } else if (isScienceChapter(publication)) {
      filteredList.scienceChapters.push(publication)
    } else if (isScienceBook(publication)) {
      filteredList.scienceBooks.push(publication)
    } else if (isScienceOthers(publication)) {
      filteredList.scienceOthers.push(publication)
    } else if (isScienceThesis(publication)) {
      filteredList.scienceThesis.push(publication)
    } else if (isScienceReport(publication)) {
      filteredList.scienceReports.push(publication)
    } else if (isScienceConferenceProceeding(publication)) {
      filteredList.scienceConferenceProceedings.push(publication)
    } else if (isScienceCollection(publication)) {
      filteredList.scienceCollections.push(publication)
    } else if (isPatent(publication)) {
      filteredList.patents.push(publication)
    } else if (isPendingPatent(publication)) {
      filteredList.pendingPatents.push(publication)
    // All publications marked as other is placed in science articles list.
    } else if (isOtherArticle(publication)) {
      filteredList.scienceArticles.push(publication)
    } else if (isOtherConferencePaper(publication)) {
      filteredList.scienceConferencePapers.push(publication)
    } else if (isOtherBook(publication)) {
      filteredList.scienceBooks.push(publication)
    } else if (isOtherChapter(publication)) {
      filteredList.scienceChapters.push(publication)
    } else if (isOtherConferenceProceeding(publication)) {
      filteredList.scienceConferenceProceedings.push(publication)
    } else if (isOtherReport(publication)) {
      filteredList.scienceReports.push(publication)
    } else if (isOtherCollection(publication)) {
      filteredList.scienceCollections.push(publication)
    } else if (isOtherOther(publication)) {
      filteredList.scienceOthers.push(publication)
    } else {
      log.debug('Publication is not added to any list: ' + publication.title +
        ' publicationTypeCode=' + publication.publicationTypeCode +
        ' publicationSubTypeCode=' + publication.publicationSubTypeCode +
        ' contentTypeCode=' + publication.contentTypeCode +
        ' publicationStatus=' + publication.publicationStatus)
    }
  }
  sortFilteredList(filteredList)
  return filteredList
}

/* * * * * * * * * * * * * Refereed * * * * * * * * * * * * * */

function isRefereedArticle (publication) {
  return isArticle(publication) && publication.publicationSubTypeCode !== 'newsItem' && isPublished(publication) && isPubContentRefereed(publication)
}

function isRefereedConferencePaper (publication) {
  return publication.publicationTypeCode === 'conferencePaper' && isPubContentRefereed(publication)
}

function isRefereedBook (publication) {
  return publication.publicationTypeCode === 'book' && isPubContentRefereed(publication)
}

function isRefereedChapter (publication) {
  return publication.publicationTypeCode === 'chapter' && isPubContentRefereed(publication)
}

function isRefereedOthers (publication) {
  return publication.publicationTypeCode === 'other' && isPubContentRefereed(publication)
}

/* * * * * * * * * * * * * Non refereed * * * * * * * * * * * * * */

function isScienceArticle (publication) {
  return isPubContentScience(publication) && isArticle(publication) && publication.publicationSubTypeCode !== 'newsItem' && isPublished(publication)
}

function isScienceConferencePaper (publication) {
  return publication.publicationTypeCode === 'conferencePaper' && isPubContentScience(publication)
}

function isScienceOthers (publication) {
  return publication.publicationTypeCode === 'other' && isPubContentScience(publication)
}

function isScienceBook (publication) {
  return isPubContentScience(publication) && publication.publicationTypeCode === 'book'
}

function isScienceChapter (publication) {
  return isPubContentScience(publication) && publication.publicationTypeCode === 'chapter'
}

function isScienceThesis (publication) {
  return isPubContentScience(publication) && isThesis(publication)
}

function isScienceReport (publication) {
  return (isPubContentScience(publication) || isPubContentRefereed(publication)) && publication.publicationTypeCode === 'report'
}

function isScienceConferenceProceeding (publication) {
  return (isPubContentScience(publication) || isPubContentRefereed(publication)) && publication.publicationTypeCode === 'conferenceProceedings'
}

function isScienceCollection (publication) {
  return (isPubContentScience(publication) || isPubContentRefereed(publication)) && publication.publicationTypeCode === 'collection'
}

/* * * * * * * * * * * * * Patent * * * * * * * * * * * * * */

function isPatent (publication) {
  return isPubContentOther(publication) && publication.publicationTypeCode === 'patent' && pubHasDateIssued(publication)
}

function isPendingPatent (publication) {
  return isPubContentOther(publication) && publication.publicationTypeCode === 'patent' && !pubHasDateIssued(publication)
}

/*
  * Check if the article is of type other and also includes
  * refereed- and science articles if they are of sub type newsItem.
  */
function isOtherArticle (publication) {
  log.debug(' publicationTypeCode=' + publication.publicationTypeCode +
    ' publicationSubTypeCode=' + publication.publicationSubTypeCode +
    ' contentTypeCode=' + publication.contentTypeCode +
    ' publicationStatus=' + publication.publicationStatus)

  var isArticleOfTypeOther = (isPubContentOther(publication) && isArticle(publication))
  var isNewsItem = (isPubContentScience(publication) || isPubContentRefereed(publication)) && publication.publicationSubTypeCode === 'newsItem'
  return (isArticleOfTypeOther || isNewsItem) && isPublished(publication)
}

function isOtherConferencePaper (publication) {
  return publication.publicationTypeCode === 'conferencePaper' && isPubContentOther(publication)
}

function isOtherBook (publication) {
  return publication.publicationTypeCode === 'book' && isPubContentOther(publication)
}

function isOtherChapter (publication) {
  return publication.publicationTypeCode === 'chapter' && isPubContentOther(publication)
}

function isOtherConferenceProceeding (publication) {
  return publication.publicationTypeCode === 'conferenceProceedings' && isPubContentOther(publication)
}

function isOtherReport (publication) {
  return publication.publicationTypeCode === 'report' && isPubContentOther(publication)
}

function isOtherCollection (publication) {
  return publication.publicationTypeCode === 'collection' && isPubContentOther(publication)
}

function isOtherOther (publication) {
  return publication.publicationTypeCode === 'other' && isPubContentOther(publication)
}

// Check if the publication is counted as an article.
function isArticle (publication) {
  return (publication.publicationTypeCode === 'article' || publication.publicationTypeCode === 'review' || publication.publicationTypeCode === 'bookReview')
}

// Check if the publication is published.
function isPublished (publication) {
  return (publication.publicationStatus !== 'Submitted' && publication.publicationStatus !== 'Accepted' && publication.publicationStatus !== 'In press')
}

// Check if the publication is a thesis.
function isThesis (publication) {
  return (publication.publicationTypeCode === 'comprehensiveDoctoralThesis' ||
  publication.publicationTypeCode === 'monographDoctoralThesis' ||
  publication.publicationTypeCode === 'monographLicentiateThesis' ||
  publication.publicationTypeCode === 'comprehensiveLicentiateThesis')
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

function sortFilteredList (filteredList) {
  for (let listName in filteredList) {
    if (filteredList.hasOwnProperty(listName) && Array.isArray(filteredList[ listName ])) {
      var list = filteredList[ listName ]
      list.sort(sortPublicationsByDateTitle)
    }
  }
}

function sortPublicationsByDateTitle (item1, item2) {
  if (item1.dateIssued > item2.dateIssued) {
    return -1
  } else if (item1.dateIssued < item2.dateIssued) {
    return 1
  } else {
    if (item1.title > item2.title) {
      return 1
    } else {
      return -1
    }
  }
}
