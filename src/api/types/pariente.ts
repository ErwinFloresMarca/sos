import { Usuario } from './usuario';

export interface IPariente {
  id: number;
  parentId: number;
  usuarioId: number;
  parentType: string;
  parent?: Usuario;
}

export class Pariente implements IPariente {
  id: number;
  parentId: number;
  usuarioId: number;
  parentType: string;
  parent?: Usuario;

  constructor(object: IPariente) {
    this.id = object.id;
    this.parentId = object.parentId;
    this.usuarioId = object.usuarioId;
    this.parentType = object.parentType;
    this.parent = object.parent;
  }
}
