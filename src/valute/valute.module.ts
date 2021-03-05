import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {ValuteModel} from "./valute.model";
import {ValuteService} from "./valute.service";
import {ValuteResolver} from "./valute.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([ValuteModel])],
  providers: [ValuteService, ValuteResolver],
  exports: [ValuteService]
})
export class ValuteModule {}
