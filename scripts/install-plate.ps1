param(
    [Parameter(Mandatory=$true)][string]$Source,
    [Parameter(Mandatory=$true)][string]$Id
)

Add-Type -AssemblyName System.Drawing

$destDir = Join-Path (Split-Path -Parent $PSScriptRoot) "public\plates"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}
$destPath = Join-Path $destDir "$Id.jpg"

$bytes = [System.IO.File]::ReadAllBytes($Source)
$msIn = New-Object System.IO.MemoryStream(,$bytes)
$img = [System.Drawing.Image]::FromStream($msIn)

$maxWidth = 1000
if ($img.Width -gt $maxWidth) {
    $ratio = $maxWidth / $img.Width
    $w = $maxWidth
    $h = [int]($img.Height * $ratio)
} else {
    $w = $img.Width
    $h = $img.Height
}

$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($img, 0, 0, $w, $h)
$g.Dispose()
$img.Dispose()
$msIn.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

$bmp.Save($destPath, $codec, $ep)
$bmp.Dispose()

$kb = [math]::Round((Get-Item $destPath).Length / 1KB)
Write-Host "Installed and optimized $Id.jpg ($w x $h, $kb KB)"
