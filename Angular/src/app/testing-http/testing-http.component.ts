import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-testing-http',
  templateUrl: './testing-http.component.html',
  styleUrls: ['./testing-http.component.css']
})
export class TestingHTTPComponent implements OnInit {

  testapi :string = "hat"
  testapi2 :string = "hat"
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  makeCallApi():void{
    //for deployed api, must call http (no s), use exposed port in dockerfile
    //local must be https
    this.http.get("http://20.81.21.138:5001/weatherforecast/FEtoAPI",{responseType: 'text'}).subscribe(word => this.testapi = word)
    //20.81.21.138 bets
    
  }

  makeCallApi2():void{
    
    this.http.get("http://20.81.21.138:5001/weatherforecast/apiToapi",{responseType: 'text'}).subscribe(word => this.testapi2 = word)
    
  }
}
