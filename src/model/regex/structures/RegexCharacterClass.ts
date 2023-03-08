class RegexCharacterClass extends RegexPartBase {
  chars: Set<string>
  constructor(charSet: string) {
    super(charSet)
    let amount = getRandomIntegerFromRange(1, charSet.length)
    this.chars = new Set()
    for (let i = 0; i < amount; i++) {
      this.chars.add(getRandomElementFromArray(charSet.split("")))
    }
  }
  generate(): string {
    if (this.chars.size == 1 && chance(0.99))
      return [...this.chars][0]
    return "[" + [...this.chars].join("") + "]"
  }
  generateCorrectAnswer(): string {
    return getRandomElementFromArray([...this.chars])
  }
}
