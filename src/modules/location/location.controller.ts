import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ZodValidationPipe } from '../../pipes/ZodValidationPipe';
import { createLocationSchema } from './schema/location.schema';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationSchema))
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.locationService.create(createLocationDto);
      return res.json({ data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.locationService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    try {
      return this.locationService.update(+id, updateLocationDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.locationService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
