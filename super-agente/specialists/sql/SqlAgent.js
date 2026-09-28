const Agent = require("../Agent");

class SqlAgent extends Agent {

    constructor() {

        super({
            id: "sql",
            name: "Especialista em SQL",
            command: "/sql",
            category: "data",
            description:
                "Responsável por consultas SQL, modelagem de consultas, otimização e manipulação de dados.",
            priority: 81,
            dependencies: [
                "database"
            ]
        });
    }

    async process(task) {

        return {
            specialist: this.id,
            task,
            result:
                "Analisando a solicitação SQL."
        };
    }
}

module.exports = SqlAgent;