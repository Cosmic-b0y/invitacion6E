New-Item -ItemType Directory -Force -Path "public\images"
Copy-Item "C:\Users\emili\.gemini\antigravity\brain\391cc987-20c3-4aab-a375-c4b02750af74\senda_logo_white_1775015777933.png" "public\images\senda-logo-white.png" -Force
Copy-Item "C:\Users\emili\.gemini\antigravity\brain\391cc987-20c3-4aab-a375-c4b02750af74\garden_ambient_1775015789926.png" "public\images\garden-ambient.png" -Force
Copy-Item "C:\Users\emili\.gemini\antigravity\brain\391cc987-20c3-4aab-a375-c4b02750af74\coffee_menu_detail_1775015803843.png" "public\images\coffee-menu.png" -Force
Write-Host "Assets copied successfully"
