import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LightStats {
    id: string;
    realSeconds: number;
    theoreticalSeconds: number;
    percentage: number;
    plannedPercentage: number;
}

@Injectable({ providedIn: 'root' })
export class ConsumptionService {
    private static lastStats: LightStats[] | null = null;
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getDashboardData(): Observable<LightStats[]> {
        return forkJoin({
            theoretical: this.http.get<any>(`${this.baseUrl}/lights/consumption/theoretical`),
            realLights: this.http.get<any[]>(`${this.baseUrl}/lights/`)
        }).pipe(
            map(data => {
                const perLightTheo = data.theoretical.individual_consumption || {};
                const stats: LightStats[] = [];

                data.realLights.forEach((light: any) => {
                    const lightId = light.lightID.toString();
                    const theo = perLightTheo[lightId] || 0;
                    const real = light.acumulador || 0;

                    if (theo > 0) {
                        stats.push({
                            id: light.idj || `L${lightId}`,
                            realSeconds: real,
                            theoreticalSeconds: theo,
                            percentage: Math.round((real / theo) * 100),
                            plannedPercentage: 0
                        });
                    }
                });
                ConsumptionService.lastStats = stats;
                return stats;
            })
        );
    }

    static getLastStats(): LightStats[] | null {
        return this.lastStats;
    }
}
