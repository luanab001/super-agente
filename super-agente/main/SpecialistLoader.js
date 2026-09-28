const SpecialistRegistry = require("./SpecialistRegistry");
const SpecialistFactory = require("./SpecialistFactory");

class SpecialistLoader {

    constructor() {
        this.registry = new SpecialistRegistry();
        this.factory = new SpecialistFactory();
    }

    load(id) {

        const specialist = this.registry.get(id);

        if (!specialist) {
            throw new Error(
                "Especialista \"" + id +
                "\" nao encontrado no Registry."
            );
        }

        if (specialist.enabled === false) {
            throw new Error(
                "Especialista \"" + id +
                "\" esta desativado."
            );
        }

        return this.factory.create(specialist);
    }

    loadMany(ids) {

        if (!Array.isArray(ids)) {
            throw new Error(
                "loadMany() espera um array de IDs."
            );
        }

        const specialists = [];

        for (const id of ids) {

            const specialist =
                this.registry.get(id);

            if (!specialist) {

                console.warn(
                    "Especialista \"" + id +
                    "\" nao encontrado."
                );

                continue;
            }

            if (specialist.enabled === false) {

                console.warn(
                    "Especialista \"" + id +
                    "\" esta desativado."
                );

                continue;
            }

            specialists.push(specialist);
        }

        return this.factory.createMany(
            specialists
        );
    }

    loadAll() {

        const specialists =
            this.registry.getEnabled();

        return this.factory.createMany(
            specialists
        );
    }

    unload(id) {

        return this.factory.destroy(id);
    }

    unloadAll() {

        return this.factory.destroyAll();
    }

    isLoaded(id) {

        return this.factory.has(id);
    }

    getLoaded(id) {

        return this.factory.get(id);
    }

    getLoadedAll() {

        return this.factory.getAll();
    }

    count() {

        return this.factory.count();
    }

    getStatus() {

        return {
            registry:
                this.registry.getSummary(),

            loader:
                this.factory.getStatus()
        };
    }
}

module.exports = SpecialistLoader;
