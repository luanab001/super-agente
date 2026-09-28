const path = require("path");

class SpecialistFactory {

    constructor(options = {}) {

        this.basePath =
            options.basePath ||
            path.join(
                __dirname,
                "..",
                "specialists"
            );

        this.instances = new Map();
    }

    /**
     * Cria uma instância de um especialista.
     */
    create(specialist) {

        if (!specialist) {

            throw new Error(
                "Especialista não informado."
            );
        }

        if (!specialist.id) {

            throw new Error(
                "Especialista sem ID."
            );
        }

        /*
         * Se já existe uma instância,
         * reutilizamos a mesma.
         */
        if (this.instances.has(specialist.id)) {

            return this.instances.get(
                specialist.id
            );
        }

        const modulePath =
            this.resolveModulePath(
                specialist
            );

        if (!modulePath) {

            throw new Error(
                `Módulo não definido para: ${specialist.id}`
            );
        }

        let AgentClass;

        try {

            AgentClass =
                require(modulePath);

        } catch (error) {

            throw new Error(
                `Não foi possível carregar ` +
                `${specialist.id}: ${error.message}`
            );
        }

        if (typeof AgentClass !== "function") {

            throw new Error(
                `O módulo ${specialist.id} ` +
                `não exporta uma classe válida.`
            );
        }

        let instance;

        try {

            instance =
                new AgentClass();

        } catch (error) {

            throw new Error(
                `Não foi possível instanciar ` +
                `${specialist.id}: ${error.message}`
            );
        }

        /*
         * Garante que o ID do Registry
         * seja preservado.
         */
        if (!instance.id) {
            instance.id = specialist.id;
        }

        if (!instance.command) {
            instance.command =
                specialist.command;
        }

        if (!instance.name) {
            instance.name =
                specialist.name;
        }

        if (!instance.category) {
            instance.category =
                specialist.category;
        }

        if (!instance.description) {
            instance.description =
                specialist.description || "";
        }

        /*
         * Inicialização do agente.
         */
        if (
            typeof instance.initialize ===
            "function"
        ) {

            instance.initialize();
        }

        this.instances.set(
            specialist.id,
            instance
        );

        return instance;
    }

    /**
     * Resolve o caminho físico do módulo.
     */
    resolveModulePath(specialist) {

        if (!specialist.module) {
            return null;
        }

        return path.join(
            this.basePath,
            specialist.module
        );
    }

    /**
     * Cria vários especialistas.
     */
    createMany(specialists) {

        if (!Array.isArray(specialists)) {

            throw new Error(
                "createMany() espera um array."
            );
        }

        const agents = [];

        for (const specialist of specialists) {

            try {

                const agent =
                    this.create(specialist);

                agents.push(agent);

            } catch (error) {

                console.error(
                    `❌ ${error.message}`
                );
            }
        }

        return agents;
    }

    /**
     * Retorna instância existente.
     */
    get(id) {

        return this.instances.get(id) || null;
    }

    /**
     * Verifica se está instanciado.
     */
    has(id) {

        return this.instances.has(id);
    }

    /**
     * Remove uma instância.
     */
    destroy(id) {

        const agent =
            this.instances.get(id);

        if (!agent) {
            return false;
        }

        /*
         * Se o agente possuir shutdown(),
         * executamos antes de removê-lo.
         */
        if (
            typeof agent.shutdown ===
            "function"
        ) {

            agent.shutdown();
        }

        this.instances.delete(id);

        return true;
    }

    /**
     * Remove todas as instâncias.
     */
    destroyAll() {

        for (const id of this.instances.keys()) {

            this.destroy(id);
        }

        this.instances.clear();
    }

    /**
     * Retorna todos os agentes instanciados.
     */
    getAll() {

        return [
            ...this.instances.values()
        ];
    }

    /**
     * Quantidade de agentes.
     */
    count() {

        return this.instances.size;
    }

    /**
     * Status da Factory.
     */
    getStatus() {

        return {

            total:
                this.instances.size,

            specialists:
                this.getAll().map(agent => ({

                    id:
                        agent.id,

                    name:
                        agent.name,

                    command:
                        agent.command,

                    category:
                        agent.category,

                    status:
                        agent.status || "unknown"
                }))
        };
    }
}

module.exports = SpecialistFactory;