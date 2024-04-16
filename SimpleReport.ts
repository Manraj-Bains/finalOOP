
import { CityData } from './Map';
import { IReport } from './IReport';

export class SimpleReport implements IReport {
  private _mapData: CityData;

  constructor(mapData: CityData) {
    this._mapData = mapData;
  }

  public printDetails(): void {
    console.log('Simple Report:');
    Object.entries(this._mapData).forEach(([cityName, city]) => {
      city.clinics.forEach(clinic => {
        console.log(`${clinic.name} - People in queue: ${clinic.queue.size()}`);
      });
    });
  }
}
