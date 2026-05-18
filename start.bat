@echo off
chcp 65001 >nul
echo ============================================
echo     IPTV PREMIUM - Plataforma de Streaming
echo ============================================
echo.

echo [1/2] Iniciando Backend...
start "IPTV Backend" cmd /k "cd /d C:\iptv\iptv-plataforma\backend && npm start"

echo Aguardando o backend iniciar...
timeout /t 3 /nobreak >nul

echo.
echo [2/2] Iniciando Frontend...
start "IPTV Frontend" cmd /k "cd /d C:\iptv\iptv-plataforma\frontend && npm start"

echo.
echo ============================================
echo  Servidores iniciados!
echo.
echo  Backend:  http://localhost:5001
echo  Frontend: http://localhost:3000
echo ============================================
echo.
pause
