class ProgramacaoAgent {

    constructor() {

        this.id = "programacao";
        this.name = "Programador";
        this.command = "/programacao";
        this.category = "development";

        this.description =
            "Especialista em programação, lógica, algoritmos e desenvolvimento de software.";

        this.status = "created";
    }

    initialize() {

        this.status = "ready";

        console.log(
            `💻 ${this.name} inicializado.`
        );

        return true;
    }

    canHandle(task) {

        if (!task) {
            return false;
        }

        const text =
            task.toLowerCase();

        const keywords = [
            "programar",
            "programação",
            "codigo",
            "código",
            "javascript",
            "node",
            "python",
            "php",
            "classe",
            "função",
            "funcao",
            "algoritmo",
            "sistema",
            "módulo",
            "modulo"
        ];

        return keywords.some(
            keyword => text.includes(keyword)
        );
    }

    async execute(task) {

        if (!task) {

            throw new Error(
                "A tarefa de programação não foi informada."
            );
        }

        this.status = "working";

        const result = {

            specialist: this.name,

            command: this.command,

            category: this.category,

            task,

            analysis:
                "Tarefa identificada como relacionada à programação.",

            status: "completed",

            timestamp:
                new Date().toISOString()
        };

        this.status = "ready";

        return result;
    }

    getStatus() {

        return {

            id: this.id,

            name: this.name,

            command: this.command,

            category: this.category,

            status: this.status
        };
    }
}

module.exports = ProgramacaoAgent;