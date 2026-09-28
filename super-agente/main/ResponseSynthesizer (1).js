/**
 * =========================================================
 * SUPER AGENTE
 * ResponseSynthesizer
 * =========================================================
 *
 * Responsabilidade:
 *
 * Receber os resultados produzidos pelos especialistas
 * e transformar esses resultados em uma resposta final
 * organizada para o MainAgent.
 *
 * Fluxo:
 *
 * TeamSelector
 *      ↓
 * TeamCoordinator
 *      ↓
 * SpecialistOrchestrator
 *      ↓
 * ResponseSynthesizer
 *      ↓
 * Resposta Final
 *
 * =========================================================
 */


class ResponseSynthesizer {

    /**
     * =====================================================
     * CONSTRUCTOR
     * =====================================================
     */

    constructor() {

        this.status =
            "ready";

        this.synthesisCount =
            0;

        this.lastSynthesis =
            null;
    }


    /**
     * =====================================================
     * SERIALIZE SAFE
     * =====================================================
     *
     * Protege contra referências circulares.
     */

    serializeSafe(value) {

        const seen =
            new WeakSet();

        return JSON.parse(
            JSON.stringify(
                value,
                (key, currentValue) => {

                    if (
                        typeof currentValue === "object" &&
                        currentValue !== null
                    ) {

                        if (
                            seen.has(currentValue)
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
    }


    /**
     * =====================================================
     * VALIDATE
     * =====================================================
     *
     * Valida o resultado recebido do Orchestrator.
     */

    validate(result) {

        if (!result) {

            throw new Error(
                "Resultado da execução não foi informado."
            );
        }

        if (
            typeof result !== "object"
        ) {

            throw new Error(
                "O resultado da execução precisa ser um objeto."
            );
        }

        if (
            typeof result.task !== "string" ||
            result.task.trim() === ""
        ) {

            throw new Error(
                "O resultado precisa possuir uma tarefa válida."
            );
        }

        return true;
    }


    /**
     * =====================================================
     * EXTRACT PIPELINE
     * =====================================================
     *
     * Extrai as etapas do pipeline.
     */

    extractPipeline(result) {

        if (
            !Array.isArray(
                result.pipeline
            )
        ) {

            return [];
        }

        return result.pipeline.map(
            step => ({

                step:
                    step.step,

                id:
                    step.id,

                name:
                    step.name || null,

                success:
                    step.success === true,

                result:
                    step.result !== undefined
                        ? step.result
                        : null,

                error:
                    step.error || null
            })
        );
    }


    /**
     * =====================================================
     * EXTRACT SUCCESSFUL
     * =====================================================
     *
     * Retorna somente as etapas executadas
     * com sucesso.
     */

    extractSuccessful(pipeline) {

        return pipeline.filter(
            step =>
                step.success === true
        );
    }


    /**
     * =====================================================
     * EXTRACT FAILED
     * =====================================================
     *
     * Retorna as etapas que apresentaram erro.
     */

    extractFailed(pipeline) {

        return pipeline.filter(
            step =>
                step.success !== true
        );
    }


    /**
     * =====================================================
     * BUILD SPECIALIST REPORT
     * =====================================================
     *
     * Cria uma estrutura resumida de cada especialista.
     *
     * Mantemos os campos em português:
     *
     * - ordem
     * - especialista
     * - nome
     * - status
     * - resultado
     * - erro
     *
     * E também disponibilizamos os campos padronizados:
     *
     * - id
     * - name
     * - result
     *
     * Isso permite que outros componentes do sistema
     * consumam o relatório sem depender de uma única
     * convenção de nomes.
     */

    buildSpecialistReport(pipeline) {

        return pipeline.map(
            step => ({

                /*
                 * Campos padronizados
                 */

                id:
                    step.id,

                name:
                    step.name,

                result:
                    step.result,


                /*
                 * Campos em português
                 */

                ordem:
                    step.step,

                especialista:
                    step.id,

                nome:
                    step.name,

                status:
                    step.success
                        ? "concluido"
                        : "erro",

                resultado:
                    step.result,

                erro:
                    step.error
            })
        );
    }


    /**
     * =====================================================
     * BUILD FINAL MESSAGE
     * =====================================================
     *
     * Cria a mensagem textual final.
     */

    buildFinalMessage(
        task,
        successful,
        failed
    ) {

        const total =
            successful.length +
            failed.length;


        if (
            total === 0
        ) {

            return (
                "A equipe não produziu resultados para a tarefa."
            );
        }


        if (
            successful.length === total
        ) {

            return (
                `A tarefa foi processada com sucesso por ` +
                `${successful.length} especialista(s).`
            );
        }


        if (
            successful.length > 0 &&
            failed.length > 0
        ) {

            return (
                `A tarefa foi processada parcialmente. ` +
                `${successful.length} especialista(s) concluíram ` +
                `e ${failed.length} apresentaram erro.`
            );
        }


        return (
            `A tarefa não foi concluída. ` +
            `${failed.length} especialista(s) apresentaram erro.`
        );
    }


    /**
     * =====================================================
     * SYNTHESIZE
     * =====================================================
     *
     * Método principal.
     *
     * Recebe o resultado do SpecialistOrchestrator
     * e produz uma resposta consolidada.
     */

    synthesize(result) {

        this.status =
            "working";


        try {

            /*
             * Validação
             */

            this.validate(
                result
            );


            /*
             * Pipeline
             */

            const pipeline =
                this.extractPipeline(
                    result
                );


            /*
             * Sucessos
             */

            const successful =
                this.extractSuccessful(
                    pipeline
                );


            /*
             * Erros
             */

            const failed =
                this.extractFailed(
                    pipeline
                );


            /*
             * Relatório dos especialistas
             */

            const specialists =
                this.buildSpecialistReport(
                    pipeline
                );


            /*
             * Mensagem final
             */

            const finalMessage =
                this.buildFinalMessage(
                    result.task,
                    successful,
                    failed
                );


            /*
             * Resultado consolidado
             */

            const synthesis = {

                success:
                    successful.length > 0,

                task:
                    result.task,

                message:
                    finalMessage,

                summary: {

                    total:
                        pipeline.length,

                    successful:
                        successful.length,

                    failed:
                        failed.length
                },

                specialists,

                originalResult:
                    this.serializeSafe(
                        result
                    )
            };


            /*
             * Estatísticas
             */

            this.synthesisCount++;

            this.status =
                "ready";


            this.lastSynthesis =
                this.serializeSafe(
                    synthesis
                );


            return this.lastSynthesis;

        } catch (error) {

            this.status =
                "error";


            this.lastSynthesis = {

                success:
                    false,

                task:
                    result &&
                    result.task
                        ? result.task
                        : null,

                message:
                    "Não foi possível sintetizar o resultado.",

                error:
                    error.message
            };


            return this.lastSynthesis;
        }
    }


    /**
     * =====================================================
     * SYNTHESIZE PIPELINE
     * =====================================================
     *
     * Alias específico para resultados de pipeline.
     */

    synthesizePipeline(result) {

        return this.synthesize(
            result
        );
    }


    /**
     * =====================================================
     * GET LAST SYNTHESIS
     * =====================================================
     */

    getLastSynthesis() {

        return this.lastSynthesis;
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

            synthesisCount:
                this.synthesisCount,

            lastSynthesis:
                this.lastSynthesis
                    ? {

                        success:
                            this.lastSynthesis.success,

                        task:
                            this.lastSynthesis.task,

                        total:
                            this.lastSynthesis.summary
                                ? this.lastSynthesis.summary.total
                                : 0
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

        this.synthesisCount =
            0;

        this.lastSynthesis =
            null;
    }
}


/**
 * =========================================================
 * EXPORT
 * =========================================================
 */

module.exports =
    ResponseSynthesizer;