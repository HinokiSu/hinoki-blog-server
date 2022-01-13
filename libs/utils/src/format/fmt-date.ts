// default import not work, issue: https://github.com/aurelia/skeleton-navigation/issues/606
import * as moment from 'moment'

/**
 * format date
 * @param rawDate raw date resource
 * @param fmt Converted format
 * @returns formated date
 */
export function dateFormat(rawDate: Date, fmt: string) {
  const fmtedDate = moment(rawDate).format(fmt)
  return fmtedDate
}
