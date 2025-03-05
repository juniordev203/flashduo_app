import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatCustomDate(dateString: string): string {
  const date = new Date(dateString);

  return format(date, "h:mm:ss a 'ngày' dd 'tháng' MM 'năm' yyyy", { locale: vi });
}
