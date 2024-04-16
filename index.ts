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
  
//   main();


import { Map } from './Map';
import { ReportMaker } from './reportMaker';
import { SimpleReport } from './SimpleReport';
import { ComplexReport } from './ComplexReport';

function main() {
  const map = new Map('./data.json');
  console.log("Initial Map:");
  map.printMap();

  const currentIntakeAge = 50;
  map.registerForShots(currentIntakeAge);

  console.log("\nMap After Registering for Shots:");
  map.printMap();

  const simpleReport = new SimpleReport(map.getData());
  const simpleReportMaker = new ReportMaker(simpleReport);
  simpleReportMaker.printDetails();

  const complexReport = new ComplexReport(map.getData());
  const complexReportMaker = new ReportMaker(complexReport);
  complexReportMaker.printDetails();
}

main();;

