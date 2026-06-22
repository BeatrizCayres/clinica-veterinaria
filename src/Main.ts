import { ClinicaService } from "./service/ClinicaService";
import { Veterinario } from "./model/Veterinario";
import { Cachorro } from "./model/Cachorro";
import { Gato } from "./model/Gato";
import { Prontuario } from "./model/Prontuario";
import { Estoque } from "./model/Estoque";
import { EspecialidadeVeterinaria, Especie, Porte } from "./enums";

class Main {
  static main(): void {
    const clinica = new ClinicaService();

    // ---- Cadastro de veterinários ----------------------------------------
    const v1 = new Veterinario(
      "Dr. Carlos",
      "12345678901",
      "51999990001",
      "carlos@clinica.com",
      "CRMV-1234",
      EspecialidadeVeterinaria.CLINICO
    );
    const v2 = new Veterinario(
      "Dra. Ana",
      "98765432100",
      "51999990002",
      "ana@clinica.com",
      "CRMV-5678",
      EspecialidadeVeterinaria.CIRURGIAO
    );

    clinica.veterinarios.push(v1);
    clinica.veterinarios.push(v2);

    // ---- Cadastro de animais ---------------------------------------------
    const dog = new Cachorro(
      "Rex",
      3,
      12.5,
      Especie.CACHORRO,
      Porte.GRANDE,
      "Labrador",
      false,
      "João Silva",
      "51988880001",
      "11122233344"
    );

    const cat = new Gato(
      "Mimi",
      2,
      4.0,
      Especie.GATO,
      Porte.PEQUENO,
      true,
      "curta",
      "Maria Souza",
      "51988880002",
      "55566677788"
    );

    clinica.animais.push(dog);
    clinica.animais.push(cat);

    // ---- Agendamento -----------------------------------------------------
    const c1 = clinica.agendarConsulta("Rex", "Dr. Carlos", new Date());
    const c2 = clinica.agendarConsulta("Mimi", "Dra. Ana", new Date());

    // ---- Pagamento -------------------------------------------------------
    c1.registrarPagamento("pix");

    try {
      c2.registrarPagamento("Cartao");
    } catch (e) {
      console.log("Erro no pagamento: " + (e as Error).message);
    }

    // ---- Desconto --------------------------------------------------------
    const desconto = clinica.calcularDesconto(c1);
    console.log("Desconto para Rex: R$" + desconto);

    // ---- Prontuário ------------------------------------------------------
    const p = new Prontuario(1, dog);
    p.setDiagnostico("Otite leve");
    p.setPrescricao("Antifúngico tópico");
    p.adicionarObservacao("Animal agitado durante consulta");
    p.enviarEmail();

    // ---- Estoque ---------------------------------------------------------
    const estoque = new Estoque();
    const med = new Estoque.Medicamento(
      "Amoxicilina",
      "antibiotico",
      25.0,
      4,
      "2025-12-01"
    );
    estoque.adicionar(med);

    estoque.alertarEstoqueBaixo();

    estoque.getItens().splice(0);
    console.log("Itens após clear externo: " + estoque.getItens().length);

    // ---- Relatórios ------------------------------------------------------
    clinica.gerarRelatorioConsultas();
    clinica.gerarRelatorioAnimais();

    // ---- Cancelamento -------------------------------
    clinica.cancelarConsulta(999, "ID inexistente");
  }
}

Main.main();
