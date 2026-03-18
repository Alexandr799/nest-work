import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { API_URL } from './hh.const';
import { HhVacanciesResponse } from './models/hh.vacancies.response.interface';
import { HhData } from 'src/top-page/models/top-page.model';


@Injectable()
export class HhService {
    token: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        this.token = this.configService.get('HH_TOKEN') || ''
    }

    async getData(text: string) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<HhVacanciesResponse>(API_URL, {
                    params: {
                        text,
                    },
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }),
            );
            return this.parseData(data);
        } catch (e) {
            Logger.error(e)
        }
    }

    private parseData(data: HhVacanciesResponse): HhData {
        const hhData = new HhData();

        const salaries: number[] = data.items
            .filter(item => item.salary && (item.salary.from || item.salary.to))
            .map(item => {
                const from = item.salary?.from ?? 0;
                const to = item.salary?.to ?? from;
                return Math.floor((from + to) / 2);
            })
            .sort((a, b) => a - b);

        hhData.count = data.found;

        if (!salaries.length) {
            hhData.juniorSalary = 0;
            hhData.middleSalary = 0;
            hhData.seniorSalary = 0;
            hhData.updatedAt = new Date();
            return hhData;
        }

        const juniorIndex = Math.floor(salaries.length * 0.25);
        const middleIndex = Math.floor(salaries.length * 0.5);
        const seniorIndex = Math.floor(salaries.length * 0.75);

        hhData.juniorSalary = salaries[juniorIndex];
        hhData.middleSalary = salaries[middleIndex];
        hhData.seniorSalary = salaries[seniorIndex];
        hhData.updatedAt = new Date();

        return hhData;
    }
}
