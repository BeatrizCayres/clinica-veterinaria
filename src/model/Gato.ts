import { Especie, Porte } from "../enums";
import { Animal } from "./Animal";

export class Gato extends Animal {
  ehCastrado: boolean;
  pelagem: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    especie: Especie,
    porte: Porte,
    ehCastrado: boolean,
    pelagem: string,
    nomeDono: string,
    telefoneDono: string,
    cpfDono: string
  ) {
    super(nome, idade, peso, especie, porte, nomeDono, telefoneDono, cpfDono);
    this.ehCastrado = ehCastrado;
    this.pelagem = pelagem;
  }
}
