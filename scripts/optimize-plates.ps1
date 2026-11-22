Add-Type -AssemblyName System.Drawing

$dir = Join-Path (Split-Path -Parent $PSScriptRoot) "public\plates"
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

Get-ChildItem "$dir\*.jpg" | ForEach-Object {
    $path = $_.FullName
    if ($_.Length -lt 220KB) { return }

    $bytes = [System.IO.File]::ReadAllBytes($path)
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

    $bmp.Save($path, $codec, $ep)
    $bmp.Dispose()
    Write-Host ("Optimized {0} -> {1:N0} KB" -f $_.Name, ((Get-Item $path).Length / 1KB))
}
