/**
 * SCHEMA MIGRATION - FASE 1
 * Atualiza localStorage para suportar novo fluxo: Lead → Proposta → Projeto
 *
 * RETROCOMPATÍVEL: Apenas adiciona campos opcionais, não quebra dados existentes
 *
 * Novos dados:
 * - LS.leads: Lista de leads (origem do fluxo)
 * - LS.propostas: Propostas com status (rascunho|enviada|aceita|rejeitada)
 * - LS.onboarding: Status de onboarding por projeto
 *
 * Modificações:
 * - LS.projetos: Adiciona propostaId, linkAcesso, fase, statusOnboarding
 * - Renomeia: propostas_enviadas → propostas (mantém retrocompat com alias)
 */

/**
 * HELPER: Inicializa estrutura se não existir
 */
function initLSSchema() {
    // 1. LEADS (novo)
    if (!localStorage.getItem('leads')) {
        localStorage.setItem('leads', JSON.stringify([]));
    }

    // 2. PROPOSTAS (refatorada - antes era propostas_enviadas)
    const propostaExistente = localStorage.getItem('propostas_enviadas');
    if (propostaExistente && !localStorage.getItem('propostas')) {
        try {
            const dados = JSON.parse(propostaExistente);
            // Converter formato antigo para novo (adicionar status)
            const propostas = dados.map(p => ({
                ...p,
                status: p.status || 'enviada', // valores: rascunho|enviada|aceita|rejeitada
                criado_em: p.criado_em || new Date(p.id || Date.now()).toISOString(),
                enviado_em: p.enviado_em || null,
                aceito_em: p.aceito_em || null,
                leadId: p.leadId || null,
                clienteNome: p.cliente || p.clienteNome || '',
                clienteEmail: p.clienteEmail || '',
                clienteWhatsapp: p.clienteWhatsapp || ''
            }));
            localStorage.setItem('propostas', JSON.stringify(propostas));
        } catch (e) {
            console.warn('Erro ao migrar propostas_enviadas:', e);
            localStorage.setItem('propostas', JSON.stringify([]));
        }
    } else if (!localStorage.getItem('propostas')) {
        localStorage.setItem('propostas', JSON.stringify([]));
    }

    // 3. ONBOARDING (novo - rastreamento por projeto)
    if (!localStorage.getItem('onboarding')) {
        localStorage.setItem('onboarding', JSON.stringify([]));
    }

    // 4. PROJETOS (refatorar existentes com novos campos)
    try {
        const projetosExistentes = JSON.parse(localStorage.getItem('projetos') || '[]');
        const projetosAtualizados = projetosExistentes.map(p => {
            // Se projeto não tem propostaId, ele foi criado antes da migração
            // Vamos marcar como "migrado" mas sem proposta associada
            return {
                ...p,
                propostaId: p.propostaId || null, // Referência para proposta que gerou este projeto
                linkAcesso: p.linkAcesso || null, // UUID para acesso público do cliente
                fase: p.fase || 'ativo', // onboarding|ativo|conceituacao|identidade|ajustes|entrega|concluido
                statusOnboarding: p.statusOnboarding || {
                    contrato: false,
                    pagamento: false,
                    briefing: false,
                    reuniao: false
                },
                clienteEmail: p.clienteEmail || '',
                clienteWhatsapp: p.clienteWhatsapp || '',
                criado_em: p.criado_em || new Date(p.id || Date.now()).toISOString()
            };
        });
        localStorage.setItem('projetos', JSON.stringify(projetosAtualizados));
    } catch (e) {
        console.warn('Erro ao migrar projetos:', e);
    }

    console.log('✓ Schema migration concluído');
}

/**
 * HELPERS: Utilitários para nova estrutura
 */

/**
 * Gera UUID v4 para linkAcesso
 */
function gerarUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

/**
 * Cria um novo lead
 * @param {string} nome
 * @param {string} email
 * @param {string} whatsapp
 * @returns {object} Lead criado
 */
function criarLead(nome, email, whatsapp) {
    const lead = {
        id: gerarUUID(),
        nome,
        email,
        whatsapp,
        criado_em: new Date().toISOString()
    };

    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));

    return lead;
}

/**
 * Cria uma nova proposta a partir de um lead
 * @param {string} leadId
 * @param {object} dados - { tipo, valor, prazo, escopo, observacoes }
 * @returns {object} Proposta criada
 */
