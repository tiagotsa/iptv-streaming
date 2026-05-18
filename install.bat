@echo off
chcp 65001 >nul
echo ============================================
echo     IPTV PREMIUM - Instalação
echo ============================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js não encontrado!
    echo Por favor, instale o Node.js 18+ em https://nodejs.org
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo [1/3] Instalando dependências do Backend...
cd /d C:\iptv\iptv-plataforma\backend
call npm install
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependências do backend
    pause
    exit /b 1
)

echo.
echo [2/3] Instalando dependências do Frontend...
cd /d C:\iptv\iptv-plataforma\frontend
call npm install
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependências do frontend
    pause
    exit /b 1
)

echo.
echo [3/3] Criando arquivo .env do backend...
cd /d C:\iptv\iptv-plataforma\backend
if not exist .env (
    echo PORT=5001> .env
    echo NODE_ENV=development>> .env
    echo BETTERFLIX_API_URL=https://betterflix.click/api>> .env
    echo Arquivo .env criado!
) else (
    echo Arquivo .env já existe.
)

echo.
echo ============================================
echo  Instalação concluída com sucesso!
echo.
echo  Para iniciar o projeto, execute:
echo    start.bat
echo ============================================
echo.
pause
