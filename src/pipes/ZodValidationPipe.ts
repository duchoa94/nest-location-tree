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
        const errorBody = error.errors[0];
        console.log('errorBody:', errorBody)
        throw new PreconditionFailedException(errorBody);
      }

      throw new BadRequestException(error.toString());
    }
  }
}
