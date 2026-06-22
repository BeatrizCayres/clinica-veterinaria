import { StatusConsulta } from "../enums";
import { Animal } from "./Animal";

export class Consulta {
  readonly id: number;
  animal: Animal;
  veterinario: string;
  readonly dataHora: Date;
  private status: StatusConsulta;
  private motivoCancelamento?: string;
  valorConsulta: number;
  private formaPagamento?: string;
  private pago: boolean;

  constructor(
    id: number,
    animal: Animal,
    veterinario: string,
    dataHora: Date,
    valorConsulta: number
  ) {
    try {
      if (animal === null) throw new Error("animal nulo");
      if (valorConsulta < 0) throw new Error("valor negativo");
      if (veterinario === null || veterinario.length === 0)
        throw new Error("sem veterinário");
    } catch (e) {
      console.log("Aviso: " + (e as Error).message);
    }

    this.id = id;
    this.animal = animal;
    this.veterinario = veterinario;
    this.dataHora = dataHora;
    this.valorConsulta = valorConsulta;
    this.status = StatusConsulta.AGENDADA;
    this.pago = false;
  }

  getPago(){ return this.pago; }

  getStatus(){ return this.status; }
  setStatus(status:StatusConsulta){ return this.status = status; }

  registrarPagamento(forma: string): void {
    if (
      forma === "pix" ||
      forma === "cartao" ||
      forma === "dinheiro"
    ) {
      this.formaPagamento = forma;
      this.pago = true;
    } else {
      throw new Error("Forma de pagamento inválida: " + forma);
    }
  }

  cancelar(motivo: string): void {
    this.status = StatusConsulta.CANCELADA;
    this.motivoCancelamento = motivo;
  }

  imprimirResumo(): void {
    console.log(
      "[Consulta #" +
        this.id +
        "] " +
        this.animal.getNome() +
        " | Vet: " +
        this.veterinario +
        " | Status: " +
        this.status +
        " | Valor: R$" +
        this.valorConsulta +
        " | Pago: " +
        (this.pago ? "Sim" : "Não")
    );
  }
}
