import * as dayjs from 'dayjs';

export class DateTransformer {
  to(data: Date): string | null {
    return data ? dayjs(data).toISOString() : null;
  }

  from(data: string): Date | null {
    return data ? new Date(data) : null;
  }
}
