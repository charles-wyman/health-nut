import { Pipe, PipeTransform } from '@angular/core';

export enum WeightStandards  {
  Imperial = 'Imperial',
  Metric = 'Metric'
}

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {

  transform(value: number, weightStandard: WeightStandards): string {
    switch (weightStandard) {
      case WeightStandards.Imperial:
        return `${(value / 3500).toFixed(2)}  lb`;
      case WeightStandards.Metric:
        return `${(value / 2500).toFixed(2)} Kg`;
      default:
        return 'N/A';
    }
  }
}
