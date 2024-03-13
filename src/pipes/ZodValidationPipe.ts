import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  PreconditionFailedException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = await this.schema.parseAsync(value);    
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError && error?.errors?.length > 0) {
        const errors = error.errors;
        throw new PreconditionFailedException(errors);
      }

      throw new BadRequestException(error.toString());
    }
  }
}
