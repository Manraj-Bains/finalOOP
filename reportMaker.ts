import { IReport } from './IReport';

export class ReportMaker {
  private report: IReport;

  constructor(reportType: IReport) {
    this.report = reportType;
  }

  printDetails(): void {
    this.report.printDetails();
  }
}
