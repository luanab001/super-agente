/**
 * =========================================================
 * SUPER AGENTE
 * TeamSelector
 * =========================================================
 *
 * Responsabilidade:
 *
 * Analisar uma tarefa e selecionar automaticamente
 * os especialistas mais adequados para executá-la.
 *
 * Fluxo:
 *
 * MainAgent
 *      ↓
 * TeamSelector
 *      ↓
 * análise da tarefa
 *      ↓
 * pontuação dos especialistas
 *      ↓
 * equipe selecionada
 *
 * =========================================================
 */

class TeamSelector {

    /**
     * =====================================================
     * CONSTRUCTOR
     * =====================================================
     */

    constructor(loader) {

        if (!loader) {

            throw new Error(
                "TeamSelector precisa de um SpecialistLoader."
            );
        }

        this.loader =
            loader;

        this.status =
            "ready";

        this.selectionCount =
            0;

        this.lastSelection =
            null;

        /*
         * Quantidade máxima padrão
         * de especialistas selecionados.
         */
        this.defaultMaxTeamSize =
            8;
    }


    /**
     * =====================================================
     * NORMALIZE TEXT
     * =====================================================
     *
     * Normaliza textos para facilitar
     * a comparação de palavras-chave.
     */

    normalizeText(text) {

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
            );
    }


    /**
     * =====================================================
     * TOKENIZE
     * =====================================================
     *
     * Divide a tarefa em palavras.
     */

    tokenize(text) {

        const normalized =
            this.normalizeText(
                text
            );

        return normalized
            .split(/[^a-z0-9_]+/)
            .filter(
                word =>
                    word.length >= 3
            );
    }


    /**
     * =====================================================
     * SPECIALIST KEYWORDS
     * =====================================================
     *
     * Define palavras relacionadas a cada especialista.
     */

    getKeywords(specialist) {

        const keywords = {

            estrutura: [
                "estrutura",
                "arquitetura",
                "pastas",
                "modulos",
                "organizacao",
                "projeto",
                "estruturação"
            ],

            frontend: [
                "frontend",
                "interface",
                "tela",
                "html",
                "css",
                "javascript",
                "pagina",
                "dashboard",
                "formulario"
            ],

            backend: [
                "backend",
                "servidor",
                "node",
                "express",
                "php",
                "logica",
                "servico",
                "server"
            ],

            database: [
                "banco",
                "database",
                "mysql",
                "postgresql",
                "sqlite",
                "dados",
                "tabela",
                "banco de dados"
            ],

            api: [
                "api",
                "rest",
                "restful",
                "endpoint",
                "endpoints",
                "json",
                "webservice"
            ],

            sql: [
                "sql",
                "select",
                "insert",
                "update",
                "delete",
                "consulta",
                "query",
                "queries"
            ],

            seguranca: [
                "seguranca",
                "login",
                "senha",
                "autenticacao",
                "autorizacao",
                "jwt",
                "token",
                "permissao",
                "protecao"
            ],

            testes: [
                "teste",
                "testes",
                "validacao",
                "qualidade",
                "jest",
                "mocha",
                "unitario",
                "integracao"
            ],

            debug: [
                "erro",
                "debug",
                "bug",
                "falha",
                "diagnostico",
                "corrigir",
                "problema"
            ],

            programacao: [
                "programacao",
                "codigo",
                "codificar",
                "algoritmo",
                "funcao",
                "classe",
                "javascript",
                "python",
                "php"
            ],

            design: [
                "design",
                "visual",
                "layout",
                "cores",
                "tipografia",
                "interface"
            ],

            ux_ui: [
                "ux",
                "ui",
                "usabilidade",
                "experiencia",
                "usuario",
                "interface"
            ],

            mobile: [
                "mobile",
                "celular",
                "android",
                "ios",
                "app",
                "aplicativo"
            ],

            performance: [
                "performance",
                "velocidade",
                "otimizacao",
                "otimizar",
                "desempenho",
                "cache"
            ],

            ia: [
                "ia",
                "inteligencia",
                "artificial",
                "machine",
                "learning",
                "modelo",
                "agente",
                "llm"
            ]
        };


        return keywords[
            specialist.id
        ] || [];
    }


    /**
     * =====================================================
     * CALCULATE SCORE
     * =====================================================
     *
     * Calcula a relevância do especialista
     * para determinada tarefa.
     */

    calculateScore(
        specialist,
        task
    ) {

        const normalizedTask =
            this.normalizeText(
                task
            );

        const keywords =
            this.getKeywords(
                specialist
            );

        let score = 0;

        /*
         * Cada palavra-chave encontrada
         * aumenta a pontuação.
         */
        for (
            const keyword
            of keywords
        ) {

            const normalizedKeyword =
                this.normalizeText(
                    keyword
                );

            if (
                normalizedTask.includes(
                    normalizedKeyword
                )
            ) {

                score += 10;
            }
        }


        /*
         * Verifica também o nome
         * do especialista.
         */

        const name =
            this.normalizeText(
                specialist.name || ""
            );

        if (
            name &&
            normalizedTask.includes(name)
        ) {

            score += 20;
        }


        /*
         * Verifica comando.
         */

        const command =
            this.normalizeText(
                specialist.command || ""
            );


        if (
            command &&
            normalizedTask.includes(
                command.replace(
                    "/",
                    ""
                )
            )
        ) {

            score += 25;
        }


        /*
         * Prioridade arquitetural.
         *
         * A prioridade existente no especialista
         * funciona como critério secundário.
         */

        const priority =
            Number(
                specialist.priority || 0
            );

        score +=
            priority * 0.05;


        return Math.round(
            score
        );
    }


    /**
     * =====================================================
     * GET LOADED SPECIALISTS
     * =====================================================
     */

    getAvailableSpecialists() {

        if (
            typeof this.loader.getLoadedAll ===
            "function"
        ) {

            return this.loader.getLoadedAll();
        }


        if (
            typeof this.loader.getLoaded ===
            "function"
        ) {

            return [];
        }


        return [];
    }


    /**
     * =====================================================
     * ANALYZE
     * =====================================================
     *
     * Analisa todos os especialistas disponíveis.
     */

    analyze(task) {

        if (
            typeof task !== "string" ||
            task.trim() === ""
        ) {

            throw new Error(
                "A tarefa precisa ser informada."
            );
        }


        const specialists =
            this.getAvailableSpecialists();


        const analysis =
            specialists.map(
                specialist => {

                    const score =
                        this.calculateScore(
                            specialist,
                            task
                        );

                    return {

                        id:
                            specialist.id,

                        name:
                            specialist.name,

                        command:
                            specialist.command,

                        category:
                            specialist.category,

                        priority:
                            specialist.priority || 0,

                        score
                    };
                }
            );


        return analysis.sort(
            (a, b) =>
                b.score - a.score
        );
    }


    /**
     * =====================================================
     * SELECT
     * =====================================================
     *
     * Seleciona automaticamente uma equipe.
     */

    select(
        task,
        options = {}
    ) {

        this.status =
            "working";


        try {

            if (
                typeof task !== "string" ||
                task.trim() === ""
            ) {

                throw new Error(
                    "A tarefa precisa ser informada."
                );
            }


            const maxTeamSize =
                Number(
                    options.maxTeamSize ||
                    this.defaultMaxTeamSize
                );


            const minimumScore =
                Number(
                    options.minimumScore ||
                    10
                );


            const analysis =
                this.analyze(
                    task
                );


            /*
             * Seleciona somente especialistas
             * que alcançaram a pontuação mínima.
             */

            let selected =
                analysis.filter(
                    specialist =>
                        specialist.score >=
                        minimumScore
                );


            /*
             * Limita o tamanho da equipe.
             */

            selected =
                selected.slice(
                    0,
                    maxTeamSize
                );


            /*
             * Se nenhum especialista alcançar
             * o mínimo, utiliza o especialista
             * de maior prioridade/relevância.
             */

            if (
                selected.length === 0 &&
                analysis.length > 0
            ) {

                selected = [
                    analysis[0]
                ];
            }


            const specialistIds =
                selected.map(
                    specialist =>
                        specialist.id
                );


            const result = {

                success:
                    specialistIds.length > 0,

                task,

                total:
                    specialistIds.length,

                specialistIds,

                specialists:
                    selected,

                analysis
            };


            this.selectionCount++;


            this.lastSelection =
                result;


            this.status =
                "ready";


            return result;

        } catch (error) {

            this.status =
                "error";

            throw error;
        }
    }


    /**
     * =====================================================
     * SELECT IDS
     * =====================================================
     *
     * Retorna somente os IDs.
     *
     * Útil para o MainAgent.
     */

    selectIds(
        task,
        options = {}
    ) {

        const result =
            this.select(
                task,
                options
            );

        return result.specialistIds;
    }


    /**
     * =====================================================
     * GET LAST SELECTION
     * =====================================================
     */

    getLastSelection() {

        return this.lastSelection;
    }


    /**
     * =====================================================
     * GET STATUS
     * =====================================================
     */

    getStatus() {

        return {

            status:
                this.status,

            selectionCount:
                this.selectionCount,

            availableSpecialists:
                this.getAvailableSpecialists().length,

            lastSelection:
                this.lastSelection
                    ? {

                        task:
                            this.lastSelection.task,

                        total:
                            this.lastSelection.total,

                        specialistIds:
                            this.lastSelection
                                .specialistIds

                    }
                    : null
        };
    }


    /**
     * =====================================================
     * RESET
     * =====================================================
     */

    reset() {

        this.status =
            "ready";

        this.selectionCount =
            0;

        this.lastSelection =
            null;
    }
}


module.exports =
    TeamSelector;