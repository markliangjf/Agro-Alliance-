"""Build the latest two-page preview with embedded assets and working local links."""
from pathlib import Path
import argparse
import base64
import re

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--output-dir', type=Path, default=root)
out_dir = parser.parse_args().output_dir.resolve()
out_dir.mkdir(parents=True, exist_ok=True)
css = (root / "assets/site.css").read_text(encoding="utf-8")
js = (root / "assets/site.js").read_text(encoding="utf-8")
types = {".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mov": "video/quicktime", ".mp4": "video/mp4", ".svg": "image/svg+xml"}
pages = {'index.html': 'agro-alliance-brand-preview.html', 'company.html': 'company-preview.html'}
for source, output in pages.items():
    html = (root / source).read_text(encoding='utf-8')
    html = re.sub(r'<link rel="stylesheet" href="assets/site\.css[^"]*">', lambda _: '<style>' + css + '</style>', html)
    html = re.sub(r'<script src="assets/site\.js[^"]*" defer></script>', '', html)
    html = html.replace('</body>', '<script>' + js + '</script></body>')
    for rel in sorted(set(re.findall(r'(?:src|href|poster)="(assets/[^"?]+)"', html))):
        path = (root / rel).resolve()
        if not path.is_relative_to(root):
            raise ValueError('Asset path leaves project root')
        data = base64.b64encode(path.read_bytes()).decode('ascii')
        html = html.replace('"' + rel + '"', '"data:' + types[path.suffix.lower()] + ';base64,' + data + '"')
    for original, preview in pages.items():
        html = html.replace('href="' + original + '"', 'href="' + preview + '"')
        html = html.replace('href="' + original + '#', 'href="' + preview + '#')
    (out_dir / output).write_text(html, encoding='utf-8')
    print(out_dir / output)

