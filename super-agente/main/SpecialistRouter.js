class SpecialistRouter {

    constructor(loader) {

        if (!loader) {
            throw new Error(
                "SpecialistRouter precisa de um SpecialistLoader."
            );
        }

        this.loader = loader;

        this.routes = new Map();

        this.registerDefaultRoutes();
    }


    /**
     * Registra automaticamente as rotas
     * dos especialistas habilitados no Registry.
     */
    registerDefaultRoutes() {

        /*
         * O SpecialistLoader possui acesso
         * ao SpecialistRegistry.
         *
         * Utilizamos o Registry como fonte
         * oficial das rotas.
         */
        if (
            this.loader.registry &&
            typeof this.loader.registry.getEnabled ===
            "function"
        ) {

            const specialists =
                this.loader.registry.getEnabled();

            for (const specialist of specialists) {

                if (!specialist) {
                    continue;
                }

                if (
                    typeof specialist.command !==
                    "string"
                ) {
                    continue;
                }

                if (
                    typeof specialist.id !==
                    "string"
                ) {
                    continue;
                }

                this.addRoute(
                    specialist.command,
                    specialist.id
                );
            }

            return;
        }

        /*
         * Fallback de segurança.
         *
         * Caso o Registry não esteja disponível,
         * mantemos as rotas fundamentais.
         */
        this.addRoute(
            "/programacao",
            "programacao"
        );

        this.addRoute(
            "/database",
            "database"
        );

        this.addRoute(
            "/design",
            "design"
        );

        this.addRoute(
            "/debug",
            "debug"
        );

        this.addRoute(
            "/ia",
            "ia"
        );
    }


    /**
     * Adiciona uma rota.
     */
    addRoute(command, specialistId) {

        if (
            typeof command !== "string" ||
            command.trim() === ""
        ) {
            throw new Error(
                "O comando da rota deve ser uma string."
            );
        }

        if (
            typeof specialistId !== "string" ||
            specialistId.trim() === ""
        ) {
            throw new Error(
                "O ID do especialista deve ser uma string."
            );
        }

        const normalizedCommand =
            command.trim().toLowerCase();

        const normalizedId =
            specialistId.trim();

        this.routes.set(
            normalizedCommand,
            normalizedId
        );

        return true;
    }


    /**
     * Remove uma rota.
     */
    removeRoute(command) {

        if (
            typeof command !== "string"
        ) {
            return false;
        }

        return this.routes.delete(
            command.trim().toLowerCase()
        );
    }


    /**
     * Retorna o ID associado a um comando.
     */
    getSpecialistIdByCommand(command) {

        if (
            typeof command !== "string"
        ) {
            return null;
        }

        const normalized =
            command.trim().toLowerCase();

        return this.routes.get(
            normalized
        ) || null;
    }


    /**
     * Encontra um especialista pelo comando.
     */
    resolveByCommand(command) {

        const specialistId =
            this.getSpecialistIdByCommand(
                command
            );

        if (!specialistId) {
            return null;
        }

        const specialist =
            this.loader.getLoaded(
                specialistId
            );

        if (!specialist) {
            return null;
        }

        return specialist;
    }


    /**
     * Encontra o primeiro especialista
     * capaz de tratar uma tarefa.
     */
    resolveByTask(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {
            return null;
        }

        const specialists =
            this.loader.getLoadedAll();

        if (
            !Array.isArray(specialists)
        ) {
            return null;
        }

        const available =
            specialists.filter(
                specialist => {

                    if (!specialist) {
                        return false;
                    }

                    if (
                        typeof specialist.canHandle !==
                        "function"
                    ) {
                        return false;
                    }

                    if (
                        typeof specialist.isReady ===
                        "function"
                    ) {

                        if (
                            !specialist.isReady()
                        ) {
                            return false;
                        }
                    }

                    return specialist.canHandle(
                        task
                    );
                }
            );

        if (available.length === 0) {
            return null;
        }

        available.sort(
            (a, b) => {

                const priorityA =
                    Number(a.priority) || 0;

                const priorityB =
                    Number(b.priority) || 0;

                return priorityB - priorityA;
            }
        );

        return available[0];
    }


    /**
     * Resolve uma tarefa.
     *
     * Primeiro verifica se existe
     * um comando explícito.
     *
     * Depois tenta identificar
     * o especialista pela tarefa.
     */
    resolve(input) {

        if (
            typeof input !== "string"
        ) {
            return null;
        }

        const text =
            input.trim();

        if (text === "") {
            return null;
        }

        /*
         * Verifica se a entrada começa
         * com um comando conhecido.
         */
        const firstWord =
            text
                .split(/\s+/)[0]
                .toLowerCase();

        const byCommand =
            this.resolveByCommand(
                firstWord
            );

        if (byCommand) {
            return byCommand;
        }

        /*
         * Caso não exista comando,
         * utiliza canHandle().
         */
        return this.resolveByTask(
            text
        );
    }


    /**
     * Executa uma tarefa usando
     * o especialista selecionado.
     */
    async dispatch(input) {

        const specialist =
            this.resolve(input);

        if (!specialist) {

            throw new Error(
                "Nenhum especialista disponível para esta tarefa."
            );
        }

        if (
            typeof specialist.execute !==
            "function"
        ) {

            throw new Error(
                "O especialista selecionado não possui o método execute()."
            );
        }

        return specialist.execute(
            input
        );
    }


    /**
     * Lista todas as rotas.
     */
    getRoutes() {

        const result = {};

        for (
            const [command, specialistId]
            of this.routes
        ) {

            result[command] =
                specialistId;
        }

        return result;
    }


    /**
     * Verifica se uma rota existe.
     */
    hasRoute(command) {

        if (
            typeof command !== "string"
        ) {
            return false;
        }

        return this.routes.has(
            command.trim().toLowerCase()
        );
    }


    /**
     * Retorna informações do Router.
     */
    getStatus() {

        return {

            routes:
                this.getRoutes(),

            routeCount:
                this.routes.size,

            loadedSpecialists:
                typeof this.loader.count ===
                "function"
                    ? this.loader.count()
                    : 0
        };
    }
}


module.exports = SpecialistRouter;