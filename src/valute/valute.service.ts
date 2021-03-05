import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ValuteModel} from "./valute.model";
import {CreateValuteDTO} from "./valute.dto";
import axios from 'axios';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";

@Injectable()
export class ValuteService {

  constructor(
    @InjectRepository(ValuteModel)
    private valuteRepository: Repository<ValuteModel>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  protected static EXCHANGE_RATE_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

  async getValutes() {
    return new Promise((resolve, reject) => {
      this.logger.debug('get valutes');
      axios
        .get(`${ValuteService.EXCHANGE_RATE_URL}`)
        .then((res: any) => {
          this.logger.debug(`received statusCode: ${res.status}`);
          resolve(res.data);
        }).catch((err) => {
        if (err.response && err.response.data) {
          return reject(new Error(err.response.data.message));
        }
        return reject(new Error('bad request'));
      })
    });
  }

  async create(valute: CreateValuteDTO): Promise<ValuteModel> {
    return this.valuteRepository.save({
      ...valute,
    } as any);
  }

  findAll(): Promise<ValuteModel[]> {
    return this.valuteRepository.find();
  }

  findOne(id: string): Promise<ValuteModel> {
    return this.valuteRepository.findOne(id);
  }

  removeAll() {
    return this.valuteRepository.delete({});
  }
}
