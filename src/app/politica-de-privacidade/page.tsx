import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_CONFIG } from '@/lib/config';
import { siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Politica de Privacidade',
  description:
    'Politica de Privacidade da EAN Images: dados coletados, finalidades, compartilhamento, seguranca, retencao e direitos dos titulares.',
  alternates: { canonical: `${siteUrl}/politica-de-privacidade` },
};

const sections = [
  ['1. Objetivo', 'Esta Politica de Privacidade explica como a EAN Images coleta, usa, armazena, compartilha e protege dados pessoais no site, na busca de imagens por EAN/GTIN, no checkout e nos canais de atendimento.'],
  ['2. Dados coletados', 'Podemos coletar nome, e-mail, telefone, WhatsApp, dados do pedido, status de pagamento, identificador de transacao, codigos EAN/GTIN pesquisados, arquivos enviados para analise, mensagens de suporte, endereco IP, dispositivo, navegador, paginas acessadas, cookies e logs tecnicos.'],
  ['3. Forma de coleta', 'Os dados podem ser fornecidos por voce em formularios, consultas, uploads, compras e atendimentos, coletados automaticamente por cookies e logs, ou recebidos de fornecedores usados para pagamento, hospedagem, e-mail, analytics, seguranca e suporte.'],
  ['4. Finalidades', 'Usamos dados para analisar EANs, verificar disponibilidade de imagens, processar pagamentos, entregar arquivos, enviar comunicacoes do pedido, prestar suporte, prevenir fraude, cumprir obrigacoes legais, melhorar a plataforma e produzir estatisticas agregadas ou anonimizadas.'],
  ['5. Bases legais', 'O tratamento ocorre conforme a LGPD, especialmente para execucao de contrato, procedimentos preliminares, cumprimento de obrigacao legal, exercicio regular de direitos, legitimo interesse e consentimento quando aplicavel.'],
  ['6. Cookies', 'Usamos cookies essenciais para funcionamento, seguranca, checkout e manutencao da sessao. Tambem podemos usar cookies de analise, desempenho e conversao. Voce pode bloquear cookies no navegador, mas algumas funcoes podem ser prejudicadas.'],
  ['7. Compartilhamento', 'Podemos compartilhar dados com prestadores de hospedagem, banco de dados, pagamento, envio de e-mails, atendimento, analytics, automacao e seguranca, sempre conforme a necessidade operacional. Tambem podemos compartilhar informacoes por obrigacao legal, defesa de direitos, prevencao a fraude ou ordem de autoridade competente. Nao vendemos dados pessoais como atividade comercial principal.'],
  ['8. Pagamentos', 'Pagamentos podem ser processados por terceiros especializados. A EAN Images pode receber status, valor, identificador e confirmacao da transacao, mas nao necessariamente armazena dados completos de cartao ou credenciais financeiras sensiveis.'],
  ['9. Retencao', 'Mantemos dados pelo tempo necessario para entregar o servico, prestar suporte, cumprir obrigacoes legais, fiscais e regulatórias, prevenir fraude, resolver disputas e preservar direitos. Depois disso, os dados podem ser eliminados, anonimizados ou mantidos de forma restrita quando permitido por lei.'],
  ['10. Seguranca', 'Adotamos medidas tecnicas e organizacionais razoaveis contra acesso nao autorizado, perda, alteracao, divulgacao indevida e uso inadequado. Nenhum sistema e totalmente imune a incidentes, mas trataremos eventos relevantes conforme a legislacao aplicavel.'],
  ['11. Transferencia internacional', 'Fornecedores de tecnologia podem processar dados fora do Brasil. Nesses casos, buscamos usar prestadores com medidas adequadas de protecao e compromissos compativeis com a LGPD.'],
  ['12. Direitos do titular', 'Voce pode solicitar confirmacao de tratamento, acesso, correcao, anonimizacao, bloqueio, eliminacao, portabilidade, informacoes sobre compartilhamento, revisao de decisoes automatizadas quando aplicavel e revogacao de consentimento.'],
  ['13. Criancas e adolescentes', 'A plataforma e voltada a usuarios profissionais, empresas, e-commerces, marketplaces e pessoas capazes de contratar servicos. Nao direcionamos os servicos a criancas.'],
  ['14. Terceiros', 'O site pode conter links, integracoes ou redirecionamentos para ambientes de terceiros. Nao nos responsabilizamos por politicas, seguranca ou conteudos desses ambientes externos.'],
  ['15. Atualizacoes', 'Esta politica pode ser atualizada por mudancas legais, tecnicas, comerciais ou operacionais. A versao vigente sera publicada nesta pagina com data de atualizacao.'],
];

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 h-[240px] w-[540px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Privacidade e dados</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Politica de Privacidade</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
            Como a {siteName} trata dados pessoais de usuarios, clientes e visitantes.
          </p>
          <p className="mt-4 text-sm text-slate-500">Ultima atualizacao: 21 de setembro de 2026.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="mb-8 rounded-lg border border-slate-700 bg-slate-900/50 p-5 text-sm leading-relaxed text-slate-300">
          Esta politica deve ser lida junto com os{' '}
          <Link href="/termos-de-uso" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Termos de Uso
          </Link>
          . Para exercer direitos ou tirar duvidas, entre em contato pelo e-mail {SUPPORT_CONFIG.email}.
        </div>

        <div className="space-y-8">
          {sections.map(([title, content]) => (
            <section key={title} className="border-b border-slate-800 pb-8 last:border-b-0">
              <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
              <p className="leading-relaxed text-slate-300">{content}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
