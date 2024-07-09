import { TestBed } from '@angular/core/testing';
import { AllowIn } from './keyboard-shortcuts.interfaces';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { filter, first, last, tap } from 'rxjs/operators';
import { KeyboardRegisterDocumentService } from './keyboard-register-document.service';

import { KeyboardShortcutsService } from './keyboard-shortcuts.service';

describe('KeyboardShortcutsService', () => {
  let service: KeyboardShortcutsService;
  let registerService = new KeyboardRegisterDocumentService();
  let registerServiceSpy = jasmine.createSpyObj('KeyboardRegisterDocumentService', ['getExternalWindows']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeyboardShortcutsService,
        {
          provide: KeyboardRegisterDocumentService,
          useValue: registerServiceSpy,
        },
      ],
    });

    registerServiceSpy.getExternalWindows.and.returnValue(
      of([{ externalWindow: registerService.getWindow(), windowId: '1' }])
    );
    service = TestBed.get(KeyboardShortcutsService);
    // registerService = TestBed.get(KeyboardRegisterDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(registerServiceSpy.getExternalWindows).toHaveBeenCalled();
  });

  describe('#addShortcuts', () => {
    let events = new BehaviorSubject([]);

    it('should execute the function passed in to the function (sequence)', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'down',
          description: 'Arrow Key Down',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj.initEvent('keydown', true, true);
        Object.defineProperties(eventObj, {
          key: { value: 'down' },
          charcode: { value: 40 },
        });
        document.dispatchEvent(eventObj);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('down');
          done();
        });
      });
    });

    it('should execute the function passed in to the function (combo)', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'alt + c',
          description: 'Combo Key',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: 'c' },
          altKey: { value: true },
          charcode: { value: 0 },
          keycode: { value: 67 },
        });
        document.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('alt + c');
          done();
        });
      });
    });

    it('should add shortcut and not preventDefault', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'alt + c',
          description: 'Combo Key',
          preventDefault: true,
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: 'c' },
          altKey: { value: true },
          charcode: { value: 0 },
          keycode: { value: 67 },
        });
        document.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('alt + c');
          done();
        });
      });
    });

    it('should add shortcut with which parameter defined (+)', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: '+',
          description: 'Plus',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: '+' },
          shiftKey: { value: true },
          which: { value: 'plus' },
        });
        document.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('+');
          done();
        });
      });
    });

    it('should add shortcut with which parameter defined (.)', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: '.',
          description: 'Dot',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: '.' },
          which: { value: '110' },
        });
        document.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('.');
          done();
        });
      });
    });

    it('should add shortcut with which parameter defined (ENTER)', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'enter',
          description: 'Enter',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: 'enter' },
          shiftKey: { value: true },
          which: { value: '13' },
        });
        document.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('enter');
          done();
        });
      });
    });

    it('should add shortcut with the target property set', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'enter',
          description: 'Enter',
          target: document.body,
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: 'enter' },
          shiftKey: { value: true },
          which: { value: '13' },
        });
        document.body.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('enter');
          done();
        });
      });
    });

    it('should add shortcut with allowIn parameter set to allow event handling over TEXTAREA', (done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'enter',
          description: 'Enter',
          allowIn: [AllowIn.Textarea],
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        var eventObj1: KeyboardEvent = document.createEvent('KeyboardEvent');
        eventObj1.initEvent('keydown', true, true);
        Object.defineProperties(eventObj1, {
          key: { value: 'enter' },
          shiftKey: { value: true },
          which: { value: '13' },
        });
        let elem = document.createElement('textarea');
        document.body.appendChild(elem);
        elem.dispatchEvent(eventObj1);

        events.pipe(first()).subscribe((data) => {
          expect(data.length).toEqual(1);
          expect(data[0].event instanceof KeyboardEvent).toBeTruthy();
          expect(data[0].key[0]).toEqual('enter');
          done();
        });
      });
    });
  });

  // describe('#removeShortcuts', () => {
  //   let events = new BehaviorSubject([]);
  //   let shortcutsData = [];

  //   // beforeEach(done => {
  //   //   const shortcuts = [{
  //   //     category: 'navigation',
  //   //     key: 'down',
  //   //     description: 'Arrow Key Down',
  //   //     command: (evt) => { events.next([{ ...evt }]); }
  //   //   }];

  //   //   service.add(shortcuts);

  //   //   service.shortcuts$.subscribe(data => {
  //   //     shortcutsData = data;
  //   //     done();
  //   //   });
  //   // });

  //   it('should do nothing shortcut when the shortcut does not exist', (done) => {
  //     const shortcuts = [
  //       {
  //         category: 'navigation',
  //         key: 'down',
  //         description: 'Arrow Key Down',
  //         command: (evt) => {
  //           events.next([{ ...evt }]);
  //         },
  //       },
  //     ];

  //     service.add(shortcuts);

  //     service.shortcuts$.subscribe((data) => {
  //       service.remove('2');
  //       service.shortcuts$.subscribe((remainingShortcuts) => {
  //         expect(remainingShortcuts).toBeTruthy();
  //         expect(remainingShortcuts.length).toEqual(1);
  //         done();
  //       });
  //     });
  //   });
  // });

  // it('should remove the shortcut when the shortcut exists', done => {
  //   const shortcuts = [{
  //     category: 'navigation',
  //     key: 'alt + c',
  //     description: 'Combo',
  //     command: (evt) => { events.next([{ ...evt }]); }
  //   }];

  //   service.add(shortcuts);

  //   // service.shortcuts$.subscribe(data => {
  //   //   service.remove(data[0].id);
  //     service.shortcuts$.pipe().subscribe(remainingShortcuts => {
  //       console.log('data:');
  //       console.log(remainingShortcuts)
  //       expect(remainingShortcuts).toBeTruthy();
  //       expect(remainingShortcuts.length).toEqual(0);
  //       done();
  //     })
  //   // });
  // });

  describe('#select', () => {
    let data;
    let events = new BehaviorSubject([]);

    beforeEach((done) => {
      const shortcuts = [
        {
          category: 'navigation',
          key: 'down',
          description: 'Arrow Key Down',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
        {
          category: 'navigation',
          key: 'alt + c',
          description: 'Combo Key',
          command: (evt) => {
            events.next([{ ...evt }]);
          },
        },
      ];

      data = service.add(shortcuts);

      service.shortcuts$.subscribe((data) => {
        done();
      });
    });

    it('should select and return the keyboard shortcuts based on the key', (done) => {
      service.select('down').subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.key[0]).toBe('down');
        done();
      });

      var eventObj: KeyboardEvent = document.createEvent('KeyboardEvent');
      eventObj.initEvent('keydown', true, true);
      Object.defineProperties(eventObj, {
        key: { value: 'down' },
      });
      document.dispatchEvent(eventObj);
    });
  });
});
