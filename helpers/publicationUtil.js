'use strict'

const log = require('kth-node-log')

/**
 * Utility functions for publications and lists of publications.
 */

module.exports = {
  filterList: _filterList,
}

/**
 * Filter the publication list.
 * Excludes all hidden publication by user if not explicitly requested.
 */
function _filterList(publicationList, includeHidden) {
  var filteredList = []

  if (!publicationList) {
    log.debug('Empty list' + JSON.stringify(publicationList))
    return filteredList
  }

  var publications = publicationList.publications
  for (var index = 0; index < publications.length; index++) {
    var publication = publications[index]

    publication.visible = publicationList.hiddenPublications.indexOf(publication.publicationId) === -1

    // Skip hidden publications if not explicitly requested
    if (!(includeHidden === true || publication.visible)) {
      continue
    }
    filteredList.push(publication)
  }
  return filteredList
}
