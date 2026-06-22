export type Especie = "cachorro" | "gato" | "passaro" | "reptil";
export type Porte = "pequeno" | "medio" | "grande";

export class Animal {
  protected nome: string;
  protected idade: number;
  protected peso: number;
  protected especie: Especie;
  protected porte: Porte;
  protected nomeDono: string;
  protected telefoneDono: string;
  protected cpfDono: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    especie: Especie,
    porte: Porte,
    nomeDono: string,
    telefoneDono: string,
    cpfDono: string
  ) {
    this.nome = nome;
    this.idade = idade;
    this.peso = peso;
    this.especie = especie;
    this.porte = porte;
    this.nomeDono = nomeDono;
    this.telefoneDono = telefoneDono;
    this.cpfDono = cpfDono;
  }

  getNome(){ return this.nome; }

  getPeso(){ return this.peso; }

  getNomeDono(){ return this.nomeDono; }

  getEspecie(){ return this.especie; }

  getCategoriaVacina(): string {
    if (this.especie === "cachorro") {
      if (this.porte === "pequeno") return "V8-pequeno";
      if (this.porte === "medio") return "V8-medio";
      return "V10-grande";
    } else if (this.especie === "gato") {
      return "V4-felino";
    }

    return "";
  }

  imprimirFicha(): void {
    console.log("========== FICHA DO ANIMAL ==========");
    console.log("Nome   : " + this.nome);
    console.log("Espécie: " + this.especie);
    console.log("Porte  : " + this.porte);
    console.log("Peso   : " + this.peso + " kg");
    console.log("Idade  : " + this.idade + " anos");
    console.log(
      "Dono   : " +
        this.nomeDono +
        " | CPF: " +
        this.cpfDono +
        " | Tel: " +
        this.telefoneDono
    );
    console.log("=====================================");
  }
}
