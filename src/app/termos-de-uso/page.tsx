import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_CONFIG } from '@/lib/config';
import { siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos de Uso da EAN Images: acesso, compra, uso das imagens, pagamentos, entrega, reembolsos, responsabilidades e suporte.',
  alternates: { canonical: `${siteUrl}/termos-de-uso` },
};

const sections = [
  ['1. Aceitacao', 'Estes Termos regulam o acesso e o uso da EAN Images, plataforma de busca, verificacao de disponibilidade e fornecimento de imagens de produtos associadas a codigos EAN/GTIN. Ao usar o site, enviar codigos, fazer upload, comprar ou solicitar suporte, voce declara que leu e aceitou estes Termos.'],
  ['2. Descricao do servico', 'A plataforma permite informar codigos EAN/GTIN individualmente ou em lote para consultar a existencia de imagens e contratar acesso aos arquivos disponiveis. O servico pode incluir analise, organizacao de resultados, pagamento, envio por e-mail, link de download e suporte.'],
  ['3. Cadastro e dados de contato', 'O uso pode ocorrer sem cadastro obrigatorio, mas voce deve fornecer informacoes corretas para entrega, pagamento e suporte. E sua responsabilidade informar e-mail valido e acompanhar caixa de entrada, spam e bloqueios corporativos.'],
  ['4. Uso permitido', 'A plataforma deve ser usada de forma licita e compativel com sua finalidade: apoiar cadastros de produtos, e-commerce, marketplace, catalogos digitais e atividades relacionadas. E proibido uso fraudulento, abusivo, automatizado indevido, ilegal, com arquivos maliciosos ou tentativa de burlar pagamento e seguranca.'],
  ['5. EANs e arquivos enviados', 'Voce declara possuir legitimidade para enviar codigos, listas, planilhas e arquivos submetidos. Codigos incompletos, duplicados, incorretos, invalidos ou mal formatados podem gerar ausencia de resultados, resultados parciais ou necessidade de suporte.'],
  ['6. Imagens, marcas e descricoes de terceiros', 'A EAN Images presta servico de busca, organizacao e entrega de imagens e dados de identificacao de produtos associados a codigos EAN/GTIN. A EAN Images nao e titular das marcas, embalagens, logotipos, fotografias e descricoes dos produtos, que pertencem aos fabricantes, detentores das marcas ou demais titulares, e nao transfere ao cliente nenhum direito de propriedade intelectual sobre eles. Os arquivos destinam-se exclusivamente a identificar e apresentar o produto original correspondente ao EAN/GTIN em cadastros, lojas, marketplaces e catalogos de quem comercializa esse produto. Cabe ao cliente verificar se o uso pretendido e permitido pelo fabricante, fornecedor, marketplace e pela legislacao aplicavel, e interromper o uso se o titular solicitar.'],
  ['7. Conteudo de terceiros e pedidos de remocao', 'Respeitamos os direitos autorais e de marca. Titulares de direitos, ou seus representantes, podem pedir a remocao de qualquer conteudo pela pagina Remocao de conteudo (eanimages.com.br/remocao-de-conteudo) ou pelo e-mail de suporte, informando os EANs ou links e o direito alegado. Os pedidos sao analisados em ate 2 dias uteis. Se procedente, o conteudo e retirado do catalogo e deixa de ser entregue em novos pedidos. Podemos pedir informacoes para confirmar a titularidade.'],
  ['8. Proibicoes sobre os arquivos', 'Salvo autorizacao expressa, os arquivos nao podem ser revendidos como banco de imagens independente, sublicenciados, redistribuidos em massa, publicados como base concorrente ou usados para compor servico similar ao da EAN Images.'],
  ['9. Qualidade e disponibilidade', 'Empregamos esforcos razoaveis para entregar imagens uteis e correspondentes aos EANs consultados, mas nao garantimos cobertura integral, padronizacao perfeita, ausencia total de divergencias ou adequacao a todos os requisitos de cada marketplace. Revise os arquivos antes de publicar.'],
  ['10. Precos e pagamento', 'Precos, pacotes, cupons e formas de pagamento sao exibidos no site ou checkout e podem mudar para compras futuras. A liberacao do pedido pode depender de confirmacao do processador financeiro e de verificacoes antifraude.'],
  ['11. Entrega e download', 'A entrega pode ocorrer por e-mail, link de download, arquivo compactado ou outro meio informado. Links podem ter prazo limitado, controles de seguranca e expiracao. Recomendamos baixar e armazenar os arquivos assim que forem disponibilizados.'],
  ['12. Cancelamentos e reembolsos', 'Por se tratar de servico digital com analise e disponibilizacao de arquivos, pedidos ja processados ou entregues podem ter limitacoes de cancelamento e reembolso. Falhas tecnicas, pagamento duplicado, nao entrega ou divergencia relevante serao avaliados para correcao, reprocessamento, credito, substituicao ou reembolso quando cabivel.'],
  ['13. Responsabilidades do usuario', 'Voce e responsavel por usar corretamente a plataforma, revisar resultados, guardar arquivos, manter dados atualizados, respeitar direitos de terceiros e cumprir leis, contratos e politicas dos canais em que atua.'],
  ['14. Responsabilidades da EAN Images', 'A EAN Images se compromete a empregar esforcos razoaveis para manter a plataforma, processar pedidos, proteger dados, prestar suporte e corrigir falhas identificadas. Nao nos responsabilizamos por perdas indiretas, lucros cessantes, rejeicoes de marketplace, indisponibilidades de terceiros, dados incorretos enviados pelo usuario ou publicacao sem revisao.'],
  ['15. Propriedade intelectual da plataforma', 'Marca, site, textos, layout, software, interfaces, bases organizadas, metodos, codigos, identidade visual e materiais proprios da EAN Images sao protegidos. Nenhum direito sobre a plataforma e transferido alem da permissao limitada de uso conforme estes Termos.'],
  ['16. Privacidade', 'O tratamento de dados pessoais e regido pela Politica de Privacidade, que integra estes Termos. Dados de contato, pedido, pagamento, EANs pesquisados, arquivos enviados e logs tecnicos podem ser tratados para operacao, seguranca, suporte e cumprimento legal.'],
  ['17. Suporte', `O suporte pode ser acionado pelo e-mail ${SUPPORT_CONFIG.email}, WhatsApp ${SUPPORT_CONFIG.whatsapp.display} ou pagina de contato. Para pedidos, informe o e-mail usado no checkout e, se houver, o identificador da compra.`],
  ['18. Suspensao', 'Podemos suspender ou restringir acesso em caso de fraude, abuso, violacao destes Termos, tentativa de burlar pagamento, comprometimento de seguranca ou uso ilicito. Tambem podemos alterar, remover ou descontinuar funcionalidades por razoes tecnicas, legais ou comerciais.'],
  ['19. Alteracoes', 'Estes Termos podem ser atualizados por mudancas legais, tecnicas, comerciais ou operacionais. A versao vigente sera publicada nesta pagina com data de atualizacao. O uso continuado indica ciencia da versao atualizada.'],
  ['20. Lei aplicavel', 'Estes Termos sao regidos pelas leis da Republica Federativa do Brasil. Antes de qualquer medida formal, as partes se comprometem a buscar solucao amigavel pelos canais de suporte.'],
];

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 h-[240px] w-[540px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Regras da plataforma</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Termos de Uso</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
            Condicoes de acesso, compra, entrega e uso dos servicos da {siteName}.
          </p>
          <p className="mt-4 text-sm text-slate-500">Ultima atualizacao: 26 de novembro de 2026.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="mb-8 rounded-lg border border-slate-700 bg-slate-900/50 p-5 text-sm leading-relaxed text-slate-300">
          Estes Termos devem ser lidos junto com a{' '}
          <Link href="/politica-de-privacidade" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Politica de Privacidade
          </Link>
          . Caso voce nao concorde com alguma regra, nao utilize a plataforma nem conclua compras. Titulares de
          direitos podem pedir remocao de conteudo na pagina{' '}
          <Link href="/remocao-de-conteudo" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Remocao de conteudo
          </Link>
          .
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
    </div>
  );
}
