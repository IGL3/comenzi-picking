# Generează index.html din src/pagina.html + src/locatii.json (lista de bază de locații).
import pathlib
r = pathlib.Path(__file__).parent
s = (r / "src/pagina.html").read_text(encoding="utf-8")
j = (r / "src/locatii.json").read_text(encoding="utf-8").replace("<", "\\u003c")
(r / "index.html").write_text(s.replace("__LOCATII__", j), encoding="utf-8")
print("index.html generat")
