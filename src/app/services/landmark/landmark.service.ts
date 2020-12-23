import { Injectable } from '@angular/core';
import { Landmark } from 'src/app/models/landmark/landmark.model';
import { BehaviorSubject } from 'rxjs';
import { WeightEvent } from 'src/app/models/weight/weight-event.model';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private mLandmark: Landmark;
  public landmark$: BehaviorSubject<Landmark>;
  public targetWeight$: BehaviorSubject<WeightEvent>;
  constructor() {
    this.mLandmark = { targetWeight: { mass: 840000, eventDate: '2021-01-01T12:00:00' } };
    this.landmark$ = new BehaviorSubject(this.mLandmark);
    this.targetWeight$ = new BehaviorSubject<WeightEvent>(this.mLandmark.targetWeight);
    this.landmark$.subscribe(landmark => this.targetWeight$.next(landmark.targetWeight));

   }

   public fetchGoals(): void {
    const landmark: Landmark = {
      targetWeight: { mass: 840000, eventDate: new Date().toISOString() }
    };
    this.mLandmark = landmark;
    this.landmark$.next(this.mLandmark);

   }

}
