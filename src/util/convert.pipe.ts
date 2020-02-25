import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ConvertPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value == null) {
      return undefined;
    }

    if (metadata.metatype === Number) {
      return parseInt(value, 10);
    }

    if (metadata.metatype === Boolean) {
      let bool: boolean;
      if (value === 'true') {
        bool = true;
      } else if (value === 'false') {
        bool = false;
      }
      return bool;
    }

    return value;
  }
}
