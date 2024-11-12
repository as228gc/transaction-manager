export class IdGenerator {
  private idCounter: number;

  constructor(initialCounter: number = 0) {
    this.idCounter = initialCounter
  }

  public generateTransactionId():string {
    const currentDate = new Date().toISOString();
    const key = `transaction-${currentDate}-${this.idCounter}`;
    console.log(key)
    this.idCounter++;
    return key;
  }
}