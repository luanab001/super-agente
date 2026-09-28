const TeamSelector =
    require("./TeamSelector");


class TeamCoordinator {

    constructor(
        loader,
        orchestrator,
        selector = null
    ) {

        if (!loader) {
            throw new Error(
                "TeamCoordinator precisa de um SpecialistLoader."
            );
        }

        if (!orchestrator) {
            throw new Error(
                "TeamCoordinator precisa de um SpecialistOrchestrator."
            );
        }

        this.loader =
            loader;

        this.orchestrator =
            orchestrator;

        this.selector =
            selector ||
            new TeamSelector();

        this.status =
            "ready";

        this.executionCount =
            0;

        this.lastExecution =
            null;
    }


    /*
     * =====================================================
     * ANALYZE
     * =====================================================
     *
     * Analisa a tarefa sem executar especialistas.
     *
     * Retorna:
     *
     * - candidatos
     * - equipe selecionada
     * - especialista principal
     * - IDs selecionados
     */

    analyze(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }

        return this.selector.getAnalysis(
            task
        );
    }


    /*
     * =====================================================
     * SELECT TEAM
     * =====================================================
     *
     * Seleciona automaticamente a equipe.
     */

    selectTeam(
        task,
        options = {}
    ) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }

        return this.selector.select(
            task,
            options
        );
    }


    /*
     * =====================================================
     * SELECT IDS
     * =====================================================
     *
     * Retorna somente os IDs.
     */

    selectIds(
        task,
        options = {}
    ) {

        return this.selector.selectIds(
            task,
            options
        );
    }


    /*
     * =====================================================
     * ENSURE LOADED
     * =====================================================
     *
     * Verifica quais especialistas já estão
     * carregados e carrega automaticamente
     * os que estiverem faltando.
     */

    ensureLoaded(
        specialistIds
    ) {

        if (
            !Array.isArray(specialistIds)
        ) {

            throw new Error(
                "specialistIds precisa ser um array."
            );
        }

        const alreadyLoaded = [];

        const missing = [];

        for (
            const specialistId
            of specialistIds
        ) {

            if (
                this.loader.isLoaded(
                    specialistId
                )
            ) {

                alreadyLoaded.push(
                    specialistId
                );

            } else {

                missing.push(
                    specialistId
                );
            }
        }


        /*
         * Carrega automaticamente
         * os especialistas que faltaram.
         */

        let loadedNow = [];

        if (
            missing.length > 0
        ) {

            loadedNow =
                this.loader.loadMany(
                    missing
                );
        }


        const loadedIds =
            loadedNow.map(
                specialist =>
                    specialist.id
            );


        /*
         * Verifica novamente quais
         * realmente estão disponíveis.
         */

        const loaded =
            specialistIds.filter(
                specialistId =>
                    this.loader.isLoaded(
                        specialistId
                    )
            );


        const unavailable =
            specialistIds.filter(
                specialistId =>
                    !this.loader.isLoaded(
                        specialistId
                    )
            );


        return {

            requested:
                specialistIds,

            alreadyLoaded,

            loadedNow:
                loadedIds,

            loaded,

            unavailable,

            totalRequested:
                specialistIds.length,

            totalLoaded:
                loaded.length,

            totalUnavailable:
                unavailable.length
        };
    }


    /*
     * =====================================================
     * COORDINATE
     * =====================================================
     *
     * Fluxo automático completo:
     *
     * 1. Analisa tarefa
     * 2. Seleciona equipe
     * 3. Carrega especialistas faltantes
     * 4. Executa pipeline
     * 5. Retorna relatório
     */

    async coordinate(
        task,
        options = {}
    ) {

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


        console.log(
            "\n======================================"
        );

        console.log(
            "       COORDENAÇÃO AUTOMÁTICA"
        );

        console.log(
            "======================================\n"
        );


        console.log(
            "🔎 Analisando a tarefa..."
        );


        /*
         * -------------------------------------------------
         * 1. Seleção
         * -------------------------------------------------
         */

        const selected =
            this.selectTeam(
                task,
                options
            );


        const specialistIds =
            selected.map(
                specialist =>
                    specialist.id
            );


        console.log(
            `🤖 ${specialistIds.length} especialistas selecionados.`
        );


        /*
         * -------------------------------------------------
         * 2. Carregamento automático
         * -------------------------------------------------
         */

        console.log(
            "\n📦 Verificando especialistas carregados..."
        );


        const loading =
            this.ensureLoaded(
                specialistIds
            );


        console.log(
            `✅ ${loading.totalLoaded} especialistas disponíveis.`
        );


        if (
            loading.totalUnavailable > 0
        ) {

            console.log(
                `⚠️ ${loading.totalUnavailable} especialistas não puderam ser carregados.`
            );
        }


        /*
         * -------------------------------------------------
         * 3. Pipeline
         * -------------------------------------------------
         *
         * Só executamos os especialistas
         * realmente carregados.
         */

        const executableIds =
            loading.loaded;


        if (
            executableIds.length === 0
        ) {

            this.status =
                "error";

            throw new Error(
                "Nenhum especialista selecionado está disponível para execução."
            );
        }


        console.log(
            `\n🚀 Executando equipe com ${executableIds.length} especialistas...`
        );


        const execution =
            await this.orchestrator.executePipeline(
                executableIds,
                task
            );


        /*
         * -------------------------------------------------
         * 4. Resultado
         * -------------------------------------------------
         */

        this.executionCount++;


        this.status =
            "ready";


        this.lastExecution = {

            task,

            selected,

            loading,

            execution
        };


        return {

            success:
                execution.success,

            task,

            selection: {

                total:
                    selected.length,

                specialists:
                    selected
            },

            loading,

            execution
        };
    }


    /*
     * =====================================================
     * COORDINATE IDS
     * =====================================================
     *
     * Permite executar uma equipe específica,
     * mas ainda carregando automaticamente
     * os especialistas ausentes.
     */

    async coordinateIds(
        specialistIds,
        task
    ) {

        if (
            !Array.isArray(specialistIds)
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


        const loading =
            this.ensureLoaded(
                specialistIds
            );


        if (
            loading.loaded.length === 0
        ) {

            this.status =
                "error";

            throw new Error(
                "Nenhum especialista da equipe está disponível."
            );
        }


        const execution =
            await this.orchestrator.executePipeline(
                loading.loaded,
                task
            );


        this.executionCount++;


        this.status =
            "ready";


        this.lastExecution = {

            task,

            specialistIds,

            loading,

            execution
        };


        return {

            success:
                execution.success,

            task,

            loading,

            execution
        };
    }


    /*
     * =====================================================
     * GET PRIMARY
     * =====================================================
     */

    getPrimary(task) {

        return this.selector.getPrimary(
            task
        );
    }


    /*
     * =====================================================
     * SHOW TEAM
     * =====================================================
     */

    showTeam(task) {

        return this.selector.showTeam(
            task
        );
    }


    /*
     * =====================================================
     * GET LAST EXECUTION
     * =====================================================
     */

    getLastExecution() {

        return this.lastExecution;
    }


    /*
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

            lastExecution:
                this.lastExecution
                    ? {
                        task:
                            this.lastExecution.task
                    }
                    : null,

            selector:
                this.selector
                    ? this.selector.getStatus()
                    : null,

            orchestrator:
                this.orchestrator
                    ? this.orchestrator.getStatus()
                    : null,

            loadedSpecialists:
                typeof this.loader.count ===
                "function"
                    ? this.loader.count()
                    : 0
        };
    }
}


module.exports =
    TeamCoordinator;