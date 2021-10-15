import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testing-http',
  templateUrl: './testing-http.component.html',
  styleUrls: ['./testing-http.component.css']
})
export class TestingHTTPComponent implements OnInit {

  testapi :string = "hat"
  testapi2 :string = "hat"
  testdb :string = "hat"
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  makeCallApi():void{
    //for deployed api, must call http (no s), use exposed port in dockerfile
    //local must be https
    this.http.get(environment.bets+":5001/weatherforecast/FEtoAPI",{responseType: 'text'}).subscribe(word => this.testapi = word)
    
    
  }

  makeCallApi2():void{
    
    this.http.get(environment.bets+":5001/weatherforecast/apiToapi",{responseType: 'text'}).subscribe(word => this.testapi2 = word)
    
  }

  makeDBCall():void{
    this.http.get(environment.bets+":5001/weatherforecast/dbtest",{responseType: 'text'}).subscribe(word => this.testdb = word)
  }
  
}
