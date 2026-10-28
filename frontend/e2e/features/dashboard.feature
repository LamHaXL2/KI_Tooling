# language: de
Funktionalität: Schichtmonitor
  Als Schichtleitung
  möchte ich Auslastung und Überlasten sehen
  damit ich die aktuelle Schicht einschätzen kann.

  Szenario: Kennzahlen und Stundenfenster anzeigen
    Angenommen ich öffne den Schichtmonitor
    Dann sehe ich die Überschrift "Auslastung / Schichtmonitor"
    Und wird das Team "7A" angezeigt
    Und werden 10 Arbeitsplätze angezeigt
    Und wird die aktuelle Überlast mit 2 Arbeitsplätzen angezeigt
    Und beträgt die durchschnittliche Auslastung "93,0 %"
    Und sehe ich 6 Stundenfenster
    Und hat das letzte Stundenfenster keine Messwerte

  Szenario: Team über das Dropdown wechseln
    Angenommen ich öffne den Schichtmonitor
    Wenn ich Team "7B" auswähle
    Dann wird das Team "7B" angezeigt
    Und werden 4 Arbeitsplätze angezeigt
    Und wird die aktuelle Überlast mit 0 Arbeitsplätzen angezeigt
    Und beträgt die durchschnittliche Auslastung "89,0 %"

  Szenario: Überlast nach Schweregrad kennzeichnen
    Angenommen ich öffne den Schichtmonitor
    Dann ist das Stundenfenster "06:00-07:00" als "Warnung" markiert
    Und ist das Stundenfenster "07:00-08:00" als "kritisch" markiert
    Und ist das Stundenfenster "09:15-10:15" als "Warnung" markiert

  Szenario: Daten manuell aktualisieren
    Angenommen ich öffne den Schichtmonitor und zähle die Datenabrufe
    Wenn ich die Daten manuell aktualisiere
    Dann wird ein weiterer Datenabruf gestartet

  Szenario: Nach einem Ladefehler erneut versuchen
    Angenommen der erste Datenabruf fehlschlägt
    Dann wird der Ladefehler angezeigt
    Wenn ich den erneuten Versuch starte
    Dann werden die Monitordaten angezeigt