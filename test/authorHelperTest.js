describe('AuthorHelper', () => {
  let helper

  beforeAll(() => {
    helper = require('../helpers/AuthorHelper')
  })

  describe('Eva', () => {
    it('should be E.', () => {
      expect(helper.splitAndFixNameParts('Eva', ' ')).toBe('E.')
    })
  })

  describe('Jon-Olov', () => {
    it('should be J.-O.', () => {
      expect(helper.splitAndFixNameParts('Jon-Olov', '-')).toBe('J.-O.')
    })
  })

  describe('Jon Olov', () => {
    it('should be J. O.', () => {
      expect(helper.splitAndFixNameParts('Jon Olov', ' ')).toBe('J. O.')
    })
  })

  describe('Candice L.', () => {
    it('should be C. L.', () => {
      expect(helper.splitAndFixNameParts('Candice L.', ' ')).toBe('C. L.')
    })
  })

  describe('Gerald Q. Jr.', () => {
    it('should be G. Q. Jr.', () => {
      expect(helper.splitAndFixNameParts('Gerald Q. Jr.', ' ')).toBe('G. Q. Jr.')
    })
  })

  describe('Joakim Von Anka', () => {
    it('should be J. Von A.', () => {
      expect(helper.splitAndFixNameParts('Joakim Von Anka', ' ')).toBe('J. Von A.')
    })
  })
})
