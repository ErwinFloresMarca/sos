export interface IRastreo {
  id: number;
  usuarioId: number;
  estado: boolean;
  updatedAt: string;
  createdAt: string;
}

export class Rastreo implements IRastreo {
  id: number;

  usuarioId: number;

  estado: boolean;

  updatedAt: string;

  createdAt: string;

  constructor(object: IRastreo) {
    this.id = object.id;
    this.usuarioId = object.usuarioId;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
  }
}
