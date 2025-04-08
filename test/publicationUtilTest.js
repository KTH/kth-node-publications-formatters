const assert = require('chai').assert
var { groupPublications } = require('../')
describe('PublicationUtil', () => {
  var publicationUtil
  var json
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
      var json = { list: [1, 2], list2: [1], name: 'Jon' }
      expect(itemCounter(json)).toBe(3)
      done()
    })
  })

  // Kontrollera att alla publikationer i listan skrivs ut
  describe('No publications should be lost after filtering', () => {
    it('should be the same amount of publications if includeHidden is true.', (done) => {
      var publicationsBefore = json.publications.length

      var jsonResult = publicationUtil.filterList(json, true)
      // var publicationsAfter = itemCounter(jsonResult)
      var publicationsAfter = jsonResult.length

      expect(publicationsBefore).toBe(publicationsAfter)

      done()
    })
  })

  // Kontrollera att om publications är hidden så skall den ej visas i publication-vyn
  describe('Publications have to be hidden in Publication view if they are hidden in edit view', () => {
    it('blabla', (done) => {
      var publicationsBefore = json.publications.length

      var jsonResult = publicationUtil.filterList(json, false)
      // var publicationsAfter = itemCounter(jsonResult)
      var publicationsAfter = jsonResult.length

      expect(publicationsBefore).not.toBe(publicationsAfter)
      expect(publicationsBefore).toBe(publicationsAfter + 4)

      done()
    })
  })

  describe('For publications not filterable to any list, discard them.', () => {
    it('should be 3 discarded publications.', (done) => {
      var jsonWithHiddenPub = require('./dataWithHiddenPublications.json')
      var publicationsBefore = jsonWithHiddenPub.publications.length

      var jsonResult = groupPublications(publicationUtil.filterList(jsonWithHiddenPub, false))
      var publicationsAfter = itemCounter(jsonResult)

      assert(publicationsBefore === 24, 'Test data should contain 24 publications')
      expect(publicationsAfter).toBe(21)

      done()
    })
  })

  // Kontrollera att properties: Author/description/diva-helper finns på publikationen

  function itemCounter(json) {
    var counter = 0
    for (var list in json) {
      var item = json[list]
      if (Array.isArray(item)) {
        counter += item.length
      }
    }
    return counter
  }
})
