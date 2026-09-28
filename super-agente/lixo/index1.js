const MainAgent =
    require("./main/MainAgent");

async function main() {

    const agent =
        new MainAgent();

    agent.initialize();

    const projeto = `
        Quero criar um SaaS para atendimento ao cliente
        com inteligência artificial, login, banco de dados,
        API, painel administrativo e aplicativo mobile.
        O sistema deverá possuir design moderno,
        UX/UI, segurança, testes, automação e dashboard.
    `;

    const status =
        agent.autoConfigure(projeto);

    agent.showTeam();

    console.log(
        "\n======================================"
    );

    console.log(
        "          STATUS DO PROJETO"
    );

    console.log(
        "======================================\n"
    );

    console.log(
        JSON.stringify(
            status,
            null,
            2
        )
    );

    // Teste de delegação
    console.log(
        "\n======================================"
    );

    console.log(
        "          TESTE DE DELEGAÇÃO"
    );

    console.log(
        "======================================\n"
    );

    const resultado =
        await agent.executeCommand(
            "/programacao",
            "Criar o módulo de autenticação do sistema."
        );

    console.log(resultado);
}

main().catch(error => {

    console.error(
        "\n❌ ERRO:",
        error.message
    );

    process.exit(1);
});