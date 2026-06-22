import { Animal } from "../model/Animal";
import { Consulta } from "../model/Consulta";
import { Veterinario } from "../model/Veterinario";

export class ClinicaService {
  animais: Animal[] = [];
  consultas: Consulta[] = [];
  veterinarios: Veterinario[] = [];
  proximoIdConsulta: number = 1;

  // -----------------------------------------------------------------------
  // AGENDAMENTO
  // -----------------------------------------------------------------------

  agendarConsulta(nomeAnimal: string, nomeVeterinario: string, dataHora: Date): Consulta {
    let animal: Animal | undefined;
    let vet: Veterinario | undefined;

    for (const a of this.animais) {
      if (a.getNome() === nomeAnimal) {
        animal = a;
        break;
      }
    }

    for (const v of this.veterinarios) {
      if (v.getNomePessoa() === nomeVeterinario) {
        vet = v;
        break;
      }
    }

    if (animal === undefined) {
      throw new Error("Animal não encontrado: " + nomeAnimal);
    }

    if (vet === undefined) {
      throw new Error("Veterinário não encontrado: " + nomeVeterinario);
    }

    if (!vet.estaDisponivel()) {
      throw new Error("Veterinário indisponível");
    }

    const c = new Consulta(
      this.proximoIdConsulta++,
      animal,
      nomeVeterinario,
      dataHora,
      150.0
    );
    this.consultas.push(c);

    return c;
  }

  // -----------------------------------------------------------------------
  // CANCELAMENTO
  // -----------------------------------------------------------------------

  cancelarConsulta(id: number, motivo: string): void {
    for (const c of this.consultas) {
      if (c.id === id) {
        c.cancelar(motivo);

        console.log(
          "SMS enviado para " +
            c.animal.getNomeDono() +
            ": sua consulta foi cancelada. Motivo: " +
            motivo
        );
        return;
      }
    }
  }

  // -----------------------------------------------------------------------
  // RELATÓRIO
  // -----------------------------------------------------------------------

  gerarRelatorioConsultas(): void {
    console.log("===== RELATÓRIO DE CONSULTAS =====");
    let total = 0;
    let receita = 0;

    for (const c of this.consultas) {
      c.imprimirResumo();
      if (c.getPago()) receita += c.valorConsulta;
      total++;
    }

    console.log("Total: " + total + " | Receita: R$" + receita);
  }

  gerarRelatorioAnimais(): void {
    console.log("===== ANIMAIS CADASTRADOS =====");
    for (const a of this.animais) {
      a.imprimirFicha();
    }
  }

  // -----------------------------------------------------------------------
  // DESCONTO
  // -----------------------------------------------------------------------

  calcularDesconto(c: Consulta): number {
    if (
      c.animal.getEspecie() === "cachorro" &&
      c.valorConsulta > 200
    ) {
      return c.valorConsulta * 0.1;
    }
    if (c.animal.getEspecie() === "gato") {
      return c.valorConsulta * 0.05;
    }

    return 0;
  }

  // -----------------------------------------------------------------------
  // BUSCA
  // -----------------------------------------------------------------------

  buscarAnimal(nome: string): Animal | undefined {
    for (const a of this.animais) {
      if (a.getNome() === nome) return a;
    }

    return undefined;
  }

  buscarVeterinario(nome: string): Veterinario | undefined {
    for (const v of this.veterinarios) {
      if (v.getNomePessoa() === nome) return v;
    }
    
    return undefined;
  }
}
