const { groupPublications } = require('../')

describe('PublicationUtil', () => {
  let publicationUtil
  let json
  if (!json) {
    json = ''
  }

  beforeAll((done) => {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
    done()
  })

  describe('Test itemCounter', () => {
    it('should count 3', (done) => {
      const json = { list: [1, 2], list2: [1], name: 'Jon' }
      expect(itemCounter(json)).toBe(3)
      done()
    })
  })

  // Kontrollera att alla publikationer i listan skrivs ut
  describe('No publications should be lost after filtering', () => {
    it('should be the same amount of publications if includeHidden is true.', (done) => {
      const publicationsBefore = json.publications.length

      const jsonResult = publicationUtil.filterList(json, true)
      // var publicationsAfter = itemCounter(jsonResult)
      const publicationsAfter = jsonResult.length

      expect(publicationsBefore).toBe(publicationsAfter)

      done()
    })
  })

  // Kontrollera att om publications är hidden så skall den ej visas i publication-vyn
  describe('Publications have to be hidden in Publication view if they are hidden in edit view', () => {
    it('blabla', (done) => {
      const publicationsBefore = json.publications.length

      const jsonResult = publicationUtil.filterList(json, false)
      // var publicationsAfter = itemCounter(jsonResult)
      const publicationsAfter = jsonResult.length

      expect(publicationsBefore).not.toBe(publicationsAfter)
      expect(publicationsBefore).toBe(publicationsAfter + 4)

      done()
    })
  })

  describe('For publications not filterable to any list, discard them.', () => {
    it('should be 3 discarded publications.', (done) => {
      const jsonWithHiddenPub = require('./dataWithHiddenPublications.json')
      const publicationsBefore = jsonWithHiddenPub.publications.length

      const jsonResult = groupPublications(publicationUtil.filterList(jsonWithHiddenPub, false))
      const publicationsAfter = itemCounter(jsonResult)

      expect(publicationsBefore).toBe(24)
      expect(publicationsAfter).toBe(21)

      done()
    })
  })

  // Kontrollera att properties: Author/description/diva-helper finns på publikationen

  function itemCounter(json) {
    let counter = 0
    for (const list in json) {
      const item = json[list]
      if (Array.isArray(item)) {
        counter += item.length
      }
    }
    return counter
  }
})
