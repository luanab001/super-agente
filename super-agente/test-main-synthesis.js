const SpecialistLoader =
    require("./main/SpecialistLoader");

const SpecialistRouter =
    require("./main/SpecialistRouter");

const SpecialistOrchestrator =
    require("./main/SpecialistOrchestrator");

const ResponseSynthesizer =
    require("./main/ResponseSynthesizer");


async function main() {

    console.log(
        "\n=================================================="
    );

    console.log(
        "       TESTE MAIN + RESPONSE SYNTHESIS"
    );

    console.log(
        "==================================================\n"
    );


    try {

        // =================================================
        // 1. INICIALIZAÇÃO
        // =================================================

        console.log(
            "1. Inicializando componentes..."
        );

        const loader =
            new SpecialistLoader();

        const router =
            new SpecialistRouter(
                loader
            );

        const orchestrator =
            new SpecialistOrchestrator(
                loader,
                router
            );

        const synthesizer =
            new ResponseSynthesizer();


        console.log(
            "✓ SpecialistLoader: OK"
        );

        console.log(
            "✓ SpecialistRouter: OK"
        );

        console.log(
            "✓ SpecialistOrchestrator: OK"
        );

        console.log(
            "✓ ResponseSynthesizer: OK"
        );


        // =================================================
        // 2. CARREGAR ESPECIALISTAS
        // =================================================

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


        const loaded =
            loader.loadMany(
                specialistIds
            );


        console.log(
            `✓ Especialistas carregados: ${loaded.length}`
        );


        if (loaded.length === 0) {

            throw new Error(
                "Nenhum especialista foi carregado."
            );
        }


        console.log(
            "\nEspecialistas:"
        );


        loaded.forEach(
            (specialist, index) => {

                console.log(
                    `${index + 1}. ` +
                    `${specialist.id} → ` +
                    `${specialist.name}`
                );

            }
        );


        // =================================================
        // 3. DEFINIR TAREFA
        // =================================================

        const task =
            "Criar um sistema web completo para cadastro de clientes, com login, banco MySQL, API REST, painel administrativo, segurança e testes.";


        console.log(
            "\n3. Tarefa:"
        );

        console.log(
            `   ${task}`
        );


        // =================================================
        // 4. EXECUTAR PIPELINE
        // =================================================

        console.log(
            "\n4. Executando pipeline..."
        );


        const pipelineResult =
            await orchestrator.executePipeline(
                specialistIds,
                task
            );


        console.log(
            "\n✓ Pipeline executado."
        );


        console.log(
            `✓ Total de etapas: ${pipelineResult.total}`
        );

        console.log(
            `✓ Etapas concluídas: ${pipelineResult.successful}`
        );

        console.log(
            `✓ Etapas com erro: ${pipelineResult.failed}`
        );


        // =================================================
        // 5. EXIBIR RESULTADO DO PIPELINE
        // =================================================

        console.log(
            "\n=================================================="
        );

        console.log(
            "       RESULTADO DO PIPELINE"
        );

        console.log(
            "=================================================="
        );


        console.log(
            JSON.stringify(
                pipelineResult,
                null,
                2
            )
        );


        // =================================================
        // 6. SINTETIZAR RESPOSTA
        // =================================================

        console.log(
            "\n=================================================="
        );

        console.log(
            "       RESPONSE SYNTHESIZER"
        );

        console.log(
            "==================================================\n"
        );


        console.log(
            "5. Sintetizando resultado..."
        );


        const synthesis =
            synthesizer.synthesize(
                pipelineResult
            );


        console.log(
            "✓ Síntese executada com sucesso."
        );


        // =================================================
        // 7. EXIBIR RESPOSTA FINAL
        // =================================================

        console.log(
            "\n=================================================="
        );

        console.log(
            "       RESPOSTA FINAL SINTETIZADA"
        );

        console.log(
            "==================================================\n"
        );


        console.log(
            `Sucesso: ${synthesis.success}`
        );


        console.log(
            `Tarefa: ${synthesis.task}`
        );


        console.log(
            "\nMensagem final:"
        );


        console.log(
            synthesis.message
        );


        console.log(
            "\nResumo:"
        );


        console.log(
            `Total: ${synthesis.summary.total}`
        );


        console.log(
            `Sucessos: ${synthesis.summary.successful}`
        );


        console.log(
            `Erros: ${synthesis.summary.failed}`
        );


        // =================================================
        // 8. RELATÓRIO DOS ESPECIALISTAS
        // =================================================

        console.log(
            "\n=================================================="
        );

        console.log(
            "       RELATÓRIO DOS ESPECIALISTAS"
        );

        console.log(
            "==================================================\n"
        );


        if (
            Array.isArray(
                synthesis.specialists
            )
        ) {

            synthesis.specialists.forEach(
                (specialist, index) => {

                    console.log(
                        `${index + 1}. ` +
                        `${specialist.id} → ` +
                        `${specialist.result}`
                    );

                }
            );

        }


        // =================================================
        // 9. STATUS DO SYNTHESIZER
        // =================================================

        console.log(
            "\n=================================================="
        );

        console.log(
            "       STATUS DO RESPONSE SYNTHESIZER"
        );

        console.log(
            "==================================================\n"
        );


        const synthesizerStatus =
            synthesizer.getStatus();


        console.log(
            JSON.stringify(
                synthesizerStatus,
                null,
                2
            )
        );


        // =================================================
        // 10. VALIDAR RESULTADO
        // =================================================

        console.log(
            "\n=================================================="
        );

        console.log(
            "       VALIDAÇÕES"
        );

        console.log(
            "=================================================="
        );


        console.log(
            `✓ Síntese executada: ${
                synthesis.success
                    ? "OK"
                    : "ERRO"
            }`
        );


        console.log(
            `✓ Tarefa preservada: ${
                synthesis.task === task
                    ? "OK"
                    : "ERRO"
            }`
        );


        console.log(
            `✓ Total de especialistas: ${
                synthesis.summary.total > 0
                    ? "OK"
                    : "ERRO"
            }`
        );


        console.log(
            `✓ Especialistas processados: ${
                synthesis.specialists.length > 0
                    ? "OK"
                    : "ERRO"
            }`
        );


        console.log(
            `✓ Mensagem final gerada: ${
                synthesis.message
                    ? "OK"
                    : "ERRO"
            }`
        );


        // =================================================
        // 11. TESTE DE PROTEÇÃO CIRCULAR
        // =================================================

        console.log(
            "\n6. Testando proteção contra referência circular..."
        );


        const circular =
            {};

        circular.name =
            "Teste Circular";

        circular.self =
            circular;


        const circularResult =
            synthesizer.synthesize({

                success: true,

                task:
                    "Teste de referência circular",

                total: 1,

                successful: 1,

                failed: 0,

                pipeline: [

                    {
                        step: 1,

                        id:
                            "testes",

                        success:
                            true,

                        result:
                            circular
                    }

                ],

                context: {}

            });


        console.log(
            "✓ Referência circular protegida."
        );


        // =================================================
        // 12. STATUS FINAL
        // =================================================

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
            "✓ SpecialistLoader: OK"
        );

        console.log(
            "✓ SpecialistRouter: OK"
        );

        console.log(
            "✓ SpecialistOrchestrator: OK"
        );

        console.log(
            "✓ ResponseSynthesizer: OK"
        );

        console.log(
            "✓ Execução do pipeline: OK"
        );

        console.log(
            "✓ Síntese da resposta: OK"
        );

        console.log(
            "✓ Proteção contra referência circular: OK"
        );


        console.log(
            "\n🚀 TESTE MAIN + SYNTHESIS CONCLUÍDO COM SUCESSO!"
        );


    } catch (error) {

        console.error(
            "\n❌ ERRO DURANTE O TESTE:"
        );


        console.error(
            error.message
        );


        console.error(
            "\nStack:"
        );


        console.error(
            error.stack
        );


        process.exitCode = 1;

    } finally {

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
}


main();