/* eslint-env mocha */
require('chai').should()

describe('LinkHelper', function () {
  var helper

  before(function (done) {
    helper = require('../../helpers/DivaLinkHelper')
    done()
  })

  describe('APA Link Text', function () {
    it('should correctly format the link text of an article in APA', function () {
      var pub = require('../testArticle.json')
      helper.getLinkText('article', pub, 'apa').should.equal('Testpost : Artikel recension refereegranskat.')
    })
    it('should correctly format the authors of a conference proceeding in APA', function () {
      var pub = require('../testConferenceProceedings.json')
      helper.getLinkText('scienceConferenceProceedings', pub, 'apa').should.equal('<i>Testpost : Samlingsverk (redaktörskap) refereegranskat</i>')
    })
    it('should correctly format the authors of a book in APA', function () {
      var pub = require('../testBook.json')
      helper.getLinkText('book', pub, 'apa').should.equal('<i> Testpost : Bok Övrigt vetenskapligt</i>')
    })
  })
})
