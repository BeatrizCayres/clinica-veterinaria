import { Consulta } from "../model/Consulta";
import { Animal } from "../model/Animal";

export class RelatorioService {
  constructor(
    private consultas: Consulta[],
    private animais: Animal[]
  ) {}

  gerarRelatorioConsultas(): void {
    console.log("===== RELATÓRIO DE CONSULTAS =====");

    let receita = 0;

    this.consultas.forEach(c => {
      c.imprimirResumo();
      if (c.getPago()) receita += c.valorConsulta;
    });

    console.log("Receita total: R$" + receita);
  }

  gerarRelatorioAnimais(): void {
    console.log("===== ANIMAIS =====");

    this.animais.forEach(a => {
      a.imprimirFicha();
    });
  }
}