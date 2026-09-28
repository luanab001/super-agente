const Agent = require("../Agent");

class UxUiAgent extends Agent {

    constructor() {

        super({
            id: "ux_ui",
            name: "Especialista em UX/UI",
            command: "/ux_ui",
            category: "design",
            description:
                "Responsável por experiência do usuário, interfaces, usabilidade e organização visual.",
            priority: 78,
            dependencies: [
                "design"
            ]
        });
    }

    async process(task) {

        return {
            specialist: this.id,
            task,
            result:
                "Analisando experiência do usuário e interface."
        };
    }
}

module.exports = UxUiAgent;