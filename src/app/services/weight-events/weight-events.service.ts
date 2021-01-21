import { Injectable } from '@angular/core';
import { WeightEvent } from 'src/app/models/weight/weight-event.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeightEventsService {

  private mWeightEvents: WeightEvent[];

  public weightEvents$: BehaviorSubject<WeightEvent[]>;
  public startingWeight$: BehaviorSubject<WeightEvent>;
  public currentWeight$: BehaviorSubject<WeightEvent>;

  constructor() {
    const event1: WeightEvent = {
      mass: 1039500,
      eventDate: '2020-09-01T12:00:00'
    };
    const event2: WeightEvent = {
      mass: 1010800,
      eventDate: '2020-09-27T12:00:00'
    };
    const event3: WeightEvent = {
      mass: 985990,
      eventDate: '2020-12-23T12:00:00'
    };

    this.mWeightEvents = [event1, event2, event3];
    this.weightEvents$ = new BehaviorSubject(this.mWeightEvents);
    this.startingWeight$ = new BehaviorSubject(this.firstEvent);
    this.currentWeight$ = new BehaviorSubject(this.lastEvent);

    this.weightEvents$.subscribe(weightEvents => {
      this.mWeightEvents = weightEvents;
      this.startingWeight$.next(this.firstEvent);
      this.currentWeight$.next(this.lastEvent);
     });
   }

   private get firstEvent(): WeightEvent {
     return this.mWeightEvents[0];
   }

   private get lastEvent(): WeightEvent {
     return this.mWeightEvents[this.mWeightEvents.length - 1];
   }
}
