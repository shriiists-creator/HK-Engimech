$dir = "c:\Users\Admin\Desktop\HK-Engimech"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$newCss = @"
  <style id="critical-css-loader">
    /* Critical CSS for Navigation */
    :root {
      --primary: #8B7355;
      --lightMain: #f7efe6;
      --light: #F4F5F7;
      --nav-height: 159.95px;
    }

    body {
      margin: 0;
      background-color: var(--light);
    }

    .wrapheder {
      background-color: var(--light);
      height: var(--nav-height);
    }

    .miniHeader {
      background-color: var(--lightMain);
      padding: 8px 0;
    }

    #main-header {
      background-color: var(--light);
    }

    .mynavbar {
      padding: 8px 0;
      background-color: var(--light) !important;
    }

    .container.header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .brandLogo {
      width: 132.5px;
      display: inline-block;
      color: var(--primary);
      text-decoration: none;
    }

    .navMenu {
      list-style: none;
      display: flex;
      gap: 20px;
      padding: 0;
      margin: 0;
    }

    .navLink {
      color: var(--primary);
      font-weight: 700;
      padding: 8px;
      display: block;
      text-decoration: none;
      font-family: Inter, sans-serif;
    }

    .topheadContacts {
      display: flex;
      gap: 28px;
    }

    @media (max-width: 991.98px) {
      :root {
        --nav-height: 103.69px;
      }
      .navMenu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 250px;
        height: 100vh;
        background: var(--primary);
        flex-direction: column;
        padding-top: 60px;
        display: none;
      }
      .navToggle {
        display: block;
        background: transparent;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--primary);
      }
      .miniHeader {
        display: none !important;
      }
    }

    @media (min-width: 992px) {
      .navToggle, .btn-nav-close {
        display: none;
      }
    }

    /* Loader CSS */
    #global-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--light);
      z-index: 999999;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    #global-loader.hidden {
      opacity: 0;
      visibility: hidden;
    }

    .loader-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(139, 115, 85, 0.2);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: loader-spin 1s linear infinite;
    }

    @keyframes loader-spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
"@

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    if ($content -match '(?s)<style id="critical-css-loader">.*?</style>') {
        $content = $content -replace '(?s)<style id="critical-css-loader">.*?</style>', $newCss
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "Skipping (not found): $($file.Name)"
    }
}
