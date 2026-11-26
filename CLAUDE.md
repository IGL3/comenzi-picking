# Comenzi → verificare și picking (Quasar Comex)

Aplicație într-o singură pagină (UI în română): încarci exportul de comenzi (.xlsx); comenzile se sortează alfabetic după canal
și primesc Nr. crt 1, 2, 3… în această ordine (același număr pentru toate produsele unei comenzi). Lista de verificare are câte un rând pe produs,
în ordinea cerută de utilizator: Canal, Cod fiscal, Id comandă, Nr. crt, Nume client, Cod produs, Cantitate, Denumire produs, Telefon livrare,
Nume companie, Nume delegat. Picking-ul e pe calupuri de 20 de comenzi
(Nr. comandă, SKU, Cantitate, Denumire produs, Rând, Alveolă). Exportul se citește doar în browser.

## Lucru în echipă
Unul încarcă exportul → lista devine comună pentru toți. Dacă există deja o listă, încărcarea întreabă:
„Adaugă în continuare” (ex. lista de la prânz: comenzile noi primesc numerele de după ultima, ID-urile deja existente sunt sărite,
sortarea după canal se face doar în lista nouă, iar fiecare listă are calupurile ei) sau „Înlocuiește lista” (de la 1, șterge bifele).
Filtrul „Arată” alege toate listele sau doar una; Excelul și printarea folosesc filtrul.
Bife în timp real: „Verificat” pe comandă (lista de verificare) și „Cules” pe linie (picking), cu numele celui care a bifat („Numele tău”, ținut în localStorage).
Calendar: listele se salvează pe zile (YYYY-MM-DD). Bara de zi de sus (‹ › Azi, Calendar, Șterge) alege ziua pentru toate secțiunile;
calendarul marchează zilele cu liste (numărul de comenzi). Ștergere („Șterge liste”): o listă anume din zi (bifele ei se golesc, numerele celorlalte rămân), toată ziua sau toate listele din toate zilele (cu a doua confirmare; locațiile rămân).
Date: colecțiile `zi` (doc `m_<zi>` {day,listId,file,at,by,n,parts,rev,bsize,tranches:[{from,to,at,by,file}]} + bucăți `p_<zi>_<i>` {day,listId,rev,orders}
câte 150 de comenzi, citite cu where('day','=='); doc `index` {days:{<zi>:{n,tr}|null}} pentru calendar; fiecare comandă are `t` = indexul listei;
vechiul doc `meta`/`p0..` e mutat automat pe ziua lui), `bife/<listId>` {v:{nr:{n,t}|null}, p:{"nr_sku":{n,t}|null}}, `locatii/<sku>` {sku,c,a,t,n}.

## Fișiere
- `src/pagina.html` — sursa; `src/locatii.json` — lista de bază de locații `[[sku, rand, alveola], ...]` (din locatii_aplicatie_comenzi.xlsx).
- `src/firebase.json` — configurația proiectului Firebase al aplicației (dacă lipsește, pagina de pe GitHub merge doar local).
- `index.html` — generat cu `python3 build.py`; nu-l edita de mână.

## Două publicări, aceeași sursă
- Pagina Claude: https://claude.ai/artifact/6BER2wjVDKSPE3H1NgV4kk (capabilități `db` + `downloads`; colecțiile de mai sus la rădăcina db).
- GitHub Pages: https://igl3.github.io/comenzi-picking/ — fără `window.claude`; Firebase Firestore fără logare, sub `teams/<cod echipă>/<colecție>`.
  Codul echipei NU e în repo (repo-ul e public): se introduce o dată pe fiecare calculator sau vine din link `…/comenzi-picking/#<cod>` și se ține în localStorage.
  Regulile Firestore permit citire/scriere doar pe `teams/{cod}/{zi|bife|locatii}/{doc}` cu cod de minim 10 caractere (fără listarea echipelor).

## La orice modificare
1. Editează `src/pagina.html` (sau actualizează `src/locatii.json`).
2. `python3 build.py`.
3. Republică pagina Claude cu `index.html`.
4. Commit + push pe `main`.
