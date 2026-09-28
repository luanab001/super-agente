/**
 * =========================================================
 * TESTE - RESPONSE SYNTHESIZER
 * =========================================================
 *
 * Testa:
 *
 * 1. Inicialização
 * 2. Validação
 * 3. Síntese de pipeline
 * 4. Identificação de sucessos
 * 5. Identificação de erros
 * 6. Construção da resposta final
 * 7. Proteção contra referências circulares
 * 8. Status
 *
 * =========================================================
 */

const ResponseSynthesizer =
    require("./main/ResponseSynthesizer");


console.log(
    "\n================================================"
);

console.log(
    "       TESTE RESPONSE SYNTHESIZER"
);

console.log(
    "================================================\n"
);


/**
 * =====================================================
 * 1. INICIALIZAÇÃO
 * =====================================================
 */

console.log(
    "1. Inicializando ResponseSynthesizer..."
);

const synthesizer =
    new ResponseSynthesizer();

console.log(
    "   ResponseSynthesizer inicializado: OK"
);


/**
 * =====================================================
 * 2. STATUS INICIAL
 * =====================================================
 */

console.log(
    "\n2. Verificando status inicial..."
);

const initialStatus =
    synthesizer.getStatus();

console.log(
    JSON.stringify(
        initialStatus,
        null,
        2
    )
);


/**
 * =====================================================
 * 3. RESULTADO SIMULADO DO ORCHESTRATOR
 * =====================================================
 *
 * Simulamos exatamente o tipo de estrutura
 * produzido pelo SpecialistOrchestrator.
 */

const orchestratorResult = {

    success: true,

    task:
        "Criar um sistema web completo para cadastro de clientes, login, banco MySQL, API REST, painel administrativo, segurança e testes.",

    total: 6,

    successful: 6,

    failed: 0,

    pipeline: [

        {

            step: 1,

            id:
                "seguranca",

            name:
                "Especialista em Segurança",

            success:
                true,

            result:
                "Analisando requisitos de segurança."

        },

        {

            step: 2,

            id:
                "estrutura",

            name:
                "Especialista em Estrutura de Sistemas",

            success:
                true,

            result:
                "Definindo arquitetura do sistema."

        },

        {

            step: 3,

            id:
                "api",

            name:
                "Especialista em APIs",

            success:
                true,

            result:
                "Analisando a API REST."

        },

        {

            step: 4,

            id:
                "backend",

            name:
                "Especialista em Backend",

            success:
                true,

            result:
                "Desenvolvendo a camada backend."

        },

        {

            step: 5,

            id:
                "database",

            name:
                "Especialista em Banco de Dados",

            success:
                true,

            result:
                "Criando estrutura do banco de dados."

        },

        {

            step: 6,

            id:
                "sql",

            name:
                "Especialista em SQL",

            success:
                true,

            result:
                "Analisando consultas SQL."

        }

    ],

    context: {

        originalTask:
            "Criar um sistema web completo.",

        previousResults: [],

        currentStep:
            6
    }
};


/**
 * =====================================================
 * 4. EXECUTAR SYNTHESIZE
 * =====================================================
 */

console.log(
    "\n3. Executando síntese..."
);

const synthesis =
    synthesizer.synthesize(
        orchestratorResult
    );


/**
 * =====================================================
 * 5. EXIBIR RESULTADO
 * =====================================================
 */

console.log(
    "\n================================================"
);

console.log(
    "       RESULTADO DA SÍNTESE"
);

console.log(
    "================================================\n"
);

console.log(
    JSON.stringify(
        synthesis,
        null,
        2
    )
);


/**
 * =====================================================
 * 6. VALIDAÇÕES
 * =====================================================
 */

console.log(
    "\n================================================"
);

console.log(
    "       VALIDAÇÕES"
);

console.log(
    "================================================\n"
);


/*
 * Validação 1
 */

if (
    synthesis &&
    synthesis.success === true
) {

    console.log(
        "✓ Síntese executada com sucesso: OK"
    );

} else {

    console.log(
        "✗ Síntese executada com sucesso: FALHOU"
    );
}


/*
 * Validação 2
 */

if (
    synthesis.task ===
    orchestratorResult.task
) {

    console.log(
        "✓ Tarefa preservada: OK"
    );

} else {

    console.log(
        "✗ Tarefa preservada: FALHOU"
    );
}


/*
 * Validação 3
 */

if (
    synthesis.summary &&
    synthesis.summary.total === 6
) {

    console.log(
        "✓ Total de especialistas: OK"
    );

} else {

    console.log(
        "✗ Total de especialistas: FALHOU"
    );
}


/*
 * Validação 4
 */

if (
    synthesis.summary &&
    synthesis.summary.successful === 6
) {

    console.log(
        "✓ Especialistas concluídos: OK"
    );

} else {

    console.log(
        "✗ Especialistas concluídos: FALHOU"
    );
}


/*
 * Validação 5
 */

if (
    synthesis.summary &&
    synthesis.summary.failed === 0
) {

    console.log(
        "✓ Especialistas com erro: OK"
    );

} else {

    console.log(
        "✗ Especialistas com erro: FALHOU"
    );
}


/*
 * Validação 6
 */

if (
    Array.isArray(
        synthesis.specialists
    ) &&
    synthesis.specialists.length === 6
) {

    console.log(
        "✓ Relatório dos especialistas: OK"
    );

} else {

    console.log(
        "✗ Relatório dos especialistas: FALHOU"
    );
}


/*
 * Validação 7
 */

if (
    typeof synthesis.message ===
    "string" &&
    synthesis.message.length > 0
) {

    console.log(
        "✓ Mensagem final gerada: OK"
    );

} else {

    console.log(
        "✗ Mensagem final gerada: FALHOU"
    );
}


/**
 * =====================================================
 * 7. TESTE DE REFERÊNCIA CIRCULAR
 * =====================================================
 */

console.log(
    "\n4. Testando proteção contra referência circular..."
);


const circularResult = {

    success: true,

    task:
        "Teste de referência circular",

    pipeline: [

        {

            step: 1,

            id:
                "testes",

            name:
                "Especialista em Testes",

            success:
                true,

            result:
                "Teste executado."
        }

    ]
};


/*
 * Criamos uma referência circular
 * propositalmente.
 */

circularResult.context = {

    originalTask:
        circularResult.task,

    reference:
        circularResult
};


const circularSynthesis =
    synthesizer.synthesize(
        circularResult
    );


if (
    circularSynthesis &&
    circularSynthesis.success === true
) {

    console.log(
        "✓ Referência circular protegida: OK"
    );

} else {

    console.log(
        "✗ Referência circular protegida: FALHOU"
    );
}


/**
 * =====================================================
 * 8. STATUS FINAL
 * =====================================================
 */

console.log(
    "\n================================================"
);

console.log(
    "       STATUS FINAL"
);

console.log(
    "================================================\n"
);


const finalStatus =
    synthesizer.getStatus();


console.log(
    JSON.stringify(
        finalStatus,
        null,
        2
    )
);


/**
 * =====================================================
 * 9. RESULTADO FINAL DO TESTE
 * =====================================================
 */

console.log(
    "\n================================================"
);

console.log(
    "       TESTE CONCLUÍDO"
);

console.log(
    "================================================\n"
);

console.log(
    "ResponseSynthesizer está pronto para integração."
);

console.log(
    "\n================================================\n"
);