"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.Map = void 0;
// Map.ts
const fs_1 = __importDefault(require("fs"));
class Queue {
    constructor() {
        this.people = [];
    }
    enqueue(person) {
        this.people.push(person);
    }
    dequeue() {
        return this.people.shift();
    }
    size() {
        return this.people.length;
    }
    getCurrentWaitTime() {
        return this.size() * 15;
    }
}
exports.Queue = Queue;
class Map {
    constructor(jsonFileName) {
        const rawData = fs_1.default.readFileSync(jsonFileName, 'utf8');
        this._mapData = JSON.parse(rawData);
    }
    getData() {
        return this._mapData;
    }
    registerForShots(currentIntakeAge) {
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
        const mapRepresentation = [];
        Object.entries(this._mapData).forEach(([cityName, city], cityIndex) => {
            const cityMap = Array(3).fill('x');
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
exports.Map = Map;
