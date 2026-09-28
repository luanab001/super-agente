const Agent = require("../Agent");

class ApiAgent extends Agent {

    constructor() {

        super({
            id: "api",
            name: "Especialista em APIs",
            command: "/api",
            category: "integration",
            description:
                "Responsável pelo planejamento, criação, integração e documentação de APIs.",
            priority: 83,
            dependencies: [
                "backend"
            ]
        });
    }

    async process(task) {

        return {
            specialist: this.id,
            task,
            result:
                "Analisando e planejando a API solicitada."
        };
    }
}

module.exports = ApiAgent;