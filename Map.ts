// Map.ts
import fs from 'fs';

type Person = {
  phn: string;
  fullName: string;
  isVaccinated: boolean;
  age: number;
};

type Household = {
  blockNum: number;
  inhabitants: Person[];
};

type Clinic = {
  name: string;
  staff: number;
  blockNum: number;
  queue: Queue;  
};

type CityData = {
  [city: string]: {
    households: Household[];
    clinics: Clinic[];
  };
};

class Queue {
  private people: Person[] = [];

  enqueue(person: Person) {
    this.people.push(person);
  }

  dequeue(): Person | undefined {
    return this.people.shift();
  }

  size(): number {
    return this.people.length;
  }

  getCurrentWaitTime(): number {
  
    return this.size() * 15;
  }
}

class Map {
  private _mapData: CityData;

  constructor(jsonFileName: string) {
    const rawData = fs.readFileSync(jsonFileName, 'utf8');
    this._mapData = JSON.parse(rawData);
  }

  public getData(): CityData {
    return this._mapData;  
  }

  registerForShots(currentIntakeAge: number) {
    for (const city of Object.values(this._mapData)) {
      for (const household of city.households) {
        for (const person of household.inhabitants) {
          if (!person.isVaccinated && person.age >= currentIntakeAge) {
            const nearestClinic = city.clinics.reduce((prev, curr) => {
              return (Math.abs(curr.blockNum - household.blockNum) < Math.abs(prev.blockNum - household.blockNum)) ? curr : prev;
            });
            nearestClinic.queue.enqueue(person);
            person.isVaccinated = true; 
          }
        }
      }
    }
  }

  printMap() {
    const mapRepresentation: string[] = [];

    Object.entries(this._mapData).forEach(([cityName, city], cityIndex) => {
      const cityMap: string[] = Array(3).fill('x'); 

      city.households.forEach(household => {
        const symbol = household.inhabitants.some(person => !person.isVaccinated) ? 'H' : 'F';
        cityMap[household.blockNum] = symbol;
      });

      city.clinics.forEach(clinic => {
        cityMap[clinic.blockNum] = 'C';
      });

      mapRepresentation[cityIndex] = cityMap.join(',') + ` // ${cityName}`;
    });

    console.log(mapRepresentation.join('\n'));
  }
}

export { Map, Person, Household, Clinic, Queue, CityData };
