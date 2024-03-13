import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { nullable } from 'zod';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  create(locationCreateInput: Prisma.LocationCreateInput) {
    return this.prisma.location.create({ data: { ...locationCreateInput } });
  }

  findAll() {
    return this.prisma.location.findMany({
      where: { area: { not: null }, areaUnit: { not: null } },
      include: { parent: { include: { parent: { select: { name: true } } } } },
    });
  }

  findOne(id: number) {
    return this.prisma.location.findUnique({
      where: { id },
      include: { parent: { include: { parent: { select: { name: true } } } } },
    });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}

// @Injectable()
// export class UserService {
//   constructor(private prisma: PrismaService) {}

//   async user(
//     userWhereUniqueInput: Prisma.UserWhereUniqueInput,
//   ): Promise<User | null> {
//     return this.prisma.user.findUnique({
//       where: userWhereUniqueInput,
//     });
//   }

//   async users(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.UserWhereUniqueInput;
//     where?: Prisma.UserWhereInput;
//     orderBy?: Prisma.UserOrderByWithRelationInput;
//   }): Promise<User[]> {
//     const { skip, take, cursor, where, orderBy } = params;
//     return this.prisma.user.findMany({
//       skip,
//       take,
//       cursor,
//       where,
//       orderBy,
//     });
//   }

//   async createUser(data: Prisma.UserCreateInput): Promise<User> {
//     return this.prisma.user.create({
//       data,
//     });
//   }

//   async updateUser(params: {
//     where: Prisma.UserWhereUniqueInput;
//     data: Prisma.UserUpdateInput;
//   }): Promise<User> {
//     const { where, data } = params;
//     return this.prisma.user.update({
//       data,
//       where,
//     });
//   }

//   async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
//     return this.prisma.user.delete({
//       where,
//     });
//   }
// }
