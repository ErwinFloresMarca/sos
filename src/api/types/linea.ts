export interface ILinea {
  id: number;
  imgId?: number;
  titulo: string;
  numero: string;
  tipo: string;
  descripcion?: string;
}

export class Linea implements ILinea {
  id: number;
  imgId?: number;
  titulo: string;
  numero: string;
  tipo: string;
  descripcion?: string;

  constructor(object: ILinea) {
    this.id = object.id;
    this.titulo = object.titulo;
    this.imgId = object.imgId;
    this.numero = object.numero;
    this.descripcion = object.descripcion;
    this.tipo = object.tipo;
  }
}
