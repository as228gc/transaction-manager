import { ExpenseCategory, IncomeCategory } from "tra-ma";

export class CategoryManager {
  private incomeCategories: Array<string>
  private expenseCategories: Array<string>

  constructor () {
    this.incomeCategories = Object.values(IncomeCategory)
    this.expenseCategories = Object.values(ExpenseCategory)
  }

  public getIncomeCategories (): Array<string> {
    return [...this.incomeCategories]
  }

  public getExpenseCategories (): Array<string> {
    return [...this.expenseCategories]
  }
}