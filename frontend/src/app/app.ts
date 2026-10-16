import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, catchError, merge, switchMap, tap, timer } from 'rxjs';

interface MonitoringWindow {
  uhrzeit: string;
  status: 'vergangen' | 'aktuell' | 'vorschau';
  werte: Record<string, number> | null;
}

interface MonitoringData {
  team: string;
  schicht: string;
  datum: string;
  arbeitsplaetze: string[];
  stundenfenster: MonitoringWindow[];
}

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.html',
  styleUrl: './app.css'
})
export class App {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refreshRequest = new Subject<void>();

  protected readonly data = signal<MonitoringData | null>(null);
  protected readonly lastUpdated = signal<Date | null>(null);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly isCurrentDate = computed(() => {
    const date = this.data()?.datum;
    return date ? new Date(`${date}T12:00:00`).toDateString() === new Date().toDateString() : false;
  });
  protected readonly currentWindow = computed(
    () => this.data()?.stundenfenster.find((window) => window.status === 'aktuell') ?? null
  );
  protected readonly currentOverloads = computed(() => {
    const values = this.currentWindow()?.werte;
    return values ? Object.values(values).filter((value) => value > 100).length : 0;
  });
  protected readonly currentAverage = computed(() => {
    const values = Object.values(this.currentWindow()?.werte ?? {});
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  });
  protected readonly previewCount = computed(
    () => this.data()?.stundenfenster.filter((window) => window.status === 'vorschau').length ?? 0
  );

  constructor() {
    merge(timer(0, 180_000), this.refreshRequest)
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.loadError.set(false);
        }),
        switchMap(() =>
          this.http.get<MonitoringData>('assets/Monitorwerte.json').pipe(
            catchError(() => {
              this.loading.set(false);
              this.loadError.set(true);
              return EMPTY;
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.data.set(data);
        this.lastUpdated.set(new Date());
        this.loading.set(false);
      });
  }

  protected refresh(): void {
    this.refreshRequest.next();
  }

  protected formatPercent(value: number | null): string {
    return value === null ? '–' : `${value.toFixed(1).replace('.', ',')} %`;
  }

  protected barWidth(value: number): number {
    return Math.min(value, 120) / 1.2;
  }

  protected formatTime(date: Date | null): string {
    return date ? new Intl.DateTimeFormat('de-DE', { timeStyle: 'medium' }).format(date) : '–';
  }

  protected overloadCount(window: MonitoringWindow): number {
    return window.werte ? Object.values(window.werte).filter((value) => value > 100).length : 0;
  }

  protected windowSeverity(window: MonitoringWindow): string {
    const count = this.overloadCount(window);
    return count >= 3 ? 'critical' : count > 0 ? 'warning' : '';
  }

  protected formatDate(date: string): string {
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(`${date}T12:00:00`));
  }
}
