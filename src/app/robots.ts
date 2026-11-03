import { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Páginas sem valor para busca (checkout concluído, rotas internas)
const disallow = ['/api/', '/admin/', '/sucesso'];

// Buscadores e robôs de IA liberados de forma explícita. Cada robô só lê o
// próprio bloco, então todos precisam repetir as mesmas restrições.
const crawlers = [
  'Googlebot',
  'Bingbot',
  // OpenAI: busca do ChatGPT, navegação do usuário e treino
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic (Claude)
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Gemini / AI Overviews e Apple Intelligence
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  // Copilot usa o índice do Bing; DuckDuckGo e Meta AI
  'DuckAssistBot',
  'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...crawlers.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
