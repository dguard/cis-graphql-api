import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateValuteDTO{
  @Field()
  valute_id: string;

  @Field()
  num_code: string;

  @Field()
  char_code: string;

  @Field()
  nominal: string;

  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  previous: number;
}
