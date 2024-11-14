# Test Cases

### TC1: Create an expense transaction

Goal: Verify that the user can create an expense transaction for each expense category.

#### Steps:
1. Click on the "Create new expense transaction" button.
2. Select the category "household" from the dropdown.
3. Enter a valid amount.
4. Select a date.
5. Click the "Create" button to submit the form.
6. Repeat steps 2–5 for categories "transport," "food," and "other."

#### Expected result:
- An expense transaction for each category appears in the transaction list with the correct details.

### TC2: Create an income transaction

Goal: Verify that the user can create an income transaction for each income category.

#### Steps:
1. Click on the "Create new income transaction" button.
2. Select the category "salary" from the dropdown.
3. Enter a valid amount.
4. Select a date.
5. Click the "Create" button to submit the form.
6. Repeat steps 2–5 for categories "gift" and "other."

#### Expected result:
- An income transaction for each category appears in the transaction list with the correct details.

### TC3: View All Transactions

Goal: Verify that the user can view a list of all transactions.

#### Steps:
1. Add multiple transactions (both income and expense).
2. Click on the "Display all transactions" button.

#### Expected result:
- All transactions (income and expense) are displayed in the list with accurate details for each transaction.

### TC4: View Transactions in a Given Time Span

Goal: Verify that the user can view transactions within a specific date range.

#### Steps:
1. Ensure there are transactions with dates spanning different months.
2. Click on the filter option for transactions.
3. Enter a start date and an end date within the filter fields.
4. Click "Apply" or "Filter" to view the results.

#### Expected result:
- Only the transactions that fall within the time span are displayed in the list.


### TC5: Generate a Report

Goal: Verify that the user can generate a financial report that includes income, expenses, and summaries for each category.

#### Steps:
1. Add multiple transactions with different categories and types (income and expense).
2. Click on the "Generate Report" button.

#### Expected Result:
- A report is displayed with total income, total expenses, and categorized breakdowns based on the transaction data.

### TC6: Download Report as PDF

Goal: Verify that the user can download the generated report as a PDF file.

#### Steps:
1. Click on the "Generate Report" button to display a report.
2. Click the "Download as PDF" button.
3. Confirm that a PDF file is downloaded to the device.
4. Open the PDF file and verify that it contains the correct report details (total income, total expenses, and summarized transaction categories).

#### Expected Result:
- A PDF file is successfully downloaded with correct report data.

### TC7: Data Persistence on Reload

Goal: Verify that transaction data persists when the application is reloaded.

#### Steps:
1. Add several transactions (both income and expense).
2. Reload or refresh the application page.
3. Click on "Display all transactions" to view the transaction list.

#### Expected Result:
- All previously entered transactions are displayed after the page reload, showing that data has persisted.