@echo off
echo ============================================
echo     IPTV Premium - Instalador
echo ============================================
echo.

echo Instalando dependencias do Backend...
cd backend
call npm install
cd ..

echo.
echo Instalando dependencias do Frontend...
cd frontend
call npm install
cd ..

echo.
echo ============================================
echo Instalacao concluida!
echo.
echo Para iniciar, execute: start.bat
echo ============================================
pause
