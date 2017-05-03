const _messages = {
  en: {
    author_and: 'and',
    author_et_al: 'et al.',
    host_volume: 'vol. ',
    host_issue: 'no. ',
    host_page: 'p. ',
    host_pages: 'pp. ',
    chapter_in: 'in ',
    editor: ' Ed.',
    edition: ' ed. ',
    conference_in: ' in ',
    thesis_doctoral: 'Doctoral thesis ',
    thesis_licentiate: 'Licentiate thesis ',
    suffix_one: 'st ',
    suffix_two: 'nd ',
    suffix_three: 'rd ',
    suffix_default: 'th '
  },
  sv: {
    author_and: 'och',
    author_et_al: 'et al.',
    host_volume: 'vol. ',
    host_issue: 'no. ',
    host_page: 's. ',
    host_pages: 's. ',
    chapter_in: 'i ',
    editor: ' red.',
    edition: ' uppl. ',
    conference_in: ' i ',
    thesis_doctoral: 'Doktorsavhandling ',
    thesis_licentiate: 'Licentiatavhandling ',
    suffix_one: '.',
    suffix_two: '.',
    suffix_three: '.',
    suffix_default: '.'
  }
}

module.exports = {
  message: _message
}

function _message (key, lang = 'sv') {
  if (!key) throw new Error('Key must be defined')
  return _messages[lang][key]
}
