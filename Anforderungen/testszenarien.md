# Testszenarien – Auslastungsmonitor

## Zweck und Status

Diese Szenarien leiten sich aus [anforderung_Kunde.md](anforderung_Kunde.md), [fachkonzept.md](fachkonzept.md) und dem aktuellen Angular-Frontend ab. Sie sind manuelle Abnahme- und Integrationstests, keine automatisierten Angular-Tests.

- **MVP prüfbar:** direkt mit dem aktuellen Frontend und den vorhandenen Monitorwerten ausführbar.
- **Integration erforderlich:** erst ausführbar, wenn Backend/API, Stammdatenverwaltung oder Berechtigungssystem bereitstehen.

## Testvoraussetzungen

- Angular-Anwendung lokal starten: `npm start --prefix frontend`
- URL: `http://localhost:4200/`
- Quelldaten: `Anforderungen/Master Data/Monitorwerte.json`
- Für Grenzwerte, Aktualisierung und Fehlerfälle Testdaten bzw. API-Antworten wie in den Szenarien beschrieben bereitstellen.
- Ergebnisse je Durchlauf mit Datum, Tester, Status (Bestanden/Nicht bestanden/Blockiert) und Abweichung dokumentieren.

## MVP-Szenarien

### TS-01 – Schichtübersicht laden

**Anforderung:** A-01  
**Status:** MVP prüfbar

**Schritte:** Anwendung öffnen und den initialen Ladevorgang abwarten.

**Erwartetes Ergebnis:** Team 7A, Frühschicht, Datum, zehn Arbeitsplätze und sechs Stundenfenster werden angezeigt. Das Fenster mit Status `aktuell` ist als „JETZT“ erkennbar; kommende Fenster sind als „VORSCHAU“ gekennzeichnet. Für das Beispieldatum 12.10.2026 erscheint „BEISPIELDATEN“ statt „SCHICHT LÄUFT“.

### TS-02 – Werte den Arbeitsplätzen und Zeitfenstern zuordnen

**Anforderung:** A-01  
**Status:** MVP prüfbar

**Schritte:** Tabellenwerte stichprobenartig mit der JSON-Quelldatei vergleichen, einschließlich der versetzten Fenster `08:15–09:15` und `10:45–11:45`.

**Erwartetes Ergebnis:** Jeder Wert steht am richtigen Arbeitsplatz und im richtigen Zeitfenster. Reihenfolge und Uhrzeiten werden aus den Daten übernommen; es wird kein starres Raster voller runder Stunden vorausgesetzt.

### TS-03 – Grenzwert der Auslastungsfarbe

**Anforderung:** A-03  
**Status:** MVP prüfbar

**Testdaten:** In einem Stundenfenster drei Werte auf `99,9`, `100,0` und `100,1` setzen.

**Erwartetes Ergebnis:** `99,9 %` und exakt `100,0 %` erscheinen grün, `100,1 %` rot. Angezeigte Werte haben eine Nachkommastelle und deutsches Dezimalkomma.

### TS-04 – Schwellen der Stundenfenster-Umrandung

**Anforderung:** A-04, fachliche Annahme TF-08  
**Status:** MVP prüfbar

**Testdaten und erwartetes Ergebnis:**

| Überlastete APs im Fenster | Erwartete Darstellung |
| ---: | --- |
| 0 | Kein Überlastungsrahmen |
| 1 | Gelber Rahmen um die gesamte Zeile |
| 2 | Gelber Rahmen um die gesamte Zeile |
| 3 | Roter Rahmen um die gesamte Zeile |

Als überlastet zählt ausschließlich ein Wert **über** 100 %. Ein Wert von genau 100 % erhöht den Zähler nicht.

### TS-05 – Kennzahlen der aktuellen Stunde

**Anforderung:** A-01, A-03  
**Status:** MVP prüfbar

**Testdaten:** Vorhandene Datei unverändert verwenden.

**Erwartetes Ergebnis:** Für das aktuelle Fenster werden zwei überlastete APs, eine durchschnittliche Auslastung von `93,0 %` und zwei Vorschaufenster angezeigt. Der Mittelwert wird aus den zehn vorhandenen Werten des aktuellen Fensters gebildet.

### TS-06 – Vorschaufenster ohne Werte

**Anforderung:** A-01  
**Status:** MVP prüfbar

**Testdaten:** Das Vorschaufenster `11:45–12:45` mit `werte: null` verwenden.

**Erwartetes Ergebnis:** Zellen zeigen einen Gedankenstrich und keinen Auslastungsbalken. Die übrige Tabelle bleibt bedienbar; es erscheint kein Lade- oder Verbindungsfehler.

### TS-07 – Manuelle und automatische Aktualisierung

**Anforderung:** A-02  
**Status:** Manuelle Aktualisierung im MVP prüfbar; Datenwechsel Integration erforderlich

**Schritte:** Refresh-Schaltfläche betätigen. Für den Intervalltest eine kontrollierte API-Testantwort verwenden und diese nach dem ersten Abruf ändern; danach drei Minuten warten oder den Timer in einem automatisierten Test auf 180 Sekunden vorspulen.

**Erwartetes Ergebnis:** Die Schaltfläche löst einen neuen Abruf aus und der Zeitstempel wird aktualisiert. Nach drei Minuten wird erneut abgerufen und die geänderte API-Antwort erscheint. Während eines Abrufs ist der Ladezustand sichtbar.

