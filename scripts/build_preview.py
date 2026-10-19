"""Create a self-contained preview from this version's source and assets."""
from pathlib import Path
import base64
import re

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "assets/site.css").read_text(encoding="utf-8")
js = (root / "assets/site.js").read_text(encoding="utf-8")
html = re.sub(r'<link rel="stylesheet" href="assets/site\.css[^"]*">', lambda _: "<style>" + css + "</style>", html)
html = re.sub(r'<script src="assets/site\.js[^"]*" defer></script>', "", html)
html = html.replace("</body>", "<script>" + js + "</script></body>")
types = {".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mov": "video/quicktime", ".mp4": "video/mp4", ".svg": "image/svg+xml"}
for rel in sorted(set(re.findall(r'(?:src|href|poster)="(assets/[^"?]+)"', html))):
    path = (root / rel).resolve()
    if not path.is_relative_to(root):
        raise ValueError("Asset path leaves project root")
    mime = types[path.suffix.lower()]
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    html = html.replace('"' + rel + '"', '"data:' + mime + ';base64,' + data + '"')
out = root / "agro-alliance-brand-preview.html"
out.write_text(html, encoding="utf-8")
print(out)

