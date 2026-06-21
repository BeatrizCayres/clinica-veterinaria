import { Animal, Porte } from "./Animal";

export class Cachorro extends Animal {
  raca: string;
  vacinado: boolean;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    porte: Porte,
    raca: string,
    vacinado: boolean,
    nomeDono: string,
    telefoneDono: string,
    cpfDono: string
  ) {
    super(nome, idade, peso, "cachorro", porte, nomeDono, telefoneDono, cpfDono);
    this.raca = raca;
    this.vacinado = vacinado;
  }

  override getCategoriaVacina(): string {
    return super.getCategoriaVacina() + (this.vacinado ? "-reforco" : "-primaria");
  }

  override imprimirFicha(): void {
    super.imprimirFicha();
    console.log("Raça   : " + this.raca);
    console.log("Vacina : " + (this.vacinado ? "Em dia" : "Pendente"));
  }
}
