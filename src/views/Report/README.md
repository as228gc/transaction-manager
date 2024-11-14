# ReportView

The ReportView component displays a financial report, including information on the total income, total expenses, and income and expenses for each transaction type category.

## Dependencies

- tra-ma: Uses the Report class to display report properties.

## Props

The ReportView component takes the following props:

- report: A Report instance containing details about the report, including start and end dates, total income, total expenses, and a summary for each transaction type category.

## Usage

Example:
```jsx
function App() {
  const report = new Report(/* Report data for contrcutor here */);

  return (
    <div>
      <ReportView report={sampleReport} />
    </div>
  )
}
```