const fs = require("fs");
const path = require("path");

class SpecialistRegistry {

    constructor() {

        this.configPath = path.join(
            __dirname,
            "..",
            "config",
            "specialists.json"
        );

        this.specialists = {};

        this.load();
    }

    load() {

        if (!fs.existsSync(this.configPath)) {
            throw new Error(
                `Arquivo não encontrado: ${this.configPath}`
            );
        }

        const data = fs.readFileSync(
            this.configPath,
            "utf8"
        );

        const config = JSON.parse(data);

        this.specialists = {};

for (const [id, specialist] of Object.entries(
    config.specialists || {}
)) {

    this.specialists[id] = {
        id,
        ...specialist
    };
}

        return this.specialists;
    }

    getAll() {
        return Object.values(this.specialists);
    }

    getEnabled() {

        return this.getAll()
            .filter(item => item.enabled === true);
    }

    get(id) {
        return this.specialists[id] || null;
    }

    getByCommand(command) {

        return this.getAll()
            .find(item => item.command === command) || null;
    }

    getByCategory(category) {

        return this.getAll()
            .filter(item => item.category === category);
    }

    exists(id) {
        return Object.prototype.hasOwnProperty.call(
            this.specialists,
            id
        );
    }

    getDependencies(id) {

        const specialist = this.get(id);

        return specialist
            ? specialist.dependencies || []
            : [];
    }

    enable(id) {

        const specialist = this.get(id);

        if (!specialist) {
            throw new Error(
                `Especialista não encontrado: ${id}`
            );
        }

        specialist.enabled = true;

        return specialist;
    }

    disable(id) {

        const specialist = this.get(id);

        if (!specialist) {
            throw new Error(
                `Especialista não encontrado: ${id}`
            );
        }

        specialist.enabled = false;

        return specialist;
    }

    count() {
        return this.getAll().length;
    }

    countEnabled() {
        return this.getEnabled().length;
    }

    getSummary() {

        const categories = {};

        this.getAll().forEach(item => {

            if (!categories[item.category]) {
                categories[item.category] = 0;
            }

            categories[item.category]++;
        });

        return {
            version: "1.0.0",
            total: this.count(),
            enabled: this.countEnabled(),
            disabled:
                this.count() - this.countEnabled(),
            categories
        };
    }
}

module.exports = SpecialistRegistry;