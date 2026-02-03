/**
 * Script para adicionar imageUrl às criaturas do bestiary
 * Usa a API do TibiaWiki para imagens
 */

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo bestiary.js
const bestiaryPath = path.join(__dirname, '../src/data/bestiary.js');

/**
 * Gera URL da imagem do TibiaWiki
 * Formato: https://tibia.fandom.com/wiki/Special:FilePath/[Nome].gif
 */
const getImageUrl = (creatureName) => {
  // Capitalizar primeira letra de cada palavra
  const formattedName = creatureName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('_');

  return `https://tibia.fandom.com/wiki/Special:FilePath/${formattedName}.gif`;
};

/**
 * Processa o arquivo bestiary.js e adiciona imageUrl
 */
const addImageUrls = () => {
  console.log('📖 Lendo bestiary.js...');

  // Ler arquivo
  let content = fs.readFileSync(bestiaryPath, 'utf8');

  // Regex para encontrar objetos de criaturas
  // Procura por { id: '...', name: '...' } e adiciona imageUrl se não existir
  const creatureRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',/g;

  let match;
  const updates = [];

  while ((match = creatureRegex.exec(content)) !== null) {
    const [fullMatch, id, name] = match;
    const imageUrl = getImageUrl(name);

    // Verificar se imageUrl já existe neste objeto
    const startIndex = match.index;
    const nextObjectIndex = content.indexOf('{', startIndex + 1);
    const endIndex = nextObjectIndex > 0 ? nextObjectIndex : content.length;
    const objectContent = content.substring(startIndex, endIndex);

    if (!objectContent.includes('imageUrl')) {
      updates.push({ id, name, imageUrl, index: startIndex });
    }
  }

  console.log(`✅ Encontradas ${updates.length} criaturas sem imageUrl`);

  if (updates.length === 0) {
    console.log('✨ Todas as criaturas já têm imageUrl!');
    return;
  }

  // Processar de trás pra frente para não bagunçar os índices
  updates.reverse().forEach(({ id, name, imageUrl }) => {
    console.log(`  → ${name}: ${imageUrl}`);

    // Encontrar onde inserir (depois do campo 'name')
    const namePattern = new RegExp(`id:\\s*'${id}',\\s*name:\\s*'${name}',`);
    content = content.replace(
      namePattern,
      `id: '${id}',\n  name: '${name}',\n  imageUrl: '${imageUrl}',`
    );
  });

  // Salvar arquivo
  fs.writeFileSync(bestiaryPath, content, 'utf8');
  console.log('\n✅ Arquivo bestiary.js atualizado com sucesso!');
  console.log(`📦 Total de imagens adicionadas: ${updates.length}`);
};

// Executar
try {
  addImageUrls();
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}
