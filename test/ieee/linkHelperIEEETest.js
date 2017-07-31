/* eslint-env mocha */
require('chai').should()

describe('LinkHelper', function () {
  var helper

  before(function (done) {
    helper = require('../../helpers/DivaLinkHelper')
    done()
  })

  describe('IEEE Link Text', function () {
    it('should correctly format the link text of an article in IEEE', function () {
      var pub = require('../testArticle.json')
      helper.getLinkText('article', pub, 'ieee').should.equal('"Testpost : Artikel recension refereegranskat," ')
    })
    it('should correctly format the authors of a conference proceeding in IEEE', function () {
      var pub = require('../testConferenceProceedings.json')
      helper.getLinkText('scienceConferenceProceedings', pub, 'ieee').should.equal('"Testpost : Samlingsverk (redaktörskap) refereegranskat," ')
    })
    it('should correctly format the authors of a book in IEEE', function () {
      var pub = require('../testBook.json')
      helper.getLinkText('book', pub, 'ieee').should.equal('<i> Testpost : Bok Övrigt vetenskapligt.</i> ')
    })
  })
})
