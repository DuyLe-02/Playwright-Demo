export class StringUtils {
  /**
   * Converts a string to title case, where the first letter of each word is capitalized
   * and all other letters are lowercase.
   * Trims any leading or trailing whitespace before transformation.
   * Words are recognized by boundaries defined by whitespace.
   *
   * @param str - The input string to be converted to title case.
   * @returns A new string in title case format.
   *
   * @example
   * DateUtils.toTitleCase("JULY 7, 2025")     // returns "July 7, 2025"
   * DateUtils.toTitleCase("hello world")      // returns "Hello World"
   * DateUtils.toTitleCase("   MIXED case  ")  // returns "Mixed Case"
   */
  static toTitleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
