describe('AuthorHelper', () => {
  var helper

  beforeAll((done) => {
    helper = require('../../helpers/AuthorHelper')
    done()
  })

  describe('IEEE Authors', () => {
    it('should correctly format the authors of an article in IEEE and Swedish', () => {
      var pub = require('../testArticle.json')
      expect(helper.getAuthors('article', pub, 'sv', 'ieee')).toBe('P. Test, O. Mule och H. Wåffel, ')
    })
    it('should correctly format the authors of an article in IEEE and English', () => {
      var pub = require('../testArticle.json')
      expect(helper.getAuthors('article', pub, 'en', 'ieee')).toBe('P. Test, O. Mule and H. Wåffel, ')
    })
    it('should correctly format the authors of a conference proceeding article in IEEE and Swedish', () => {
      var pub = require('../testConferenceProceedings.json')
      expect(helper.getAuthors('scienceConferenceProceedings', pub, 'sv', 'ieee')).toBe(
        'P. Test, O. Mule och H. Wåffel, Eds.'
      )
    })
    it('should correctly format the authors of a conference proceeding in IEEE and English', () => {
      var pub = require('../testConferenceProceedings.json')
      expect(helper.getAuthors('scienceConferenceProceedings', pub, 'en', 'ieee')).toBe(
        'P. Test, O. Mule and H. Wåffel, Eds.'
      )
    })
    it('should correctly format the authors of a book in IEEE and English', () => {
      var pub = require('../testBook.json')
      expect(helper.getAuthors('book', pub, 'en', 'ieee')).toBe('P. Test, O. Mule and H. Wåffel, ')
    })
  })
})
