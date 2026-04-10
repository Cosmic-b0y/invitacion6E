# Script para copiar imágenes al proyecto
# Ejecutar desde la carpeta raíz del proyecto: c:\Users\emili\mohitvirli.github.io

$source = "C:\Users\emili\.gemini\antigravity\brain\391cc987-20c3-4aab-a375-c4b02750af74"
$dest = ".\public\images"

# Crear directorio si no existe
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
    Write-Host "Carpeta public/images creada" -ForegroundColor Green
}

# Copiar imágenes
$files = @(
    @{ Src = "senda_logo_white_1775015777933.png"; Dst = "senda-logo-white.png" },
    @{ Src = "garden_ambient_1775015789926.png";   Dst = "garden-ambient.png" },
    @{ Src = "coffee_menu_detail_1775015803843.png"; Dst = "coffee-menu.png" }
)

foreach ($f in $files) {
    $srcPath = Join-Path $source $f.Src
    $dstPath = Join-Path $dest $f.Dst
    if (Test-Path $srcPath) {
        Copy-Item $srcPath $dstPath -Force
        Write-Host "✓ Copiado: $($f.Dst)" -ForegroundColor Green
    } else {
        Write-Host "✗ No encontrado: $($f.Src)" -ForegroundColor Red
    }
}

Write-Host "`nListo! Ahora ejecuta: npm run dev" -ForegroundColor Cyan
