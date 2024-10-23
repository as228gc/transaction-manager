import { Report } from "tra-ma";

interface ReportViewProps {
  report: Report
}

export const ReportView: React.FC<ReportViewProps> = ({report}) => {
  return(
    <div>
      <p>
        {report.toString()}
      </p>
    </div>
  )
}