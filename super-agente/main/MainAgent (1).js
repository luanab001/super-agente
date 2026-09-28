/**
 * =========================================================
 * SUPER AGENTE
 * MainAgent
 * =========================================================
 *
 * Responsabilidade:
 *
 * - Inicializar o sistema
 * - Configurar o projeto
 * - Carregar especialistas
 * - Selecionar equipe automaticamente
 * - Coordenar especialistas
 * - Executar pipelines
 * - Sintetizar respostas
 *
 * Fluxo principal:
 *
 * Usuário
 *    ↓
 * MainAgent
 *    ↓
 * TeamSelector
 *    ↓
 * SpecialistOrchestrator
 *    ↓
 * ResponseSynthesizer
 *    ↓
 * Resposta Final
 *
 * =========================================================
 */

const AutoConfigurator =
    require("./AutoConfigurator");

const SpecialistLoader =
    require("./SpecialistLoader");

const SpecialistRouter =
    require("./SpecialistRouter");

const SpecialistOrchestrator =
    require("./SpecialistOrchestrator");

const TeamSelector =
    require("./TeamSelector");

const ResponseSynthesizer =
    require("./ResponseSynthesizer");


class MainAgent {

    /**
     * =====================================================
     * CONSTRUCTOR
     * =====================================================
     */

    constructor() {

        this.name =
            "SUPER AGENTE — MAIN";

        this.version =
            "1.2.0";

        this.status =
            "created";


        /*
         * Configurador do projeto
         */

        this.configurator =
            new AutoConfigurator();


        /*
         * Loader dos especialistas
         */

        this.loader =
            new SpecialistLoader();


        /*
         * Componentes principais
         */

        this.router =
            null;

        this.orchestrator =
            null;

        this.teamSelector =
            null;

        this.synthesizer =
            null;


        /*
         * Dados do projeto
         */

        this.project =
            null;

        this.team =
            [];


        /*
         * Estatísticas
         */

        this.executionCount =
            0;

        this.lastTask =
            null;

        this.lastTeamSelection =
            null;

        this.lastResponse =
            null;
    }


    /**
     * =====================================================
     * INITIALIZE
     * =====================================================
     */

    initialize() {

        console.log(
            `\n🧠 ${this.name}`
        );

        console.log(
            `📦 Versão: ${this.version}`
        );

        console.log(
            "🚀 Inicializando MainAgent..."
        );


        this.status =
            "ready";


        console.log(
            "✅ MainAgent inicializado.\n"
        );


        return true;
    }


    /**
     * =====================================================
     * AUTOCONFIGURE
     * =====================================================
     *
     * Configura o projeto inicialmente.
     */

    autoConfigure(description) {

        if (
            typeof description !== "string" ||
            description.trim() === ""
        ) {

            throw new Error(
                "A descrição do projeto precisa ser informada."
            );
        }


        console.log(
            "\n🔎 Analisando projeto..."
        );


        const configuration =
            this.configurator.configure(
                description
            );


        console.log(
            `📋 ${configuration.total} especialistas selecionados.`
        );


        const ids =
            configuration.specialists.map(
                specialist =>
                    specialist.id
            );


        /*
         * Carrega os especialistas
         * inicialmente selecionados.
         */

        this.team =
            this.loader.loadMany(
                ids
            );


        /*
         * Router
         */

        this.router =
            new SpecialistRouter(
                this.loader
            );


        /*
         * Orchestrator
         */

        this.orchestrator =
            new SpecialistOrchestrator(
                this.loader,
                this.router
            );


        /*
         * TeamSelector
         */

        this.teamSelector =
            new TeamSelector(
                this.loader
            );


        /*
         * ResponseSynthesizer
         */

        this.synthesizer =
            new ResponseSynthesizer();


        /*
         * Dados do projeto
         */

        this.project = {

            description,

            configuration
        };


        this.status =
            "ready";


        console.log(
            `🚀 ${this.team.length} especialistas carregados.`
        );

        console.log(
            "🤖 Specialist Orchestrator inicializado."
        );

        console.log(
            "🎯 Team Selector inicializado."
        );

        console.log(
            "🧠 Response Synthesizer inicializado."
        );


        return this.getProjectStatus();
    }


    /**
     * =====================================================
     * SELECT TEAM
     * =====================================================
     *
     * Seleciona automaticamente os especialistas
     * necessários para uma tarefa.
     */

