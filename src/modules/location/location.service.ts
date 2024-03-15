import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({ data: { ...createLocationDto } });
  }

  findAll() {
    return this.prisma.location.findMany({
      where: { area: { not: null }, areaUnit: { not: null } },
      include: {
        parent: {
          select: {
            id: true,
            uuid: true,
            name: true,
            parent: { select: { id: true, uuid: true, name: true } },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            uuid: true,
            name: true,
            parent: { select: { id: true, uuid: true, name: true } },
          },
        },
      },
    });

    if (!location) {
      throw new NotFoundException(`Location with Id ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const foundLocation = await this.prisma.location.findUnique({
      where: { id },
    });
    if (!foundLocation) {
      throw new NotFoundException(`Location with Id #{id} not found`);
    }

    const updatedLocation = await this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
    return updatedLocation;
  }

  async remove(id: number) {
    const foundLocation = await this.prisma.location.findUnique({
      where: { id },
    });
    if (!foundLocation) {
      throw new NotFoundException(`Location with Id #{id} not found`);
    }

    return this.prisma.location.delete({
      where: { id },
    });
  }
}
