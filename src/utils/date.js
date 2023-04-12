import { startCase } from 'lodash';

export function formatDate(dateStr) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dateObj = new Date(dateStr);
  const formattedDateStr = dateObj.toLocaleDateString(undefined, options);
  const capitalizedDateStr = startCase(formattedDateStr);
  return capitalizedDateStr;
}