import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AwdUtilService {
  static months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  constructor() { }

  public static toLocalDate(date: string, time: string): Date {
    return new Date(date + ' ' + time);
  }

  public static parseDateTime(dateTime: string): Date {
    let d = dateTime && dateTime.match(/^(\d+)-(\w+)-(\d+) (\d+).(\d+).(\d+).(\d+) (\w+)/);
    if (d) {
      return new Date(
        Number((d[3] > "70" ? "19" : "20") + d[3]),
        this.months[d[2]],
        Number(d[1]),
        d[8] === "AM" ? Number(d[4]) : Number(d[4]) + 12,
        Number(d[5]),
        Number(d[6])
      );
    } else {
      return null;
    }
  }

  public static uncapitalize(status: string) {
    return status
      ? status[0].toUpperCase() + status.slice(1).toLowerCase()
      : status;
  }

  public static addPad(toPad: number) {
    return ('0' + toPad).slice(-2);
  }

  public static formatDate(date: Date): string {
    return date
      ? `${date.getFullYear()}-${this.addPad(date.getMonth() + 1)}-${this.addPad(
        date.getDate()
      )}`
      : '';
  }

  public static formatTime(date: Date): string {
    return date
      ? `${this.addPad(date.getHours())}:${this.addPad(
        date.getMinutes()
      )}:${this.addPad(date.getSeconds())}`
      : '';
  }

  public static formatDateTime(date: Date): string {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }

  public static getTimeZoneOffsetString(date: Date): string {
    const pad = '00';
    const offset = date.getTimezoneOffset();
    return ((offset <= 0 ? '+' : '-') + (pad + Math.floor(Math.abs(offset / 60))).slice(-pad.length) + ":" + (pad + Math.abs(offset % 60)).slice(-pad.length));
  }

  public static formatLookupDate(lookupDate: string): string {
    const lookupDateRegExp: RegExp = /([0-9]{4})-?([0-9]{1,2})?-?([0-9]{1,2})?-?([0-9]{1,2})?\.?([0-9]{1,2})?\.?([0-9]{1,2})?\.?([0-9]{1,6})?/;
    let newLookupDate = lookupDate.replace(lookupDateRegExp, (match, p1, p2, p3, p4, p5, p6, p7) => {
      if (match.length !== lookupDate.length || !p1 || !p2 || !p3) return match;

      let newDateString = p1 + '-' + (p2 ? p2 : '00')
        + '-' + (p3 ? p3 : '00')
        + '-' + (p4 ? p4 : '00')
        + '.' + (p5 ? p5 : '00')
        + '.' + (p6 ? p6 : '00')
        + '.' + (p7 ? p7 : '000000');

      return newDateString;
    });

    return newLookupDate;
  }

  public static formatAwdObjectKey(objectKey: string): string {
    const awdObjectKeyRegExp: RegExp = /([0-9]{4})-?([0-9]{1,2})?-?([0-9]{1,2})?-?([0-9]{1,2})?\.?([0-9]{1,2})?\.?([0-9]{1,2})?\.?([0-9]{1,6})?([a-zA-Z0-9]{1})?([0-9]{1,2})?/;
    let newObjectKey = objectKey.replace(awdObjectKeyRegExp, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
      if (match.length !== objectKey.length) return match;

      let newObjectKeyString = p1 + (p2 ? '-' + p2 : '')
        + (p3 ? '-' + p3 : '')
        + (p4 ? '-' + p4 : '')
        + (p5 ? '.' + p5 : '')
        + (p6 ? '.' + p6 : '')
        + (p7 ? '.' + p7 : '')
        + (p8 ? p8.toUpperCase() : '')
        + (p9 ? p9 : '')

      return newObjectKeyString
    });

    return newObjectKey;
  }

  public static convertObjectArrayToMap(array: any[], key) {
    return array.reduce((map, obj, index) => {
      if (obj[key] !== undefined) {
        return (map[obj[key]] = obj), map;
      } else {
        throw new Error(
          `${key} is not a property of object at index ${index} of provided array`
        );
      }
    }, {});
  }

  public static convertMapToObjectArray(obj) {
    return Object.keys(obj).map((key) => {
      return obj[key];
    });
  }

  public static isPagesRemaining(
    page: number,
    totalItems: number,
    pageSize: number
  ): boolean {
    return (page - 1) * pageSize < totalItems;
  }
}
