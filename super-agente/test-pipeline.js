const SpecialistLoader =
    require("./main/SpecialistLoader");

const SpecialistRouter =
    require("./main/SpecialistRouter");

const SpecialistOrchestrator =
    require("./main/SpecialistOrchestrator");


async function main() {

    console.log(
        "\n======================================"
    );

    console.log(
        "     TESTE SPECIALIST PIPELINE"
    );

    console.log(
        "======================================\n"
    );


    const loader =
        new SpecialistLoader();


    const specialistIds = [

        "estrutura",
        "backend",
        "database",
        "api",
        "seguranca",
        "testes"
    ];


    console.log(
        "📦 Carregando equipe..."
    );


    const team =
        loader.loadMany(
            specialistIds
        );


    console.log(
        `✅ ${team.length} especialistas carregados.`
    );


    const router =
        new SpecialistRouter(
            loader
        );


    const orchestrator =
        new SpecialistOrchestrator(
            loader,
            router
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
        "              TAREFA"
    );

    console.log(
        "======================================\n"
    );

    console.log(
        task
    );


    console.log(
        "\n======================================"
    );

    console.log(
        "        EXECUTANDO PIPELINE"
    );

    console.log(
        "======================================"
    );


    const result =
        await orchestrator.executePipeline(
            specialistIds,
            task
        );


    console.log(
        "\n======================================"
    );

    console.log(
        "       RESULTADO PIPELINE"
    );

    console.log(
        "======================================\n"
    );


    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );


    console.log(
        "\n======================================"
    );

    console.log(
        "           STATUS"
    );

    console.log(
        "======================================\n"
    );


    console.log(
        JSON.stringify(
            orchestrator.getStatus(),
            null,
            2
        )
    );


    console.log(
        "\n======================================"
    );

    console.log(
        "        TESTE CONCLUÍDO"
    );

    console.log(
        "======================================\n"
    );


    loader.unloadAll();
}


main()
    .catch(error => {

        console.error(
            "\n❌ ERRO:"
        );

        console.error(
            error.message
        );

        process.exit(1);
    });