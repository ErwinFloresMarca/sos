import { Position } from './position';
import { Usuario } from './usuario';

export interface IRastreo {
  id: number;
  usuarioId: number;
  estado: boolean;
  updatedAt: string;
  createdAt: string;
  positions?: Position[];
  usuario?: Usuario;
}

export class Rastreo implements IRastreo {
  id: number;

  usuarioId: number;

  estado: boolean;

  updatedAt: string;

  createdAt: string;

  positions?: Position[];

  usuario?: Usuario;

  constructor(object: IRastreo) {
    this.id = object.id;
    this.usuarioId = object.usuarioId;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.positions = object.positions;
    this.usuario = object.usuario;
  }
}
