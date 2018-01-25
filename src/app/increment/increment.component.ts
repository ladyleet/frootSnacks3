import {Component} from '@angular/core';
import {scan} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent {

  action$ = new BehaviorSubject<{ type: string }>({type: 'initial store state'});

  output = this.action$.pipe(
    scan((state: number, action: { type: string }) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }, 0)
  );

  inc() {
    this.action$.next({type: 'INCREMENT'});
  }

  dec() {
    this.action$.next({type: 'DECREMENT'});
  }
}
