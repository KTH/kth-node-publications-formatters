const log = require('kth-node-log')

const _messages = {
  en: {
    author_and: 'and',
    author_et_al: 'et al.',
    author_too_many: '...',
    host_volume: 'vol. ',
    host_issue: 'no. ',
    host_page: 'p. ',
    host_pages: 'pp. ',
    chapter_in: 'in ',
    chapter_in_apa: 'In ',
    editor: ' Ed.',
    editors_apa: '(Eds.)',
    editor_apa: '(Ed.)',
    edition: 'ed. ',
    edition_apa: ' ed.',
    conference_in: ' in ',
    conference_in_apa: ' In ',
    presented_at: ' Presented at ',
    proceedings_of: ' Proceedings of ',
    thesis_doctoral: 'Doctoral thesis ',
    thesis_licentiate: 'Licentiate thesis ',
    thesis_retrieved_from: 'Retrieved from',
    manuscript: 'Manuscript',
    suffix_one: 'st ',
    suffix_two: 'nd ',
    suffix_three: 'rd ',
    suffix_default: 'th ',
  },
  sv: {
    author_and: 'och',
    author_et_al: 'et al.',
    author_too_many: '...',
    host_volume: 'vol. ',
    host_issue: 'no. ',
    host_page: 's. ',
    host_pages: 's. ',
    chapter_in: 'i ',
    chapter_in_apa: 'I ',
    editor: ' red.',
    editors_apa: '(Red.)',
    editor_apa: '(Red.)',
    edition: ' uppl. ',
    edition_apa: ' uppl.',
    conference_in: ' i ',
    conference_in_apa: ' I ',
    presented_at: ' Presenterad vid ',
    proceedings_of: ' Konferensbidrag från ',
    thesis_doctoral: 'Doktorsavhandling ',
    thesis_licentiate: 'Licentiatavhandling ',
    thesis_retrieved_from: 'Hämtad från',
    manuscript: 'Manuskript',
    suffix_one: '.',
    suffix_two: '.',
    suffix_three: '.',
    suffix_default: '.',
  },
}

module.exports = {
  message: _message,
}

function _message(key, lang = 'sv') {
  if (lang !== 'en' && lang !== 'sv') {
    lang = 'sv'
    log.info('Given lang parameter is not on correct format: (' + lang + '). Falling back to "sv"')
  }

  if (!key) {
    throw new Error('Key must be defined')
  }

  return _messages[lang][key]
}
