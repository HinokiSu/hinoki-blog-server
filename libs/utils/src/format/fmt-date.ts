// default import not work, issue: https://github.com/aurelia/skeleton-navigation/issues/606
import * as dayjs from 'dayjs'

/**
 * format date
 * @param fmt Converted format
 * @returns formated date
 */
export function nowDateFormat(fmt: string) {
  return dayjs().format(fmt)
}
