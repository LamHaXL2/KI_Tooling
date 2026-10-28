# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.39.

## Development server

To start a local development server, run:

# Auslastungsmonitor

Angular-Frontend fuer die Auslastungsuebersicht Montage, Bandabschnitt 7.

## Starten

Im Repository-Root:

```bash
npm install --prefix frontend
npm start --prefix frontend
```

Die Anwendung ist anschliessend unter `http://localhost:4200/` erreichbar.

## Browserchecks mit Playwright MCP

Die Workspace-Konfiguration in `.vscode/mcp.json` startet den Playwright-MCP-Server. Bestaetige den Server in VS Code, falls du zur Freigabe aufgefordert wirst. Starte danach die Anwendung wie oben beschrieben und bitte Copilot, mit Playwright `http://localhost:4200/` zu oeffnen, einen Browser-Workflow auszufuehren und das sichtbare Ergebnis zu pruefen.

MCP-Checks steuern den Browser interaktiv. Die wiederholbaren E2E-Szenarien stehen als deutsche Gherkin-Feature-Datei in `frontend/e2e/features/dashboard.feature`; die Playwright-Schritte dazu liegen in `frontend/e2e/steps`.

## E2E-Tests ausfuehren

Installiere Chromium einmalig und starte danach die Tests:

```bash
npx --prefix frontend playwright install chromium
npm run test:e2e --prefix frontend
```

Der Befehl generiert Playwright-Tests aus den Feature-Dateien und startet den Angular-Dev-Server bei Bedarf selbst. Die Szenarien pruefen Kennzahlen und Tabellendaten, die Ueberlast-Schwellen, manuelles Aktualisieren sowie den Wiederholungsversuch nach einem Ladefehler.

## Daten und Aktualisierung

Die Demo liest die JSON-Dateien unter `Anforderungen/Master Data` als statische Assets. Team 7A verwendet die vorhandenen Monitorwerte; Team 7B ist ein synthetischer Beispieldatensatz zum Vorfuehren der Dropdown-Auswahl. Die Ansicht laedt das gewaehlte Team beim Start, bei einem Teamwechsel und danach alle drei Minuten erneut. Ein Backend/API ist im Repository noch nicht vorhanden.

Die Quelldaten enthalten bereits Auslastungs-Prozentwerte. Prozesszeit-, Pausen- und Verfuegbarkeitsberechnung ist daher nicht Teil des Frontends. Werte ueber 100 % werden rot markiert. Stundenfenster erhalten bei 1-2 ueberlasteten Arbeitsplaetzen einen gelben und ab 3 einen roten Rahmen.

## Build

```bash
npm run build --prefix frontend
```

## MVP-Grenzen

Die Daten fuer Team 7B sind ausschliesslich Beispieldaten. Stammdatenpflege, Historisierung und Rollenautorisierung benoetigen ein Backend und das zentrale Berechtigungssystem; diese Funktionen sind im aktuellen Frontend-Prototyp nicht implementiert.
## Running unit tests
