class RegexAnyAmount extends RegexQuantifierBase {
  quantifierSymbol: string = "*"
  generateCorrectQuantification(lengthFactor: number): number {
    return getRandomIntegerInRange(0, lengthFactor)
  }
  generateWrongQuantification(lengthFactor: number): number {
    // there is no false quantification possible
    return this.generateCorrectQuantification(lengthFactor)
  }
}
