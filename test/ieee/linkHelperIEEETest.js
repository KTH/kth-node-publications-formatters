describe('LinkHelper', () => {
  var helper

  beforeAll((done) => {
    helper = require('../../helpers/DivaLinkHelper')
    done()
  })

  describe('IEEE Link Text', () => {
    it('should correctly format the link text of an article in IEEE', () => {
      var pub = require('../testArticle.json')
      expect(helper.getLinkText('article', pub, 'ieee')).toBe('"Testpost : Artikel recension refereegranskat," ')
    })
    it('should correctly format the authors of a conference proceeding in IEEE', () => {
      var pub = require('../testConferenceProceedings.json')
      expect(helper.getLinkText('scienceConferenceProceedings', pub, 'ieee')).toBe(
        '"Testpost : Samlingsverk (redaktörskap) refereegranskat," '
      )
    })
    it('should correctly format the authors of a book in IEEE', () => {
      var pub = require('../testBook.json')
      expect(helper.getLinkText('book', pub, 'ieee')).toBe('<i> Testpost : Bok Övrigt vetenskapligt.</i> ')
    })
  })
})
