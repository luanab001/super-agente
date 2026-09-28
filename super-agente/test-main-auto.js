const MainAgent =
    require("./main/MainAgent");


async function main() {

    console.log(
        "\n=========================================="
    );

    console.log(
        "      TESTE MAIN AGENT + EQUIPE AUTOMÁTICA"
    );

    console.log(
        "==========================================\n"
    );


    const mainAgent =
        new MainAgent();


    mainAgent.initialize();


    const task =
        "Criar um sistema web completo para cadastro de clientes, com login, banco MySQL, API REST, painel administrativo, segurança e testes.";


    console.log(
        "\n=========================================="
    );

    console.log(
        "       ANÁLISE DA TAREFA"
    );

    console.log(
        "=========================================="
    );


    const analysis =
        mainAgent.analyzeTask(
            task
        );


    console.log(
        JSON.stringify(
            analysis,
            null,
            2
        )
    );


    console.log(
        "\n=========================================="
    );

    console.log(
        "       EQUIPE AUTOMÁTICA"
    );

    console.log(
        "=========================================="
    );


    mainAgent.showAutomaticTeam(
        task
    );


    console.log(
        "\n=========================================="
    );

    console.log(
        "       CONFIGURAÇÃO DO PROJETO"
    );

    console.log(
        "=========================================="
    );


    mainAgent.autoConfigure(
        task
    );


    console.log(
        "\n=========================================="
    );

    console.log(
        "       EXECUTANDO TAREFA"
    );

    console.log(
        "=========================================="
    );


    const result =
        await mainAgent.executeTask(
            task
        );


    console.log(
        "\n=========================================="
    );

    console.log(
        "       RESULTADO FINAL"
    );

    console.log(
        "==========================================\n"
    );


    console.log(
        JSON.stringify(
            {
                success:
                    result.success,

                total:
                    result.total,

                executed:
                    result.executed,

                completed:
                    result.completed,

                failed:
                    result.failed
            },
            null,
            2
        )
    );


    console.log(
        "\n=========================================="
    );

    console.log(
        "       STATUS DO MAIN AGENT"
    );

    console.log(
        "==========================================\n"
    );


    console.log(
        JSON.stringify(
            mainAgent.getProjectStatus(),
            null,
            2
        )
    );


    console.log(
        "\n=========================================="
    );

    console.log(
        "       TESTE CONCLUÍDO"
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