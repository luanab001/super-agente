const MainAgent =
    require("./main/MainAgent");


async function main() {

    console.log(
        "\n======================================"
    );

    console.log(
        "   TESTE MAIN AGENT + EQUIPE AUTOMÁTICA"
    );

    console.log(
        "======================================\n"
    );


    const mainAgent =
        new MainAgent();


    mainAgent.initialize();


    /*
     * Configuramos o projeto.
     *
     * O AutoConfigurator continua
     * responsável pela configuração
     * inicial do projeto.
     */
    mainAgent.autoConfigure(
        "Sistema web completo para empresa " +
        "com cadastro de clientes, login, " +
        "banco de dados, API e painel administrativo."
    );


    const task =
        "Criar um sistema web completo " +
        "para cadastro de clientes, " +
        "com login, banco MySQL, API REST, " +
        "painel administrativo, segurança e testes.";


    console.log(
        "\n======================================"
    );

    console.log(
        "          TAREFA"
    );

    console.log(
        "======================================\n"
    );

    console.log(
        task
    );


    /*
     * Análise da tarefa.
     */
    console.log(
        "\n🔎 ANALISANDO TAREFA..."
    );

    const analysis =
        mainAgent.analyzeTask(
            task
        );


    console.log(
        "\n📊 ANÁLISE:"
    );

    console.log(
        JSON.stringify(
            analysis,
            null,
            2
        )
    );


    /*
     * Seleção automática.
     */
    console.log(
        "\n======================================"
    );

    console.log(
        "      SELEÇÃO AUTOMÁTICA"
    );

    console.log(
        "======================================\n"
    );


    const selectedTeam =
        mainAgent.selectTeam(
            task
        );


    console.log(
        "👥 Equipe selecionada:"
    );

    console.log(
        selectedTeam
    );


    console.log(
        `\nTotal: ${selectedTeam.length}`
    );


    /*
     * Coordenação automática.
     */
    console.log(
        "\n======================================"
    );

    console.log(
        "      COORDENAÇÃO AUTOMÁTICA"
    );

    console.log(
        "======================================\n"
    );


    const result =
        await mainAgent.coordinateTask(
            task
        );


    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );


    /*
     * Status final.
     */
    console.log(
        "\n======================================"
    );

    console.log(
        "        STATUS DO MAIN AGENT"
    );

    console.log(
        "======================================\n"
    );


    console.log(
        JSON.stringify(
            mainAgent.getProjectStatus(),
            null,
            2
        )
    );


    console.log(
        "\n======================================"
    );

    console.log(
        "      TESTE CONCLUÍDO"
    );

    console.log(
        "======================================\n"
    );


    mainAgent.shutdown();
}


main()
    .catch(error => {

        console.error(
            "\n❌ ERRO NO TESTE:"
        );

        console.error(
            error.message
        );

        process.exit(1);
    });