### TS-08 – Ladefehler und Wiederherstellung

**Anforderung:** A-01, A-02  
**Status:** MVP prüfbar

**Schritte:** Abruf der Monitorwerte fehlschlagen lassen. Anschließend die Quelle wieder verfügbar machen und „Erneut versuchen“ betätigen.

**Erwartetes Ergebnis:** Eine verständliche Fehlermeldung mit Wiederholungsmöglichkeit erscheint. Nach erfolgreichem Abruf verschwindet der Fehler und die Ansicht wird mit den geladenen Daten angezeigt.

### TS-09 – Responsives Layout

**Anforderung:** A-08, A-09  
**Status:** MVP prüfbar

**Schritte:** Ansicht bei ca. 390 px mobiler Breite und bei einer typischen Monitorauflösung (z. B. 1920 × 1080) öffnen.

**Erwartetes Ergebnis:** Überschrift, Team-Auswahl und Kennzahlen überlappen nicht. Bei schmaler Breite scrollt die breite Arbeitsplatz-Tabelle innerhalb ihres Tabellenbereichs; die gesamte Seite erhält keinen horizontalen Überlauf.

### TS-10 – Browserzugriff am Linienmonitor

**Anforderung:** A-08, A-09  
**Status:** Teilweise MVP prüfbar; Dauerbetrieb Integration erforderlich

**Schritte:** Anwendung über ihre URL in einem unterstützten Browser öffnen, ohne eine Client-Anwendung zu installieren oder sich an der Demo-Oberfläche anzumelden. Für den Dauerbetriebstest einen längeren Lauf auf dem vorgesehenen Linienmonitor durchführen.

**Erwartetes Ergebnis:** Die Oberfläche ist per URL erreichbar und bleibt lesbar. Für den Integrationstest bleibt der Monitor auch nach mehreren automatischen Aktualisierungen und einem temporären Verbindungsfehler nutzbar. Produktionsbetrieb und Wiederanlauf sind mit dem lokalen Demo-Server nicht nachgewiesen.

## Integrationsszenarien

### TS-11 – Auslastung aus Prozess- und Pausenzeiten berechnen

**Anforderung:** Fachkonzept „Berechnung“ und „Pausen“  
**Status:** Integration erforderlich – die Demo erhält bereits berechnete Prozentwerte

**Testdaten:** Stundenfenster 60 Minuten, zentrale Pause 15 Minuten. Geplante Prozesszeit nacheinander auf 30, 45 und 45,1 Minuten setzen.

**Erwartetes Ergebnis:** Verfügbare Arbeitszeit beträgt 45 Minuten. Die Auslastungen betragen gerundet `66,7 %`, `100,0 %` und `100,2 %`. Die letzten beiden Werte folgen der Grenzwertregel: exakt 100 % grün, über 100 % rot. Die Berechnung muss serverseitig oder in einem vereinbarten Berechnungsdienst erfolgen und mit dessen Ergebnis im Frontend übereinstimmen.

### TS-12 – Stammdatenänderung gilt ab Folgetag

**Anforderung:** A-05  
**Status:** Integration erforderlich – Stammdatenpflege ist nicht implementiert

**Schritte:** Als Gruppenleiter eine Änderung an Pausenregel oder Stundenfenster-Vorlage speichern. Aktuelle Schicht sowie Folgetag vor und nach Wirksamkeitsbeginn vergleichen.

**Erwartetes Ergebnis:** Die Änderung beeinflusst keine bereits laufende Schicht und wird ab dem Folgetag angewendet. Linien, Arbeitsplätze, Schichtkalender, Pausen und Vorlagen lassen sich entsprechend der Berechtigung pflegen.

### TS-13 – Stammdatenänderung historisieren

**Anforderung:** A-06  
**Status:** Integration erforderlich – Historisierung ist nicht implementiert

**Schritte:** Einen Stammdatenwert ändern und den Änderungsverlauf öffnen.

**Erwartetes Ergebnis:** Verlauf enthält mindestens alten und neuen Wert, betroffenen Datensatz, Änderungszeitpunkt und ändernden Benutzer. Einträge bleiben nachvollziehbar und werden nicht durch eine weitere Änderung überschrieben.

### TS-14 – Rollenbasierter Zugriff

**Anforderung:** A-07  
**Status:** Integration erforderlich – zentrales Berechtigungssystem ist nicht angebunden

**Schritte:** Mit Gruppenleiter-, Nur-Lese- und unberechtigter Rolle Anzeige und Pflegefunktionen aufrufen; zusätzlich geschützte API-Aufrufe direkt versuchen.

**Erwartetes Ergebnis:** Gruppenleiter dürfen freigegebene Stammdaten pflegen, Nur-Lese-Benutzer nur lesen und unberechtigte Benutzer erhalten keinen Zugriff. Die API erzwingt die Autorisierung unabhängig davon, ob eine UI-Schaltfläche verborgen ist.

## Abnahmeprotokoll

| Szenario | Datum | Tester | Ergebnis | Abweichung / Ticket |
| --- | --- | --- | --- | --- |
| TS-__ |  |  | Bestanden / Nicht bestanden / Blockiert |  |