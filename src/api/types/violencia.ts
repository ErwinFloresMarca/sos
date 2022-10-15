export interface IViolencia {
  id: number;
  img: string;
  titulo: string;
  descripcion: string;
  ejemplos?: string[];
  pasos: Array<any>;
  contactos: Array<any>;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export class Violencia implements IViolencia {
  id: number;
  img: string;
  titulo: string;
  descripcion: string;
  ejemplos?: string[];
  pasos: Array<any>;
  contactos: Array<any>;
  updatedAt: string | Date;
  createdAt: string | Date;

  constructor(object: IViolencia) {
    this.id = object.id;
    this.img = object.img;
    this.titulo = object.titulo;
    this.descripcion = object.descripcion;
    this.contactos = object.contactos;
    this.pasos = object.pasos;
    this.ejemplos = object.ejemplos;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
  }
}
