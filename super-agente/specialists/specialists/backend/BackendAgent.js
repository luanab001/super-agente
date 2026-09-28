const Agent = require("../Agent");

class BackendAgent extends Agent {

    constructor() {

        super({
            id: "backend",
            name: "Especialista em Backend",
            command: "/backend",
            category: "development",
            description:
                "Responsável pela lógica do servidor, regras de negócio, serviços e integração com banco de dados.",
            priority: 86,
            dependencies: [
                "programacao",
                "estrutura"
            ]
        });
    }

    async process(task) {

        return {
            specialist: this.id,
            task,
            result:
                "Analisando e desenvolvendo a camada backend."
        };
    }
}

module.exports = BackendAgent;