describe('AuthorHelper', () => {
  let helper

  beforeAll(() => {
    helper = require('../../helpers/AuthorHelper')
  })

  describe('APA Authors', () => {
    it('should correctly format the authors of an article in APA', () => {
      const pub = require('../testArticle.json')
      expect(helper.getAuthors('article', pub, 'sv', 'apa')).toBe('Test, P., Mule, O. & Wåffel, H. (2000). ')
    })
    it('should correctly format the authors of a conference proceeding in APA', () => {
      const pub = require('../testConferenceProceedings.json')
      expect(helper.getAuthors('scienceConferenceProceedings', pub, 'sv', 'apa')).toBe(
        'Test, P., Mule, O., Wåffel, H. (Red.). (2016). '
      )
    })
    it('should correctly format the authors of a book in APA', () => {
      const pub = require('../testBook.json')
      expect(helper.getAuthors('book', pub, 'en', 'apa')).toBe('Test, P., Mule, O. & Wåffel, H. (2016). ')
    })
  })
})
