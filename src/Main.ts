import { Veterinario } from "./model/Veterinario";
import { Cachorro } from "./model/Cachorro";
import { Consulta } from "./model/Consulta";
import { Gato } from "./model/Gato";
import { Prontuario } from "./model/Prontuario";
import { Estoque } from "./model/Estoque";
import { Animal } from "./model/Animal";
import { AgendamentoService } from "./service/AgendamentoService";
import { CancelamentoService } from "./service/CancelamentoService";
import { RelatorioService } from "./service/RelatorioService";
import { DescontoService } from "./service/DescontoService";
import {
  EspecialidadeVeterinaria,
  Especie,
  Porte,
} from "./enums";

class Main {
  static main(): void {
    // -------------------- ESTADO COMPARTILHADO --------------------
    const animais: Animal[] = [];
    const veterinarios: Veterinario[] = [];
    const consultas: Consulta[] = [];
    let proximoIdConsulta: number = 1;

    // -------------------- INSTANCIAR SERVICES --------------------
    const agendamentoService = new AgendamentoService(
      animais,
      veterinarios,
      consultas,
      proximoIdConsulta
    );

    const cancelamentoService = new CancelamentoService(consultas);

    const relatorioService = new RelatorioService(consultas, animais);

    const descontoService = new DescontoService();

    // -------------------- VETERINÁRIOS --------------------
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

    veterinarios.push(v1);
    veterinarios.push(v2);

    // -------------------- ANIMAIS --------------------
    const cachorro1 = new Cachorro(
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

    const gato1 = new Gato(
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

    animais.push(cachorro1);
    animais.push(gato1);

    // -------------------- AGENDAMENTO --------------------
    const c1 = agendamentoService.agendarConsulta(
      "Rex",
      "Dr. Carlos",
      new Date()
    );

    const c2 = agendamentoService.agendarConsulta(
      "Mimi",
      "Dra. Ana",
      new Date()
    );

    // -------------------- PAGAMENTO --------------------
    c1.registrarPagamento("pix");

    try {
      c2.registrarPagamento("cartao");
    } catch (e) {
      console.log("Erro no pagamento: " + (e as Error).message);
    }

    // -------------------- DESCONTO --------------------
    const desconto = descontoService.calcularDesconto(c1);
    console.log("Desconto para Rex: R$" + desconto);

    // -------------------- PRONTUÁRIO --------------------
    const p = new Prontuario(1, cachorro1);
    p.setDiagnostico("Otite leve");
    p.setPrescricao("Antifúngico tópico");
    p.adicionarObservacao("Animal agitado durante consulta");
    p.enviarEmail();

    // -------------------- ESTOQUE --------------------
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

    console.log("Itens no estoque: " + estoque.getItens().length);

    // -------------------- RELATÓRIOS --------------------
    relatorioService.gerarRelatorioConsultas();
    relatorioService.gerarRelatorioAnimais();

    // -------------------- CANCELAMENTO --------------------
    cancelamentoService.cancelarConsulta(999, "ID inexistente");
  }
}

Main.main();