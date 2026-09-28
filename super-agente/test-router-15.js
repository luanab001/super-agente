const SpecialistLoader = require("./main/SpecialistLoader");
const SpecialistRouter = require("./main/SpecialistRouter");

console.log("\n======================================");
console.log("     TESTE DO SPECIALIST ROUTER");
console.log("======================================\n");

try {

    // ==========================================
    // 1. Criar Loader
    // ==========================================

    const loader = new SpecialistLoader();

    // ==========================================
    // 2. Carregar especialistas
    // ==========================================

    const ids = [
        "programacao",
        "database",
        "design",
        "debug",
        "ia"
    ];

    const specialists =
        loader.loadMany(ids);

    console.log(
        `Especialistas carregados: ${specialists.length}`
    );

    // ==========================================
    // 3. Criar Router
    // ==========================================

    const router =
        new SpecialistRouter(loader);

    // ==========================================
    // 4. Mostrar rotas
    // ==========================================

    console.log("\nRotas:");

    console.log(
        router.getRoutes()
    );

    // ==========================================
    // 5. Teste por comando
    // ==========================================

    console.log("\nTeste 1:");

    const specialist1 =
        router.resolveByCommand(
            "/programacao"
        );

    if (specialist1) {

        console.log(
            "/programacao → " +
            specialist1.name
        );

    } else {

        console.log(
            "Especialista não encontrado."
        );
    }

    // ==========================================
    // 6. Segundo teste
    // ==========================================

    console.log("\nTeste 2:");

    const specialist2 =
        router.resolveByCommand(
            "/database"
        );

    if (specialist2) {

        console.log(
            "/database → " +
            specialist2.name
        );

    } else {

        console.log(
            "Especialista não encontrado."
        );
    }

    // ==========================================
    // 7. Teste de resolução automática
    // ==========================================

    console.log("\nTeste 3:");

    const specialist3 =
        router.resolve(
            "Criar uma tabela MySQL para clientes"
        );

    if (specialist3) {

        console.log(
            "Especialista: " +
            specialist3.name
        );

    } else {

        console.log(
            "Nenhum especialista identificado."
        );
    }

    // ==========================================
    // 8. Status
    // ==========================================

    console.log("\nStatus do Router:");

    console.log(
        router.getStatus()
    );

    // ==========================================
    // Final
    // ==========================================

    console.log(
        "\n======================================"
    );

    console.log(
        "       TESTE FINALIZADO"
    );

    console.log(
        "======================================\n"
    );

} catch (error) {

    console.error(
        "\n❌ ERRO NO TESTE:"
    );

    console.error(
        error
    );
}