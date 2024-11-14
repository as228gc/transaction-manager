import { Report } from "tra-ma"
import "./ReportView.css"

interface ReportViewProps {
  report: Report
}

/**
 * ReportView component 
 *
 * @param param - ReportViewProps
 * @returns - JSX.Element
 */
export const ReportView: React.FC<ReportViewProps> = ({ report }) => {

  return (
    <div className="bordered content-start m-2 p-2">
      <h2>Start date: </h2>
      <p>{report.getStartDate().toISOString().slice(0,10)}</p>
      <h2>End date</h2>
      <p>{report.getEndDate().toISOString().slice(0, 10)}</p>
      <h2>Total income</h2>
      <p>{report.getTotalIncome()}</p>
      <h2>Total expenses</h2>
      <p>{report.getTotalExpenses()}</p>

      <h2>Expenses by category</h2>
      <ul>
        {
          report.getExpensesByCategory().map((item) => {
            return (
              <li className="content-start">
                <p>{item.category}: {item.totalAmount}</p>
              </li>
            )
          })
        }
      </ul>

      <h2>Income by category</h2>
      <ul>
        {
          report.getIncomeByCategory().map((item) => {
            return (
              <li className="content-start">
                <p>{item.category}: {item.totalAmount}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
