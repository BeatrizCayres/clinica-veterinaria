import { Consulta } from "../model/Consulta";

export class NotificacaoService {
  enviarCancelamento(c: Consulta, motivo: string): void {
    console.log(
      "SMS enviado para " +
        c.animal.getNomeDono() +
        ": consulta cancelada. Motivo: " +
        motivo
    );
  }
}