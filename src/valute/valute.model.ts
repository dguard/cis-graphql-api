import {Field, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@ObjectType()
@Entity()
export class ValuteModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  valute_id: string;

  @Field()
  @Column()
  num_code: string;

  @Field()
  @Column()
  char_code: string;

  @Field()
  @Column()
  nominal: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'decimal', precision: 9, scale: 4, default: 0, })
  value: number;

  @Field()
  @Column({ type: 'decimal', precision: 9, scale: 4, default: 0, })
  previous: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
