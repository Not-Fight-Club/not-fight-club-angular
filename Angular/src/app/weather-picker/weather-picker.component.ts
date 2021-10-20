import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weather } from '../interfaces/weather';
import { WeatherService } from '../service/weather/weather.service';

@Component({
  selector: 'app-weather-picker',
  templateUrl: './weather-picker.component.html',
  styleUrls: ['./weather-picker.component.css']
})
export class WeatherPickerComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  weathers: Weather[] =[];
  @Input() name: string = "weatherInput";
  @Input() label: string = "Weather";
  @Input() id: string = "weatherInput";
  @Output() selectedWeather = new EventEmitter<Weather | undefined>();

  ngOnInit(): void {
    if (!this.weathers.length) {
      // TODO: this should probably be removed in favor of only using Input() property
      this.weatherService.getWeathers().subscribe(ws => this.weathers = ws);
    }
  }
  onChange(event: any) {
    console.log(event);
    let weatherId = event.target.value;
    let weather: Weather | undefined = this.weathers.find(w => w.weatherId == weatherId);
    this.selectedWeather.emit(weather);
  }

}