function criarPropostaDoLead(leadId, dados) {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    const lead = leads.find(l => l.id === leadId);

    if (!lead) throw new Error('Lead não encontrado');

    const proposta = {
        id: gerarUUID(),
        leadId,
        clienteNome: lead.nome,
        clienteEmail: lead.email,
        clienteWhatsapp: lead.whatsapp,
        tipo: dados.tipo, // identidade-visual|site
        valor: dados.valor,
        prazo: dados.prazo,
        escopo: dados.escopo,
        observacoes: dados.observacoes,
        status: 'rascunho',
        criado_em: new Date().toISOString(),
        enviado_em: null,
        aceito_em: null
    };

    const propostas = JSON.parse(localStorage.getItem('propostas') || '[]');
    propostas.push(proposta);
    localStorage.setItem('propostas', JSON.stringify(propostas));

    return proposta;
}

/**
 * Converte proposta aceita em projeto
 * @param {string} propostaId
 * @returns {object} Projeto criado
 */
function converterPropostaEmProjeto(propostaId) {
    const propostas = JSON.parse(localStorage.getItem('propostas') || '[]');
    const proposta = propostas.find(p => p.id === propostaId);

    if (!proposta) throw new Error('Proposta não encontrada');
    if (proposta.status !== 'aceita') throw new Error('Proposta deve estar aceita');

    const linkAcesso = gerarUUID();

    const projeto = {
        id: gerarUUID(),
        propostaId: proposta.id,
        clienteNome: proposta.clienteNome,
        clienteEmail: proposta.clienteEmail,
        clienteWhatsapp: proposta.clienteWhatsapp,
        linkAcesso,
        fase: 'onboarding',
        statusOnboarding: {
            contrato: false,
            pagamento: false,
            briefing: false,
            reuniao: false
        },
        // Herdados da proposta
        nome: proposta.clienteNome + ' - ' + proposta.tipo,
        tipo: proposta.tipo,
        valor: proposta.valor,
        prazo: proposta.prazo,
        criado_em: new Date().toISOString(),
        // Manter compatibilidade com campos existentes
        pacote: proposta.tipo === 'site' ? 'Completo' : 'Completo',
        progresso: 0,
        etapa: 'Onboarding'
    };

    const projetos = JSON.parse(localStorage.getItem('projetos') || '[]');
    projetos.push(projeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    // Criar entrada de onboarding
    const onboarding = {
        projetoId: projeto.id,
        contrato: { completo: false, arquivo_url: null, completado_em: null },
        pagamento: { confirmado: false, data_confirmacao: null },
        briefing: { respondido: false, dados: null, completado_em: null },
        reuniao: { agendada: false, google_calendar_link: null, data_agendada: null }
    };

    const onboardings = JSON.parse(localStorage.getItem('onboarding') || '[]');
    onboardings.push(onboarding);
    localStorage.setItem('onboarding', JSON.stringify(onboardings));

    return projeto;
}

/**
 * Obtém status de onboarding do projeto
 * @param {string} projetoId
 * @returns {object} Status de onboarding
 */
function getStatusOnboarding(projetoId) {
    const projetos = JSON.parse(localStorage.getItem('projetos') || '[]');
    const projeto = projetos.find(p => p.id === projetoId);
    return projeto?.statusOnboarding || {};
}

/**
 * Valida se projeto completou onboarding
 * @param {string} projetoId
 * @returns {boolean}
 */
function isOnboardingCompleto(projetoId) {
    const status = getStatusOnboarding(projetoId);
    return status.contrato && status.pagamento && status.briefing && status.reuniao;
}

/**
 * Ativa projeto quando onboarding está completo
 * @param {string} projetoId
 * @returns {object} Projeto atualizado
 */
function ativarProjeto(projetoId) {
    if (!isOnboardingCompleto(projetoId)) {
        throw new Error('Onboarding não está completo');
    }

    const projetos = JSON.parse(localStorage.getItem('projetos') || '[]');
    const projeto = projetos.find(p => p.id === projetoId);

    if (!projeto) throw new Error('Projeto não encontrado');

    projeto.fase = 'ativo';
    localStorage.setItem('projetos', JSON.stringify(projetos));

    return projeto;
}

/**
 * INICIALIZAR automaticamente ao carregar o script
 */
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initLSSchema);
}

// Se não tiver DOMContentLoaded (servidor/SSR), chamar diretamente
if (typeof localStorage !== 'undefined') {
    try {
        initLSSchema();
    } catch (e) {
        console.warn('Erro ao inicializar schema:', e);
    }
}
