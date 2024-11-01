import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(input: Partial<User>): Promise<User> {
    const user = new this.userModel(input);
    return await user.save();
  }

  async updateUser(id: string, input: Partial<User>): Promise<boolean> {
    const result = await this.userModel.updateOne({ _id: id }, input);
    return result.modifiedCount > 0;
  }

  async validateRefreshToken(id: string, token: string): Promise<boolean> {
    const user = await this.userModel.findById(id);
    return !!user && user.refreshToken === token;
  }

  async clearRefreshToken(userId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { refreshToken: null });
  }

  findByRefreshToken(refreshToken: string) {
    return this.userModel.findOne({ refreshToken });
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findAll() {
    return this.userModel.find();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
