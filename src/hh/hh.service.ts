import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HHData } from '../top-page/top-page.model';
import {
  API_URL,
  CLUSTER_NOT_FOUND_ERROR,
  SALARY_CLUSTER_ID,
} from './hh.constants';
import { HhResponse } from './hh.models';

@Injectable()
export class HhService {
  token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = configService.get('HH_TOKEN') ?? '';
  }

  async getData(text: string) {
    try {
      const { data } = await this.httpService
        .get<HhResponse>(API_URL.vacancies, {
          params: {
            text,
            clusters: true,
          },
          headers: {
            'User-Agent': 'OwlTop/1.0 (batbondik0@gmail.com)',
            Authorization: `Bearer ${this.token}`,
          },
        })
        .toPromise();

      return this.parseData(data);
    } catch (err) {
      Logger.error(err);
    }
  }

  private parseData(data: HhResponse): HHData {
    const salaryCluster = data.clusters.find(
      (cluster) => cluster.id === SALARY_CLUSTER_ID,
    );

    if (!salaryCluster) {
      throw new Error(CLUSTER_NOT_FOUND_ERROR);
    }

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
    );
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name,
    );

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date(),
    };
  }

  private getSalaryFromString(string: string): number {
    const numberRegex = /(\d+)/g;

    const res = string.match(numberRegex);

    if (!res) {
      return 0;
    }

    return +res[0];
  }
}
