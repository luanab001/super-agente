const Agent = require("../Agent");

class TestesAgent extends Agent {

    constructor() {

        super({
            id: "testes",
            name: "Especialista em Testes",
            command: "/testes",
            category: "quality",
            description:
                "Responsável por testes automatizados, testes funcionais, validação e qualidade de software.",
            priority: 72,
            dependencies: [
                "programacao"
            ]
        });
    }

    async process(task) {

        return {
            specialist: this.id,
            task,
            result:
                "Analisando estratégia de testes e qualidade."
        };
    }
}

module.exports = TestesAgent;