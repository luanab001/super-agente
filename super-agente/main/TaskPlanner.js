/**
 * =========================================================
 * SUPER AGENTE
 * TaskPlanner
 * =========================================================
 *
 * Responsabilidade:
 *
 * Receber uma tarefa complexa e transformá-la em
 * um plano estruturado de execução.
 *
 * Fluxo:
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

class TaskPlanner {

    /**
     * =====================================================
     * CONSTRUCTOR
     * =====================================================
     */

    constructor() {

        this.status =
            "ready";

        this.planCount =
            0;

        this.lastPlan =
            null;
    }


    /**
     * =====================================================
     * VALIDATE TASK
     * =====================================================
     */

    validateTask(task) {

        if (
            typeof task !== "string"
        ) {

            throw new Error(
                "A tarefa precisa ser uma string."
            );
        }

        if (
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa não pode estar vazia."
            );
        }

        return true;
    }


    /**
     * =====================================================
     * NORMALIZE TASK
     * =====================================================
     */

    normalizeTask(task) {

        return task
            .trim()
            .replace(/\s+/g, " ");
    }


    /**
     * =====================================================
     * DETECT DOMAINS
     * =====================================================
     *
     * Identifica áreas técnicas mencionadas na tarefa.
     */

    detectDomains(task) {

        const text =
            task.toLowerCase();

        const domains = [];


        const rules = [

            {
                domain:
                    "architecture",

                keywords: [
                    "arquitetura",
                    "estrutura",
                    "projeto",
                    "módulo",
                    "modulo",
                    "pastas"
                ]
            },

            {
                domain:
                    "frontend",

                keywords: [
                    "frontend",
                    "front-end",
                    "interface",
                    "tela",
                    "html",
                    "css",
                    "javascript",
                    "javascript"
                ]
            },

            {
                domain:
                    "backend",

                keywords: [
                    "backend",
                    "back-end",
                    "servidor",
                    "server",
                    "node",
                    "php",
                    "flask"
                ]
            },

            {
                domain:
                    "database",

                keywords: [
                    "banco",
                    "database",
                    "mysql",
                    "sqlite",
                    "postgresql",
                    "postgres"
                ]
            },

            {
                domain:
                    "api",

                keywords: [
                    "api",
                    "rest",
                    "restful",
                    "endpoint",
                    "endpoints"
                ]
            },

            {
                domain:
                    "sql",

                keywords: [
                    "sql",
                    "consulta",
                    "query",
                    "tabela",
                    "relacionamento"
                ]
            },

            {
                domain:
                    "security",

                keywords: [
                    "segurança",
                    "seguranca",
                    "login",
                    "autenticação",
                    "autenticacao",
                    "senha",
                    "permissão",
                    "permissao",
                    "jwt"
                ]
            },

            {
                domain:
                    "testing",

                keywords: [
                    "teste",
                    "testes",
                    "qualidade",
                    "validação",
                    "validacao"
                ]
            },

            {
                domain:
                    "performance",

                keywords: [
                    "performance",
                    "desempenho",
                    "velocidade",
                    "otimização",
                    "otimizacao"
                ]
            }
        ];


        for (
            const rule
            of rules
        ) {

            const detected =
                rule.keywords.some(
                    keyword =>
                        text.includes(keyword)
                );


            if (detected) {

                domains.push(
                    rule.domain
                );
            }
        }


        return domains;
    }


    /**
     * =====================================================
     * CREATE STEP
     * =====================================================
     */

    createStep(
        id,
        name,
        specialistIds,
        dependsOn = []
    ) {

        return {

            id,

            name,

            specialistIds,

            dependsOn,

            status:
                "pending"
        };
    }


    /**
     * =====================================================
     * BUILD PLAN
     * =====================================================
     */

    buildPlan(
        task,
        domains
    ) {

        const steps = [];


        /*
         * Arquitetura
         */

        if (
            domains.includes(
                "architecture"
            )
        ) {

            steps.push(
                this.createStep(
                    "architecture",
                    "Definir arquitetura e estrutura",
                    ["estrutura"]
                )
            );
        }


        /*
         * Banco de dados
         */

        if (
            domains.includes(
                "database"
            )
        ) {

            const dependsOn =
                steps.some(
                    step =>
                        step.id ===
                        "architecture"
                )
                    ? ["architecture"]
                    : [];


            steps.push(
                this.createStep(
                    "database",
                    "Projetar banco de dados",
                    ["database"],
                    dependsOn
                )
            );
        }


        /*
         * SQL
         */

        if (
            domains.includes(
                "sql"
            )
        ) {

            const dependsOn = [];


            if (
                steps.some(
                    step =>
                        step.id ===
                        "database"
                )
            ) {

                dependsOn.push(
                    "database"
                );
            }


            steps.push(
                this.createStep(
                    "sql",
                    "Definir estrutura e consultas SQL",
                    ["sql"],
                    dependsOn
                )
            );
        }


        /*
         * Backend
         */

        if (
            domains.includes(
                "backend"
            )
        ) {

            const dependsOn = [];


            if (
                steps.some(
                    step =>
                        step.id ===
                        "architecture"
                )
            ) {

                dependsOn.push(
                    "architecture"
                );
            }


            if (
                steps.some(
                    step =>
                        step.id ===
                        "database"
                )
            ) {

                dependsOn.push(
                    "database"
                );
            }


            steps.push(
                this.createStep(
                    "backend",
                    "Desenvolver camada backend",
                    ["backend"],
                    dependsOn
                )
            );
        }


        /*
         * API
         */

        if (
            domains.includes(
                "api"
            )
        ) {

            const dependsOn = [];


            if (
                steps.some(
                    step =>
                        step.id ===
                        "backend"
                )
            ) {

                dependsOn.push(
                    "backend"
                );
            }


            if (
                steps.some(
                    step =>
                        step.id ===
                        "database"
                )
            ) {

                dependsOn.push(
                    "database"
                );
            }


            steps.push(
                this.createStep(
                    "api",
                    "Desenvolver API",
                    ["api"],
                    dependsOn
                )
            );
        }


        /*
         * Frontend
         */

        if (
            domains.includes(
                "frontend"
            )
        ) {

            const dependsOn = [];


            if (
                steps.some(
                    step =>
                        step.id ===
                        "api"
                )
            ) {

                dependsOn.push(
                    "api"
                );
            }


            if (
                steps.some(
                    step =>
                        step.id ===
                        "architecture"
                )
            ) {

                dependsOn.push(
                    "architecture"
                );
            }


            steps.push(
                this.createStep(
                    "frontend",
                    "Desenvolver interface frontend",
                    ["frontend"],
                    dependsOn
                )
            );
        }


        /*
         * Segurança
         */

        if (
            domains.includes(
                "security"
            )
        ) {

            const dependsOn = [];


            if (
                steps.some(
                    step =>
                        step.id ===
                        "backend"
                )
            ) {

                dependsOn.push(
                    "backend"
                );
            }


            if (
                steps.some(
                    step =>
                        step.id ===
                        "api"
                )
            ) {

                dependsOn.push(
                    "api"
                );
            }


            steps.push(
                this.createStep(
                    "security",
                    "Aplicar segurança",
                    ["seguranca"],
                    dependsOn
                )
            );
        }


        /*
         * Testes
         */

        if (
            domains.includes(
                "testing"
            )
        ) {

            const dependsOn =
                steps.map(
                    step =>
                        step.id
                );


            steps.push(
                this.createStep(
                    "testing",
                    "Executar testes e validações",
                    ["testes"],
                    dependsOn
                )
            );
        }


        /*
         * Performance
         */

        if (
            domains.includes(
                "performance"
            )
        ) {

            const dependsOn =
                steps.map(
                    step =>
                        step.id
                );


            steps.push(
                this.createStep(
                    "performance",
                    "Analisar e otimizar performance",
                    ["performance"],
                    dependsOn
                )
            );
        }


        /*
         * Caso nenhuma área seja identificada.
         */

        if (
            steps.length === 0
        ) {

            steps.push(
                this.createStep(
                    "general",
                    "Analisar tarefa",
                    [],
                    []
                )
            );
        }


        return steps;
    }


    /**
     * =====================================================
     * PLAN
     * =====================================================
     */

    plan(task) {

        this.status =
            "working";


        try {

            this.validateTask(
                task
            );


            const normalizedTask =
                this.normalizeTask(
                    task
                );


            const domains =
                this.detectDomains(
                    normalizedTask
                );


            const steps =
                this.buildPlan(
                    normalizedTask,
                    domains
                );


            const plan = {

                success:
                    true,

                task:
                    normalizedTask,

                domains,

                totalSteps:
                    steps.length,

                steps,

                status:
                    "planned"
            };


            this.planCount++;


            this.lastPlan =
                plan;


            this.status =
                "ready";


            return plan;

        } catch (error) {

            this.status =
                "error";


            const result = {

                success:
                    false,

                task:
                    task || null,

                error:
                    error.message
            };


            this.lastPlan =
                result;


            return result;
        }
    }


    /**
     * =====================================================
     * GET NEXT READY STEPS
     * =====================================================
     *
     * Retorna etapas que ainda podem ser executadas
     * considerando as dependências.
     */

    getReadySteps(
        plan
    ) {

        if (
            !plan ||
            !Array.isArray(
                plan.steps
            )
        ) {

            return [];
        }


        const completed =
            new Set(
                plan.steps
                    .filter(
                        step =>
                            step.status ===
                            "completed"
                    )
                    .map(
                        step =>
                            step.id
                    )
            );


        return plan.steps.filter(
            step => {

                if (
                    step.status !==
                    "pending"
                ) {

                    return false;
                }


                return step.dependsOn.every(
                    dependency =>
                        completed.has(
                            dependency
                        )
                );
            }
        );
    }


    /**
     * =====================================================
     * MARK STEP
     * =====================================================
     */

    markStep(
        plan,
        stepId,
        status
    ) {

        if (
            !plan ||
            !Array.isArray(
                plan.steps
            )
        ) {

            throw new Error(
                "Plano inválido."
            );
        }


        const step =
            plan.steps.find(
                item =>
                    item.id ===
                    stepId
            );


        if (!step) {

            throw new Error(
                `Etapa "${stepId}" não encontrada.`
            );
        }


        const allowed =
            [
                "pending",
                "working",
                "completed",
                "failed"
            ];


        if (
            !allowed.includes(
                status
            )
        ) {

            throw new Error(
                `Status inválido: ${status}`
            );
        }


        step.status =
            status;


        return step;
    }


    /**
     * =====================================================
     * GET STATUS
     * =====================================================
     */

    getStatus() {

        return {

            status:
                this.status,

            planCount:
                this.planCount,

            lastPlan:
                this.lastPlan
                    ? {

                        success:
                            this.lastPlan.success,

                        task:
                            this.lastPlan.task,

                        totalSteps:
                            this.lastPlan.totalSteps || 0
                    }
                    : null
        };
    }


    /**
     * =====================================================
     * RESET
     * =====================================================
     */

    reset() {

        this.status =
            "ready";

        this.planCount =
            0;

        this.lastPlan =
            null;
    }
}


/**
 * =========================================================
 * EXPORT
 * =========================================================
 */

module.exports =
    TaskPlanner;