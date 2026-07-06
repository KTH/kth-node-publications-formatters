const { groupPublications } = require('../')

describe('PublicationUtil', () => {
  let publicationUtil
  let json
  if (!json) {
    json = ''
  }

  function itemCounter(itemLists) {
    let counter = 0
    for (const list in itemLists) {
      const item = itemLists[list]
      if (Array.isArray(item)) {
        counter += item.length
      }
    }
    return counter
  }

  beforeAll(() => {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
  })

  describe('Test itemCounter', () => {
    it('should count 3', () => {
      const mockJson = { list: [1, 2], list2: [1], name: 'Jon' }
      expect(itemCounter(mockJson)).toBe(3)
    })
  })

  // Kontrollera att alla publikationer i listan skrivs ut
  describe('No publications should be lost after filtering', () => {
    it('should be the same amount of publications if includeHidden is true.', () => {
      const publicationsBefore = json.publications.length

      const jsonResult = publicationUtil.filterList(json, true)
      // var publicationsAfter = itemCounter(jsonResult)
      const publicationsAfter = jsonResult.length

      expect(publicationsBefore).toBe(publicationsAfter)
    })
  })

  // Kontrollera att om publications är hidden så skall den ej visas i publication-vyn
  describe('Publications have to be hidden in Publication view if they are hidden in edit view', () => {
    it('blabla', () => {
      const publicationsBefore = json.publications.length

      const jsonResult = publicationUtil.filterList(json, false)
      // var publicationsAfter = itemCounter(jsonResult)
      const publicationsAfter = jsonResult.length

      expect(publicationsBefore).not.toBe(publicationsAfter)
      expect(publicationsBefore).toBe(publicationsAfter + 4)
    })
  })

  describe('For publications not filterable to any list, discard them.', () => {
    it('should be 3 discarded publications.', () => {
      const jsonWithHiddenPub = require('./dataWithHiddenPublications.json')
      const publicationsBefore = jsonWithHiddenPub.publications.length

      const jsonResult = groupPublications(publicationUtil.filterList(jsonWithHiddenPub, false))
      const publicationsAfter = itemCounter(jsonResult)

      expect(publicationsBefore).toBe(24)
      expect(publicationsAfter).toBe(21)
    })
  })
})
