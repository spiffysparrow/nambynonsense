import { expect } from 'chai';
// import formatLetters from './formatLetters'
import toggleLetters from './toggleLetters';

describe('#toggleLetters', () => {
  context('with none preselected', () => {
    const wordLetters = [ // formatLetters({ passage: 'two words' })
      [
        { ch: 't', isSelected: false },
        { ch: 'w', isSelected: false },
        { ch: 'o', isSelected: false },
        { ch: ' ', isSelected: false },
      ],
      [
        { ch: 'w', isSelected: false },
        { ch: 'o', isSelected: false },
        { ch: 'r', isSelected: false },
        { ch: 'd', isSelected: false },
        { ch: 's', isSelected: false },
      ],
    ];

    it('flips letter in letter mode', () => {
      const params = {
        wordIdx: 0,
        letterIdx: 0,
        wordLetters,
        isSelectingByWord: false,
      };
      const result = toggleLetters(params);
      const expectedResult = [ // formatLetters({ passage: 'two words' })
        [
          { ch: 't', isSelected: true },
          { ch: 'w', isSelected: false },
          { ch: 'o', isSelected: false },
          { ch: ' ', isSelected: false },
        ],
        [
          { ch: 'w', isSelected: false },
          { ch: 'o', isSelected: false },
          { ch: 'r', isSelected: false },
          { ch: 'd', isSelected: false },
          { ch: 's', isSelected: false },
        ],
      ];
      expect(result).to.eql(expectedResult);
    });

    it('flips word in word mode', () => {
      const params = {
        wordIdx: 0,
        letterIdx: 0,
        wordLetters,
        isSelectingByWord: true,
      };
      const result = toggleLetters(params);
      const expectedResult = [ // formatLetters({ passage: 'two words' })
        [
          { ch: 't', isSelected: true },
          { ch: 'w', isSelected: true },
          { ch: 'o', isSelected: true },
          { ch: ' ', isSelected: true },
        ],
        [
          { ch: 'w', isSelected: false },
          { ch: 'o', isSelected: false },
          { ch: 'r', isSelected: false },
          { ch: 'd', isSelected: false },
          { ch: 's', isSelected: false },
        ],
      ];
      expect(result).to.eql(expectedResult);
    });
  });
  context('with preselected', () => {
    const wordLetters = [ // formatLetters({ passage: 'one' })
      [
        { ch: 'o', isSelected: false }, // 0
        { ch: 'n', isSelected: false }, // 1
        { ch: 'e', isSelected: true },  // 2
      ],
    ];

    it('flips whole word (if letter minority)', () => {
      // clicked 'E': onE => one
      const params = {
        wordIdx: 0,
        letterIdx: 2,
        wordLetters,
        isSelectingByWord: true,
      };
      const result = toggleLetters(params);
      const expectedResult = [
        [
          { ch: 'o', isSelected: false }, // 0
          { ch: 'n', isSelected: false }, // 1
          { ch: 'e', isSelected: false },  // 2
        ],
      ];
      expect(result).to.eql(expectedResult);
    });

    it('flips whole word (if letter majority)', () => {
      // clicked 'N': onE => ONE
      const params = {
        wordIdx: 0,
        letterIdx: 1,
        wordLetters,
        isSelectingByWord: true,
      };
      const result = toggleLetters(params);
      const expectedResult = [
        [
          { ch: 'o', isSelected: true }, // 0
          { ch: 'n', isSelected: true }, // 1
          { ch: 'e', isSelected: true },  // 2
        ],
      ];
      expect(result).to.eql(expectedResult);
    });
  });
});
