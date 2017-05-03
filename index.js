const AuthorHelper = require('./helpers/AuthorHelper')
const DescriptionHelper = require('./helpers/DescriptionHelper')
const DivaLinkHelper = require('./helpers/DivaLinkHelper')
const pubUtil = require('./helpers/publicationUtil')

module.exports = {
  render: _render,
  formatPublications: _publicationAs,
  filterList: pubUtil.filterList
}

function _render (publications) {
  return publications.reduce(function (str, item) {
    return str + `
    <div class="row publicationRow">
      <div class="col-md-1 col-xs-2 publicationNr">
        <span class="pubNr"></span>
      </div>
      <div class="col-md-10 col-xs-8 publicationInfo">
        <span>${item.formattedAuthors}</span>
        <a href=${item.formattedLink}" target='_blank'><span>${item.formattedLinkText}</span></a>
        <span>${item.formattedDescription}</span>
      </div>
    </div>`
  }, '')
}

function _publicationAs (data, style, lang) {
  switch (style) {
    case 'ieee':
      return _publicationAsIEEE(data, lang)
    default:
      return _publicationAsIEEE(data, lang)
  }
}

function _publicationAsIEEE (data, lang) {
  // For each publication list e.g. refereedArticles
  var i = 1
  for (var publicationList in data) {
    if (data.hasOwnProperty(publicationList)) {
      var list = data[publicationList]
      var visibleList = []

      // For each publication in current publication list.
      for (var index = 0; index < list.length; index++) {
        var publication = list[index]
        publication.index = i++
        publication.formattedAuthors = AuthorHelper.getAuthors(
          publicationList,
          publication,
          lang,
          'ieee'
        )
        publication.formattedLink = DivaLinkHelper.getLinkUrl(
          publicationList,
          publication
        )
        publication.formattedLinkText = DivaLinkHelper.getLinkText(
          publicationList,
          publication
        )
        publication.formattedDescription =
          DescriptionHelper.getDescription(publicationList, publication, lang) +
          '.'
        visibleList.push(publication)
      }

      // Save the modified list back to the original list.
      data[publicationList] = visibleList
    }
  }

  return data
}
