import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ collection: 'users' })
export class User extends Document {
  @Field(() => String)
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @HideField()
  @Prop({ required: true })
  password: string;

  @Field(() => Date)
  @Prop({ default: Date.now }) // Default to current date
  dateJoined: Date;

  @HideField()
  @Prop()
  refreshToken?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
