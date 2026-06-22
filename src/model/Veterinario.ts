import { Pessoa } from "./Pessoa";
import { Consulta } from "./Consulta";
import { EspecialidadeVeterinaria, StatusConsulta, TipoConsulta } from "../enums";

export class Veterinario extends Pessoa {
  readonly crmv: string;
  especialidade: EspecialidadeVeterinaria;
  private historicoConsultas: Consulta[] = [];
  private disponivel: boolean = true;

  constructor(
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    crmv: string,
    especialidade: EspecialidadeVeterinaria
  ) {
    super(nome, cpf, telefone, email);
    this.crmv = crmv;
    this.especialidade = especialidade;
  }

  estaDisponivel(): boolean {
    return this.disponivel;
  }

  calcularValorConsulta(tipoConsulta: TipoConsulta): number {
    if (this.especialidade === EspecialidadeVeterinaria.CLINICO) {
      if (tipoConsulta === TipoConsulta.ROTINA) return 150.0;
      if (tipoConsulta === TipoConsulta.EMERGENCIA) return 300.0;
    } else if (this.especialidade === EspecialidadeVeterinaria.CIRURGIAO) {
      if (tipoConsulta === TipoConsulta.ROTINA) return 250.0;
      if (tipoConsulta === TipoConsulta.EMERGENCIA) return 500.0;
    }

    return 0.0;
  }

  finalizarConsulta(c: Consulta): void {
    c.setStatus(StatusConsulta.FINALIZADA);
    this.historicoConsultas.push(c);
    this.disponivel = true;
  }
}
