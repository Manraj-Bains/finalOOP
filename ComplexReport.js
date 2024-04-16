"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexReport = void 0;
class ComplexReport {
    constructor(mapData) {
        this._mapData = mapData;
    }
    printDetails() {
        console.log('Complex Report:');
        for (const cityName in this._mapData) {
            const city = this._mapData[cityName];
            city.clinics.forEach(clinic => {
                const waitTime = clinic.queue.getCurrentWaitTime();
                console.log(`${clinic.name} - Average Wait Time: ${waitTime} mins, People in queue: ${clinic.queue.size()}`);
            });
        }
    }
}
exports.ComplexReport = ComplexReport;
