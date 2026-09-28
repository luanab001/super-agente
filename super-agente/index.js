const MainAgent =
    require("./main/MainAgent");

async function main() {

    const main =
        new MainAgent();

    main.initialize();

    const projeto = `
        Quero criar um SaaS com inteligência artificial,
        banco de dados MySQL, programação em Node.js,
        design moderno e correção de erros.
    `;

    console.log(
        "\n🚀 AUTOCONFIGURANDO PROJETO...\n"
    );

    const status =
        main.autoConfigure(projeto);

    main.showTeam();

    console.log(
        "\n======================================"
    );

    console.log(
        "       TESTE DOS ESPECIALISTAS"
    );

    console.log(
        "======================================\n"
    );

    const tarefas = [

        [
            "/programacao",
            "Criar o módulo de autenticação em Node.js."
        ],

        [
            "/database",
            "Criar o banco de dados MySQL do sistema."
        ],

        [
            "/design",
            "Criar o design da tela principal."
        ],

        [
            "/debug",
            "Corrigir o erro encontrado na API."
        ],

        [
            "/ia",
            "Criar o módulo de inteligência artificial."
        ]
    ];

    for (const [command, task] of tarefas) {

        try {

            const resultado =
                await main.executeCommand(
                    command,
                    task
                );

            console.log(
                `\n${command}:`
            );

            console.log(
                resultado
            );

        } catch (error) {

            console.error(
                `❌ ${command}:`,
                error.message
            );
        }
    }

    console.log(
        "\n======================================"
    );

    console.log(
        "          SISTEMA FINALIZADO"
    );

    console.log(
        "======================================"
    );
}

main().catch(error => {

    console.error(
        "\n❌ ERRO FATAL:",
        error
    );

    process.exit(1);
});