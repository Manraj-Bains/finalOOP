"use strict";
// async function main() {
//     const map = /* something */
//     map.printMap();
//     console.log("---End of Map---")
//     map.registerForShots();
//     const report = new ReportMaker(new ComplexReport(map));
//     report.printDetails();
//     console.log("---End of Report---")
//     map.printMap();
//     console.log("---End of Map---")
//   }
Object.defineProperty(exports, "__esModule", { value: true });

const Map_1 = require("./Map");
const reportMaker_1 = require("./reportMaker");
const SimpleReport_1 = require("./SimpleReport");
import { ComplexReport } from './ComplexReport';
function main() {
    const map = new Map_1.Map('./data.json');
    console.log("Initial Map:");
    map.printMap();
    const currentIntakeAge = 50;
    map.registerForShots(currentIntakeAge);
    console.log("\nMap After Registering for Shots:");
    map.printMap();
    const simpleReport = new SimpleReport_1.SimpleReport(map.getData());
    const simpleReportMaker = new reportMaker_1.ReportMaker(simpleReport);
    simpleReportMaker.printDetails();
    const complexReport = new ComplexReport(map.getData());
    const complexReportMaker = new ReportMaker(complexReport);
    complexReportMaker.printDetails();
}
main();
;
