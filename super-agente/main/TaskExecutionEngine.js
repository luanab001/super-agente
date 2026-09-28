/**
 * =========================================================
 * SUPER AGENTE
 * TaskExecutionEngine
 * =========================================================
 *
 * Responsabilidade:
 *
 * Controlar a execução de uma tarefa planejada.
 *
 * Fluxo:
 *
 * TaskPlanner
 *      ↓
 * TaskExecutionEngine
 *      ↓
 * TeamSelector
 *      ↓
 * SpecialistOrchestrator
 *      ↓
 * ResponseSynthesizer
 *
 * O Engine é responsável por:
 *
 * - receber um plano
 * - controlar as etapas
 * - verificar dependências
 * - selecionar especialistas
 * - executar etapas
 * - registrar resultados
 * - controlar status
 * - produzir histórico da execução
 *
 * =========================================================
 */

class TaskExecutionEngine {

    /**
     * =====================================================
     * CONSTRUCTOR
     * =====================================================
     *
     * Permite duas formas de inicialização:
     *
     * 1. Objeto:
     *
     * new TaskExecutionEngine({
     *     planner,
     *     teamSelector,
     *     orchestrator,
     *     synthesizer
     * });
     *
     * 2. Forma simplificada:
     *
     * new TaskExecutionEngine(
     *     planner,
     *     orchestrator,
     *     synthesizer
     * );
     *
     * =====================================================
     */

    constructor(
        options = {},
        orchestrator = null,
        synthesizer = null
    ) {

        /*
         * =================================================
         * COMPATIBILIDADE DE CONSTRUTOR
         * =================================================
         */

        if (
            options &&
            typeof options === "object" &&
            (
                Object.prototype.hasOwnProperty.call(
                    options,
                    "planner"
                ) ||
                Object.prototype.hasOwnProperty.call(
                    options,
                    "orchestrator"
                ) ||
                Object.prototype.hasOwnProperty.call(
                    options,
                    "synthesizer"
                ) ||
                Object.prototype.hasOwnProperty.call(
                    options,
                    "teamSelector"
                )
            )
        ) {

            this.planner =
                options.planner || null;

            this.teamSelector =
                options.teamSelector || null;

            this.orchestrator =
                options.orchestrator || null;

            this.synthesizer =
                options.synthesizer || null;

        } else {

            this.planner =
                options || null;

            this.teamSelector =
                null;

            this.orchestrator =
                orchestrator || null;

            this.synthesizer =
                synthesizer || null;
        }


        /*
         * =================================================
         * ESTADO
         * =================================================
         */

        this.status =
            "ready";

        this.executionCount =
            0;

        this.lastExecution =
            null;

        this.currentExecution =
            null;
    }


    /**
     * =====================================================
     * SERIALIZE SAFE
     * =====================================================
     *
     * Protege o sistema contra referências circulares.
     *
     * =====================================================
     */

