const MainAgent =
    require("./main/MainAgent");


async function main() {

    console.log("\n======================================");
    console.log("    TESTE MAIN AGENT + ORCHESTRATOR");
    console.log("======================================\n");


    try {

        // ==========================================
        // 1. Criar Main Agent
        // ==========================================

        const mainAgent =
            new MainAgent();


        mainAgent.initialize();


        // ==========================================
        // 2. Configurar projeto
        // ==========================================

        mainAgent.autoConfigure(

            "Criar um sistema web completo " +
            "com frontend, backend, API, banco " +
            "de dados, SQL, segurança e testes."
        );


        // ==========================================
        // 3. Mostrar equipe
        // ==========================================

        mainAgent.showTeam();


        // ==========================================
        // 4. Mostrar rotas
        // ==========================================

        mainAgent.showRoutes();


        // ==========================================
        // 5. Coordenar equipe
        // ==========================================

        console.log(
            "\n======================================"
        );

        console.log(
            "       COORDENANDO EQUIPE"
        );

        console.log(
            "======================================\n"
        );


        const result =
            await mainAgent.coordinate(

                [
                    "estrutura",
                    "frontend",
                    "backend",
                    "database",
                    "api",
                    "sql",
                    "seguranca",
                    "testes"
                ],

                "Criar um sistema web completo " +
                "para cadastro de clientes."
            );


        // ==========================================
        // 6. Mostrar resultado
        // ==========================================

        console.log(
            "\n======================================"
        );

        console.log(
            "          RESULTADO DA EQUIPE"
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


        // ==========================================
        // 7. Status
        // ==========================================

        console.log(
            "\n======================================"
        );

        console.log(
            "             STATUS FINAL"
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
            "      COORDENAÇÃO CONCLUÍDA"
        );

        console.log(
            "======================================\n"
        );


    } catch (error) {

        console.error(
            "\n❌ ERRO:"
        );

        console.error(
            error
        );
    }
}


main();