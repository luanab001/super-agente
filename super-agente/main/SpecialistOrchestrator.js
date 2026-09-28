"use strict";

const SpecialistRouter =
    require("./SpecialistRouter");


class SpecialistOrchestrator {

    constructor(loader, router = null) {

        if (!loader) {

            throw new Error(
                "SpecialistOrchestrator precisa de um SpecialistLoader."
            );
        }

        this.loader =
            loader;

        this.router =
            router ||
            new SpecialistRouter(loader);

        this.status =
            "ready";

        this.executionCount =
            0;

        this.lastExecution =
            null;
    }


    /**
     * =====================================================
     * CLONE SEGURO
     * =====================================================
     *
     * Cria uma cópia independente do valor.
     *
     * Se encontrar uma referência circular,
     * substitui por "[Circular]".
     *
     * A principal diferença em relação ao método anterior
     * é que a proteção acontece ANTES de armazenarmos
     * o resultado no contexto do pipeline.
     */
    cloneSafe(value) {

        const seen =
            new WeakSet();


        const clone = (currentValue) => {

            if (
                currentValue === null ||
                typeof currentValue !== "object"
            ) {

                return currentValue;
            }


            if (
                seen.has(currentValue)
            ) {

                return "[Circular]";
            }


            seen.add(
                currentValue
            );


            if (
                Array.isArray(currentValue)
            ) {

                return currentValue.map(
                    item =>
                        clone(item)
                );
            }


            const result = {};


            for (
                const key of Object.keys(
                    currentValue
                )
            ) {

                try {

                    result[key] =
                        clone(
                            currentValue[key]
                        );

                } catch (error) {

                    result[key] =
                        `[Erro ao copiar propriedade: ${error.message}]`;
                }
            }


            return result;
        };


        return clone(value);
    }


    /**
     * =====================================================
     * SERIALIZE SAFE
     * =====================================================
     *
     * Mantido como método público para compatibilidade
     * com o restante do sistema.
     *
     * Agora utiliza cloneSafe().
     */
    serializeSafe(value) {

        return this.cloneSafe(
            value
        );
    }


    /**
     * =====================================================
     * RESOLVE
     * =====================================================
     *
     * Identifica qual especialista deve executar
     * determinada tarefa.
     */
    resolve(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            return null;
        }

