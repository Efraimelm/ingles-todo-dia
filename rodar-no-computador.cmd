@echo off
rem Abre o Ingles Todo Dia no computador, sem internet.
cd /d "%~dp0"
start "" http://localhost:8765
python -m http.server 8765
