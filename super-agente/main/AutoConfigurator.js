const SpecialistRegistry = require("./SpecialistRegistry");

class AutoConfigurator {

    constructor() {

        this.registry = new SpecialistRegistry();
    }

    /**
     * Analisa a descrição do projeto.
     */
    analyzeProject(description) {

        const text = description.toLowerCase();

        const detected = [];

        const rules = {

            mobile: [
                "mobile",
                "celular",
                "android",
                "ios",
                "iphone",
                "aplicativo"
            ],

            frontend: [
                "frontend",
                "interface",
                "site",
                "web",
                "html",
                "css",
                "react",
                "vue",
                "angular"
            ],

            backend: [
                "backend",
                "servidor",
                "node",
                "php",
                "python",
                "api"
            ],

            database: [
                "banco",
                "database",
                "mysql",
                "postgres",
                "sqlite",
                "dados"
            ],

            sql: [
                "sql",
                "consulta",
                "query"
            ],

            ia: [
                "ia",
                "inteligência artificial",
                "inteligencia artificial",
                "chatbot",
                "llm",
                "gpt",
                "agente"
            ],

            agentes: [
                "agente",
                "agentes",
                "multiagente",
                "multi-agente"
            ],

            design: [
                "design",
                "visual",
                "identidade"
            ],

            ux_ui: [
                "ux",
                "ui",
                "interface",
                "experiência do usuário",
                "experiencia do usuario"
            ],

            imagem: [
                "imagem",
                "foto",
                "ilustração",
                "ilustracao"
            ],

            video: [
                "vídeo",
                "video",
                "youtube"
            ],

            audio: [
                "áudio",
                "audio",
                "som",
                "narração",
                "narracao"
            ],

            efeitos: [
                "efeito",
                "efeitos",
                "efeito visual",
                "efeito sonoro"
            ],

            excel: [
                "excel",
                "planilha",
                "vba"
            ],

            powerbi: [
                "power bi",
                "dashboard",
                "bi"
            ],

            saas: [
                "saas",
                "assinatura",
                "mensalidade",
                "recorrente"
            ],

            marketing: [
                "marketing",
                "divulgação",
                "divulgacao",
                "clientes"
            ],

            vendas: [
                "vendas",
                "vender",
                "comercial"
            ],

            financeiro: [
                "financeiro",
                "finanças",
                "financas",
                "dinheiro",
                "receita"
            ],

            debug: [
                "erro",
                "bug",
                "debug",
                "falha",
                "problema"
            ],

            teste: [
                "teste",
                "testes",
                "validar"
            ],

            seguranca: [
                "segurança",
                "seguranca",
                "senha",
                "login",
                "autenticação",
                "autenticacao"
            ]
        };

        for (const [specialist, keywords] of Object.entries(rules)) {

            const found = keywords.some(keyword =>
                text.includes(keyword)
            );

            if (found) {
                detected.push(specialist);
            }
        }

        return detected;
    }

    /**
     * Adiciona dependências recursivamente.
     */
    resolveDependencies(specialists) {

        const result = new Set();

        const addSpecialist = (id) => {

            if (result.has(id)) {
                return;
            }

            const specialist = this.registry.get(id);

            if (!specialist) {
                return;
            }

            result.add(id);

            const dependencies =
                specialist.dependencies || [];

            dependencies.forEach(dependency => {
                addSpecialist(dependency);
            });
        };

        specialists.forEach(id => {
            addSpecialist(id);
        });

        return [...result];
    }

    /**
     * Ordena especialistas por prioridade.
     */
    sortByPriority(specialists) {

        return specialists
            .map(id => this.registry.get(id))
            .filter(Boolean)
            .sort((a, b) =>
                b.priority - a.priority
            );
    }

    /**
     * Configuração automática.
     */
    configure(description) {

        if (!description || !description.trim()) {

            throw new Error(
                "A descrição do projeto não pode estar vazia."
            );
        }

        const detected =
            this.analyzeProject(description);

        const withDependencies =
            this.resolveDependencies(detected);

        const specialists =
            this.sortByPriority(withDependencies);

        return {
            project: description,
            detected,
            specialists,
            total: specialists.length
        };
    }

    /**
     * Configuração manual.
     */
    configureManual(specialistIds) {

        const resolved =
            this.resolveDependencies(
                specialistIds
            );

        const specialists =
            this.sortByPriority(resolved);

        return {
            requested: specialistIds,
            specialists,
            total: specialists.length
        };
    }
}

module.exports = AutoConfigurator;