import { Animal } from "../model/Animal";
import { Veterinario } from "../model/Veterinario";
import { Consulta } from "../model/Consulta";

export class AgendamentoService {
  constructor(
    private animais: Animal[],
    private veterinarios: Veterinario[],
    private consultas: Consulta[],
    private proximoIdConsulta: number
  ) {}

  agendarConsulta(
    nomeAnimal: string,
    nomeVeterinario: string,
    dataHora: Date
  ): Consulta {
    const animal = this.animais.find(a => a.getNome() === nomeAnimal);
    const vet = this.veterinarios.find(v => v.getNomePessoa() === nomeVeterinario);

    if (!animal) throw new Error("Animal não encontrado");
    if (!vet) throw new Error("Veterinário não encontrado");
    if (!vet.estaDisponivel()) throw new Error("Veterinário indisponível");

    const consulta = new Consulta(
      this.proximoIdConsulta,
      animal,
      vet.getNomePessoa(),
      dataHora,
      150
    );

    this.consultas.push(consulta);

    return consulta;
  }
}