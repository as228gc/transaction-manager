/**
 * A class that generates unique ids.
 */
export class IdGenerator {
  private idCounter: number;

  /**
   * Creates a new instance of the IdGenerator.
   *
   * @param initialCounter The initial counter value
   */
  constructor(initialCounter: number = 0) {
    this.idCounter = initialCounter
  }

  /**
   * Generates a transaction id.
   *
   * @returns A generated transaction id
   */
  public generateTransactionId():string {
    const currentDate = new Date().toISOString();
    const key = `transaction-${currentDate}-${this.idCounter}`;
    console.log(key)
    this.idCounter++;
    return key;
  }
}