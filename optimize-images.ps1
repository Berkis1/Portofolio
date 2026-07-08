<#
PowerShell image optimization script.
Requires ImageMagick (`magick`) with WebP/AVIF support.
Run from repository root in PowerShell:

  .\optimize-images.ps1

This generates WebP and AVIF variants and resized copies used in `srcset`.
#>

$images = @(
  'Bernard.JPG',
  'Projet1.png',
  'Projet2.png',
  'Projet3.png'
)

foreach ($img in $images) {
  if (Test-Path $img) {
    $basename = [System.IO.Path]::GetFileNameWithoutExtension($img)
    Write-Host "Optimizing $img..."
    # Generate webp and avif at two sizes
    magick "$img" -strip -quality 80 -resize 1200x1200\> "${basename}-1200.webp"
    magick "$img" -strip -quality 70 -resize 800x800\> "${basename}-800.webp"
    magick "$img" -strip -quality 60 -resize 800x800\> "${basename}-800.avif"
    magick "$img" -strip -quality 60 -resize 400x400\> "${basename}-400.avif"
    Write-Host "Generated: ${basename}-1200.webp, ${basename}-800.webp, ${basename}-800.avif, ${basename}-400.avif"
  } else {
    Write-Host "Warning: $img not found, skipping."
  }
}

Write-Host "Done. Add generated files to your site and update <picture> or srcset accordingly."