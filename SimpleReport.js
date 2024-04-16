"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleReport = void 0;

class SimpleReport {
    constructor(mapData) {
        this._mapData = mapData;
    }
    printDetails() {
        console.log('Simple Report:');
        Object.entries(this._mapData).forEach(([cityName, city]) => {
            city.clinics.forEach(clinic => {
                console.log(`${clinic.name} - People in queue: ${clinic.queue.size()}`);
            });
        });
    }
}
exports.SimpleReport = SimpleReport;
