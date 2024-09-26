import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return {
      status: 'success',
      message: 'User created successfully',
      data: newUser,
    };
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return {
      status: 'success',
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return {
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return {
      status: 'success',
      message: `User with ID #${id} has been removed`,
      data: null,
    };
  }
}
