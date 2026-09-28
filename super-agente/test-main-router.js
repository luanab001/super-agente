const MainAgent = require("./main/MainAgent");

async function main() {

    console.log("\n======================================");
    console.log("     TESTE MAIN AGENT + ROUTER");
    console.log("======================================\n");

    try {

        // ==========================================
        // 1. Criar Main Agent
        // ==========================================

        const mainAgent =
            new MainAgent();

        mainAgent.initialize();

        // ==========================================
        // 2. Autoconfigurar projeto
        // ==========================================

        const status =
            mainAgent.autoConfigure(
                "Criar um sistema web completo com frontend, backend, API, banco de dados, SQL, segurança e inteligência artificial."
            );

        console.log("\n======================================");
        console.log("         STATUS DO PROJETO");
        console.log("======================================\n");

        console.log(
            JSON.stringify(
                status,
                null,
                2
            )
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
        // 5. Teste por comando explícito
        // ==========================================

        console.log("\n======================================");
        console.log("       TESTE 1 — PROGRAMAÇÃO");
        console.log("======================================\n");

        const resultado1 =
            await mainAgent.executeCommand(
                "/programacao",
                "criar uma API de autenticação"
            );

        console.log(
            JSON.stringify(
                resultado1,
                null,
                2
            )
        );

        // ==========================================
        // 6. Teste Database
        // ==========================================

        console.log("\n======================================");
        console.log("       TESTE 2 — DATABASE");
        console.log("======================================\n");

        const resultado2 =
            await mainAgent.executeCommand(
                "/database",
                "criar tabela clientes"
            );

        console.log(
            JSON.stringify(
                resultado2,
                null,
                2
            )
        );

        // ==========================================
        // 7. Teste Estrutura
        // ==========================================

        console.log("\n======================================");
        console.log("       TESTE 3 — ESTRUTURA");
        console.log("======================================\n");

        const resultado3 =
            await mainAgent.executeCommand(
                "/estrutura",
                "organizar a arquitetura do projeto"
            );

        console.log(
            JSON.stringify(
                resultado3,
                null,
                2
            )
        );

        // ==========================================
        // 8. Teste automático
        // ==========================================

        console.log("\n======================================");
        console.log("       TESTE 4 — ROTEAMENTO");
        console.log("======================================\n");

        const resultado4 =
            await mainAgent.process(
                "Criar uma tabela MySQL para clientes"
            );

        console.log(
            JSON.stringify(
                resultado4,
                null,
                2
            )
        );

        // ==========================================
        // 9. Resolver sem executar
        // ==========================================

        console.log("\n======================================");
        console.log("       TESTE 5 — RESOLVE TASK");
        console.log("======================================\n");

        const especialista =
            mainAgent.resolveTask(
                "Criar uma tabela MySQL para clientes"
            );

        if (especialista) {

            console.log(
                "Especialista identificado:"
            );

            console.log(
                `${especialista.id} → ${especialista.name}`
            );

        } else {

            console.log(
                "Nenhum especialista identificado."
            );
        }

        // ==========================================
        // Final
        // ==========================================

        console.log("\n======================================");
        console.log("      TESTE DE INTEGRAÇÃO OK");
        console.log("======================================\n");

    } catch (error) {

        console.error(
            "\n❌ ERRO NO TESTE:"
        );

        console.error(
            error
        );
    }
}

main();