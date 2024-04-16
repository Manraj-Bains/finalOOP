"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportMaker = void 0;

class ReportMaker {
    constructor(reportType) {
        this.report = reportType;
    }
    printDetails() {
        this.report.printDetails();
    }
}
exports.ReportMaker = ReportMaker;
