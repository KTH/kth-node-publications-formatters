describe('AuthorHelper', () => {
  var helper

  beforeAll((done) => {
    helper = require('../helpers/AuthorHelper')
    done()
  })

  describe('Eva', () => {
    it('should be E.', (done) => {
      expect(helper.splitAndFixNameParts('Eva', ' ')).toBe('E.')
      done()
    })
  })

  describe('Jon-Olov', () => {
    it('should be J.-O.', (done) => {
      expect(helper.splitAndFixNameParts('Jon-Olov', '-')).toBe('J.-O.')
      done()
    })
  })

  describe('Jon Olov', () => {
    it('should be J. O.', (done) => {
      expect(helper.splitAndFixNameParts('Jon Olov', ' ')).toBe('J. O.')
      done()
    })
  })

  describe('Candice L.', () => {
    it('should be C. L.', (done) => {
      expect(helper.splitAndFixNameParts('Candice L.', ' ')).toBe('C. L.')
      done()
    })
  })

  describe('Gerald Q. Jr.', () => {
    it('should be G. Q. Jr.', (done) => {
      expect(helper.splitAndFixNameParts('Gerald Q. Jr.', ' ')).toBe('G. Q. Jr.')
      done()
    })
  })

  describe('Joakim Von Anka', () => {
    it('should be J. Von A.', (done) => {
      expect(helper.splitAndFixNameParts('Joakim Von Anka', ' ')).toBe('J. Von A.')
      done()
    })
  })
})
