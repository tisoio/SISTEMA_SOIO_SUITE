# SOIO Suite — desenvolvimento da loja online
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Loja = Join-Path $Root "apps\loja-online"

if (-not (Test-Path $Loja)) {
    Write-Error "Pasta nao encontrada: $Loja"
}

Set-Location $Loja

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias npm..."
    npm install
}

Write-Host "Iniciando loja (3000) e API (4000)..."
npm run dev:all
