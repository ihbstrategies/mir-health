// Extrair e processar notícias - VERSÃO MUITO PERMISSIVA (3 por fonte, filtro final para 14)
const inputData = $input.all();

console.log(`📰 Extraindo notícias de ${inputData.length} fontes`);

try {
  // Mapear nomes das fontes
  const sourceNames = {
    'OrthoBuzz': 'OrthoBuzz',
    'OrthoFeed': 'OrthoFeed', 
    'MassDevice': 'MassDevice',
    'Economist HealthCare': 'Economist HealthCare',
    'TechCrunch Health': 'TechCrunch Health',
    'Healthcare Transformers': 'Healthcare Transformers',
    'MedCity News': 'MedCity News',
    'Brazil Journal Empresas de Saúde': 'Brazil Journal',
    'Brazil Journal Health Journal': 'Brazil Journal'
  };

  // Função para extrair notícias do HTML
  function extractNewsFromHTML(html, sourceName) {
    const news = [];
    let patterns = [];
    
    // Verificar se HTML é válido
    if (!html || typeof html !== 'string') {
      console.log(`⚠️ ${sourceName}: HTML inválido`);
      return news;
    }
    
    // Padrões específicos por fonte
    switch(sourceName) {
      case 'OrthoBuzz':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'OrthoFeed':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*entry-title[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'MassDevice':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'Economist HealthCare':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*headline[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'TechCrunch Health':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*post-block__title[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'Healthcare Transformers':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*entry-title[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'MedCity News':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*class="[^"]*headline[^"]*"[^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      case 'Brazil Journal Empresas de Saúde':
      case 'Brazil Journal Health Journal':
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
        break;
        
      default:
        patterns = [
          /<h[2-4][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a><\/h[2-4]>/gi,
          /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi,
          /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi
        ];
    }
    
    // Extrair candidatos usando todos os padrões
    const candidates = [];
    
    patterns.forEach(pattern => {
      try {
        let match;
        while ((match = pattern.exec(html)) !== null) {
          const link = match[1] || '';
          const title = match[2] || match[1] || '';
          
          if (title && title.trim().length > 0) {
            candidates.push({
              title: title.trim(),
              link: link.trim(),
              source: sourceName
            });
          }
        }
      } catch (patternError) {
        console.log(`⚠️ ${sourceName}: Erro no padrão regex: ${patternError.message}`);
      }
    });
    
    // Filtrar e classificar candidatos
    const filteredCandidates = candidates.filter(candidate => {
      try {
        const title = candidate.title.toLowerCase();
        const link = candidate.link.toLowerCase();
        
        // Filtros específicos por fonte
        switch(sourceName) {
          case 'OrthoBuzz':
            if (title.includes('orthobuzz') || title.includes('subscribe') || title.includes('advertise')) return false;
            break;
            
          case 'OrthoFeed':
            if (title.includes('orthofeed') || title.includes('subscribe') || title.includes('advertise')) return false;
            break;
            
          case 'MassDevice':
            if (title.includes('massdevice') || title.includes('subscribe') || title.includes('advertise')) return false;
            break;
            
          case 'Economist HealthCare':
            if (title.includes('economist') || title.includes('subscribe') || title.includes('advertise')) return false;
            break;
            
          case 'TechCrunch Health':
            if (title.includes('techcrunch') || title.includes('subscribe') || title.includes('advertise')) return false;
            break;
            
          case 'Healthcare Transformers':
            if (title.toLowerCase() === 'healthcare transformers') return false;
            if (link.includes('healthcaretransformers.com/about')) return false;
            if (link.includes('healthcaretransformers.com/contact')) return false;
            break;
            
          case 'MedCity News':
            if (title.includes('medcity') || title.includes('subscribe') || title.includes('advertise')) return false;
            break;
            
          case 'Brazil Journal Empresas de Saúde':
          case 'Brazil Journal Health Journal':
            if (title.includes('brazil journal') || title.includes('newsletter') || title.includes('anuncie')) return false;
            if (link.includes('braziljournal.com/quem-faz') || link.includes('braziljournal.com/termos')) return false;
            break;
        }
        
        // Filtros gerais
        const excludeWords = ['subscribe', 'advertise', 'privacy', 'terms', 'contact', 'about', 'login', 'sign up', 'newsletter'];
        if (excludeWords.some(word => title.includes(word))) return false;
        
        return true;
      } catch (filterError) {
        console.log(`⚠️ ${sourceName}: Erro no filtro: ${filterError.message}`);
        return false;
      }
    });
    
    // Sistema de pontuação
    const scoredCandidates = filteredCandidates.map(candidate => {
      try {
        let score = 0;
        const title = candidate.title.toLowerCase();
        
        // Pontuação por comprimento do título
        if (title.length >= 20 && title.length <= 200) score += 10;
        else if (title.length > 200) score += 5;
        
        // Palavras-chave relevantes para saúde
        const keywords = [
          'health', 'medical', 'healthcare', 'hospital', 'doctor', 'patient', 'treatment',
          'drug', 'pharma', 'biotech', 'device', 'surgery', 'therapy', 'diagnosis',
          'saúde', 'médico', 'hospital', 'tratamento', 'medicamento', 'cirurgia',
          'terapia', 'diagnóstico', 'câncer', 'cancer', 'cardio', 'neuro', 'ortho',
          'ai', 'artificial intelligence', 'digital health', 'telemedicine', 'remote',
          'startup', 'investment', 'funding', 'ipo', 'merger', 'acquisition',
          'startup', 'investimento', 'financiamento', 'fusão', 'aquisição'
        ];
        
        keywords.forEach(keyword => {
          if (title.includes(keyword)) score += 3;
        });
        
        // Bônus específicos por fonte
        switch(sourceName) {
          case 'OrthoBuzz':
          case 'OrthoFeed':
            if (title.includes('ortho') || title.includes('surgery') || title.includes('implant')) score += 15;
            break;
            
          case 'MassDevice':
            if (title.includes('device') || title.includes('medical') || title.includes('fda')) score += 15;
            break;
            
          case 'Economist HealthCare':
            if (title.includes('healthcare') || title.includes('policy') || title.includes('regulation')) score += 15;
            break;
            
          case 'TechCrunch Health':
            if (title.includes('startup') || title.includes('funding') || title.includes('ai')) score += 15;
            break;
            
          case 'Healthcare Transformers':
            if (title.includes('digital') || title.includes('health') || title.includes('tech')) score += 20;
            break;
            
          case 'MedCity News':
            if (title.includes('healthcare') || title.includes('medical') || title.includes('hospital')) score += 15;
            break;
            
          case 'Brazil Journal Empresas de Saúde':
          case 'Brazil Journal Health Journal':
            if (title.includes('saúde') || title.includes('health') || title.includes('médico')) score += 25;
            if (title.includes('startup') || title.includes('investimento') || title.includes('funding')) score += 20;
            break;
        }
        
        return { ...candidate, score };
      } catch (scoreError) {
        console.log(`⚠️ ${sourceName}: Erro na pontuação: ${scoreError.message}`);
        return { ...candidate, score: 0 };
      }
    });
    
    // Ordenar por pontuação e pegar os melhores
    const bestCandidates = scoredCandidates
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 15);
    
    // Construir links completos
    const finalNews = bestCandidates.map(candidate => {
      try {
        let fullLink = candidate.link || '';
        
        // Construir URLs completas se necessário
        if (!fullLink.startsWith('http')) {
          switch(sourceName) {
            case 'OrthoBuzz':
              fullLink = `https://orthobuzz.com${fullLink}`;
              break;
            case 'OrthoFeed':
              fullLink = `https://orthofeed.com${fullLink}`;
              break;
            case 'MassDevice':
              fullLink = `https://www.massdevice.com${fullLink}`;
              break;
            case 'Economist HealthCare':
              fullLink = `https://www.economist.com${fullLink}`;
              break;
            case 'TechCrunch Health':
              fullLink = `https://techcrunch.com${fullLink}`;
              break;
            case 'Healthcare Transformers':
              fullLink = fullLink.startsWith('http') ? fullLink : `https://healthcaretransformers.com${fullLink}`;
              break;
            case 'MedCity News':
              fullLink = `https://medcitynews.com${fullLink}`;
              break;
            case 'Brazil Journal Empresas de Saúde':
            case 'Brazil Journal Health Journal':
              fullLink = fullLink.startsWith('http') ? fullLink : `https://braziljournal.com${fullLink}`;
              break;
          }
        }
        
        return {
          title: candidate.title || 'Título não disponível',
          link: fullLink,
          source: sourceName,
          score: candidate.score || 0
        };
      } catch (linkError) {
        console.log(`⚠️ ${sourceName}: Erro na construção do link: ${linkError.message}`);
        return {
          title: candidate.title || 'Título não disponível',
          link: candidate.link || '#',
          source: sourceName,
          score: candidate.score || 0
        };
      }
    });
    
    return finalNews;
  }
  
  // Processar todas as fontes
  const allNews = [];
  
  inputData.forEach((item, index) => {
    try {
      // Tentar diferentes estruturas de dados
      let sourceName = 'Unknown';
      let html = '';
      
      if (item.json) {
        sourceName = item.json.source || item.json.name || `Fonte ${index + 1}`;
        html = item.json.html || item.json.data || item.json.content || '';
      } else if (typeof item === 'string') {
        sourceName = `Fonte ${index + 1}`;
        html = item;
      }
      
      console.log(`📰 Processando ${sourceName}...`);
      
      if (html && html.length > 0) {
        const news = extractNewsFromHTML(html, sourceName);
        allNews.push(...news);
        console.log(`✅ ${sourceName}: ${news.length} notícias encontradas`);
      } else {
        console.log(`⚠️ ${sourceName}: HTML vazio ou inválido`);
      }
    } catch (itemError) {
      console.log(`❌ Erro ao processar item ${index}: ${itemError.message}`);
    }
  });
  
  // Remover duplicatas baseado no título normalizado
  const uniqueNews = [];
  const seenTitles = new Set();
  
  allNews.forEach(news => {
    try {
      const normalizedTitle = (news.title || '').toLowerCase().replace(/[^\w\s]/g, '').trim();
      if (normalizedTitle.length > 3 && !seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueNews.push(news);
      }
    } catch (duplicateError) {
      console.log(`⚠️ Erro ao remover duplicata: ${duplicateError.message}`);
    }
  });
  
  // Ordenar por pontuação e limitar a 14 notícias
  const finalNews = uniqueNews
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 14)
    .map(news => ({
      title: news.title || 'Título não disponível',
      link: news.link || '#',
      source: news.source || 'Unknown'
    }));
  
  console.log(`🎯 Total final: ${finalNews.length} notícias únicas`);
  
  // Sempre retornar dados válidos
  if (finalNews.length === 0) {
    console.log('⚠️ Nenhuma notícia extraída - retornando dados vazios');
    return [{
      json: {
        title: 'Nenhuma notícia encontrada',
        link: '#',
        source: 'Sistema',
        message: 'Nenhuma notícia foi extraída das fontes disponíveis'
      }
    }];
  }
  
  return finalNews.map(news => ({
    json: news
  }));

} catch (error) {
  console.log(`❌ Erro ao extrair notícias: ${error.message}`);
  
  // Retornar dados de erro válidos
  return [{
    json: {
      title: 'Erro na extração de notícias',
      link: '#',
      source: 'Sistema',
      message: `Erro: ${error.message}`
    }
  }];
}
