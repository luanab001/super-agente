const TeamSelector =
    require("./main/TeamSelector");


console.log(
    "\n======================================"
);

console.log(
    "     TESTE TEAM SELECTOR 1.1"
);

console.log(
    "======================================\n"
);


const selector =
    new TeamSelector({
        maxTeamSize: 10,
        minScore: 2
    });


const tasks = [

    {
        name:
            "Sistema Web Completo",

        task:
            "Criar um sistema web completo " +
            "para cadastro de clientes, " +
            "com login, banco MySQL, API REST, " +
            "painel administrativo, segurança e testes."
    },

    {
        name:
            "Sistema de IA",

        task:
            "Criar um agente de inteligência artificial " +
            "usando LLM e API."
    },

    {
        name:
            "Correção de Bug",

        task:
            "Corrigir um erro no código JavaScript " +
            "que está causando uma falha no sistema."
    },

    {
        name:
            "Banco de Dados",

        task:
            "Criar banco MySQL com tabelas de clientes, " +
            "relacionamentos e consultas SQL."
    },

    {
        name:
            "Aplicativo Mobile",

        task:
            "Criar aplicativo mobile para Android e iOS " +
            "usando React Native."
    },

    {
        name:
            "Interface e UX",

        task:
            "Criar uma interface moderna com UX, UI, " +
            "wireframes e boa usabilidade."
    }
];


for (
    const test of tasks
) {

    console.log(
        "\n\n======================================"
    );

    console.log(
        `TESTE: ${test.name}`
    );

    console.log(
        "======================================"
    );

    console.log(
        `\n📋 Tarefa:\n${test.task}`
    );


    const analysis =
        selector.getAnalysis(
            test.task
        );


    console.log(
        "\n🎯 ESPECIALISTA PRINCIPAL:"
    );

    console.log(
        analysis.primary
            ? analysis.primary.id
            : "Nenhum"
    );


    console.log(
        "\n👥 EQUIPE:"
    );

    console.log(
        selector.selectIds(
            test.task
        )
    );


    console.log(
        "\n📊 DETALHAMENTO:"
    );

    selector.showTeam(
        test.task
    );
}


console.log(
    "\n\n======================================"
);

console.log(
    "     STATUS DO TEAM SELECTOR"
);

console.log(
    "======================================"
);

console.log(
    selector.getStatus()
);


console.log(
    "\n======================================"
);

console.log(
    "       TESTE CONCLUÍDO"
);

console.log(
    "======================================\n"
);