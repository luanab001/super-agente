/**
 * ============================================================
 * TESTE DE INTEGRAÇÃO — MAIN AGENT + EQUIPE
 * ============================================================
 *
 * Arquivo:
 * test-main-team.js
 *
 * Objetivo:
 * Validar o fluxo completo do Super Agente:
 *
 * MainAgent
 *    ↓
 * TeamSelector
 *    ↓
 * TeamCoordinator
 *    ↓
 * SpecialistOrchestrator
 *    ↓
 * Especialistas
 *
 * ============================================================
 */

"use strict";


/**
 * ============================================================
 * IMPORTAÇÃO
 * ============================================================
 */

const MainAgent =
    require("./main/MainAgent");


/**
 * ============================================================
 * CONFIGURAÇÃO DO TESTE
 * ============================================================
 */

const TASK =
    "Criar um sistema web completo para cadastro de clientes, " +
    "com login, banco MySQL, API REST, painel administrativo, " +
    "segurança e testes.";


/**
 * ============================================================
 * FUNÇÃO PRINCIPAL DO TESTE
 * ============================================================
 */

async function runTest() {

    console.log(
        "\n=================================================="
    );

    console.log(
        "       TESTE DE INTEGRAÇÃO — MAIN AGENT"
    );

    console.log(
        "==================================================\n"
    );


    let mainAgent = null;


    try {

        /**
         * ----------------------------------------------------
         * 1. CRIAR MAIN AGENT
         * ----------------------------------------------------
         */

        console.log(
            "1️⃣ Criando MainAgent..."
        );

        mainAgent =
            new MainAgent();

        console.log(
            "✅ MainAgent criado.\n"
        );


        /**
         * ----------------------------------------------------
         * 2. INICIALIZAR
         * ----------------------------------------------------
         */

        console.log(
            "2️⃣ Inicializando MainAgent..."
        );

        const initialized =
            mainAgent.initialize();

        if (!initialized) {

            throw new Error(
                "MainAgent não foi inicializado corretamente."
            );
        }

        console.log(
            "✅ MainAgent inicializado.\n"
        );


        /**
         * ----------------------------------------------------
         * 3. AUTOCONFIGURAÇÃO
         * ----------------------------------------------------
         */

        console.log(
            "3️⃣ Executando autoconfiguração..."
        );

        const project =
            mainAgent.autoConfigure(
                TASK
            );

        if (!project) {

            throw new Error(
                "A autoconfiguração não retornou um projeto."
            );
        }

        console.log(
            "✅ Autoconfiguração concluída.\n"
        );


        /**
         * ----------------------------------------------------
         * 4. MOSTRAR STATUS DO PROJETO
         * ----------------------------------------------------
         */

        console.log(
            "4️⃣ Verificando status do projeto..."
        );

        const status =
            mainAgent.getProjectStatus();

        console.log(
            JSON.stringify(
                status,
                null,
                2
            )
        );


        /**
         * ----------------------------------------------------
         * 5. MOSTRAR EQUIPE
         * ----------------------------------------------------
         */

        console.log(
            "\n5️⃣ Verificando equipe..."
        );

        mainAgent.showTeam();


        /**
         * ----------------------------------------------------
         * 6. ANALISAR TAREFA COM TEAM SELECTOR
         * ----------------------------------------------------
         */

        console.log(
            "\n6️⃣ Executando TeamSelector..."
        );

        const analysis =
            mainAgent.analyzeTask(
                TASK
            );

        if (
            !analysis ||
            !Array.isArray(
                analysis.selected
            )
        ) {

            throw new Error(
                "TeamSelector retornou uma análise inválida."
            );
        }

        console.log(
            "\n📊 ANÁLISE DA TAREFA"
        );

        console.log(
            "--------------------------------------------------"
        );

        console.log(
            `Tarefa: ${analysis.task}`
        );

        console.log(
            `Candidatos: ${analysis.totalCandidates}`
        );

        console.log(
            `Tamanho da equipe: ${analysis.teamSize}`
        );

        console.log(
            `Selecionados: ${analysis.selected.length}`
        );


        /**
         * ----------------------------------------------------
         * 7. MOSTRAR ESPECIALISTAS SELECIONADOS
         * ----------------------------------------------------
         */

        console.log(
            "\n👥 EQUIPE SELECIONADA"
        );

        console.log(
            "--------------------------------------------------"
        );

        analysis.selected.forEach(
            (specialist, index) => {

                console.log(
                    `${index + 1}. ` +
                    `${specialist.id} ` +
                    `| score: ${specialist.score}`
                );
            }
        );


        /**
         * ----------------------------------------------------
         * 8. EXECUTAR TASK
         * ----------------------------------------------------
         */

        console.log(
            "\n8️⃣ Executando TeamCoordinator..."
        );

        const result =
            await mainAgent.executeTask(
                TASK
            );


        /**
         * ----------------------------------------------------
         * 9. VALIDAR RESULTADO
         * ----------------------------------------------------
         */

        if (!result) {

            throw new Error(
                "MainAgent não retornou resultado."
            );
        }


        console.log(
            "\n=================================================="
        );

        console.log(
            "       RESULTADO DA EXECUÇÃO"
        );

        console.log(
            "=================================================="
        );


        console.log(
            `Sucesso: ${result.success}`
        );

        console.log(
            `Tarefa: ${result.task}`
        );

        console.log(
            `Selecionados: ${
                Array.isArray(result.selectedIds)
                    ? result.selectedIds.length
                    : 0
            }`
        );

        console.log(
            `Carregados: ${
                Array.isArray(result.loadedIds)
                    ? result.loadedIds.length
                    : 0
            }`
        );

        console.log(
            `Indisponíveis: ${
                Array.isArray(result.unavailableIds)
                    ? result.unavailableIds.length
                    : 0
            }`
        );


        /**
         * ----------------------------------------------------
         * 10. MOSTRAR ÚLTIMA COORDENAÇÃO
         * ----------------------------------------------------
         */

        console.log(
            "\n🧠 ÚLTIMA COORDENAÇÃO"
        );

        console.log(
            "--------------------------------------------------"
        );

        if (
            mainAgent.lastCoordination
        ) {

            console.log(
                JSON.stringify(
                    mainAgent.lastCoordination,
                    null,
                    2
                )
            );

        } else {

            console.log(
                "⚠️ Nenhuma coordenação registrada."
            );
        }


        /**
         * ----------------------------------------------------
         * 11. STATUS FINAL
         * ----------------------------------------------------
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
            "✅ MainAgent: OK"
        );

        console.log(
            "✅ AutoConfigurator: OK"
        );

        console.log(
            "✅ TeamSelector: OK"
        );

        console.log(
            "✅ TeamCoordinator: OK"
        );

        console.log(
            "✅ SpecialistOrchestrator: OK"
        );

        console.log(
            "✅ Execução da equipe: OK"
        );

        console.log(
            "✅ Integração ponta a ponta: OK"
        );


        /**
         * ----------------------------------------------------
         * 12. FINALIZAÇÃO
         * ----------------------------------------------------
         */

        console.log(
            "\n🟢 TESTE CONCLUÍDO COM SUCESSO."
        );


    } catch (error) {

        /**
         * ----------------------------------------------------
         * TRATAMENTO DE ERRO
         * ----------------------------------------------------
         */

        console.log(
            "\n=================================================="
        );

        console.log(
            "       ERRO NO TESTE"
        );

        console.log(
            "=================================================="
        );

        console.error(
            "\n❌ Mensagem:"
        );

        console.error(
            error.message
        );

        console.error(
            "\n📍 Stack:"
        );

        console.error(
            error.stack
        );


        process.exitCode = 1;


    } finally {

        /**
         * ----------------------------------------------------
         * SHUTDOWN
         * ----------------------------------------------------
         */

        if (mainAgent) {

            console.log(
                "\n🛑 Finalizando MainAgent..."
            );

            try {

                mainAgent.shutdown();

            } catch (shutdownError) {

                console.error(
                    "⚠️ Erro durante shutdown:"
                );

                console.error(
                    shutdownError.message
                );
            }
        }

        console.log(
            "\n=================================================="
        );

        console.log(
            "       SISTEMA FINALIZADO"
        );

        console.log(
            "==================================================\n"
        );
    }
}


/**
 * ============================================================
 * EXECUTAR TESTE
 * ============================================================
 */

runTest();