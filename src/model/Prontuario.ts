import { Animal } from "./Animal";

interface Registravel {
  registrar(): void;
  atualizar(): void;
  deletar(): void;
  imprimir(): void;
  exportarCSV(): void;
  enviarEmail(): void;
}

export class Prontuario implements Registravel {
  readonly id: number;
  animal: Animal;
  private observacoes: string[] = [];
  readonly dataCriacao: Date;
  peso: number;
  private diagnostico?: string;
  private prescricao?: string;

  constructor(id: number, animal: Animal) {
    this.id = id;
    this.animal = animal;
    this.dataCriacao = new Date();
    this.peso = animal.getPeso();
  }

  getDiagnostico(){ return this.diagnostico; }
  setDiagnostico(diagnostico:string){ return this.diagnostico = diagnostico; }

  getPrescricao(){ return this.prescricao; }
  setPrescricao(prescricao:string){ return this.prescricao = prescricao; }

  getObservacao(){ return this.observacoes; }

  registrar(): void {
    console.log("Prontuário #" + this.id + " registrado.");
  }

  atualizar(): void {
    console.log("Prontuário atualizado.");
  }

  deletar(): void {
  }

  imprimir(): void {
    console.log(
      "Prontuário #" +
        this.id +
        " | Animal: " +
        this.animal.getNome() +
        " | Diagnóstico: " +
        this.diagnostico
    );
  }

  exportarCSV(): void {

  }

  enviarEmail(): void {
    console.log(
      "Enviando prontuário por email para " + this.animal.getNomeDono()
    );
  }

  adicionarObservacao(obs: string): void {
    this.observacoes.push(obs);
  }
}