    serializeSafe(value) {

        if (
            value === undefined
        ) {

            return null;
        }

        if (
            value === null
        ) {

            return null;
        }

        const seen =
            new WeakSet();

        try {

            return JSON.parse(
                JSON.stringify(
                    value,
                    (key, currentValue) => {

                        if (
                            typeof currentValue === "object" &&
                            currentValue !== null
                        ) {

                            if (
                                seen.has(
                                    currentValue
                                )
                            ) {

                                return "[Circular]";
                            }

                            seen.add(
                                currentValue
                            );
                        }

                        return currentValue;
                    }
                )
            );

        } catch (error) {

            return {
                error:
                    "Não foi possível serializar o objeto.",
                message:
                    error.message
            };
        }
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
     * VALIDATE PLAN
     * =====================================================
     */

    validatePlan(plan) {

        if (!plan) {

            throw new Error(
                "Plano de execução não informado."
            );
        }

        if (
            typeof plan !== "object"
        ) {

            throw new Error(
                "O plano precisa ser um objeto."
            );
        }

        if (
            !Array.isArray(
                plan.steps
            )
        ) {

            throw new Error(
                "O plano precisa possuir um array de etapas."
            );
        }

        if (
            plan.steps.length === 0
        ) {

            throw new Error(
                "O plano precisa possuir pelo menos uma etapa."
            );
        }

        return true;
    }


    /**
     * =====================================================
     * CREATE EXECUTION
     * =====================================================
     */

    createExecution(
        task,
        plan
    ) {

        return {

            task,

            status:
                "running",

            startedAt:
                new Date().toISOString(),

            finishedAt:
                null,

            totalSteps:
                plan.steps.length,

            completedSteps:
                0,

            failedSteps:
                0,

            blockedSteps:
                0,

            steps:
                []
        };
    }


    /**
     * =====================================================
     * GET STEP ID
     * =====================================================
     */

    getStepId(step) {

        if (
            !step ||
            typeof step !== "object"
        ) {

            return null;
        }

        if (
            step.id
        ) {

            return step.id;
        }

        if (
            step.specialistId
        ) {

            return step.specialistId;
        }

        if (
            step.specialist
        ) {

            return step.specialist;
        }

        return null;
    }


    /**
     * =====================================================
     * GET STEP DEPENDENCIES
     * =====================================================
     */

    getStepDependencies(step) {

        if (
            !step ||
            typeof step !== "object"
        ) {

            return [];
        }

        if (
            Array.isArray(
                step.dependencies
            )
        ) {

            return step.dependencies;
        }

        if (
            Array.isArray(
                step.dependsOn
            )
        ) {

            return step.dependsOn;
        }

        return [];
    }


    /**
     * =====================================================
     * DEPENDENCIES COMPLETED
     * =====================================================
     *
     * Verifica se todas as dependências da etapa
     * já foram concluídas.
     *
     * =====================================================
     */

    dependenciesCompleted(
        step,
        execution
    ) {

        const dependencies =
            this.getStepDependencies(
                step
            );

        if (
            dependencies.length === 0
        ) {

            return true;
        }

        return dependencies.every(
            dependencyId => {

                const dependency =
                    execution.steps.find(
                        item =>
                            item.id ===
                            dependencyId
                    );

                return (
                    dependency &&
                    dependency.status ===
                    "completed"
                );
            }
        );
    }


    /**
     * =====================================================
     * RESOLVE SPECIALIST
     * =====================================================
     */

    resolveSpecialist(step) {

        const specialistId =
            this.getStepId(
                step
            );

        if (
            specialistId
        ) {

            return specialistId;
        }

        return null;
    }


    /**
     * =====================================================
     * EXECUTE STEP
     * =====================================================
     */

    async executeStep(
        step,
        execution
    ) {

        const stepId =
            this.resolveSpecialist(
                step
            );

        const stepResult = {

            step:
                execution.steps.length + 1,

            id:
                stepId,

            name:
                step.name ||
                stepId,

            task:
                step.task ||
                execution.task,

            status:
                "running",

            startedAt:
                new Date().toISOString(),

            finishedAt:
                null,

            result:
                null,

            error:
                null
        };


        /*
         * Registrar a etapa imediatamente.
         */

        execution.steps.push(
            stepResult
        );


        console.log(
            `\n⚙️ Executando etapa ` +
            `${stepResult.step}/` +
            `${execution.totalSteps}`
        );


        /*
         * =================================================
         * VALIDAR ESPECIALISTA
         * =================================================
         */

        if (
            !stepId
        ) {

            stepResult.status =
                "failed";

            stepResult.error =
                "Nenhum especialista foi definido para a etapa.";

            stepResult.finishedAt =
                new Date().toISOString();

            execution.failedSteps++;

            return stepResult;
        }


        /*
         * =================================================
         * VALIDAR ORCHESTRATOR
         * =================================================
         */

        if (
            !this.orchestrator
        ) {

            stepResult.status =
                "failed";

            stepResult.error =
                "SpecialistOrchestrator não está configurado.";

            stepResult.finishedAt =
                new Date().toISOString();

            execution.failedSteps++;

            return stepResult;
        }


        /*
         * =================================================
         * EXECUÇÃO
         * =================================================
         */

        try {

            const result =
                await this.orchestrator.executeTeam(
                    [stepId],
                    step.task ||
                    execution.task
                );


            stepResult.result =
                this.serializeSafe(
                    result
                );


            /*
             * O executeTeam retorna:
             *
             * {
             *     success: true/false,
             *     task: "...",
             *     total: 1,
             *     results: [...]
             * }
             */

            if (
                result &&
                result.success === true
            ) {

                stepResult.status =
                    "completed";

                execution.completedSteps++;

            } else {

                stepResult.status =
                    "failed";

                execution.failedSteps++;

                stepResult.error =
                    "O especialista não concluiu a etapa.";
            }


        } catch (error) {

            stepResult.status =
                "failed";

            stepResult.error =
                error.message;

            execution.failedSteps++;
        }


        stepResult.finishedAt =
            new Date().toISOString();


        return stepResult;
    }


    /**
     * =====================================================
     * EXECUTE PLAN
     * =====================================================
     */

    async executePlan(
        task,
        plan
    ) {

        this.validateTask(
            task
        );

        this.validatePlan(
            plan
        );


        this.status =
            "working";


        const execution =
            this.createExecution(
                task,
                plan
            );


        this.currentExecution =
            execution;


        try {

            /*
             * =============================================
             * EXECUTAR ETAPAS
             * =============================================
             */

            for (
                const step of plan.steps
            ) {

                const dependenciesReady =
                    this.dependenciesCompleted(
                        step,
                        execution
                    );


                /*
                 * =========================================
                 * ETAPA BLOQUEADA
                 * =========================================
                 */

                if (
                    !dependenciesReady
                ) {

                    const blockedStep = {

                        step:
                            execution.steps.length + 1,

                        id:
                            this.getStepId(
                                step
                            ),

                        name:
                            step.name ||
                            this.getStepId(
                                step
                            ),

                        task:
                            step.task ||
                            task,

                        status:
                            "blocked",

                        startedAt:
                            null,

                        finishedAt:
                            new Date().toISOString(),

                        result:
                            null,

                        error:
                            "Dependências da etapa ainda não foram concluídas."
                    };


                    execution.steps.push(
                        blockedStep
                    );


                    execution.failedSteps++;

                    execution.blockedSteps++;

                    continue;
                }


                /*
                 * =========================================
                 * EXECUTAR ETAPA
                 * =========================================
                 */

                await this.executeStep(
                    step,
                    execution
                );
            }


            /*
             * =============================================
             * DETERMINAR STATUS FINAL
             * =============================================
             */

            if (
                execution.failedSteps === 0
            ) {

                execution.status =
                    "completed";

            } else if (
                execution.completedSteps > 0
            ) {

                execution.status =
                    "partial";

            } else {

                execution.status =
                    "failed";
            }


            execution.finishedAt =
                new Date().toISOString();


            /*
             * =============================================
             * REGISTRAR HISTÓRICO
             * =============================================
             */

            this.executionCount++;


            this.lastExecution =
                this.serializeSafe(
                    execution
                );


            return this.lastExecution;

        } catch (error) {

            /*
             * =============================================
             * ERRO GLOBAL DE EXECUÇÃO
             * =============================================
             */

            execution.status =
                "failed";

            execution.finishedAt =
                new Date().toISOString();

            execution.globalError =
                error.message;


            this.executionCount++;


            this.lastExecution =
                this.serializeSafe(
                    execution
                );


            throw error;

        } finally {

            this.currentExecution =
                null;

            this.status =
                "ready";
        }
    }


    /**
     * =====================================================
     * PLAN AND EXECUTE
     * =====================================================
     *
     * Cria o plano automaticamente e depois executa.
     *
     * =====================================================
     */

    async planAndExecute(
        task
    ) {

        this.validateTask(
            task
        );


        if (
            !this.planner
        ) {

            throw new Error(
                "TaskPlanner não está configurado."
            );
        }


        /*
         * O planner pode ser síncrono
         * ou assíncrono.
         */

        const plan =
            await this.planner.plan(
                task
            );


        this.validatePlan(
            plan
        );


        return await this.executePlan(
            task,
            plan
        );
    }


    /**
     * =====================================================
     * SYNTHESIZE EXECUTION
     * =====================================================
     *
     * Envia o resultado da execução para o
     * ResponseSynthesizer.
     *
     * =====================================================
     */

    synthesizeExecution(
        execution
    ) {

        if (
            !this.synthesizer
        ) {

            throw new Error(
                "ResponseSynthesizer não está configurado."
            );
        }


        return this.synthesizer.synthesize(
            execution
        );
    }


    /**
     * =====================================================
     * EXECUTE
     * =====================================================
     *
     * Método público principal.
     *
     * =====================================================
     */

    async execute(
        task
    ) {

        return await this.run(
            task
        );
    }


    /**
     * =====================================================
     * RUN
     * =====================================================
     *
     * Fluxo completo:
     *
     * Tarefa
     *   ↓
     * TaskPlanner
     *   ↓
     * Execução
     *   ↓
     * ResponseSynthesizer
     *   ↓
     * Resposta final
     *
     * =====================================================
     */

    async run(
        task
    ) {

        this.validateTask(
            task
        );


        /*
         * =================================================
         * VALIDAR COMPONENTES
         * =================================================
         */

        if (
            !this.planner
        ) {

            throw new Error(
                "TaskPlanner não está configurado."
            );
        }


        if (
            !this.orchestrator
        ) {

            throw new Error(
                "SpecialistOrchestrator não está configurado."
            );
        }


        if (
            !this.synthesizer
        ) {

            throw new Error(
                "ResponseSynthesizer não está configurado."
            );
        }


        /*
         * =================================================
         * PLANEJAR E EXECUTAR
         * =================================================
         */

        const execution =
            await this.planAndExecute(
                task
            );


        /*
         * =================================================
         * PREPARAR PIPELINE PARA O SYNTHESIZER
         * =================================================
         */

        const synthesisInput = {

            success:
                execution.completedSteps > 0,

            task:
                execution.task,

            total:
                execution.steps.length,

            pipeline:
                execution.steps.map(
                    step => ({

                        step:
                            step.step,

                        id:
                            step.id,

                        name:
                            step.name ||
                            step.id,

                        success:
                            step.status ===
                            "completed",

                        result:
                            step.result,

                        error:
                            step.error
                    })
                )
        };


        /*
         * =================================================
         * SINTETIZAR
         * =================================================
         */

        const synthesis =
            this.synthesizeExecution(
                synthesisInput
            );


        /*
         * =================================================
         * RESPOSTA FINAL
         * =================================================
         */

        return {

            success:
                execution.completedSteps > 0,

            task,

            execution:

                this.serializeSafe(
                    execution
                ),

            synthesis:

                this.serializeSafe(
                    synthesis
                )
        };
    }


    /**
     * =====================================================
     * GET CURRENT EXECUTION
     * =====================================================
     */

    getCurrentExecution() {

        return this.currentExecution;
    }


    /**
     * =====================================================
     * GET LAST EXECUTION
     * =====================================================
     */

    getLastExecution() {

        return this.lastExecution;
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

            executionCount:
                this.executionCount,

            currentExecution:
                this.currentExecution
                    ? {

                        task:
                            this.currentExecution.task,

                        status:
                            this.currentExecution.status,

                        totalSteps:
                            this.currentExecution.totalSteps,

                        completedSteps:
                            this.currentExecution.completedSteps,

                        failedSteps:
                            this.currentExecution.failedSteps,

                        blockedSteps:
                            this.currentExecution.blockedSteps

                    }
                    : null,

            lastExecution:
                this.lastExecution
                    ? {

                        task:
                            this.lastExecution.task,

                        status:
                            this.lastExecution.status,

                        totalSteps:
                            this.lastExecution.totalSteps,

                        completedSteps:
                            this.lastExecution.completedSteps,

                        failedSteps:
                            this.lastExecution.failedSteps,

                        blockedSteps:
                            this.lastExecution.blockedSteps

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

        this.executionCount =
            0;

        this.lastExecution =
            null;

        this.currentExecution =
            null;
    }
}


/**
 * =========================================================
 * EXPORT
 * =========================================================
 */

module.exports =
    TaskExecutionEngine;