'use strict'

const AuthorHelper = require('./helpers/AuthorHelper')
const DescriptionHelper = require('./helpers/DescriptionHelper')
const DivaLinkHelper = require('./helpers/DivaLinkHelper')
const filters = require('./helpers/filters')
const log = require('kth-node-log')
const pubUtil = require('./helpers/publicationUtil')

module.exports = {
  render: _render,
  formatPublications: _formatPublications,
  filterList: pubUtil.filterList,
  groupPublications: _groupPublications
}

// This function is primarily used to get a formatted output for Cortina
function _render (publications) {
  return publications.reduce(function (str, item, index) {
    return (
      str +
      `
    <div class="row publicationRow">
      <div class="col-md-1 col-xs-2 publicationNr">
        <span class="pubNr">[${index + 1}]</span>
      </div>
      <div class="col-md-10 col-xs-8 publicationInfo">
        <span>${item.formattedAuthors}</span>
        <a href=${item.formattedLink}" target='_blank'><span>${item.formattedLinkText}</span></a>
        <span>${item.formattedDescription}</span>
      </div>
    </div>`
    )
  }, '')
}

function _formatPublications (data, style, lang) {
  var i = 1
  var pubs
  if (Array.isArray(data)) {
    pubs = data.map(item => {
      var obj = _formatSinglePublication(item, lang, style)
      obj.index = ++i
      return obj
    })
  } else {
    pubs = _formatSinglePublication(data, lang, style)
  }

  return pubs
}

function _formatSinglePublication (publ, lang, style) {
  publ.formattedAuthors = AuthorHelper.getAuthors(publ.publicationTypeCode, publ, lang, style)
  publ.formattedLink = DivaLinkHelper.getLinkUrl(publ.publicationTypeCode, publ)
  publ.formattedLinkText = DivaLinkHelper.getLinkText(publ.publicationTypeCode, publ, style)
  publ.formattedDescription = DescriptionHelper.getDescription(publ.publicationTypeCode, publ, lang, style)
  if (!publ.formattedDescription.endsWith('.')) {
    publ.formattedDescription = publ.formattedDescription + '.'
  }

  return publ
}

// This function repacks a list of publications into an object with several sublists of publications of the same type
function _groupPublications (publs) {
  var obj = {}
  obj.refereedArticles = []
  obj.refereedConferencePapers = []
  obj.refereedChapters = []
  obj.refereedBooks = []
  obj.refereedOthers = []
  obj.temporaryList = [] // temporary list
  obj.scienceArticles = []
  obj.scienceConferencePapers = []
  obj.scienceBooks = []
  obj.scienceChapters = []
  obj.scienceThesis = []
  obj.scienceReports = []
  obj.scienceCollections = []
  obj.scienceConferenceProceedings = []
  obj.scienceOthers = []
  obj.patents = []
  obj.pendingPatents = []
  obj.otherArticles = []
  obj.otherConferencePapers = []
  obj.otherBooks = []
  obj.otherChapters = []
  obj.otherConferenceProceedings = []
  obj.otherReports = []
  obj.otherCollections = []
  obj.otherOthers = []

  publs.map(publication => {
    if (filters.isRefereedArticle(publication)) {
      obj.refereedArticles.push(publication)
    } else if (filters.isRefereedConferencePaper(publication)) {
      obj.refereedConferencePapers.push(publication)
    } else if (filters.isRefereedChapter(publication)) {
      obj.refereedChapters.push(publication)
    } else if (filters.isRefereedBook(publication)) {
      obj.refereedBooks.push(publication)
    } else if (filters.isRefereedOthers(publication)) {
      obj.refereedOthers.push(publication)
    } else if (filters.isScienceArticle(publication)) {
      obj.scienceArticles.push(publication)
    } else if (filters.isScienceConferencePaper(publication)) {
      obj.scienceConferencePapers.push(publication)
    } else if (filters.isScienceChapter(publication)) {
      obj.scienceChapters.push(publication)
    } else if (filters.isScienceBook(publication)) {
      obj.scienceBooks.push(publication)
    } else if (filters.isScienceOthers(publication)) {
      obj.scienceOthers.push(publication)
    } else if (filters.isScienceThesis(publication)) {
      obj.scienceThesis.push(publication)
    } else if (filters.isScienceReport(publication)) {
      obj.scienceReports.push(publication)
    } else if (filters.isScienceConferenceProceeding(publication)) {
      obj.scienceConferenceProceedings.push(publication)
    } else if (filters.isScienceCollection(publication)) {
      obj.scienceCollections.push(publication)
    } else if (filters.isPatent(publication)) {
      obj.patents.push(publication)
    } else if (filters.isPendingPatent(publication)) {
      obj.pendingPatents.push(publication)
      // All publications marked as other is placed in science articles list.
    } else if (filters.isOtherArticle(publication)) {
      obj.scienceArticles.push(publication)
    } else if (filters.isOtherConferencePaper(publication)) {
      obj.scienceConferencePapers.push(publication)
    } else if (filters.isOtherBook(publication)) {
      obj.scienceBooks.push(publication)
    } else if (filters.isOtherChapter(publication)) {
      obj.scienceChapters.push(publication)
    } else if (filters.isOtherConferenceProceeding(publication)) {
      obj.scienceConferenceProceedings.push(publication)
    } else if (filters.isOtherReport(publication)) {
      obj.scienceReports.push(publication)
    } else if (filters.isOtherCollection(publication)) {
      obj.scienceCollections.push(publication)
    } else if (filters.isOtherOther(publication)) {
      obj.scienceOthers.push(publication)
    } else if (filters.isScienceManuscript(publication)) {
      obj.scienceOthers.push(publication)
    } else {
      log.debug(
        'Publication is not added to any list: ' +
          publication.title +
          ' publicationTypeCode=' +
          publication.publicationTypeCode +
          ' publicationSubTypeCode=' +
          publication.publicationSubTypeCode +
          ' contentTypeCode=' +
          publication.contentTypeCode +
          ' publicationStatus=' +
          publication.publicationStatus
      )
    }
  })
  sortFilteredList(obj)
  return obj
}

function sortFilteredList (filteredList) {
  for (let listName in filteredList) {
    if (
      filteredList.hasOwnProperty(listName) &&
      Array.isArray(filteredList[listName])
    ) {
      var list = filteredList[listName]
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
