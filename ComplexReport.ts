import { IReport } from './IReport';
import { CityData } from './Map'; 

export class ComplexReport implements IReport {
  private _mapData: CityData;

  constructor(mapData: CityData) {
    this._mapData = mapData;
  }

  public printDetails(): void {
    console.log('Complex Report:');
    Object.entries(this._mapData).forEach(([cityName, city]) => {
      city.clinics.forEach(clinic => {
        const waitTime = clinic.queue.getCurrentWaitTime();
        console.log(`${clinic.name} - Average Wait Time: ${waitTime} mins, People in queue: ${clinic.queue.size()}`);
      });
    });
  }
}
