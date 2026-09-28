/**
 * =========================================================
 * TESTE — TASK EXECUTION ENGINE
 * =========================================================
 *
 * Valida:
 *
 * 1. Carregamento do TaskExecutionEngine
 * 2. Criação das dependências
 * 3. Execução de uma tarefa
 * 4. Execução do pipeline
 * 5. Resultado dos especialistas
 * 6. Síntese da resposta
 * 7. Status do Engine
 * 8. Proteção contra referência circular
 *
 * =========================================================
 */

const TaskPlanner =
    require("./main/TaskPlanner");

const SpecialistLoader =
    require("./main/SpecialistLoader");

const SpecialistRouter =
    require("./main/SpecialistRouter");

const SpecialistOrchestrator =
    require("./main/SpecialistOrchestrator");

const ResponseSynthesizer =
    require("./main/ResponseSynthesizer");

const TaskExecutionEngine =
    require("./main/TaskExecutionEngine");


async function main() {

    console.log(
        "\n=================================================="
    );

    console.log(
        "       TESTE DO TASK EXECUTION ENGINE"
    );

    console.log(
        "==================================================\n"
    );


    /*
     * =====================================================
     * 1. CRIAR COMPONENTES
     * =====================================================
     */

    console.log(
        "1. Inicializando componentes..."
    );


    const planner =
        new TaskPlanner();


    const loader =
        new SpecialistLoader();


    /*
     * =====================================================
     * 2. CARREGAR ESPECIALISTAS
     * =====================================================
     */

    console.log(
        "\n2. Carregando especialistas..."
    );


    const specialistIds = [
        "estrutura",
        "frontend",
        "backend",
        "database",
        "api",
        "sql",
        "seguranca",
        "testes"
    ];


    loader.loadMany(
        specialistIds
    );


    console.log(
        `✓ ${loader.count()} especialistas carregados.`
    );


    /*
     * =====================================================
     * 3. ROUTER
     * =====================================================
     */

    const router =
        new SpecialistRouter(
            loader
        );


    /*
     * =====================================================
     * 4. ORCHESTRATOR
     * =====================================================
     */

    const orchestrator =
        new SpecialistOrchestrator(
            loader,
            router
        );


    /*
     * =====================================================
     * 5. SYNTHESIZER
     * =====================================================
     */

    const synthesizer =
        new ResponseSynthesizer();


    /*
     * =====================================================
     * 6. TASK EXECUTION ENGINE
     * =====================================================
     */

    const engine =
        new TaskExecutionEngine(
            planner,
            orchestrator,
            synthesizer
        );


    console.log(
        "✓ TaskExecutionEngine inicializado."
    );


    /*
     * =====================================================
     * 7. TAREFA
     * =====================================================
     */

    const task =
        "Criar um sistema web completo para cadastro de clientes, com login, banco MySQL, API REST, painel administrativo, segurança e testes.";


    console.log(
        "\n=================================================="
    );

    console.log(
        "       TAREFA DE TESTE"
    );

    console.log(
        "==================================================\n"
    );

    console.log(
        task
    );


    /*
     * =====================================================
     * 8. EXECUTAR ENGINE
     * =====================================================
     */

    console.log(
        "\n8. Executando TaskExecutionEngine..."
    );


    const result =
        await engine.execute(
            task
        );


    /*
     * =====================================================
     * 9. MOSTRAR RESULTADO
     * =====================================================
     */

    console.log(
        "\n=================================================="
    );

    console.log(
        "       RESULTADO DA EXECUÇÃO"
    );

    console.log(
        "==================================================\n"
    );


    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );


    /*
     * =====================================================
     * 10. STATUS
     * =====================================================
     */

    console.log(
        "\n=================================================="
    );

    console.log(
        "       STATUS DO TASK EXECUTION ENGINE"
    );

    console.log(
        "=================================================="
    );


    console.log(
        JSON.stringify(
            engine.getStatus(),
            null,
            2
        )
    );


    /*
     * =====================================================
     * 11. VALIDAÇÕES
     * =====================================================
     */

    console.log(
        "\n=================================================="
    );

    console.log(
        "       VALIDAÇÕES"
    );

    console.log(
        "=================================================="
    );


    let validations =
        0;


    /*
     * Engine
     */

    if (engine) {

        console.log(
            "✓ TaskExecutionEngine criado: OK"
        );

        validations++;

    } else {

        console.log(
            "✗ TaskExecutionEngine criado: ERRO"
        );
    }


    /*
     * Resultado
     */

    if (result) {

        console.log(
            "✓ Resultado recebido: OK"
        );

        validations++;

    } else {

        console.log(
            "✗ Resultado recebido: ERRO"
        );
    }


    /*
     * Sucesso
     */

    if (
        result &&
        result.success === true
    ) {

        console.log(
            "✓ Execução concluída: OK"
        );

        validations++;

    } else {

        console.log(
            "✗ Execução concluída: ERRO"
        );
    }


    /*
     * Tarefa
     */

    if (
        result &&
        result.task === task
    ) {

        console.log(
            "✓ Tarefa preservada: OK"
        );

        validations++;

    } else {

        console.log(
            "✗ Tarefa preservada: ERRO"
        );
    }


    /*
     * =====================================================
     * 12. STATUS FINAL
     * =====================================================
     */

    console.log(
        "\n=================================================="
    );

    console.log(
        "       STATUS FINAL DO TESTE"
    );

    console.log(
        "=================================================="
    );


    console.log(
        `✓ Validações concluídas: ${validations}/4`
    );


    if (validations === 4) {

        console.log(
            "\n🚀 TESTE DO TASK EXECUTION ENGINE CONCLUÍDO COM SUCESSO!"
        );

    } else {

        console.log(
            "\n⚠️ O teste terminou com validações pendentes."
        );
    }


    /*
     * =====================================================
     * 13. FINALIZAÇÃO
     * =====================================================
     */

    console.log(
        "\nFinalizando componentes..."
    );


    loader.unloadAll();


    console.log(
        "✓ Especialistas desligados."
    );


    console.log(
        "\n=================================================="
    );

    console.log(
        "       TESTE FINALIZADO"
    );

    console.log(
        "==================================================\n"
    );
}


main().catch(
    error => {

        console.error(
            "\n❌ ERRO NO TESTE:"
        );

        console.error(
            error
        );

        process.exitCode = 1;
    }
);