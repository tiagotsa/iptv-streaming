# Script para instalar dependências do projeto IPTV
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  Instalando dependências do IPTV Premium" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js 18+ em https://nodejs.org" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host ""

# Instalar dependências do Backend
Write-Host "[1/2] Instalando dependências do Backend..." -ForegroundColor Cyan
Set-Location -Path "C:\iptv\iptv-plataforma\backend"

try {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend instalado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao instalar backend" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Erro: $_" -ForegroundColor Red
}

Write-Host ""

# Instalar dependências do Frontend
Write-Host "[2/2] Instalando dependências do Frontend..." -ForegroundColor Cyan
Set-Location -Path "C:\iptv\iptv-plataforma\frontend"

try {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend instalado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao instalar frontend" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Erro: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  Instalação concluída!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar o projeto, execute:" -ForegroundColor Yellow
Write-Host "  .\start.bat" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path "C:\iptv\iptv-plataforma"
pause
