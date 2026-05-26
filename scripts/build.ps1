# Compila todos os modulos Maven da suite
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Error "Maven (mvn) nao encontrado no PATH. Instale o Maven ou use o wrapper."
    exit 1
}

mvn -q clean package
Write-Host "Build concluido em $root"
