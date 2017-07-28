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
    // If Article only has a hostTitle
    it('hostTitle should be displayed in italic.', function () {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The host title</i>')
    })

    // If Article has subtitle
    it('hostTitle and hostSubtitle should be displayed in italic and separated by a colon.', function () {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The host title : The host subtitle</i>')
    })

    // If Article has hostVolume (Both swedish and english)
    it('The title(s) should end with a comma and host volume should be italicized.', function () {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostVolume: '40'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The host title : The host subtitle</i>, vol. 40')
    })

    // If Article has hostIssue (Both swedish and english)
    it('The host issue should be in parenthesis', function () {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostVolume: '40',
        hostIssue: '2'
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The host title : The host subtitle</i>, vol. 40, no. 2')
    })

    // If Article has hostExtentStart and hostExtentEnd
    it('The host issue should be in parenthesis', function () {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostVolume: '40',
        hostIssue: '2',
        hostExtentStart: 283,
        hostExtentEnd: 285
      }
      helper.getDescription('refereedArticles', publication, 'sv', 'ieee').should.equal(' <i>The host title : The host subtitle</i>, vol. 40, no. 2, s. 283-285')
    })
  })

    // If publication is of type ConferencePaper
  describe('Rules for formatting the description of a publication of the type ConferencePaper.', function () {
    // If ConferencePaper only has a title
    it('Title should be displayed in italic.', function () {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        dateIssued: '2017'
      }
      helper.getDescription('refereedConferencePaper', publication, 'sv', 'ieee').should.equal(' i <i>The host title</i>, 2017')
    })

    // If ConferencePaper has subtitle
    it('Title and subtitle should be displayed in italic and separated by a colon.', function () {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        dateIssued: '2017'
      }
      helper.getDescription('refereedConferencePaper', publication, 'sv', 'ieee').should.equal(' i <i>The host title : The host subtitle</i>, 2017')
    })

    // If ConferencePaper has hostExtentStart and hostExtentEnd
    it('hostExtentStart and hostExtentEnd should be in parenthesis and preceded by s. or pp.', function () {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostExtentStart: 283,
        hostExtentEnd: 285,
        dateIssued: '2017'
      }
      helper.getDescription('refereedConferencePaper', publication, 'sv', 'ieee').should.equal(' i <i>The host title : The host subtitle</i>, 2017, s. 283-285')
      helper.getDescription('refereedConferencePaper', publication, 'en', 'ieee').should.equal(' in <i>The host title : The host subtitle</i>, 2017, pp. 283-285')
    })

    // If ConferencePaper has bookPlace and bookPublisher
    it('Include place and publisher should be separated by a colon.', function () {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        hostExtentStart: 283,
        hostExtentEnd: 285,
        dateIssued: '2017'
      }
      helper.getDescription('refereedConferencePaper', publication, 'sv', 'ieee').should.equal(' i <i>The host title : The host subtitle</i>, 2017, s. 283-285')
      helper.getDescription('refereedConferencePaper', publication, 'en', 'ieee').should.equal(' in <i>The host title : The host subtitle</i>, 2017, pp. 283-285')
    })

    // If ConferencePaper has conferenceName
    it('ConferenceName should be preceded by "Presenterad vid"/"Presented at.', function () {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        conferenceName: 'MILINF',
        dateIssued: '2017'
      }
      helper.getDescription('refereedConferencePaper', publication, 'sv', 'ieee').should.equal(' i <i>MILINF</i>, 2017')
      helper.getDescription('refereedConferencePaper', publication, 'en', 'ieee').should.equal(' in <i>MILINF</i>, 2017')
    })
  })

  describe('Rules for formatting the description of a publication of the type Book.', function () {
    it('Edition, place and publisher should be correctly formatted.', function () {
      var publication = {
        publicationTypeCode: 'book',
        bookEdition: 5,
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        dateIssued: '2017'
      }
      helper.getDescription('refereedBook', publication, 'sv', 'ieee').should.equal('5. uppl. Bräkne-Hoby : Advanced Knowledge International, 2017')
      helper.getDescription('refereedBook', publication, 'en', 'ieee').should.equal('5th ed. Bräkne-Hoby : Advanced Knowledge International, 2017')
    })
  })

  describe('Rules for formatting the description of a publication of the type chapter.', function () {
    it('Chapter correctly formatted.', function () {
      var publication = {
        statementOfResponsibility: 'Urpo ja Turpo',
        bookPublisher: 'Advanced Knowledge International',
        bookPlace: 'Bräkne-Hoby',
        hostExtentEnd: '83',
        hostExtentStart: '72',
        hostSubTitle: 'en uppskjuten framgångssaga',
        hostTitle: 'Rakosten',
        publicationTypeCode: 'chapter',
        dateIssued: '2017'
      }
      helper.getDescription('refereedChapter', publication, 'sv', 'ieee').should.equal('i <i>Rakosten : en uppskjuten framgångssaga, </i>Urpo ja Turpo red., Bräkne-Hoby : Advanced Knowledge International, 2017, s. 72-83')
      helper.getDescription('refereedChapter', publication, 'en', 'ieee').should.equal('in <i>Rakosten : en uppskjuten framgångssaga, </i>Urpo ja Turpo Ed., Bräkne-Hoby : Advanced Knowledge International, 2017, pp. 72-83')
    })
  })

  describe('Rules for formatting the description of a publication of the type thesis.', function () {
    it('Thesis correctly formatted.', function () {
      var publication = {
        seriesIssueNr: '2017:29',
        seriesTitle: 'TRITA-TEST',
        bookPublisher: 'Advanced Knowledge International',
        bookPlace: 'Bräkne-Hoby',
        identifierUri: 'http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-206750',
        contentTypeCode: 'science',
        publicationTypeCode: 'comprehensiveDoctoralThesis'
      }
      helper.getDescription('refereedScienceThesis', publication, 'sv', 'ieee').should.equal('Doktorsavhandling Bräkne-Hoby : Advanced Knowledge International, TRITA-TEST, 2017:29')
      helper.getDescription('refereedScienceThesis', publication, 'en', 'ieee').should.equal('Doctoral thesis Bräkne-Hoby : Advanced Knowledge International, TRITA-TEST, 2017:29')
    })
  })

  describe('Rules for formatting the description of a publication of the type Report.', function () {
    it('seriesTitle, seriesIssueNr, place and publisher should be correctly formatted.', function () {
      var publication = {
        publicationTypeCode: 'report',
        seriesTitle: 'Testserie',
        seriesIssueNr: '2012:06',
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International'
      }
      helper.getDescription('refereedBook', publication, 'sv', 'ieee').should.equal('Bräkne-Hoby : Advanced Knowledge International, Testserie, 2012:06')
    })
  })

  describe('Rules for formatting the description of a publication of the type Collection.', function () {
    it('edition, place and publisher should be correctly formatted.', function () {
      var publication = {
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        bookEdition: '3',
        contentTypeCode: 'other',
        publicationTypeCode: 'collection'
      }
      helper.getDescription('refereedCollection', publication, 'sv', 'ieee').should.equal('3. uppl. Bräkne-Hoby, Advanced Knowledge International')
      helper.getDescription('refereedCollection', publication, 'en', 'ieee').should.equal('3rd ed. Bräkne-Hoby, Advanced Knowledge International')
    })
  })

  describe('Rules for formatting the description of a publication of the type conferenceProceedings.', function () {
    it('edition, place and publisher should be correctly formatted.', function () {
      var publication = {
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        bookEdition: '3',
        contentTypeCode: 'refereed',
        publicationTypeCode: 'conferenceProceedings'
      }
      helper.getDescription('refereedConferenceProceedings', publication, 'sv', 'ieee').should.equal('Bräkne-Hoby, Advanced Knowledge International')
      helper.getDescription('refereedConferenceProceedings', publication, 'en', 'ieee').should.equal('Bräkne-Hoby, Advanced Knowledge International')
    })
  })

  describe('Rules for formatting the description of a publication of the type patent.', function () {
    it('edition, place and publisher should be correctly formatted.', function () {
      var publication = {
        patent: 'WO2015144902-A1',
        identifierUri: 'http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-180012',
        contentTypeCode: 'other',
        publicationTypeCode: 'patent'
      }
      helper.getDescription('patent', publication, 'sv', 'ieee').should.equal('WO2015144902-A1')
    })
  })
})
