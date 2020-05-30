import { Coordinates } from './coordinates';

export class Offer {
    public id: String;
    public title: string;
    public coordinates: Coordinates;
    public offerFile: File;
    public description: string; 
    public offerType: string;
}