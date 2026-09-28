const SpecialistRegistry = require("./main/SpecialistRegistry");
const SpecialistFactory = require("./main/SpecialistFactory");

console.log("\n======================================");
console.log("      TESTE SPECIALIST FACTORY");
console.log("======================================\n");

const registry = new SpecialistRegistry();
const factory = new SpecialistFactory();

console.log("📋 Especialistas registrados:");

const specialists = registry.getEnabled();

console.log(`Total: ${specialists.length}\n`);

const agents = factory.createMany(
    specialists
);

console.log("\n======================================");
console.log("              RESULTADO");
console.log("======================================\n");

agents.forEach((agent, index) => {

    console.log(
        `${index + 1}. ` +
        `${agent.id} → ` +
        `${agent.name} ` +
        `[${agent.status}]`
    );
});

console.log(
    `\nTotal carregado: ${agents.length}`
);

console.log(
    `Total Factory: ${factory.count()}`
);

console.log("\n======================================\n");