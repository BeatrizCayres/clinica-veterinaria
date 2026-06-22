import { Consulta } from "../model/Consulta";
import { Especie } from "../enums";

export class DescontoService {
  calcularDesconto(c: Consulta): number {
    if (c.animal.getEspecie() === Especie.CACHORRO && c.valorConsulta > 200) {
      return c.valorConsulta * 0.1;
    }

    if (c.animal.getEspecie() === Especie.GATO) {
      return c.valorConsulta * 0.05;
    }

    return 0;
  }
}