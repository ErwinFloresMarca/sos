export interface IPosition {
  id: number;
  rastreoId: number;
  position: string;
  createdAt: string;
}

export class Position implements IPosition {
  id: number;

  rastreoId: number;

  position: string;

  createdAt: string;

  constructor(object: IPosition) {
    this.id = object.id;
    this.rastreoId = object.rastreoId;
    this.position = object.position;
    this.createdAt = object.createdAt;
  }
}
