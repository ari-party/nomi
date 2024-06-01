type NumberDictionary = Record<number, string>;

const anywhere: NumberDictionary = {
  173: 'SOFT HYPHEN',
  8289: 'FUNCTION APPLICATION',
  8290: 'INVISIBLE TIMES',
  8291: 'INVISIBLE SEPERATOR',
  8292: 'INVISIBLE PLUS',
  // tag characters (U+E0020 to U+E007F) for some reason have this character when sent
  // (private use character)
  56128: 'HIGH SURROGATES',
  // deprecated characters, should not be used in messages
  8298: 'INHIBIT SYMMETRIC SWAPPING',
  8299: 'ACTIVATE SYMMETRIC SWAPPING',
  8300: 'INHIBIT ARABIC FORM SHAPING',
  8301: 'ACTIVATE ARABIC FORM SHAPING',
  8302: 'NATIONAL DIGIT SHAPES',
  8303: 'NOMINAL DIGIT SHAPES',
  917505: 'LANGUAGE TAG',
};

// characters will be flagged if they are not the prefix or suffix
const notPrefixOrSuffix: NumberDictionary = {
  1564: 'ARABIC LETTER MARK',
  // 6158 'MONGOLIAN VOWEL SEPERATOR' is special and has own code below
  8236: 'POP DIRECTIONAL FORMATTING',
  8237: 'LEFT-TO-RIGHT OVERRIDE',
  8238: 'RIGHT-TO-LEFT OVERRIDE',
  8288: 'WORD JOINER',
  8294: 'LEFT-TO-RIGHT ISOLATE',
  8295: 'RIGHT-TO-LEFT ISOLATE',
  8296: 'FIRST STRONG ISOLATE',
  8297: 'POP DIRECTIONAL ISOLATE',
};

export default function hasInvisibleCharacters(text: string): string | false {
  for (const word of text.split(' ')) {
    for (
      let characterIndex = 0;
      characterIndex < word.length;
      characterIndex += 1
    ) {
      const character = word.charAt(characterIndex);
      const codePoint = character.codePointAt(0);
      if (!codePoint) continue;

      if (
        characterIndex !== 0 &&
        characterIndex !== word.length - 1 &&
        notPrefixOrSuffix[codePoint]
      )
        return notPrefixOrSuffix[codePoint];

      if (anywhere[codePoint]) return anywhere[codePoint];

      // U+180E (6158) is only allowed before U+1820 (6176) and U+1821 (6177)
      if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR';

        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);
        if (!nextCodePoint) return characterName;

        if (![6176, 6177].includes(nextCodePoint)) return characterName;
      }
    }
  }

  return false;
}
