export class Pessoa {
  protected nome: string;
  protected cpf: string;
  protected telefone: string;
  protected email: string;

  constructor(nome: string, cpf: string, telefone: string, email: string) {
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.email = email;
  }

  getNomePessoa(){ return this.nome; }

  static validarCPF(cpf: string): boolean {
    return cpf !== null && cpf.length === 11;
  }
}
