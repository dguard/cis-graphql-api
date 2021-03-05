import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {ValuteService} from "./valute.service";
import {ValuteModel} from "./valute.model";
import {CreateValuteDTO} from "./valute.dto";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";

@Resolver(of => ValuteModel)
export class ValuteResolver {
  constructor(
    @Inject(ValuteService) private valuteService: ValuteService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.restoreValutes();
  }

  async restoreValutes() {
    this.logger.debug('remove existing valutes');
    this.valuteService.removeAll().then(() => {
      return this.valuteService.getValutes();
    }).then((res) => {
      return [Promise.resolve() as any].concat(
        Object.keys(res['Valute']).map((key) => {
          return res['Valute'][key];
        })
      ).reduce((prev, item) => {
        return new Promise((resolve, reject) => {
          const valuteModel = {
            "valute_id": item['ID'],
            "num_code": item['NumCode'],
            "char_code": item['CharCode'],
            "nominal": item["Nominal"],
            "name": item["Name"],
            "value": item["Value"],
            "previous": item["Previous"]
          };
          prev.then(() => {
            this.createValute(valuteModel).then(resolve).catch(reject);
          });
        });
      })
    }).then(() => {
      this.logger.debug('valutes restored');
    })
  }

  @Query(returns => ValuteModel)
  async valute(@Args('id') id: string): Promise<ValuteModel> {
    return await this.valuteService.findOne(id);
  }

  @Query(returns => [ValuteModel])
  async valutes(): Promise<ValuteModel[]> {
    return await this.valuteService.findAll();
  }


  @Mutation(returns => ValuteModel)
  async createValute(
    @Args('valute') valute: CreateValuteDTO,
  ): Promise<ValuteModel> {
    return await this.valuteService.create(valute)
  }
}
