class DebugAgent {

    constructor() {

        this.id = "debug";
        this.name = "Especialista em Debug";
        this.command = "/debug";
        this.category = "quality";

        this.description =
            "Especialista em identificação, diagnóstico e correção de erros.";

        this.status = "created";
    }

    initialize() {

        this.status = "ready";

        console.log(
            `🐞 ${this.name} inicializado.`
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
            "erro",
            "bug",
            "debug",
            "falha",
            "exception",
            "problema",
            "não funciona",
            "nao funciona",
            "corrigir",
            "correção",
            "correcao"
        ];

        return keywords.some(
            keyword => text.includes(keyword)
        );
    }

    async execute(task) {

        if (!task) {

            throw new Error(
                "A tarefa de debug não foi informada."
            );
        }

        this.status = "working";

        const result = {

            specialist: this.name,

            command: this.command,

            category: this.category,

            task,

            analysis:
                "Tarefa identificada como relacionada a diagnóstico de erros.",

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

module.exports = DebugAgent;