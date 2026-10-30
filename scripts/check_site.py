"""Validate internal links, anchors and essential search metadata without a browser."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json
import re
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
errors = []

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.canonical = [], [], []
        self.h1 = 0
        self.description = None
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if 'id' in d: self.ids.append(d['id'])
        if tag == 'h1': self.h1 += 1
        for key in ['src', 'href', 'poster']:
            if key in d: self.refs.append(d[key])
        if tag == 'link' and d.get('rel') == 'canonical': self.canonical.append(d['href'])
        if tag == 'meta' and d.get('name') == 'description': self.description = d.get('content')

pages, titles, descriptions = {}, [], []
for path in root.glob('*.html'):
    if 'preview' in path.name: continue
    text = path.read_text('utf-8')
    page = Page()
    page.feed(text)
    pages[path.name] = page
    if page.h1 != 1: errors.append((path.name, 'Expected one h1'))
    if len(page.canonical) != 1: errors.append((path.name, 'Expected one canonical'))
    if not page.description: errors.append((path.name, 'Missing description'))
    descriptions.append(page.description)
    match = re.search(r'<title>(.*?)</title>', text)
    if not match: errors.append((path.name, 'Missing title'))
    else: titles.append(match[1])
    for key, count in Counter(page.ids).items():
        if count > 1: errors.append((path.name, 'Duplicate id', key))
    for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>', text):
        json.loads(data)
for name, page in pages.items():
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        dest = unquote(url.path) or name
        if not (root/dest).is_file(): errors.append((name, 'Missing file', dest))
        elif url.fragment and dest in pages and unquote(url.fragment) not in pages[dest].ids:
            errors.append((name, 'Missing anchor', ref))
if len(titles) != len(set(titles)): errors.append('Duplicate page titles')
if len(descriptions) != len(set(descriptions)): errors.append('Duplicate descriptions')
sitemap = ET.parse(root/'sitemap.xml')
locations = [e.text for e in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
for name, page in pages.items():
    if page.canonical and page.canonical[0] not in locations: errors.append((name, 'Missing from sitemap'))
print(json.dumps({'pages': list(pages), 'errors': errors}))
raise SystemExit(bool(errors))
