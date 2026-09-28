class DatabaseAgent {

    constructor() {

        this.id = "database";
        this.name = "Especialista em Banco de Dados";
        this.command = "/database";
        this.category = "data";

        this.description =
            "Especialista em modelagem, estrutura e administração de bancos de dados.";

        this.status = "created";
    }

    initialize() {

        this.status = "ready";

        console.log(
            `🗄️ ${this.name} inicializado.`
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
            "banco",
            "database",
            "mysql",
            "postgres",
            "postgresql",
            "sqlite",
            "mariadb",
            "tabela",
            "modelo",
            "modelagem",
            "dados",
            "relacionamento"
        ];

        return keywords.some(
            keyword => text.includes(keyword)
        );
    }

    async execute(task) {

        if (!task) {

            throw new Error(
                "A tarefa de banco de dados não foi informada."
            );
        }

        this.status = "working";

        const result = {

            specialist: this.name,

            command: this.command,

            category: this.category,

            task,

            analysis:
                "Tarefa identificada como relacionada a banco de dados.",

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

module.exports = DatabaseAgent;