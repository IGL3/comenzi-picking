# Comenzi → verificare și picking (Quasar Comex)

Aplicație într-o singură pagină (UI în română): încarci exportul de comenzi (.xlsx); comenzile se sortează alfabetic după canal
și primesc Nr. crt 1, 2, 3… în această ordine (același număr pentru toate produsele unei comenzi). Lista de verificare are câte un rând pe produs,
în ordinea cerută de utilizator: Canal, Cod fiscal, Id comandă, Nr. crt, Nume client, Cod produs, Cantitate, Denumire produs, Telefon livrare,
Nume companie, Nume delegat. Picking-ul e pe calupuri de 20 de comenzi
(Nr. comandă, SKU, Cantitate, Denumire produs, Rând, Alveolă). Exportul se citește doar în browser.

## Fișiere
- `src/pagina.html` — sursa; `src/locatii.json` — lista de bază de locații `[[sku, rand, alveola], ...]` (din locatii_aplicatie_comenzi.xlsx).
- `index.html` — generat cu `python3 build.py`; nu-l edita de mână.

## Două publicări, aceeași sursă
- Pagina Claude: https://claude.ai/artifact/6BER2wjVDKSPE3H1NgV4kk (capabilități `db` + `downloads`; locațiile adăugate în colecția `locatii`).
- GitHub Pages: https://igl3.github.io/comenzi-picking/ — fără `window.claude`; locațiile adăugate se sincronizează prin Firebase
  (proiect `myactivity9`, logare Google) la `data/users/<uid>/picking/locatii/<sku>`, separat de „Activitățile mele”. Fără logare: localStorage.

## La orice modificare
1. Editează `src/pagina.html` (sau actualizează `src/locatii.json`).
2. `python3 build.py`.
3. Republică pagina Claude cu `index.html`.
4. Commit + push pe `main`.
