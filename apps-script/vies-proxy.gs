/**
 * Proxy VIES pentru aplicația Comenzi și picking (Quasar Comex).
 * Browserul nu poate întreba VIES direct (blocare CORS), așa că aplicația întreabă acest script,
 * iar scriptul întreabă VIES și trimite răspunsul înapoi.
 *
 * Instalare: script.google.com → Proiect nou → lipește tot fișierul → Deploy → New deployment →
 * tip „Web app”, Execute as: Me, Who has access: Anyone → Deploy → copiază adresa care se termină în /exec.
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var cc = String(p.cc || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
  var n = String(p.n || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 20);
  var out;
  if (!cc || !n) {
    out = { userError: 'BAD_REQUEST' };
  } else {
    var cache = CacheService.getScriptCache(), key = cc + n, hit = cache.get(key);
    if (hit) return json_(hit);
    try {
      var r = UrlFetchApp.fetch('https://ec.europa.eu/taxation_customs/vies/rest-api/ms/' + cc + '/vat/' + n,
        { muteHttpExceptions: true, headers: { Accept: 'application/json' } });
      out = JSON.parse(r.getContentText());
      var ue = out.userError;
      if (ue === 'VALID' || ue === 'INVALID' || out.isValid === true) cache.put(key, JSON.stringify(out), 6 * 3600);
    } catch (err) {
      out = { userError: 'PROXY_ERROR', message: String(err) };
    }
  }
  return json_(JSON.stringify(out));
}
function json_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}
