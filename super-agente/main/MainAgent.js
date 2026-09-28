const AutoConfigurator =
    require("./AutoConfigurator");

const SpecialistLoader =
    require("./SpecialistLoader");

const SpecialistRouter =
    require("./SpecialistRouter");

const TeamSelector =
    require("./TeamSelector");

const SpecialistOrchestrator =
    require("./SpecialistOrchestrator");

const TeamCoordinator =
    require("./TeamCoordinator");

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
            "1.4.0";


        /*
         * AutoConfigurator
         */

        this.configurator =
            new AutoConfigurator();


        /*
         * SpecialistLoader
         */

        this.loader =
            new SpecialistLoader();


        /*
         * Router
         *
         * Será inicializado durante autoConfigure().
         */

        this.router =
            null;


        /*
         * TeamSelector
         *
         * O TeamSelector utiliza o Loader
         * para identificar os especialistas.
         */

        this.teamSelector =
            new TeamSelector(
                this.loader
            );


        /*
         * SpecialistOrchestrator
         */

        this.orchestrator =
            null;


        /*
         * TeamCoordinator
         */

        this.teamCoordinator =
            null;


        /*
         * ResponseSynthesizer
         *
         * Responsável por transformar os resultados
         * dos especialistas em uma resposta consolidada.
         */

        this.responseSynthesizer =
            new ResponseSynthesizer();


        /*
         * Projeto atual
         */

        this.project =
            null;


        /*
         * Equipe carregada
         */

        this.team =
            [];


        /*
         * Última coordenação
         */

        this.lastCoordination =
            null;


        /*
         * Última síntese
         */

        this.lastSynthesis =
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
            "✅ Main Agent inicializado.\n"
        );

        return true;
    }


    /**
     * =====================================================
     * AUTOCONFIGURE
     * =====================================================
     *
     * Analisa a descrição do projeto,
     * seleciona os especialistas,
     * carrega a equipe,
     * cria Router,
     * cria Orchestrator
     * e cria TeamCoordinator.
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


        /*
         * AutoConfigurator
         */

        const configuration =
            this.configurator.configure(
                description
            );


        if (
            !configuration ||
            !Array.isArray(
                configuration.specialists
            )
        ) {

            throw new Error(
                "AutoConfigurator retornou uma configuração inválida."
            );
        }


        console.log(
            `📋 ${configuration.total} especialistas selecionados.`
        );


        /*
         * IDs selecionados
         */

        const ids =
            configuration.specialists.map(
                specialist =>
                    specialist.id
            );


        /*
         * Carrega especialistas
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
         * SpecialistOrchestrator
         */

        this.orchestrator =
            new SpecialistOrchestrator(
                this.loader,
                this.router
            );


        /*
         * TeamCoordinator
         */

        this.teamCoordinator =
            new TeamCoordinator(
                this.loader,
                this.orchestrator,
                this.teamSelector
            );


        /*
         * Projeto atual
         */

        this.project = {

            description,

            configuration
        };


        console.log(
            `🚀 ${this.team.length} especialistas carregados.`
        );

        console.log(
            "🤖 Specialist Orchestrator inicializado."
        );

        console.log(
            "👥 TeamCoordinator inicializado."
        );

        console.log(
            "📝 ResponseSynthesizer pronto."
        );


        return this.getProjectStatus();
    }


    /**
     * =====================================================
     * ANALYZE TASK
     * =====================================================
     *
     * Analisa uma tarefa e retorna a equipe sugerida.
     */

    analyzeTask(task) {

        if (
            !this.teamSelector
        ) {

            throw new Error(
                "TeamSelector ainda não foi inicializado."
            );
        }


        return this.teamSelector.getAnalysis(
            task
        );
    }


    /**
     * =====================================================
     * SHOW AUTOMATIC TEAM
     * =====================================================
     */

    showAutomaticTeam(task) {

        if (
            !this.teamSelector
        ) {

            throw new Error(
                "TeamSelector ainda não foi inicializado."
            );
        }


        return this.teamSelector.showTeam(
            task
        );
    }


    /**
     * =====================================================
     * COORDINATE
     * =====================================================
     *
     * Fluxo:
     *
     * MainAgent
     *      ↓
     * TeamSelector
     *      ↓
     * TeamCoordinator
     *      ↓
     * SpecialistOrchestrator
     *      ↓
     * Resultados
     */

    async coordinate(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }


        if (
            !this.teamSelector
        ) {

            throw new Error(
                "TeamSelector ainda não foi inicializado."
            );
        }


        if (
            !this.teamCoordinator
        ) {

            throw new Error(
                "TeamCoordinator ainda não foi inicializado."
            );
        }


        console.log(
            "\n======================================"
        );

        console.log(
            "       COORDENAÇÃO AUTOMÁTICA"
        );

        console.log(
            "======================================"
        );


        console.log(
            `\n🔎 Tarefa: ${task}`
        );


        /*
         * TeamCoordinator executa
         * a seleção e coordenação.
         */

        const result =
            await this.teamCoordinator.coordinate(
                task
            );


        /*
         * Guarda a última coordenação.
         */

        this.lastCoordination =
            result;


        return result;
    }


    /**
     * =====================================================
     * EXECUTE TASK
     * =====================================================
     *
     * Método principal de execução.
     *
     * Fluxo:
     *
     * 1. MainAgent recebe tarefa
     * 2. TeamCoordinator coordena
     * 3. ResponseSynthesizer sintetiza
     * 4. MainAgent retorna resultado final
     */

    async executeTask(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }


        if (
            !this.teamCoordinator
        ) {

            throw new Error(
                "TeamCoordinator ainda não foi inicializado."
            );
        }


        if (
            !this.responseSynthesizer
        ) {

            throw new Error(
                "ResponseSynthesizer ainda não foi inicializado."
            );
        }


        console.log(
            "\n======================================"
        );

        console.log(
            "       EXECUÇÃO AUTOMÁTICA"
        );

        console.log(
            "======================================\n"
        );


        console.log(
            "🧠 MainAgent analisando a tarefa..."
        );


        console.log(
            `📋 Tarefa: ${task}`
        );


        /*
         * =================================================
         * ETAPA 1
         * TEAM COORDINATOR
         * =================================================
         */

        const coordination =
            await this.teamCoordinator.coordinate(
                task
            );


        this.lastCoordination =
            coordination;


        /*
         * =================================================
         * ETAPA 2
         * RESPONSE SYNTHESIZER
         * =================================================
         *
         * O resultado da coordenação é enviado
         * ao sintetizador.
         */


        let synthesis;


        if (
            typeof this.responseSynthesizer.synthesizePipeline ===
            "function"
        ) {

            synthesis =
                await this.responseSynthesizer.synthesizePipeline(
                    coordination
                );

        } else if (
            typeof this.responseSynthesizer.synthesize ===
            "function"
        ) {

            synthesis =
                await this.responseSynthesizer.synthesize(
                    coordination
                );

        } else {

            throw new Error(
                "ResponseSynthesizer não possui método de síntese compatível."
            );
        }


        /*
         * Guarda última síntese.
         */

        this.lastSynthesis =
            synthesis;


        /*
         * =================================================
         * RESULTADO FINAL
         * =================================================
         */

        return {

            success:
                coordination &&
                coordination.success === true,

            task,

            coordination,

            synthesis
        };
    }


    /**
     * =====================================================
     * DELEGATE
     * =====================================================
     *
     * Executa diretamente um especialista.
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
                    "online"
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


            teamSelector:
                this.teamSelector
                    ? this.teamSelector.getStatus()
                    : null,


            teamCoordinator:
                this.teamCoordinator
                    ? this.teamCoordinator.getStatus()
                    : null,


            router:
                this.router
                    ? this.router.getStatus()
                    : null,


            orchestrator:
                this.orchestrator
                    ? this.orchestrator.getStatus()
                    : null,


            responseSynthesizer:
                this.responseSynthesizer
                    ? this.responseSynthesizer.getStatus()
                    : null,


            lastCoordination:
                this.lastCoordination
                    ? {

                        success:
                            this.lastCoordination.success,

                        task:
                            this.lastCoordination.task

                    }
                    : null,


            lastSynthesis:
                this.lastSynthesis
                    ? {

                        success:
                            this.lastSynthesis.success,

                        task:
                            this.lastSynthesis.task

                    }
                    : null
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
            (
                specialist,
                index
            ) => {

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


        Object.entries(routes)
            .forEach(
                (
                    [command, specialistId]
                ) => {

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
     * GET LAST COORDINATION
     * =====================================================
     */

    getLastCoordination() {

        return this.lastCoordination;
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
     * SHUTDOWN
     * =====================================================
     */

    shutdown() {

        if (
            this.orchestrator
        ) {

            this.orchestrator.status =
                "stopped";
        }


        this.loader.unloadAll();


        this.team = [];


        this.router =
            null;


        this.orchestrator =
            null;


        this.teamCoordinator =
            null;


        this.lastCoordination =
            null;


        this.lastSynthesis =
            null;


        console.log(
            "\n🛑 Equipe de especialistas desligada."
        );
    }
}


module.exports =
    MainAgent;