    selectTeam(task) {

        if (!this.teamSelector) {

            throw new Error(
                "TeamSelector ainda não foi inicializado."
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


        const selection =
            this.teamSelector.select(
                task
            );


        /*
         * Guarda a última seleção.
         */

        this.lastTeamSelection =
            selection;


        return selection;
    }


    /**
     * =====================================================
     * GET SELECTED TEAM IDS
     * =====================================================
     *
     * Converte o resultado do TeamSelector
     * em uma lista de IDs.
     */

    getSelectedTeamIds(selection) {

        if (!selection) {

            return [];
        }


        if (
            Array.isArray(
                selection.specialistIds
            )
        ) {

            return selection.specialistIds;
        }


        if (
            Array.isArray(
                selection.specialists
            )
        ) {

            return selection.specialists.map(
                specialist => {

                    if (
                        typeof specialist ===
                        "string"
                    ) {

                        return specialist;
                    }

                    return specialist.id;
                }
            );
        }


        return [];
    }


    /**
     * =====================================================
     * ENSURE TEAM LOADED
     * =====================================================
     *
     * Garante que os especialistas selecionados
     * estejam carregados.
     */

    ensureTeamLoaded(specialistIds) {

        if (
            !Array.isArray(specialistIds)
        ) {

            throw new Error(
                "specialistIds precisa ser um array."
            );
        }


        const loaded = [];


        for (
            const specialistId
            of specialistIds
        ) {

            if (
                this.loader.isLoaded(
                    specialistId
                )
            ) {

                loaded.push(
                    specialistId
                );

                continue;
            }


            try {

                this.loader.load(
                    specialistId
                );

                loaded.push(
                    specialistId
                );

            } catch (error) {

                console.warn(
                    `⚠️ Não foi possível carregar ` +
                    `${specialistId}: ` +
                    `${error.message}`
                );
            }
        }


        /*
         * Atualiza a equipe atual.
         */

        this.team =
            this.loader.getLoadedAll();


        return loaded;
    }


    /**
     * =====================================================
     * PROCESS AUTOMATIC
     * =====================================================
     *
     * Método principal de execução automática.
     *
     * O usuário fornece somente a tarefa.
     */

    async processAutomatic(task) {

        if (!this.teamSelector) {

            throw new Error(
                "TeamSelector ainda não foi inicializado."
            );
        }


        if (!this.orchestrator) {

            throw new Error(
                "SpecialistOrchestrator ainda não foi inicializado."
            );
        }


        if (!this.synthesizer) {

            throw new Error(
                "ResponseSynthesizer ainda não foi inicializado."
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

        this.lastTask =
            task;


        console.log(
            "\n=================================================="
        );

        console.log(
            "       PROCESSAMENTO AUTOMÁTICO"
        );

        console.log(
            "=================================================="
        );


        console.log(
            `\n📝 Tarefa:\n${task}`
        );


        /*
         * 1. Selecionar equipe
         */

        console.log(
            "\n🎯 Selecionando equipe automaticamente..."
        );


        const selection =
            this.selectTeam(
                task
            );


        /*
         * 2. Obter IDs
         */

        const specialistIds =
            this.getSelectedTeamIds(
                selection
            );


        if (
            specialistIds.length === 0
        ) {

            this.status =
                "error";

            throw new Error(
                "O TeamSelector não selecionou nenhum especialista."
            );
        }


        console.log(
            `👥 Equipe selecionada: ` +
            `${specialistIds.join(", ")}`
        );


        /*
         * 3. Garantir carregamento
         */

        const loadedIds =
            this.ensureTeamLoaded(
                specialistIds
            );


        if (
            loadedIds.length === 0
        ) {

            this.status =
                "error";

            throw new Error(
                "Nenhum especialista da equipe pôde ser carregado."
            );
        }


        /*
         * 4. Executar pipeline
         */

        console.log(
            "\n⚙️ Executando equipe..."
        );


        const execution =
            await this.orchestrator.executePipeline(
                loadedIds,
                task
            );


        /*
         * 5. Sintetizar resposta
         */

        console.log(
            "\n🧠 Sintetizando resposta..."
        );


        const response =
            this.synthesizer.synthesize(
                execution
            );


        /*
         * 6. Estatísticas
         */

        this.executionCount++;


        this.lastResponse =
            response;


        this.status =
            "ready";


        /*
         * 7. Resultado final
         */

        return {

            success:
                response.success,

            task,

            team: {

                selected:
                    specialistIds,

                loaded:
                    loadedIds,

                total:
                    loadedIds.length
            },

            execution,

            response
        };
    }


    /**
     * =====================================================
     * COORDINATE
     * =====================================================
     *
     * Coordenação manual de especialistas.
     *
     * Mantida para compatibilidade.
     */

    async coordinate(
        specialistIds,
        task
    ) {

        if (!this.orchestrator) {

            throw new Error(
                "SpecialistOrchestrator ainda não foi inicializado."
            );
        }


        return await this.orchestrator.executeTeam(
            specialistIds,
            task
        );
    }


    /**
     * =====================================================
     * COORDINATE TEAM
     * =====================================================
     */

    async coordinateTeam(
        specialistIds,
        task
    ) {

        return await this.coordinate(
            specialistIds,
            task
        );
    }


    /**
     * =====================================================
     * DELEGATE
     * =====================================================
     */

    async delegate(
        specialistId,
        task
    ) {

        if (
            !this.loader.isLoaded(
                specialistId
            )
        ) {

            throw new Error(
                `O especialista "${specialistId}" não está carregado.`
            );
        }


        const specialist =
            this.loader.getLoaded(
                specialistId
            );


        return await specialist.execute(
            task
        );
    }


    /**
     * =====================================================
     * EXECUTE COMMAND
     * =====================================================
     */

    async executeCommand(
        command,
        task = ""
    ) {

        if (!this.router) {

            throw new Error(
                "SpecialistRouter ainda não foi inicializado."
            );
        }


        const input =
            task &&
            task.trim()
                ? `${command} ${task}`
                : command;


        return await this.router.dispatch(
            input
        );
    }


    /**
     * =====================================================
     * PROCESS
     * =====================================================
     *
     * Mantém o processamento tradicional.
     */

    async process(task) {

        if (!this.router) {

            throw new Error(
                "SpecialistRouter ainda não foi inicializado."
            );
        }


        return await this.router.dispatch(
            task
        );
    }


    /**
     * =====================================================
     * RESOLVE TASK
     * =====================================================
     */

    resolveTask(task) {

        if (!this.router) {

            throw new Error(
                "SpecialistRouter ainda não foi inicializado."
            );
        }


        return this.router.resolve(
            task
        );
    }


    /**
     * =====================================================
     * GET SPECIALIST BY COMMAND
     * =====================================================
     */

    getSpecialistByCommand(command) {

        return this.team.find(
            specialist =>
                specialist.command === command
        ) || null;
    }


    /**
     * =====================================================
     * GET PROJECT STATUS
     * =====================================================
     */

    getProjectStatus() {

        return {

            main: {

                name:
                    this.name,

                version:
                    this.version,

                status:
                    this.status
            },


            project:

                this.project
                    ? this.project.description
                    : null,


            team:

                this.team.map(
                    specialist => ({

                        id:
                            specialist.id,

                        command:
                            specialist.command,

                        name:
                            specialist.name,

                        category:
                            specialist.category,

                        priority:
                            specialist.priority,

                        status:
                            specialist.status
                    })
                ),


            totalSpecialists:
                this.team.length,


            router:

                this.router
                    ? this.router.getStatus()
                    : null,


            orchestrator:

                this.orchestrator
                    ? this.orchestrator.getStatus()
                    : null,


            teamSelector:

                this.teamSelector
                    ? this.teamSelector.getStatus()
                    : null,


            synthesizer:

                this.synthesizer
                    ? this.synthesizer.getStatus()
                    : null,


            executionCount:
                this.executionCount,

            lastTask:
                this.lastTask
        };
    }


    /**
     * =====================================================
     * SHOW TEAM
     * =====================================================
     */

    showTeam() {

        console.log(
            "\n======================================"
        );

        console.log(
            "       EQUIPE DO SUPER AGENTE"
        );

        console.log(
            "======================================\n"
        );


        if (
            this.team.length === 0
        ) {

            console.log(
                "⚠️ Nenhum especialista carregado."
            );

            return;
        }


        this.team.forEach(
            (specialist, index) => {

                console.log(
                    `${index + 1}. ` +
                    `${specialist.command} → ` +
                    `${specialist.name}`
                );
            }
        );


        console.log(
            `\nTotal: ${this.team.length}`
        );
    }


    /**
     * =====================================================
     * SHOW ROUTES
     * =====================================================
     */

    showRoutes() {

        console.log(
            "\n======================================"
        );

        console.log(
            "       ROTAS DO SUPER AGENTE"
        );

        console.log(
            "======================================\n"
        );


        if (!this.router) {

            console.log(
                "⚠️ SpecialistRouter ainda não foi inicializado."
            );

            return;
        }


        const routes =
            this.router.getRoutes();


        Object.entries(
            routes
        ).forEach(
            ([command, specialistId]) => {

                console.log(
                    `${command} → ${specialistId}`
                );
            }
        );


        console.log(
            `\nTotal de rotas: ` +
            `${Object.keys(routes).length}`
        );
    }


    /**
     * =====================================================
     * SHUTDOWN
     * =====================================================
     */

    shutdown() {

        console.log(
            "\n🛑 Finalizando MainAgent..."
        );


        if (this.orchestrator) {

            this.orchestrator.status =
                "stopped";
        }


        if (this.teamSelector) {

            this.teamSelector.status =
                "stopped";
        }


        this.loader.unloadAll();


        this.team =
            [];


        this.router =
            null;

        this.orchestrator =
            null;

        this.teamSelector =
            null;

        this.synthesizer =
            null;


        this.status =
            "stopped";


        console.log(
            "🛑 Equipe de especialistas desligada."
        );
    }
}


/**
 * =========================================================
 * EXPORT
 * =========================================================
 */

module.exports =
    MainAgent;