const MainAgent =
    require("./main/MainAgent");


async function main() {

    console.log(
        "\n=========================================="
    );

    console.log(
        "       TESTE MAIN AGENT + COORDENAÇÃO"
    );

    console.log(
        "==========================================\n"
    );


    const mainAgent =
        new MainAgent();


    /*
     * ==========================================
     * INICIALIZAÇÃO
     * ==========================================
     */

    mainAgent.initialize();


    /*
     * ==========================================
     * CONFIGURAÇÃO DO PROJETO
     * ==========================================
     */

    const task =
        "Criar um sistema web completo para cadastro de clientes, " +
        "com login, banco MySQL, API REST, painel administrativo, " +
        "segurança e testes.";


    console.log(
        "\n=========================================="
    );

    console.log(
        "          CONFIGURANDO PROJETO"
    );

    console.log(
        "=========================================="
    );


    mainAgent.autoConfigure(task);


    /*
     * ==========================================
     * MOSTRAR EQUIPE CARREGADA
     * ==========================================
     */

    mainAgent.showTeam();


    /*
     * ==========================================
     * COORDENAÇÃO AUTOMÁTICA
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "       EXECUTANDO COORDENAÇÃO"
    );

    console.log(
        "=========================================="
    );


    let resultado;


    try {

        resultado =
            await mainAgent.coordinate(
                task
            );

    } catch (error) {

        console.error(
            "\n❌ ERRO NA COORDENAÇÃO:"
        );

        console.error(
            error.message
        );

        mainAgent.shutdown();

        return;
    }


    /*
     * ==========================================
     * EQUIPE SELECIONADA
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "          EQUIPE SELECIONADA"
    );

    console.log(
        "==========================================\n"
    );


    if (
        Array.isArray(
            resultado.selectedIds
        )
    ) {

        resultado.selectedIds.forEach(
            (id, index) => {

                const selected =
                    resultado.analysis.selected[
                        index
                    ];

                console.log(
                    `${index + 1}. ${id}` +
                    (
                        selected
                            ? ` | score: ${selected.score}`
                            : ""
                    )
                );
            }
        );

    } else {

        console.log(
            "⚠️ Nenhuma equipe selecionada."
        );
    }


    console.log(
        `\nTotal selecionado: ` +
        `${resultado.selectedIds.length}`
    );


    /*
     * ==========================================
     * ESPECIALISTAS CARREGADOS
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "       ESPECIALISTAS EXECUTADOS"
    );

    console.log(
        "==========================================\n"
    );


    resultado.loadedIds.forEach(
        (id, index) => {

            console.log(
                `${index + 1}. ${id}`
            );
        }
    );


    /*
     * ==========================================
     * ESPECIALISTAS NÃO CARREGADOS
     * ==========================================
     */

    if (
        resultado.unavailableIds &&
        resultado.unavailableIds.length > 0
    ) {

        console.log(
            "\n⚠️ NÃO CARREGADOS:"
        );

        resultado.unavailableIds.forEach(
            id => {

                console.log(
                    `   - ${id}`
                );
            }
        );
    }


    /*
     * ==========================================
     * RESULTADO DA EXECUÇÃO
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "        RESULTADO DA EXECUÇÃO"
    );

    console.log(
        "==========================================\n"
    );


    const execution =
        resultado.result;


    console.log(
        `Sucesso: ${execution.success}`
    );

    console.log(
        `Total de etapas: ${execution.total}`
    );

    console.log(
        `Etapas concluídas: ${execution.successful}`
    );

    console.log(
        `Etapas com erro: ${execution.failed}`
    );


    /*
     * ==========================================
     * PIPELINE
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "              PIPELINE"
    );

    console.log(
        "==========================================\n"
    );


    if (
        Array.isArray(
            execution.pipeline
        )
    ) {

        execution.pipeline.forEach(
            step => {

                console.log(
                    `Etapa ${step.step}: ` +
                    `${step.id} ` +
                    `→ ` +
                    (
                        step.success
                            ? "OK"
                            : "ERRO"
                    )
                );
            }
        );
    }


    /*
     * ==========================================
     * ANÁLISE DO TEAM SELECTOR
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "         ANÁLISE DA EQUIPE"
    );

    console.log(
        "==========================================\n"
    );


    console.log(
        `Candidatos analisados: ` +
        `${resultado.analysis.totalCandidates}`
    );

    console.log(
        `Equipe selecionada: ` +
        `${resultado.analysis.teamSize}`
    );


    if (
        resultado.analysis.primary
    ) {

        console.log(
            `Especialista principal: ` +
            `${resultado.analysis.primary.id}`
        );

        console.log(
            `Score principal: ` +
            `${resultado.analysis.primary.score}`
        );
    }


    /*
     * ==========================================
     * STATUS FINAL
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "             STATUS FINAL"
    );

    console.log(
        "=========================================="
    );


    console.log(
        JSON.stringify(
            mainAgent.getProjectStatus(),
            null,
            2
        )
    );


    /*
     * ==========================================
     * FINALIZAÇÃO
     * ==========================================
     */

    console.log(
        "\n=========================================="
    );

    console.log(
        "       COORDENAÇÃO CONCLUÍDA"
    );

    console.log(
        "==========================================\n"
    );


    mainAgent.shutdown();
}


main()
    .catch(
        error => {

            console.error(
                "\n❌ ERRO NO TESTE:"
            );

            console.error(
                error
            );

            process.exit(1);
        }
    );