import { Consulta } from "../model/Consulta";
import { StatusConsulta } from "../enums";

export class CancelamentoService {
  constructor(private consultas: Consulta[]) {}

  cancelarConsulta(id: number, motivo: string): void {
    const consulta = this.consultas.find(c => c.id === id);

    if (!consulta) return;

    consulta.cancelar(motivo);
    consulta.setStatus(StatusConsulta.CANCELADA);
  }
}