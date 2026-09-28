const SpecialistLoader =
    require("./main/SpecialistLoader");

const SpecialistRouter =
    require("./main/SpecialistRouter");


async function main() {

    console.log("");
    console.log("================================");
    console.log(" TESTE DO SPECIALIST ROUTER");
    console.log("================================");
    console.log("");

    const loader =
        new SpecialistLoader();

    loader.loadAll();

    console.log(
        "Especialistas carregados:",
        loader.count()
    );

    const router =
        new SpecialistRouter(loader);

    console.log("");
    console.log("Rotas:");
    console.log(
        router.getRoutes()
    );

    console.log("");
    console.log("Teste 1:");
    console.log(
        "/programacao criar uma API"
    );

    const specialist1 =
        router.resolve(
            "/programacao criar uma API"
        );

    console.log(
        "Especialista:",
        specialist1
            ? specialist1.name
            : "nenhum"
    );

    console.log("");
    console.log("Teste 2:");
    console.log(
        "/database criar tabela clientes"
    );

    const specialist2 =
        router.resolve(
            "/database criar tabela clientes"
        );

    console.log(
        "Especialista:",
        specialist2
            ? specialist2.name
            : "nenhum"
    );

    console.log("");
    console.log("Teste 3:");
    console.log(
        "Criar uma tabela MySQL para clientes"
    );

    const specialist3 =
        router.resolve(
            "Criar uma tabela MySQL para clientes"
        );

    console.log(
        "Especialista:",
        specialist3
            ? specialist3.name
            : "nenhum"
    );

    console.log("");
    console.log("Status do Router:");
    console.log(
        router.getStatus()
    );

    console.log("");
    console.log("================================");
    console.log(" TESTE FINALIZADO");
    console.log("================================");
}


main().catch(
    error => {

        console.error("");
        console.error(
            "ERRO NO TESTE:"
        );

        console.error(
            error
        );
    }
);