import { Animal } from "../model/Animal";
import { Veterinario } from "../model/Veterinario";

export class BuscaService {
  constructor(
    private animais: Animal[],
    private veterinarios: Veterinario[]
  ) {}

  buscarAnimal(nome: string): Animal | undefined {
    return this.animais.find(a => a.getNome() === nome);
  }

  buscarVeterinario(nome: string): Veterinario | undefined {
    return this.veterinarios.find(v => v.getNomePessoa() === nome);
  }
}