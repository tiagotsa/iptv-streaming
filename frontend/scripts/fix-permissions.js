#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Verificando e corrigindo permissões dos binários...');

const nodeModulesBinPath = path.join(__dirname, '..', 'node_modules', '.bin');

if (fs.existsSync(nodeModulesBinPath)) {
  console.log(`📁 Diretório encontrado: ${nodeModulesBinPath}`);
  
  try {
    const files = fs.readdirSync(nodeModulesBinPath);
    
    files.forEach(file => {
      const filePath = path.join(nodeModulesBinPath, file);
      
      try {
        // Verificar se é um arquivo
        const stats = fs.statSync(filePath);
        
        if (stats.isFile()) {
          // Tentar corrigir permissões (chmod +x)
          // No Windows, isso não faz nada, mas no Linux funciona
          fs.chmodSync(filePath, '755');
          console.log(`✅ Permissões corrigidas para: ${file}`);
        }
      } catch (err) {
        console.log(`⚠️  Não foi possível corrigir permissões para ${file}: ${err.message}`);
      }
    });
    
    console.log('🎉 Verificação de permissões concluída!');
  } catch (err) {
    console.log(`❌ Erro ao ler diretório: ${err.message}`);
  }
} else {
  console.log(`📁 Diretório não encontrado: ${nodeModulesBinPath}`);
  console.log('ℹ️  O diretório node_modules/.bin será criado durante o npm install');
}