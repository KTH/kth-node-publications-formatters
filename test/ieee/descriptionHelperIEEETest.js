/* eslint-env mocha */
require('chai')

describe('DescriptionHelper', function () {
  var helper

  before(function (done) {
    helper = require('../../helpers/DescriptionHelper')
    done()
  })

  // If publication is of type Article
  describe('Rules for formatting the description of a publication of the type Article.', function () {
    // If Article only has a title
    it('Title should be displayed in italic.', function (done) {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The title'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The title</i>')
      done()
    })

    // If Article has subtitle
    it('Title and subtitle should be displayed in italic and separated by a colon.', function (done) {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The title',
        hostSubTitle: 'The subtitle'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The title : The subtitle</i>')
      done()
    })

    // If Article has hostVolume (Both swedish and english)
    it('The title(s) should end with a comma and host volume should start with .vol', function (done) {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The title',
        hostSubTitle: 'The subtitle',
        hostVolume: '40'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The title : The subtitle</i>, vol. 40')
      done()
    })

    // If Article has hostIssue (Both swedish and english)
    it('The host volume should end with a comma and host issue should start with no.', function (done) {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The title',
        hostSubTitle: 'The subtitle',
        hostVolume: '40',
        hostIssue: '2'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The title : The subtitle</i>, vol. 40, no. 2')
      done()
    })
  })
})
