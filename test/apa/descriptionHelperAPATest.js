require('chai')

describe('DescriptionHelper', () => {
  var helper

  beforeAll((done) => {
    helper = require('../../helpers/DescriptionHelper')
    done()
  })

  // If publication is of type Article
  describe('Rules for formatting the description of a publication of the type Article.', () => {
    // If Article only has a hostTitle
    it('hostTitle should be displayed in italic.', () => {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
      }
      expect(helper.getDescription('refereedArticles', publication, 'sv', 'apa')).toBe(' <i>The host title</i>')
    })

    // If Article has subtitle
    it('hostTitle and hostSubtitle should be displayed in italic and separated by a colon.', () => {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
      }
      expect(helper.getDescription('refereedArticles', publication, 'sv', 'apa')).toBe(
        ' <i>The host title : The host subtitle</i>'
      )
    })

    // If Article has hostVolume (Both swedish and english)
    it('The title(s) should end with a comma and host volume should be italicized.', () => {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostVolume: '40',
      }
      expect(helper.getDescription('refereedArticles', publication, 'sv', 'apa')).toBe(
        ' <i>The host title : The host subtitle, 40</i>'
      )
    })

    // If Article has hostIssue (Both swedish and english)
    it('The host issue should be in parenthesis', () => {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostVolume: '40',
        hostIssue: '2',
      }
      expect(helper.getDescription('refereedArticles', publication, 'sv', 'apa')).toBe(
        ' <i>The host title : The host subtitle, 40</i>(2)'
      )
    })

    // If Article has hostExtentStart and hostExtentEnd
    it('The host issue should be in parenthesis', () => {
      var publication = {
        publicationTypeCode: 'article',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostVolume: '40',
        hostIssue: '2',
        hostExtentStart: 283,
        hostExtentEnd: 285,
      }
      expect(helper.getDescription('refereedArticles', publication, 'sv', 'apa')).toBe(
        ' <i>The host title : The host subtitle, 40</i>(2), 283-285'
      )
    })
  })

  // If publication is of type ConferencePaper
  describe('Rules for formatting the description of a publication of the type ConferencePaper.', () => {
    // If ConferencePaper only has a title
    it('Title should be displayed in italic.', () => {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
      }
      expect(helper.getDescription('refereedConferencePaper', publication, 'sv', 'apa')).toBe(
        ' I <i>The host title.</i>'
      )
    })

    // If ConferencePaper has subtitle
    it('Title and subtitle should be displayed in italic and separated by a colon.', () => {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
      }
      expect(helper.getDescription('refereedConferencePaper', publication, 'sv', 'apa')).toBe(
        ' I <i>The host title: The host subtitle.</i>'
      )
    })

    // If ConferencePaper has hostExtentStart and hostExtentEnd
    it('hostExtentStart and hostExtentEnd should be in parenthesis and preceded by s. or pp.', () => {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        hostExtentStart: 283,
        hostExtentEnd: 285,
      }
      expect(helper.getDescription('refereedConferencePaper', publication, 'sv', 'apa')).toBe(
        ' I <i>The host title: The host subtitle.</i> (s. 283-285).'
      )
      expect(helper.getDescription('refereedConferencePaper', publication, 'en', 'apa')).toBe(
        ' In <i>The host title: The host subtitle.</i> (pp. 283-285).'
      )
    })

    // If ConferencePaper has bookPlace and bookPublisher
    it('Include place and publisher should be separated by a colon.', () => {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        hostTitle: 'The host title',
        hostSubTitle: 'The host subtitle',
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        hostExtentStart: 283,
        hostExtentEnd: 285,
      }
      expect(helper.getDescription('refereedConferencePaper', publication, 'sv', 'apa')).toBe(
        ' I <i>The host title: The host subtitle.</i> (s. 283-285). Bräkne-Hoby: Advanced Knowledge International'
      )
      expect(helper.getDescription('refereedConferencePaper', publication, 'en', 'apa')).toBe(
        ' In <i>The host title: The host subtitle.</i> (pp. 283-285). Bräkne-Hoby: Advanced Knowledge International'
      )
    })

    // If ConferencePaper has conferenceName
    it('ConferenceName should be preceded by "Presenterad vid"/"Presented at.', () => {
      var publication = {
        publicationTypeCode: 'conferencePaper',
        conferenceName: 'MILINF',
      }
      expect(helper.getDescription('refereedConferencePaper', publication, 'sv', 'apa')).toBe(
        ' Presenterad vid <i>MILINF</i>.'
      )
      expect(helper.getDescription('refereedConferencePaper', publication, 'en', 'apa')).toBe(
        ' Presented at <i>MILINF</i>.'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type Book.', () => {
    it('Edition, place and publisher should be correctly formatted.', () => {
      var publication = {
        publicationTypeCode: 'book',
        bookEdition: 5,
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
      }
      expect(helper.getDescription('refereedBook', publication, 'sv', 'apa')).toBe(
        ' (5 uppl.). Bräkne-Hoby: Advanced Knowledge International'
      )
      expect(helper.getDescription('refereedBook', publication, 'en', 'apa')).toBe(
        ' (5 ed.). Bräkne-Hoby: Advanced Knowledge International'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type chapter.', () => {
    it('Chapter correctly formatted.', () => {
      var publication = {
        statementOfResponsibility: 'Urpo ja Turpo',
        bookPublisher: 'Advanced Knowledge International',
        bookPlace: 'Bräkne-Hoby',
        hostExtentEnd: '83',
        hostExtentStart: '72',
        hostSubTitle: 'en uppskjuten framgångssaga',
        hostTitle: 'Rakosten',
        publicationTypeCode: 'chapter',
      }
      expect(helper.getDescription('refereedChapter', publication, 'sv', 'apa')).toBe(
        ' I Urpo ja Turpo (Red.), <i>Rakosten: en uppskjuten framgångssaga</i> (s. 72-83). Bräkne-Hoby: Advanced Knowledge International'
      )
      expect(helper.getDescription('refereedChapter', publication, 'en', 'apa')).toBe(
        ' In Urpo ja Turpo (Ed.), <i>Rakosten: en uppskjuten framgångssaga</i> (pp. 72-83). Bräkne-Hoby: Advanced Knowledge International'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type thesis.', () => {
    it('Thesis correctly formatted.', () => {
      var publication = {
        seriesIssueNr: '2017:29',
        seriesTitle: 'TRITA-TEST',
        bookPublisher: 'Advanced Knowledge International',
        bookPlace: 'Bräkne-Hoby',
        identifierUri: 'http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-206750',
        contentTypeCode: 'science',
        publicationTypeCode: 'comprehensiveDoctoralThesis',
      }
      expect(helper.getDescription('refereedScienceThesis', publication, 'sv', 'apa')).toBe(
        ' (Doktorsavhandling , Advanced Knowledge International, Bräkne-Hoby, TRITA-TEST 2017:29). Hämtad från <a target="_blank" rel="noopener noreferrer" href="http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-206750">http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-206750</a>'
      )
      expect(helper.getDescription('refereedScienceThesis', publication, 'en', 'apa')).toBe(
        ' (Doctoral thesis , Advanced Knowledge International, Bräkne-Hoby, TRITA-TEST 2017:29). Retrieved from <a target="_blank" rel="noopener noreferrer" href="http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-206750">http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-206750</a>'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type Report.', () => {
    it('seriesTitle, seriesIssueNr, place and publisher should be correctly formatted.', () => {
      var publication = {
        publicationTypeCode: 'report',
        seriesTitle: 'Testserie',
        seriesIssueNr: '2012:06',
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
      }
      expect(helper.getDescription('refereedBook', publication, 'sv', 'apa')).toBe(
        ' (Testserie 2012:06). Bräkne-Hoby: Advanced Knowledge International'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type Collection.', () => {
    it('edition, place and publisher should be correctly formatted.', () => {
      var publication = {
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        bookEdition: '3',
        contentTypeCode: 'other',
        publicationTypeCode: 'collection',
      }
      expect(helper.getDescription('refereedCollection', publication, 'sv', 'apa')).toBe(
        ' (3 uppl.). Bräkne-Hoby: Advanced Knowledge International'
      )
      expect(helper.getDescription('refereedCollection', publication, 'en', 'apa')).toBe(
        ' (3 ed.). Bräkne-Hoby: Advanced Knowledge International'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type conferenceProceedings.', () => {
    it('edition, place and publisher should be correctly formatted.', () => {
      var publication = {
        bookPlace: 'Bräkne-Hoby',
        bookPublisher: 'Advanced Knowledge International',
        bookEdition: '3',
        contentTypeCode: 'refereed',
        publicationTypeCode: 'conferenceProceedings',
      }
      expect(helper.getDescription('refereedConferenceProceedings', publication, 'sv', 'apa')).toBe(
        ' (3 uppl.). Bräkne-Hoby: Advanced Knowledge International'
      )
      expect(helper.getDescription('refereedConferenceProceedings', publication, 'en', 'apa')).toBe(
        ' (3 ed.). Bräkne-Hoby: Advanced Knowledge International'
      )
    })
  })

  describe('Rules for formatting the description of a publication of the type patent.', () => {
    it('edition, place and publisher should be correctly formatted.', () => {
      var publication = {
        patent: 'WO2015144902-A1',
        identifierUri: 'http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-180012',
        contentTypeCode: 'other',
        publicationTypeCode: 'patent',
      }
      expect(helper.getDescription('patent', publication, 'sv', 'apa')).toBe(' <i>WO2015144902-A1</i>')
    })
  })
})
