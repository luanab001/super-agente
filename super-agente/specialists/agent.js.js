class Agent {

    constructor(config = {}) {

        // Identificacao
        this.id =
            config.id || "agent";

        this.name =
            config.name || "Agente";

        this.command =
            config.command || null;

        // Organizacao
        this.category =
            config.category || "general";

        this.description =
            config.description || "";

        this.priority =
            config.priority ?? 50;

        // Configuracao
        this.enabled =
            config.enabled !== false;

        this.dependencies =
            Array.isArray(config.dependencies)
                ? config.dependencies
                : [];

        // Estado
        this.status = "created";

        this.createdAt =
            new Date().toISOString();

        this.initializedAt = null;

        this.lastExecutionAt = null;

        // Estatisticas
        this.executionCount = 0;

        this.errorCount = 0;
    }


    /**
     * Inicializa o agente.
     */
    initialize() {

        this.status = "ready";

        this.initializedAt =
            new Date().toISOString();

        return true;
    }


    /**
     * Verifica se o agente pode executar
     * uma determinada tarefa.
     */
    canHandle(task) {

        if (
            task === null ||
            task === undefined
        ) {
            return false;
        }

        if (
            typeof task !== "string"
        ) {
            return false;
        }

        return task.trim().length > 0;
    }


    /**
     * Executa uma tarefa.
     */
    async execute(task) {

        if (!this.canHandle(task)) {

            throw new Error(
                "O agente \"" +
                this.name +
                "\" nao pode executar esta tarefa."
            );
        }

        this.status = "working";

        this.executionCount++;

        this.lastExecutionAt =
            new Date().toISOString();

        try {

            const result =
                await this.process(task);

            this.status = "ready";

            return result;

        } catch (error) {

            this.errorCount++;

            this.status = "error";

            throw error;
        }
    }


    /**
     * Processa uma tarefa.
     *
     * Especialistas concretos podem
     * sobrescrever este metodo.
     */
    async process(task) {

        return {

            success: true,

            agent: this.id,

            name: this.name,

            command: this.command,

            task: task,

            message:
                "Tarefa recebida pelo agente."
        };
    }


    /**
     * Verifica se o agente esta disponivel.
     */
    isReady() {

        return (
            this.enabled === true &&
            (
                this.status === "ready" ||
                this.status === "created"
            )
        );
    }


    /**
     * Ativa o agente.
     */
    enable() {

        this.enabled = true;

        if (
            this.status === "disabled"
        ) {
            this.status = "ready";
        }

        return true;
    }


    /**
     * Desativa o agente.
     */
    disable() {

        this.enabled = false;

        this.status = "disabled";

        return true;
    }


    /**
     * Retorna as dependencias.
     */
    getDependencies() {

        return [
            ...this.dependencies
        ];
    }


    /**
     * Verifica se possui dependencias.
     */
    hasDependencies() {

        return this.dependencies.length > 0;
    }


    /**
     * Retorna o status completo.
     */
    getStatus() {

        return {

            id:
                this.id,

            name:
                this.name,

            command:
                this.command,

            category:
                this.category,

            description:
                this.description,

            priority:
                this.priority,

            enabled:
                this.enabled,

            status:
                this.status,

            dependencies:
                this.dependencies,

            executionCount:
                this.executionCount,

            errorCount:
                this.errorCount,

            createdAt:
                this.createdAt,

            initializedAt:
                this.initializedAt,

            lastExecutionAt:
                this.lastExecutionAt
        };
    }


    /**
     * Retorna informacoes resumidas.
     */
    getInfo() {

        return {

            id:
                this.id,

            name:
                this.name,

            command:
                this.command,

            category:
                this.category,

            status:
                this.status
        };
    }


    /**
     * Finaliza o agente.
     */
    shutdown() {

        this.status = "stopped";

        return true;
    }
}


module.exports = Agent;