export interface IViolencia {
  id: number;
  img: string;
  titulo: string;
  descripcion: string;
  ejemplos?: string[];
  pasos: Array<PasoType>;
  contactos: Array<any>;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export type PasoType = {
  descripcion?: string;
  titulo?: string;
};

export type ContactoType = {
  entidades: Array<EntidadType>;
  titulo: string;
};
export type EntidadType = {
  nombre: string;
  direccion: string;
  telefono?: string;
  ubicacion?: { lat: number; lng: number };
};

export class Violencia implements IViolencia {
  id: number;
  img: string;
  titulo: string;
  descripcion: string;
  ejemplos?: string[];
  pasos: Array<PasoType>;
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