        return this.router.resolve(
            task
        );
    }


    /**
     * =====================================================
     * EXECUTE SPECIALIST
     * =====================================================
     *
     * Executa um especialista individualmente.
     */
    async executeSpecialist(
        specialist,
        task,
        context = null
    ) {

        if (!specialist) {

            throw new Error(
                "Especialista não informado."
            );
        }


        if (
            typeof specialist.execute !==
            "function"
        ) {

            throw new Error(
                `O especialista "${specialist.id}" não possui execute().`
            );
        }


        /*
         * Quando existe contexto,
         * enviamos um objeto estruturado.
         */
        if (context) {

            return await specialist.execute({

                task,

                context:
                    this.cloneSafe(
                        context
                    )
            });
        }


        return await specialist.execute(
            task
        );
    }


    /**
     * =====================================================
     * EXECUTE
     * =====================================================
     *
     * Executa uma tarefa através de um único
     * especialista.
     */
    async execute(task) {

        const specialist =
            this.resolve(
                task
            );


        if (!specialist) {

            throw new Error(
                "Nenhum especialista encontrado para a tarefa."
            );
        }


        const rawResult =
            await this.executeSpecialist(
                specialist,
                task
            );


        /*
         * Sanitiza o resultado antes de armazená-lo.
         */
        const result =
            this.cloneSafe(
                rawResult
            );


        this.executionCount++;


        this.lastExecution = {

            type:
                "single",

            task,

            specialist:
                specialist.id,

            result
        };


        return {

            success:
                true,

            task,

            specialists: [

                {

                    id:
                        specialist.id,

                    name:
                        specialist.name,

                    command:
                        specialist.command,

                    result
                }
            ]
        };
    }


    /**
     * =====================================================
     * EXECUTE TEAM
     * =====================================================
     *
     * Executa vários especialistas.
     */
    async executeTeam(
        specialistIds,
        task
    ) {

        if (
            !Array.isArray(
                specialistIds
            )
        ) {

            throw new Error(
                "specialistIds precisa ser um array."
            );
        }


        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }


        const results = [];


        for (
            const specialistId
            of specialistIds
        ) {

            const specialist =
                this.loader.getLoaded(
                    specialistId
                );


            if (!specialist) {

                results.push({

                    id:
                        specialistId,

                    success:
                        false,

                    error:
                        "Especialista não está carregado."
                });

                continue;
            }


            try {

                const rawResult =
                    await this.executeSpecialist(
                        specialist,
                        task
                    );


                const result =
                    this.cloneSafe(
                        rawResult
                    );


                results.push({

                    id:
                        specialist.id,

                    name:
                        specialist.name,

                    success:
                        true,

                    result
                });


            } catch (error) {

                results.push({

                    id:
                        specialist.id,

                    name:
                        specialist.name,

                    success:
                        false,

                    error:
                        error.message
                });
            }
        }


        this.executionCount++;


        this.lastExecution = {

            type:
                "team",

            task,

            specialists:
                specialistIds,

            results:
                this.cloneSafe(
                    results
                )
        };


        return this.cloneSafe({

            success:
                results.some(
                    item =>
                        item.success
                ),

            task,

            total:
                results.length,

            results
        });
    }


    /**
     * =====================================================
     * EXECUTE PIPELINE
     * =====================================================
     *
     * Executa especialistas em sequência.
     *
     * Cada especialista recebe:
     *
     * - tarefa original
     * - etapa atual
     * - resultados anteriores
     */
    async executePipeline(
        specialistIds,
        task
    ) {

        if (
            !Array.isArray(
                specialistIds
            )
        ) {

            throw new Error(
                "specialistIds precisa ser um array."
            );
        }


        if (
            specialistIds.length === 0
        ) {

            throw new Error(
                "A equipe precisa possuir pelo menos um especialista."
            );
        }


        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }


        this.status =
            "working";


        const pipeline = [];


        /*
         * Contexto interno do pipeline.
         *
         * IMPORTANTE:
         * Este objeto não será entregue diretamente
         * aos especialistas.
         */
        const context = {

            originalTask:
                task,

            previousResults:
                [],

            currentStep:
                0
        };


        for (
            let index = 0;
            index < specialistIds.length;
            index++
        ) {

            const specialistId =
                specialistIds[index];


            const specialist =
                this.loader.getLoaded(
                    specialistId
                );


            /**
             * -------------------------------------------------
             * ESPECIALISTA NÃO CARREGADO
             * -------------------------------------------------
             */

            if (!specialist) {

                const stepResult = {

                    step:
                        index + 1,

                    id:
                        specialistId,

                    success:
                        false,

                    error:
                        "Especialista não está carregado."
                };


                pipeline.push(
                    stepResult
                );


                context.previousResults.push(
                    this.cloneSafe(
                        stepResult
                    )
                );


                continue;
            }


            context.currentStep =
                index + 1;


            console.log(
                `\n🔄 Pipeline ` +
                `${index + 1}/${specialistIds.length}`
            );


            console.log(
                `   Especialista: ` +
                `${specialist.name}`
            );


            try {

                /**
                 * -------------------------------------------------
                 * SNAPSHOT DO CONTEXTO
                 * -------------------------------------------------
                 *
                 * Criamos uma cópia completamente independente
                 * do contexto anterior.
                 */
                const previousResultsSnapshot =
                    this.cloneSafe(
                        context.previousResults
                    );


                const specialistContext = {

                    originalTask:
                        context.originalTask,

                    currentStep:
                        context.currentStep,

                    previousResults:
                        previousResultsSnapshot
                };


                /**
                 * -------------------------------------------------
                 * EXECUTA ESPECIALISTA
                 * -------------------------------------------------
                 */

                const rawResult =
                    await this.executeSpecialist(
                        specialist,
                        task,
                        specialistContext
                    );


                /**
                 * -------------------------------------------------
                 * SANITIZA RESULTADO
                 * -------------------------------------------------
                 *
                 * O resultado é clonado ANTES de entrar
                 * no pipeline e no contexto.
                 */
                const safeResult =
                    this.cloneSafe(
                        rawResult
                    );


                /**
                 * -------------------------------------------------
                 * RESULTADO DA ETAPA
                 * -------------------------------------------------
                 */

                const stepResult = {

                    step:
                        index + 1,

                    id:
                        specialist.id,

                    name:
                        specialist.name,

                    success:
                        true,

                    result:
                        safeResult
                };


                /**
                 * -------------------------------------------------
                 * PIPELINE
                 * -------------------------------------------------
                 */

                pipeline.push(
                    this.cloneSafe(
                        stepResult
                    )
                );


                /**
                 * -------------------------------------------------
                 * CONTEXTO
                 * -------------------------------------------------
                 *
                 * Armazena uma cópia independente.
                 */
                context.previousResults.push(
                    this.cloneSafe(
                        stepResult
                    )
                );


            } catch (error) {

                const stepResult = {

                    step:
                        index + 1,

                    id:
                        specialist.id,

                    name:
                        specialist.name,

                    success:
                        false,

                    error:
                        error.message
                };


                pipeline.push(
                    this.cloneSafe(
                        stepResult
                    )
                );


                context.previousResults.push(
                    this.cloneSafe(
                        stepResult
                    )
                );
            }
        }


        /**
         * =====================================================
         * ESTATÍSTICAS
         * =====================================================
         */

        const successful =
            pipeline.filter(
                item =>
                    item.success
            );


        const failed =
            pipeline.filter(
                item =>
                    !item.success
            );


        this.executionCount++;


        this.status =
            "ready";


        /**
         * =====================================================
         * ÚLTIMA EXECUÇÃO
         * =====================================================
         */

        this.lastExecution = {

            type:
                "pipeline",

            task,

            specialists:
                [...specialistIds],

            pipeline:
                this.cloneSafe(
                    pipeline
                )
        };


        /**
         * =====================================================
         * RESULTADO FINAL
         * =====================================================
         */

        return this.cloneSafe({

            success:
                successful.length > 0,

            task,

            total:
                pipeline.length,

            successful:
                successful.length,

            failed:
                failed.length,

            pipeline,

            context: {

                originalTask:
                    context.originalTask,

                currentStep:
                    context.currentStep,

                previousResults:
                    context.previousResults
            }
        });
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

            loadedSpecialists:
                typeof this.loader.count ===
                "function"

                    ? this.loader.count()

                    : 0,

            executionCount:
                this.executionCount,

            lastExecution:
                this.lastExecution

                    ? {

                        type:
                            this.lastExecution.type,

                        task:
                            this.lastExecution.task

                    }

                    : null,

            router:
                this.router

                    ? this.router.getStatus()

                    : null
        };
    }
}


/**
 * ============================================================
 * EXPORT
 * ============================================================
 */

module.exports =
    SpecialistOrchestrator;