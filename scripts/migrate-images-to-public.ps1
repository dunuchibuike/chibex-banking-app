param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'

$assetRoot = Join-Path $Root 'src/assets'
$publicImageRoot = Join-Path $Root 'public/images'
$excludedDirs = @('.git', 'node_modules', 'dist', 'public/images')
$sourceExtensions = @(
  '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '.less',
  '.html', '.json', '.md', '.mjs', '.cjs'
)
$imageExtensions = @(
  '.apng', '.avif', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png',
  '.svg', '.tif', '.tiff', '.webp'
)

function Get-RelativePath([string]$BasePath, [string]$TargetPath) {
  $baseFullPath = [System.IO.Path]::GetFullPath($BasePath)
  $targetFullPath = [System.IO.Path]::GetFullPath($TargetPath)

  if (-not $baseFullPath.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
    $baseFullPath += [System.IO.Path]::DirectorySeparatorChar
  }

  $baseUri = New-Object System.Uri($baseFullPath)
  $targetUri = New-Object System.Uri($targetFullPath)
  return [System.Uri]::UnescapeDataString(
    $baseUri.MakeRelativeUri($targetUri).ToString()
  ).Replace('\', '/')
}

function Test-IsExcluded([string]$RelativePath) {
  $normalized = $RelativePath.Replace('\', '/')
  foreach ($dir in $excludedDirs) {
    if ($normalized -eq $dir -or $normalized.StartsWith("$dir/")) {
      return $true
    }
  }
  return $false
}

if (-not (Test-Path -LiteralPath $assetRoot)) {
  throw "Source asset directory not found: $assetRoot"
}

New-Item -ItemType Directory -Force -Path $publicImageRoot | Out-Null

$assets = Get-ChildItem -LiteralPath $assetRoot -Recurse -File |
  Where-Object { $imageExtensions -contains $_.Extension.ToLowerInvariant() }

$duplicateNames = $assets |
  Group-Object { $_.Name.ToLowerInvariant() } |
  Where-Object { $_.Count -gt 1 }

if ($duplicateNames) {
  $message = "Cannot flatten src/assets into public/images because duplicate image filenames were found:`n"
  foreach ($group in $duplicateNames) {
    $paths = $group.Group | ForEach-Object { "  - $(Get-RelativePath $Root $_.FullName)" }
    $message += ($paths -join "`n") + "`n"
  }
  throw $message
}

$copied = 0
foreach ($asset in $assets) {
  Copy-Item -LiteralPath $asset.FullName -Destination (Join-Path $publicImageRoot $asset.Name) -Force
  $copied++
}

$escapedExtensions = ($imageExtensions | ForEach-Object { [regex]::Escape($_.TrimStart('.')) }) -join '|'
$assetPathPattern = "((?:\.\.?/)+assets/[^'`"`)\]\s?#]+?\.($escapedExtensions))(?:[?#][^'`"`)\]\s]*)?"

$changedFiles = 0
$changedRefs = 0

$files = Get-ChildItem -LiteralPath $Root -Recurse -File |
  Where-Object {
    $relative = Get-RelativePath $Root $_.FullName
    -not (Test-IsExcluded $relative) -and
    ($sourceExtensions -contains $_.Extension.ToLowerInvariant())
  }

foreach ($file in $files) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  $fileRefCount = 0
  $updated = [regex]::Replace(
    $content,
    $assetPathPattern,
    {
      param($match)
      $assetPath = $match.Groups[1].Value
      $filename = [System.IO.Path]::GetFileName($assetPath)
      $fileRefCount++
      return "/images/$filename"
    },
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )

  if ($updated -ne $content) {
    Set-Content -LiteralPath $file.FullName -Value $updated -NoNewline
    $changedFiles++
    $changedRefs += $fileRefCount
    Write-Host "Updated $fileRefCount reference(s): $(Get-RelativePath $Root $file.FullName)"
  }
}

Write-Host "Copied $copied image asset(s) to public/images."
Write-Host "Rewrote $changedRefs image reference(s) across $changedFiles file(s)."
