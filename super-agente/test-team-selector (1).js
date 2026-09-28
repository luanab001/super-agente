/**
 * =========================================================
 * SUPER AGENTE
 * TESTE — TEAM SELECTOR
 * =========================================================
 *
 * Objetivo:
 *
 * Verificar se o TeamSelector consegue analisar uma
 * tarefa complexa e selecionar automaticamente os
 * especialistas mais adequados.
 *
 * Fluxo:
 *
 * MainAgent
 *      ↓
 * SpecialistLoader
 *      ↓
 * TeamSelector
 *      ↓
 * análise da tarefa
 *      ↓
 * seleção automática da equipe
 *
 * =========================================================
 */

const MainAgent =
    require("./main/MainAgent");

const TeamSelector =
    require("./main/TeamSelector");


/**
 * =========================================================
 * INÍCIO
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       TESTE — SELEÇÃO AUTOMÁTICA DA EQUIPE"
);

console.log(
    "==================================================\n"
);


/**
 * =========================================================
 * CRIAR MAIN AGENT
 * =========================================================
 */

const mainAgent =
    new MainAgent();


/**
 * =========================================================
 * INICIALIZAR
 * =========================================================
 */

mainAgent.initialize();


/**
 * =========================================================
 * CONFIGURAR PROJETO
 * =========================================================
 */

const projectDescription =
    "Criar um sistema web completo para cadastro " +
    "de clientes, com login, banco MySQL, API REST, " +
    "painel administrativo, segurança e testes.";


console.log(
    "\n📋 TAREFA:"
);

console.log(
    projectDescription
);


/**
 * =========================================================
 * AUTOCONFIGURAR
 * =========================================================
 */

console.log(
    "\n🔎 Inicializando especialistas..."
);


mainAgent.autoConfigure(
    projectDescription
);


/**
 * =========================================================
 * CRIAR TEAM SELECTOR
 * =========================================================
 */

const teamSelector =
    new TeamSelector(
        mainAgent.loader
    );


/**
 * =========================================================
 * SELEÇÃO AUTOMÁTICA
 * =========================================================
 */

console.log(
    "\n🤖 ANALISANDO TAREFA..."
);


const selection =
    teamSelector.select(
        projectDescription,
        {
            maxTeamSize: 8,
            minimumScore: 10
        }
    );


/**
 * =========================================================
 * RESULTADO DA SELEÇÃO
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       EQUIPE SELECIONADA AUTOMATICAMENTE"
);

console.log(
    "==================================================\n"
);


console.log(
    `Sucesso: ${selection.success}`
);

console.log(
    `Total de especialistas: ${selection.total}`
);


console.log(
    "\nIDs selecionados:"
);


selection.specialistIds.forEach(
    (id, index) => {

        console.log(
            `${index + 1}. ${id}`
        );
    }
);


/**
 * =========================================================
 * ANÁLISE COMPLETA
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       PONTUAÇÃO DOS ESPECIALISTAS"
);

console.log(
    "==================================================\n"
);


selection.analysis.forEach(
    (specialist, index) => {

        console.log(
            `${index + 1}. ` +
            `${specialist.id} ` +
            `→ score: ${specialist.score}`
        );
    }
);


/**
 * =========================================================
 * STATUS DO TEAM SELECTOR
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       STATUS DO TEAM SELECTOR"
);

console.log(
    "=================================================="
);


console.log(
    JSON.stringify(
        teamSelector.getStatus(),
        null,
        2
    )
);


/**
 * =========================================================
 * VALIDAÇÕES
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       VALIDAÇÕES"
);

console.log(
    "=================================================="
);


let validationErrors = 0;


/*
 * Validação 1
 */

if (
    selection.success === true
) {

    console.log(
        "✓ Seleção automática executada: OK"
    );

} else {

    console.log(
        "✗ Seleção automática executada: ERRO"
    );

    validationErrors++;
}


/*
 * Validação 2
 */

if (
    selection.total > 0
) {

    console.log(
        "✓ Especialistas selecionados: OK"
    );

} else {

    console.log(
        "✗ Especialistas selecionados: ERRO"
    );

    validationErrors++;
}


/*
 * Validação 3
 */

if (
    Array.isArray(
        selection.specialistIds
    )
) {

    console.log(
        "✓ Lista de IDs válida: OK"
    );

} else {

    console.log(
        "✗ Lista de IDs válida: ERRO"
    );

    validationErrors++;
}


/*
 * Validação 4
 */

if (
    Array.isArray(
        selection.analysis
    )
) {

    console.log(
        "✓ Análise dos especialistas: OK"
    );

} else {

    console.log(
        "✗ Análise dos especialistas: ERRO"
    );

    validationErrors++;
}


/*
 * Validação 5
 *
 * Verifica se especialistas esperados para
 * esta tarefa apareceram na seleção.
 */

const expectedSpecialists = [

    "estrutura",
    "frontend",
    "backend",
    "database",
    "api",
    "sql",
    "seguranca",
    "testes"

];


const missingSpecialists =
    expectedSpecialists.filter(
        id =>
            !selection.specialistIds.includes(
                id
            )
    );


if (
    missingSpecialists.length === 0
) {

    console.log(
        "✓ Equipe esperada selecionada: OK"
    );

} else {

    console.log(
        "⚠ Equipe esperada parcialmente selecionada."
    );

    console.log(
        `  Ausentes: ${missingSpecialists.join(", ")}`
    );
}


/**
 * =========================================================
 * STATUS FINAL
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       STATUS FINAL DO TESTE"
);

console.log(
    "=================================================="
);


console.log(
    `✓ TeamSelector: ${
        validationErrors === 0
            ? "OK"
            : "ERRO"
    }`
);

console.log(
    `✓ Seleção automática: ${
        selection.success
            ? "OK"
            : "ERRO"
    }`
);

console.log(
    `✓ Total selecionado: ${
        selection.total
    }`
);

console.log(
    `✓ Erros estruturais: ${
        validationErrors
    }`
);


/**
 * =========================================================
 * FINALIZAÇÃO
 * =========================================================
 */

console.log(
    "\n=================================================="
);

if (
    validationErrors === 0
) {

    console.log(
        "   🚀 TESTE DE SELEÇÃO AUTOMÁTICA CONCLUÍDO!"
    );

} else {

    console.log(
        "   ⚠ TESTE CONCLUÍDO COM ALERTAS."
    );
}

console.log(
    "==================================================\n"
);


/**
 * =========================================================
 * DESLIGAR MAIN AGENT
 * =========================================================
 */

console.log(
    "Finalizando MainAgent..."
);

mainAgent.shutdown();


console.log(
    "\n=================================================="
);

console.log(
    "          SISTEMA FINALIZADO"
);

console.log(
    "=================================================="
);