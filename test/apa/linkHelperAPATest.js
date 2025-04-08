describe('LinkHelper', () => {
  var helper

  beforeAll((done) => {
    helper = require('../../helpers/DivaLinkHelper')
    done()
  })

  describe('APA Link Text', () => {
    it('should correctly format the link text of an article in APA', () => {
      var pub = require('../testArticle.json')
      expect(helper.getLinkText('article', pub, 'apa')).toBe('Testpost : Artikel recension refereegranskat.')
    })
    it('should correctly format the authors of a conference proceeding in APA', () => {
      var pub = require('../testConferenceProceedings.json')
      expect(helper.getLinkText('scienceConferenceProceedings', pub, 'apa')).toBe(
        '<i>Testpost : Samlingsverk (redaktörskap) refereegranskat</i>'
      )
    })
    it('should correctly format the authors of a book in APA', () => {
      var pub = require('../testBook.json')
      expect(helper.getLinkText('book', pub, 'apa')).toBe('<i> Testpost : Bok Övrigt vetenskapligt</i>')
    })
  })
})
