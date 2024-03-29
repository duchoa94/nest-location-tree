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
} from '@nestjs/common';
import { Response } from 'express';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ZodValidationPipe } from '../../pipes/ZodValidationPipe';
import { createLocationSchema } from './schema/location.schema';
import { Logger } from 'nestjs-pino';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService, private readonly logger: Logger) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationSchema))
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Res() res: Response,
  ) {
    const data = await this.locationService.create(createLocationDto);
    return res.json({ data });
  }

  @Get()
  findAll() {
    // this.logger.log('Hello world!');
    return this.locationService.findAll();
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
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.locationService.remove(+id);
  }
}
