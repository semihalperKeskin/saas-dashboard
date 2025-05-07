import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError, output } from 'zod';

export class ZodValidationPipe<T extends ZodSchema> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: any): output<T> {
    const result = this.schema.safeParse(value);

    console.log('result', result);

    if (!result.success) {
      throw new BadRequestException(ZodError);
    }

    return result.data as output<T>;
  }
}
