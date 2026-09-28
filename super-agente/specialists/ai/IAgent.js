class IAgent {

    constructor() {

        this.id = "ia";
        this.name = "Especialista em Inteligência Artificial";
        this.command = "/ia";
        this.category = "ai";

        this.description =
            "Especialista em inteligência artificial, LLMs, agentes e integração de IA.";

        this.status = "created";

        this.provider = null;
    }

    initialize() {

        this.status = "ready";

        console.log(
            `🤖 ${this.name} inicializado.`
        );

        return true;
    }

    setProvider(provider) {

        this.provider = provider;

        return true;
    }

    canHandle(task) {

        if (!task) {
            return false;
        }

        const text =
            task.toLowerCase();

        const keywords = [
            "ia",
            "inteligência artificial",
            "inteligencia artificial",
            "llm",
            "gpt",
            "modelo de linguagem",
            "machine learning",
            "agente",
            "chatbot",
            "ia generativa"
        ];

        return keywords.some(
            keyword => text.includes(keyword)
        );
    }

    async execute(task) {

        if (!task) {

            throw new Error(
                "A tarefa de IA não foi informada."
            );
        }

        this.status = "working";

        const result = {

            specialist: this.name,

            command: this.command,

            category: this.category,

            task,

            provider:
                this.provider
                ? this.provider
                : "não configurado",

            analysis:
                "Tarefa identificada como relacionada à inteligência artificial.",

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

            provider: this.provider,

            status: this.status
        };
    }
}

module.exports = IAgent;