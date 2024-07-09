import { TestBed } from '@angular/core/testing';

import { AwdUtilService } from './awd-util.service';

describe('AwdUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(AwdUtilService).toBeTruthy();
  });

  describe('#toLocalDate', () => {
    it('should convert date: "2020-11-18" and time: "21:43:26-06:00" to correct Date object', () => {
      let dateStr = '2020-11-18';
      let timeStr = '21:43:26-06:00';

      let date = AwdUtilService.toLocalDate(dateStr, timeStr);

      // Note dates are inputted in UTC
      expect(date).toEqual(new Date(Date.UTC(2020, 10, 19, 3, 43, 26)));
    });

    it('should convert date: "2018-12-1" and time: "18:43:26-04:00" to correct Date object', () => {
      let dateStr = '2018-12-1';
      let timeStr = '18:43:26-04:00';

      let date = AwdUtilService.toLocalDate(dateStr, timeStr);

      // Note dates are inputted in UTC
      expect(date).toEqual(new Date(Date.UTC(2018, 11, 1, 22, 43, 26)));
    });

    it('should work for future date: "2022-1-1" and time: "04:43:26-05:00"', () => {
      let dateStr = '2022-1-1';
      let timeStr = '04:43:26-05:00"';

      let date = AwdUtilService.toLocalDate(dateStr, timeStr);

      // Note dates are inputted as -05:00 UTC
      expect(date).toEqual(new Date(Date.UTC(2022, 0, 1, 9, 43, 26)));
    });

    it('should convert date: "2020-3-23" and time: "07:02:26+01:00"', () => {
      let dateStr = '2020-3-23';
      let timeStr = '07:02:26+01:00"';

      let date = AwdUtilService.toLocalDate(dateStr, timeStr);

      // Note dates are inputted as -05:00 UTC
      expect(date).toEqual(new Date(Date.UTC(2020, 2, 23, 6, 2, 26)));
    });
  });

  describe('#uncapitalize', () => {
    it('should transform "STATUS" to "Status"', () => {
      let status = 'STATUS';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Status');
    });

    it('should transform "CREATED" to "Created"', () => {
      let status = 'CREATED';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Created');
    });

    it('should transform "INDEXED" to "Indexed"', () => {
      let status = 'INDEXED';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Indexed');
    });

    it('should transform "PASSED" to "Passed"', () => {
      let status = 'PASSED';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Passed');
    });

    it('should transform "PROCERROR" to "Procerror"', () => {
      let status = 'PROCERROR';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Procerror');
    });

    it('should transform "PROCESSED" to "Processed"', () => {
      let status = 'PROCESSED';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Processed');
    });

    it('should do nothing to an empty string', () => {
      let status = '';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('');
    });

    it('should transform "SErVICE" to Service"', () => {
      let status = 'SErVICE';

      let transformedStatus = AwdUtilService.uncapitalize(status);

      expect(transformedStatus).toBe('Service');
    });
  });

  describe('addPad', () => {
    it('should change 0 to "00"', () => {
      let num = 0;

      let val = AwdUtilService.addPad(num);

      expect(val).toBe('00');
    });

    it('should change 5 to "05"', () => {
      let num = 5;

      let val = AwdUtilService.addPad(num);

      expect(val).toBe('05');
    });

    it('should change 10 to "10"', () => {
      let num = 10;

      let val = AwdUtilService.addPad(num);

      expect(val).toBe('10');
    });

    it('should change 53 to "53"', () => {
      let num = 53;

      let val = AwdUtilService.addPad(num);

      expect(val).toBe('53');
    });

    it('should change 99 to "99"', () => {
      let num = 99;

      let val = AwdUtilService.addPad(num);

      expect(val).toBe('99');
    });

    it('should change 11 to "11"', () => {
      let num = 11;

      let val = AwdUtilService.addPad(num);

      expect(val).toBe('11');
    });
  });

  describe('#formatDate', () => {
    it('should format date into appropriate string', () => {
      let date = new Date(2020, 10, 19, 3, 43, 26);
      let dateStr = AwdUtilService.formatDate(date);
      expect(dateStr).toBe('2020-11-19');
    });
    it('should format date of same numbers into appropriate string', () => {
      let date = new Date(1970, 0, 0, 0, 0, 0);
      let dateStr = AwdUtilService.formatDate(date);
      expect(dateStr).toBe('1969-12-31');
    });
  });

  describe('#formatTime', () => {
    it('should format time into appropriate string', () => {
      let date = new Date(2020, 10, 19, 6, 31, 20);
      let dateStr = AwdUtilService.formatTime(date);
      expect(dateStr).toBe('06:31:20');
    });
    it('should format time of same numbers into appropriate string', () => {
      let date = new Date(1970, 0, 0, 0, 0, 0);
      let dateStr = AwdUtilService.formatTime(date);
      expect(dateStr).toBe('00:00:00');
    });
  });

  describe('#convertObjectArrayToMap', () => {
    it('should handle array with multiple objects', () => {
      const array = [
        { a: 'test1', b: 'test2' },
        { a: 'test3', b: 'test4' },
      ];
      const map = AwdUtilService.convertObjectArrayToMap(array, 'a');
      expect(map['test1']).toBeTruthy();
      expect(map['test3']).toBeTruthy();
    });
    it('should handle empty array', () => {
      const array = [];
      const map = AwdUtilService.convertObjectArrayToMap(array, 'a');
      expect(map).toEqual({});
    });
    it('should throw error when key property does not exist in object', () => {
      const array = [
        { a: 'test1', b: 'test2' },
        { a: 'test3', b: 'test4' },
      ];
      expect(() => {
        AwdUtilService.convertObjectArrayToMap(array, 'c');
      }).toThrowError(
        'c is not a property of object at index 0 of provided array'
      );
    });
    it('should handle duplicate key values by over-writing previous', () => {
      const array = [
        { a: 'test1', b: 'test2' },
        { a: 'test1', b: 'test4' },
      ];
      const map = AwdUtilService.convertObjectArrayToMap(array, 'a');
      expect(map['test1'].b).toEqual('test4');
    });
  });

  describe('#convertMapToObjectArray', () => {
    it('should convert standard map of multiple data types into an object array', () => {
      const object1 = {
        a: 'somestring',
        b: 10,
        c: false,
      };
      expect(AwdUtilService.convertMapToObjectArray(object1)[0]).toEqual(
        'somestring'
      );
    });
    it('should handle empty map', () => {
      const object2 = {};
      expect(AwdUtilService.convertMapToObjectArray(object2)[0]).toBeFalsy();
    });
  });

  describe('#isPagesRemaining', () => {
    it('should return true', () => {
      let pageNum = 3;
      let itemsNum = 11;
      let sizeNum = 5;
      expect(
        AwdUtilService.isPagesRemaining(pageNum, itemsNum, sizeNum)
      ).toBeTruthy();
    });
    it('should return false when total items is less than', () => {
      let pageNum = 2;
      let itemsNum = 2;
      let sizeNum = 3;
      expect(
        AwdUtilService.isPagesRemaining(pageNum, itemsNum, sizeNum)
      ).toBeFalsy();
    });
    it('should return false when total items is equal to', () => {
      let pageNum = 2;
      let itemsNum = 3;
      let sizeNum = 3;
      expect(
        AwdUtilService.isPagesRemaining(pageNum, itemsNum, sizeNum)
      ).toBeFalsy();
    });
  });
});
