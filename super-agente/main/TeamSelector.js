class TeamSelector {

    constructor(options = {}) {

        this.maxTeamSize =
            options.maxTeamSize || 10;

        this.minScore =
            options.minScore || 2;

        this.rules = {

            programacao: {
                priority: 90,
                keywords: [
                    ["programação", 3],
                    ["programacao", 3],
                    ["código", 3],
                    ["codigo", 3],
                    ["javascript", 3],
                    ["typescript", 3],
                    ["python", 3],
                    ["php", 3],
                    ["node.js", 3],
                    ["nodejs", 3],
                    ["desenvolver", 2],
                    ["desenvolvimento", 2],
                    ["implementar", 2],
                    ["função", 2],
                    ["funcao", 2],
                    ["classe", 2],
                    ["módulo", 2],
                    ["modulo", 2]
                ]
            },

            database: {
                priority: 88,
                keywords: [
                    ["banco de dados", 5],
                    ["database", 5],
                    ["mysql", 5],
                    ["postgresql", 5],
                    ["postgres", 5],
                    ["mongodb", 5],
                    ["sqlite", 5],
                    ["tabela", 3],
                    ["tabelas", 3],
                    ["registro", 2],
                    ["registros", 2],
                    ["persistência", 3],
                    ["persistencia", 3]
                ]
            },

            design: {
                priority: 70,
                keywords: [
                    ["design", 4],
                    ["visual", 3],
                    ["identidade visual", 5],
                    ["layout", 4],
                    ["estilo", 3],
                    ["aparência", 3],
                    ["aparencia", 3]
                ]
            },

            debug: {
                priority: 95,
                keywords: [
                    ["erro", 5],
                    ["bug", 5],
                    ["debug", 5],
                    ["corrigir", 5],
                    ["correção", 5],
                    ["correcao", 5],
                    ["falha", 4],
                    ["problema", 3],
                    ["diagnóstico", 5],
                    ["diagnostico", 5],
                    ["exception", 5],
                    ["exceção", 5],
                    ["excecao", 5]
                ]
            },

            ia: {
                priority: 92,
                keywords: [
                    ["inteligência artificial", 6],
                    ["inteligencia artificial", 6],
                    ["artificial intelligence", 6],
                    ["machine learning", 6],
                    ["aprendizado de máquina", 6],
                    ["aprendizado de maquina", 6],
                    ["llm", 6],
                    ["modelo de linguagem", 6],
                    ["openai", 5],
                    ["generative ai", 6],
                    ["ia generativa", 6],
                    ["agente de ia", 6],
                    ["agentes de ia", 6]
                ]
            },

            estrutura: {
                priority: 100,
                keywords: [
                    ["estrutura", 5],
                    ["arquitetura", 6],
                    ["organização", 4],
                    ["organizacao", 4],
                    ["pastas", 3],
                    ["módulos", 3],
                    ["modulos", 3],
                    ["projeto", 3],
                    ["sistema", 3],
                    ["arquitetura do sistema", 7],
                    ["estrutura do sistema", 7]
                ]
            },

            frontend: {
                priority: 82,
                keywords: [
                    ["frontend", 5],
                    ["front-end", 5],
                    ["html", 4],
                    ["css", 4],
                    ["javascript", 2],
                    ["tela", 4],
                    ["telas", 4],
                    ["página", 4],
                    ["pagina", 4],
                    ["site", 4],
                    ["interface", 3],
                    ["navegação", 3],
                    ["navegacao", 3],
                    ["formulário", 4],
                    ["formulario", 4],
                    ["painel administrativo", 6]
                ]
            },

            backend: {
                priority: 85,
                keywords: [
                    ["backend", 6],
                    ["back-end", 6],
                    ["servidor", 4],
                    ["server", 4],
                    ["node.js", 3],
                    ["nodejs", 3],
                    ["php", 3],
                    ["regra de negócio", 6],
                    ["regra de negocio", 6],
                    ["autenticação", 4],
                    ["autenticacao", 4],
                    ["sessão", 3],
                    ["sessao", 3]
                ]
            },

            api: {
                priority: 84,
                keywords: [
                    ["api rest", 7],
                    ["restful", 6],
                    ["api", 5],
                    ["endpoint", 5],
                    ["endpoints", 5],
                    ["web service", 5],
                    ["webservice", 5],
                    ["integração", 3],
                    ["integracao", 3],
                    ["json", 2]
                ]
            },

            sql: {
                priority: 80,
                keywords: [
                    ["sql", 6],
                    ["query", 5],
                    ["queries", 5],
                    ["select", 5],
                    ["insert", 5],
                    ["update", 5],
                    ["delete", 5],
                    ["join", 5],
                    ["consulta", 4],
                    ["consultas", 4],
                    ["relacionamento", 4],
                    ["relacionamentos", 4]
                ]
            },

            ux_ui: {
                priority: 78,
                keywords: [
                    ["ux/ui", 6],
                    ["ux", 4],
                    ["ui", 4],
                    ["usabilidade", 5],
                    ["experiência do usuário", 6],
                    ["experiencia do usuario", 6],
                    ["fluxo", 4],
                    ["wireframe", 6],
                    ["protótipo", 6],
                    ["prototipo", 6]
                ]
            },

            mobile: {
                priority: 80,
                keywords: [
                    ["mobile", 6],
                    ["celular", 4],
                    ["smartphone", 4],
                    ["android", 6],
                    ["ios", 6],
                    ["iphone", 5],
                    ["aplicativo", 5],
                    ["app", 4],
                    ["react native", 7],
                    ["flutter", 7]
                ]
            },

            seguranca: {
                priority: 94,
                keywords: [
                    ["segurança", 6],
                    ["seguranca", 6],
                    ["security", 6],
                    ["senha", 4],
                    ["senhas", 4],
                    ["login", 4],
                    ["autenticação", 4],
                    ["autenticacao", 4],
                    ["autorização", 5],
                    ["autorizacao", 5],
                    ["permissão", 4],
                    ["permissao", 4],
                    ["jwt", 6],
                    ["token", 5],
                    ["criptografia", 7],
                    ["proteção", 4],
                    ["protecao", 4]
                ]
            },

            testes: {
                priority: 89,
                keywords: [
                    ["teste", 5],
                    ["testes", 5],
                    ["testing", 5],
                    ["unitário", 5],
                    ["unitario", 5],
                    ["integração", 3],
                    ["integracao", 3],
                    ["qa", 5],
                    ["qualidade", 4],
                    ["validar", 4],
                    ["validação", 4],
                    ["validacao", 4],
                    ["testar", 5]
                ]
            },

            performance: {
                priority: 83,
                keywords: [
                    ["performance", 6],
                    ["desempenho", 6],
                    ["otimização", 6],
                    ["otimizacao", 6],
                    ["velocidade", 5],
                    ["rápido", 4],
                    ["rapido", 4],
                    ["cache", 5],
                    ["memória", 4],
                    ["memoria", 4],
                    ["escalabilidade", 6],
                    ["escala", 3]
                ]
            }
        };

        /*
         * Contextos que representam relações
         * entre competências.
         */
        this.contextRules = [

            {
                keywords: [
                    "sistema web",
                    "sistema online",
                    "sistema completo",
                    "aplicação web",
                    "aplicacao web"
                ],
                boost: {
                    estrutura: 8,
                    frontend: 4,
                    backend: 4
                }
            },

            {
                keywords: [
                    "banco mysql",
                    "banco de dados",
                    "mysql"
                ],
                boost: {
                    database: 6,
                    sql: 3,
                    backend: 2
                }
            },

            {
                keywords: [
                    "api rest",
                    "api restful"
                ],
                boost: {
                    api: 7,
                    backend: 3
                }
            },

            {
                keywords: [
                    "login",
                    "autenticação",
                    "autenticacao"
                ],
                boost: {
                    seguranca: 5,
                    backend: 3
                }
            },

            {
                keywords: [
                    "painel administrativo",
                    "painel admin"
                ],
                boost: {
                    frontend: 5,
                    backend: 3,
                    seguranca: 2
                }
            },

            {
                keywords: [
                    "sistema completo",
                    "projeto completo",
                    "aplicação completa",
                    "aplicacao completa"
                ],
                boost: {
                    estrutura: 10,
                    testes: 4,
                    seguranca: 3
                }
            },

            {
                keywords: [
                    "segurança",
                    "seguranca",
                    "proteção",
                    "protecao"
                ],
                boost: {
                    seguranca: 6
                }
            },

            {
                keywords: [
                    "testes",
                    "teste completo",
                    "qualidade"
                ],
                boost: {
                    testes: 6
                }
            },

            {
                keywords: [
                    "inteligência artificial",
                    "inteligencia artificial",
                    "machine learning",
                    "llm",
                    "ia generativa",
                    "agente de ia",
                    "agentes de ia"
                ],
                boost: {
                    ia: 10
                }
            }
        ];
    }


    normalize(text) {

        if (
            typeof text !== "string"
        ) {
            return "";
        }

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();
    }


    containsTerm(text, term) {

        const normalizedText =
            this.normalize(text);

        const normalizedTerm =
            this.normalize(term);

        if (!normalizedTerm) {
            return false;
        }

        /*
         * Para termos curtos, como "ia",
         * evitamos procurar simplesmente
         * com includes(), pois isso gera
         * falsos positivos.
         */
        if (
            normalizedTerm.length <= 3
        ) {

            const regex =
                new RegExp(
                    `(^|\\s|[^a-z0-9])` +
                    `${normalizedTerm}` +
                    `($|\\s|[^a-z0-9])`,
                    "i"
                );

            return regex.test(
                normalizedText
            );
        }

        return normalizedText.includes(
            normalizedTerm
        );
    }


    calculateBaseScore(
        task,
        rule
    ) {

        let score = 0;

        const matchedKeywords = [];

        for (
            const [keyword, weight]
            of rule.keywords
        ) {

            if (
                this.containsTerm(
                    task,
                    keyword
                )
            ) {

                score += weight;

                matchedKeywords.push({
                    keyword,
                    weight
                });
            }
        }

        return {
            score,
            matchedKeywords
        };
    }


    calculateContextBoosts(task) {

        const boosts = {};
        const matchedContexts = [];

        for (
            const contextRule
            of this.contextRules
        ) {

            const matched =
                contextRule.keywords.some(
                    keyword =>
                        this.containsTerm(
                            task,
                            keyword
                        )
                );

            if (!matched) {
                continue;
            }

            matchedContexts.push(
                ...contextRule.keywords.filter(
                    keyword =>
                        this.containsTerm(
                            task,
                            keyword
                        )
                )
            );

            for (
                const [
                    specialistId,
                    boost
                ]
                of Object.entries(
                    contextRule.boost
                )
            ) {

                boosts[specialistId] =
                    (
                        boosts[specialistId] ||
                        0
                    ) + boost;
            }
        }

        return {
            boosts,
            matchedContexts
        };
    }


    analyze(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {
            return [];
        }

        const candidates = [];

        const context =
            this.calculateContextBoosts(
                task
            );

        for (
            const [
                id,
                rule
            ]
            of Object.entries(
                this.rules
            )
        ) {

            const base =
                this.calculateBaseScore(
                    task,
                    rule
                );

            const contextBoost =
                context.boosts[id] || 0;

            const finalScore =
                base.score +
                contextBoost;

            if (
                finalScore >=
                this.minScore
            ) {

                candidates.push({

                    id,

                    baseScore:
                        base.score,

                    contextBoost,

                    score:
                        finalScore,

                    priority:
                        rule.priority,

                    matchedKeywords:
                        base.matchedKeywords,

                    matchedContexts:
                        context.matchedContexts
                });
            }
        }

        candidates.sort(
            (a, b) => {

                if (
                    b.score !== a.score
                ) {
                    return (
                        b.score -
                        a.score
                    );
                }

                return (
                    b.priority -
                    a.priority
                );
            }
        );

        return candidates;
    }


    applyArchitectureRule(
        task,
        candidates
    ) {

        const normalizedTask =
            this.normalize(task);

        const complexIndicators = [
            "sistema completo",
            "sistema web completo",
            "projeto completo",
            "aplicacao completa",
            "aplicação completa",
            "criar um sistema",
            "desenvolver um sistema",
            "construir um sistema"
        ];

        const isComplex =
            complexIndicators.some(
                indicator =>
                    normalizedTask.includes(
                        this.normalize(
                            indicator
                        )
                    )
            );

        if (!isComplex) {
            return candidates;
        }

        /*
         * Em projetos complexos,
         * arquitetura ganha precedência.
         */
        return candidates.map(
            candidate => {

                if (
                    candidate.id ===
                    "estrutura"
                ) {

                    return {
                        ...candidate,
                        score:
                            candidate.score + 12,
                        architectureBoost:
                            12
                    };
                }

                return candidate;
            }
        ).sort(
            (a, b) => {

                if (
                    b.score !== a.score
                ) {
                    return (
                        b.score -
                        a.score
                    );
                }

                return (
                    b.priority -
                    a.priority
                );
            }
        );
    }


    select(
        task,
        options = {}
    ) {

        const maxTeamSize =
            options.maxTeamSize ||
            this.maxTeamSize;

        let candidates =
            this.analyze(task);

        candidates =
            this.applyArchitectureRule(
                task,
                candidates
            );

        return candidates
            .slice(
                0,
                maxTeamSize
            )
            .map(
                candidate => ({
                    id:
                        candidate.id,

                    score:
                        candidate.score,

                    baseScore:
                        candidate.baseScore,

                    contextBoost:
                        candidate.contextBoost,

                    architectureBoost:
                        candidate.architectureBoost ||
                        0,

                    priority:
                        candidate.priority,

                    matchedKeywords:
                        candidate.matchedKeywords,

                    matchedContexts:
                        candidate.matchedContexts
                })
            );
    }


    selectIds(
        task,
        options = {}
    ) {

        return this.select(
            task,
            options
        ).map(
            specialist =>
                specialist.id
        );
    }


    getPrimary(task) {

        const selected =
            this.select(
                task,
                {
                    maxTeamSize: 1
                }
            );

        return selected.length > 0
            ? selected[0]
            : null;
    }


    getAnalysis(task) {

        const candidates =
            this.analyze(task);

        const selected =
            this.select(task);

        return {

            task,

            totalCandidates:
                candidates.length,

            teamSize:
                selected.length,

            primary:
                selected.length > 0
                    ? selected[0]
                    : null,

            selected,

            candidates
        };
    }


    showTeam(task) {

        const team =
            this.select(task);

        console.log(
            "\n======================================"
        );

        console.log(
            "       EQUIPE SELECIONADA"
        );

        console.log(
            "======================================\n"
        );

        if (
            team.length === 0
        ) {

            console.log(
                "⚠️ Nenhum especialista identificado."
            );

            return;
        }

        team.forEach(
            (specialist, index) => {

                console.log(
                    `${index + 1}. ` +
                    `${specialist.id} ` +
                    `| score: ${specialist.score}`
                );

                if (
                    specialist.baseScore
                ) {

                    console.log(
                        `   Base: ${specialist.baseScore}`
                    );
                }

                if (
                    specialist.contextBoost
                ) {

                    console.log(
                        `   Bônus contexto: ` +
                        `${specialist.contextBoost}`
                    );
                }

                if (
                    specialist.architectureBoost
                ) {

                    console.log(
                        `   Bônus arquitetura: ` +
                        `${specialist.architectureBoost}`
                    );
                }
            }
        );

        console.log(
            `\nTotal selecionado: ${team.length}`
        );
    }


    getStatus() {

        return {

            status:
                "ready",

            totalRules:
                Object.keys(
                    this.rules
                ).length,

            totalContexts:
                this.contextRules.length,

            maxTeamSize:
                this.maxTeamSize,

            minScore:
                this.minScore
        };
    }
}


module.exports = TeamSelector;