/**
 * =========================================================
 * SUPER AGENTE
 * TESTE — TASK PLANNER
 * =========================================================
 *
 * Testa:
 *
 * 1. Inicialização
 * 2. Validação de tarefas
 * 3. Detecção de domínios
 * 4. Criação automática do plano
 * 5. Dependências entre etapas
 * 6. Identificação das próximas etapas
 * 7. Alteração de status
 * 8. Status final do TaskPlanner
 *
 * =========================================================
 */

const TaskPlanner =
    require("./main/TaskPlanner");


/**
 * =========================================================
 * INICIALIZAÇÃO
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "       TESTE DO TASK PLANNER"
);

console.log(
    "==================================================\n"
);


const planner =
    new TaskPlanner();


console.log(
    "🚀 TaskPlanner inicializado."
);


/**
 * =========================================================
 * TAREFA DE TESTE
 * =========================================================
 */

const task =
    "Criar um sistema web completo para cadastro de clientes, " +
    "com login, banco MySQL, API REST, painel administrativo, " +
    "segurança e testes.";


console.log(
    "\n📋 TAREFA:"
);

console.log(
    task
);


/**
 * =========================================================
 * TESTE 1 — PLANEJAMENTO
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "1. TESTANDO PLANEJAMENTO"
);

console.log(
    "=================================================="
);


const plan =
    planner.plan(
        task
    );


console.log(
    "\n📊 PLANO GERADO:"
);

console.log(
    JSON.stringify(
        plan,
        null,
        2
    )
);


/**
 * =========================================================
 * TESTE 2 — DOMÍNIOS
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "2. DOMÍNIOS IDENTIFICADOS"
);

console.log(
    "=================================================="
);


console.log(
    plan.domains
);


console.log(
    `Total de domínios: ${plan.domains.length}`
);


/**
 * =========================================================
 * TESTE 3 — ETAPAS
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "3. ETAPAS DO PLANO"
);

console.log(
    "=================================================="
);


plan.steps.forEach(
    (step, index) => {

        console.log(
            `\n${index + 1}. ${step.name}`
        );

        console.log(
            `   ID: ${step.id}`
        );

        console.log(
            `   Especialistas: ${step.specialistIds.join(", ")}`
        );

        console.log(
            `   Dependências: ${
                step.dependsOn.length > 0
                    ? step.dependsOn.join(", ")
                    : "nenhuma"
            }`
        );

        console.log(
            `   Status: ${step.status}`
        );
    }
);


/**
 * =========================================================
 * TESTE 4 — PRÓXIMAS ETAPAS
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "4. PRÓXIMAS ETAPAS DISPONÍVEIS"
);

console.log(
    "=================================================="
);


const readySteps =
    planner.getReadySteps(
        plan
    );


readySteps.forEach(
    step => {

        console.log(
            `🚀 ${step.id} → ${step.name}`
        );
    }
);


console.log(
    `\nTotal de etapas prontas: ${readySteps.length}`
);


/**
 * =========================================================
 * TESTE 5 — CONCLUSÃO DA PRIMEIRA ETAPA
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "5. TESTANDO DEPENDÊNCIAS"
);

console.log(
    "=================================================="
);


if (
    plan.steps.length > 0
) {

    const firstStep =
        plan.steps[0];


    console.log(
        `\nConcluindo etapa: ${firstStep.id}`
    );


    planner.markStep(
        plan,
        firstStep.id,
        "completed"
    );


    console.log(
        `✅ ${firstStep.id} marcada como completed.`
    );
}


/**
 * =========================================================
 * TESTE 6 — NOVAS ETAPAS DISPONÍVEIS
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "6. NOVAS ETAPAS APÓS CONCLUSÃO"
);

console.log(
    "=================================================="
);


const nextSteps =
    planner.getReadySteps(
        plan
    );


nextSteps.forEach(
    step => {

        console.log(
            `➡️ ${step.id} → ${step.name}`
        );
    }
);


console.log(
    `\nTotal de novas etapas prontas: ${nextSteps.length}`
);


/**
 * =========================================================
 * TESTE 7 — STATUS
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "7. STATUS DO TASK PLANNER"
);

console.log(
    "=================================================="
);


console.log(
    JSON.stringify(
        planner.getStatus(),
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
    "              VALIDAÇÕES"
);

console.log(
    "=================================================="
);


let errors =
    0;


/*
 * Planejamento
 */

if (
    plan.success === true
) {

    console.log(
        "✔ Planejamento executado: OK"
    );

} else {

    console.log(
        "✘ Planejamento executado: ERRO"
    );

    errors++;
}


/*
 * Domínios
 */

if (
    Array.isArray(
        plan.domains
    ) &&
    plan.domains.length > 0
) {

    console.log(
        "✔ Domínios identificados: OK"
    );

} else {

    console.log(
        "✘ Domínios identificados: ERRO"
    );

    errors++;
}


/*
 * Etapas
 */

if (
    Array.isArray(
        plan.steps
    ) &&
    plan.steps.length > 0
) {

    console.log(
        "✔ Etapas geradas: OK"
    );

} else {

    console.log(
        "✘ Etapas geradas: ERRO"
    );

    errors++;
}


/*
 * Dependências
 */

const hasDependencies =
    plan.steps.some(
        step =>
            step.dependsOn.length > 0
    );


if (
    hasDependencies
) {

    console.log(
        "✔ Dependências entre etapas: OK"
    );

} else {

    console.log(
        "✘ Dependências entre etapas: ERRO"
    );

    errors++;
}


/*
 * Etapas prontas
 */

if (
    Array.isArray(
        readySteps
    )
) {

    console.log(
        "✔ Identificação de etapas prontas: OK"
    );

} else {

    console.log(
        "✘ Identificação de etapas prontas: ERRO"
    );

    errors++;
}


/*
 * Alteração de status
 */

if (
    plan.steps.length === 0 ||
    plan.steps[0].status === "completed"
) {

    console.log(
        "✔ Alteração de status: OK"
    );

} else {

    console.log(
        "✘ Alteração de status: ERRO"
    );

    errors++;
}


/**
 * =========================================================
 * RESULTADO FINAL
 * =========================================================
 */

console.log(
    "\n=================================================="
);

console.log(
    "          STATUS FINAL DO TESTE"
);

console.log(
    "=================================================="
);


if (
    errors === 0
) {

    console.log(
        "✔ TaskPlanner: OK"
    );

    console.log(
        "✔ Planejamento automático: OK"
    );

    console.log(
        "✔ Detecção de domínios: OK"
    );

    console.log(
        "✔ Geração de etapas: OK"
    );

    console.log(
        "✔ Sistema de dependências: OK"
    );

    console.log(
        "✔ Controle de etapas: OK"
    );

    console.log(
        "\n🚀 TESTE DO TASK PLANNER CONCLUÍDO COM SUCESSO!"
    );

} else {

    console.log(
        `✘ TESTE FINALIZADO COM ${errors} ERRO(S).`
    );
}


console.log(
    "\n=================================================="
);

console.log(
    "             TESTE FINALIZADO"
);

console.log(
    "==================================================\n"
);