import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandmarkService } from 'src/app/services/landmark/landmark.service';
import { WeightStandards } from 'src/app/models/weight-standards/weight-standards.model';
import { WeightEventsService } from 'src/app/services/weight-events/weight-events.service';
import { WeightEvent } from 'src/app/models/weight/weight-event.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public weightStandard: string;
  public startingWeight: WeightEvent;
  public targetWeight: WeightEvent;
  public currentWeight: WeightEvent;
  private destroy$: Subject<boolean>;
  constructor(private landmarkService: LandmarkService, private weightEventService: WeightEventsService) {
    this.weightStandard = WeightStandards.Imperial;
    this.destroy$ = new Subject();
   }

  ngOnInit(): void {
    this.weightEventService.startingWeight$
    .pipe(takeUntil(this.destroy$))
    .subscribe(startingWeight => this.startingWeight = startingWeight);

    this.landmarkService.targetWeight$
    .pipe(takeUntil(this.destroy$))
    .subscribe(targetWeight => this.targetWeight = targetWeight);

    this.weightEventService.currentWeight$
    .pipe(takeUntil(this.destroy$))
    .subscribe(currentWeight => this.currentWeight = currentWeight);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public get weightLost(): number {
    return this.startingWeight.mass - this.currentWeight.mass;
  }

  public get startingDate(): number {
    return new Date(this.startingWeight.eventDate).getTime();
  }

  public get currentDate(): number {
    return new Date(this.currentWeight.eventDate).getTime();
  }

  public get day(): number {
    return 1000 * 60 * 60 * 24;
  }

  public get totalDays(): number {
    return (this.currentDate - this.startingDate) / this.day;
  }

  public get avgWeightLost(): number {
    return this.weightLost / this.totalDays;
  }

}
