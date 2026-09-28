/**
 * =========================================================
 * SUPER AGENTE
 * TESTE MAIN + TASK PLANNER
 * =========================================================
 *
 * Objetivo:
 *
 * Validar a integração entre:
 *
 * MainAgent
 *      ↓
 * TaskPlanner
 *      ↓
 * TeamSelector
 *      ↓
 * SpecialistOrchestrator
 *      ↓
 * ResponseSynthesizer
 *
 * =========================================================
 */

const MainAgent =
    require("./main/MainAgent");

const TaskPlanner =
    require("./main/TaskPlanner");


/**
 * =========================================================
 * CONFIGURAÇÃO
 * =========================================================
 */

const TASK =
    "Criar um sistema web completo para cadastro de clientes, com login, banco MySQL, API REST, painel administrativo, segurança e testes.";


/**
 * =========================================================
 * FUNÇÃO AUXILIAR
 * =========================================================
 */

function printSection(title) {

    console.log(
        "\n=================================================="
    );

    console.log(
        `       ${title}`
    );

    console.log(
        "=================================================="
    );
}


/**
 * =========================================================
 * MAIN
 * =========================================================
 */

async function main() {

    printSection(
        "TESTE MAIN + TASK PLANNER"
    );


    console.log(
        "\n🚀 Iniciando Super Agent..."
    );


    /**
     * -----------------------------------------------------
     * 1. MAIN AGENT
     * -----------------------------------------------------
     */

    const mainAgent =
        new MainAgent();


    mainAgent.initialize();


    /**
     * -----------------------------------------------------
     * 2. AUTO CONFIGURAÇÃO
     * -----------------------------------------------------
     */

    console.log(
        "\n🔎 Configurando especialistas..."
    );


    mainAgent.autoConfigure(
        TASK
    );


    /**
     * -----------------------------------------------------
     * 3. TASK PLANNER
     * -----------------------------------------------------
     */

    printSection(
        "TASK PLANNER"
    );


    const planner =
        new TaskPlanner();


    console.log(
        "\n📋 Tarefa:"
    );

    console.log(
        TASK
    );


    /**
     * -----------------------------------------------------
     * 4. PLANEJAMENTO
     * -----------------------------------------------------
     */

    console.log(
        "\n🧠 Gerando plano..."
    );


    const plan =
        planner.plan(
            TASK
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
     * -----------------------------------------------------
     * 5. VALIDAÇÕES
     * -----------------------------------------------------
     */

    printSection(
        "VALIDAÇÕES"
    );


    const validations = {

        mainAgent:
            mainAgent
                ? "OK"
                : "ERRO",

        taskPlanner:
            planner
                ? "OK"
                : "ERRO",

        planGenerated:
            plan
                ? "OK"
                : "ERRO",

        taskValid:
            plan &&
            plan.task === TASK
                ? "OK"
                : "ERRO",

        stepsGenerated:
            plan &&
            Array.isArray(
                plan.steps
            ) &&
            plan.steps.length > 0
                ? "OK"
                : "ERRO"
    };


    Object.entries(
        validations
    ).forEach(
        ([key, value]) => {

            console.log(
                `${value === "OK" ? "✓" : "✗"} ` +
                `${key}: ${value}`
            );
        }
    );


    /**
     * -----------------------------------------------------
     * 6. STATUS DO PLANNER
     * -----------------------------------------------------
     */

    printSection(
        "STATUS DO TASK PLANNER"
    );


    console.log(
        JSON.stringify(
            planner.getStatus(),
            null,
            2
        )
    );


    /**
     * -----------------------------------------------------
     * 7. STATUS DO MAIN AGENT
     * -----------------------------------------------------
     */

    printSection(
        "STATUS DO MAIN AGENT"
    );


    console.log(
        JSON.stringify(
            mainAgent.getProjectStatus(),
            null,
            2
        )
    );


    /**
     * -----------------------------------------------------
     * 8. RESULTADO FINAL
     * -----------------------------------------------------
     */

    printSection(
        "STATUS FINAL DO TESTE"
    );


    const failed =
        Object.values(
            validations
        ).filter(
            value =>
                value !== "OK"
        );


    if (
        failed.length === 0
    ) {

        console.log(
            "✓ MainAgent: OK"
        );

        console.log(
            "✓ TaskPlanner: OK"
        );

        console.log(
            "✓ Planejamento automático: OK"
        );

        console.log(
            "✓ Geração de etapas: OK"
        );

        console.log(
            "\n🚀 TESTE MAIN + TASK PLANNER CONCLUÍDO COM SUCESSO!"
        );

    } else {

        console.log(
            "✗ O teste apresentou falhas."
        );

        console.log(
            `Total de falhas: ${failed.length}`
        );
    }


    /**
     * -----------------------------------------------------
     * 9. FINALIZAÇÃO
     * -----------------------------------------------------
     */

    console.log(
        "\nFinalizando MainAgent..."
    );


    mainAgent.shutdown();


    printSection(
        "SISTEMA FINALIZADO"
    );
}


/**
 * =========================================================
 * EXECUÇÃO
 * =========================================================
 */

main()
    .catch(
        error => {

            console.error(
                "\n❌ ERRO NO TESTE:"
            );

            console.error(
                error.message
            );

            process.exitCode = 1;
        }
    );