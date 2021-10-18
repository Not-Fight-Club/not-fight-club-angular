import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Trait } from '../interfaces/trait';
import { BucksService } from '../service/bucks/bucks.service';
import { TraitService } from '../service/trait/trait.service';
import { User } from 'src/app/interfaces/user';
import { Product } from '../interfaces/product';
import { ShopService } from '../service/shop/shop.service';
import { Location } from '../interfaces/location';
import { FightService } from '../service/fight/fight.service';
import { Weather } from '../interfaces/weather';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  user: User | null = null;

  constructor(private bucksService: BucksService, private traitService: TraitService, private router: Router, private shopService: ShopService, private fightService: FightService) { }

  ngOnInit(): void {
    let userString: string | null = sessionStorage.getItem('user');
    if (userString !== null) {
      let userJSON = JSON.parse(userString);
      this.user = userJSON;
    }
  }

  getRich(): void {
    this.bucksService.adjustBucks(2000).subscribe(canAfford => {
      if (canAfford) {
        alert("You now have 2000 more !Bucks.")
      }
    })
  }

  addLocation(): void {
    let userString = sessionStorage.getItem('user');
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let currentUser = JSON.parse(userString);
    if (currentUser.bucks < 2000) {
      alert("You do not have enough bucks to make this purchase!");
      return
    }
    //Prompt the user for a location
    let newLocation: string | null = prompt("Type in a new location for the database.");
    //If the trait is invalid, you will be alerted that the trait is invalid, and you'll have to type it in again.
    //For now, all the traits are valid. True will be replaced with a function to validate the traits
    while (!true) {
      newLocation = prompt(`Sorry, ${newLocation} is not a legal location. Type in a new trait to add to the database.`);
    }
    //If the new trait is null, don't do anything.
    if (newLocation === null || newLocation === "") return;
    //Confirm that the user wants to add that trait
    let choice: boolean = confirm(`Are you sure you want to add the new location "${newLocation}"? It will cost 2000 !Bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 2000.
    this.bucksService.adjustBucks(-2000).subscribe(canAfford => {
      if (canAfford) {
        //Add the trait to the database
        if (newLocation !== null) {
          
          let product: Product = {
            productId: 0,
            seasonalId: null,
            productName: newLocation,
            productPrice: 2000, //need to change so that this number is dynamic to the cost presented
            productDescription: 'Location',
            productDiscount: 0,
            categoryId: 2,
            category: "Location"
          }
          this.shopService.AddProduct(product).subscribe(addedProduct => {
            this.shopService.AddUserProduct(addedProduct)?.subscribe(addedUserProduct => {
              //finally send the new trait to the character db
              //if trait ids are going to match up to shop db
             // let trait: Trait = { traitId: addedProduct.productId, description: addedProduct.productName };

              //if trait ids will be independent of each other
              let location: Location = { locationId: 0, location1: addedProduct.productName }


              this.fightService.addLocation(location).subscribe(
                location => { alert(`${location.location1} has been added to the database.`) },
                () => { alert(`${location.location1} could not be added`)}
              )
            })
          })
        }
      }
    })

  }

  addWeather(): void {
    let userString = sessionStorage.getItem('user');
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let currentUser = JSON.parse(userString);
    if (currentUser.bucks < 2000) {
      alert("You do not have enough bucks to make this purchase!");
      return
    }
    //Prompt the user for a location
    let newWeather: string | null = prompt("Type in a new weather for the database.");
    //If the trait is invalid, you will be alerted that the trait is invalid, and you'll have to type it in again.
    //For now, all the traits are valid. True will be replaced with a function to validate the traits
    while (!true) {
      newWeather = prompt(`Sorry, ${newWeather} is not a legal weather. Type in a new trait to add to the database.`);
    }
    //If the new trait is null, don't do anything.
    if (newWeather === null || newWeather === "") return;
    //Confirm that the user wants to add that trait
    let choice: boolean = confirm(`Are you sure you want to add the new location "${newWeather}"? It will cost 2000 !Bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 2000.
    this.bucksService.adjustBucks(-2000).subscribe(canAfford => {
      if (canAfford) {
        //Add the trait to the database
        if (newWeather !== null) {
          
          let product: Product = {
            productId: 0,
            seasonalId: null,
            productName: newWeather,
            productPrice: 2000, //need to change so that this number is dynamic to the cost presented
            productDescription: 'Weather',
            productDiscount: 0,
            categoryId: 4,
            category: "Weather"
          }
          this.shopService.AddProduct(product).subscribe(addedProduct => {
            this.shopService.AddUserProduct(addedProduct)?.subscribe(addedUserProduct => {
              let weather: Weather = { weatherId: 0, description: addedProduct.productName }


              this.fightService.addWeather(weather).subscribe(
                weather => { alert(`${weather.description} has been added to the database.`) },
                () => { alert(`${weather.description} could not be added`)}
              )
            })
          })
        }
      }
    })

  }

  addTrait(): void {
    let userString = sessionStorage.getItem('user');
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let currentUser = JSON.parse(userString);
    if (currentUser.bucks < 2000) {
      alert("You do not have enough bucks to make this purchase!");
      return
    }
    //Prompt the user for a trait
    let newTrait: string | null = prompt("Type in a new trait for the database.");
    //If the trait is invalid, you will be alerted that the trait is invalid, and you'll have to type it in again.
    //For now, all the traits are valid. True will be replaced with a function to validate the traits
    while (!true) {
      newTrait = prompt(`Sorry, ${newTrait} is not a legal trait. Type in a new trait to add to the database.`);
    }
    //If the new trait is null, don't do anything.
    if (newTrait === null || newTrait === "") return;
    //Confirm that the user wants to add that trait
    let choice: boolean = confirm(`Are you sure you want to add the new trait "${newTrait}"? It will cost 2000 !Bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 2000.
    this.bucksService.adjustBucks(-2000).subscribe(canAfford => {
      if (canAfford) {
        //Add the trait to the database
        if (newTrait !== null) {
          
          let product: Product = {
            productId: 0,
            seasonalId: null,
            productName: newTrait,
            productPrice: 2000, //need to change so that this number is dynamic to the cost presented
            productDescription: 'Trait',
            productDiscount: 0,
            categoryId: 1,
            category: "Trait"
          }
          this.shopService.AddProduct(product).subscribe(addedProduct => {
            this.shopService.AddUserProduct(addedProduct)?.subscribe(addedUserProduct => {
              //finally send the new trait to the character db
              //if trait ids are going to match up to shop db
             // let trait: Trait = { traitId: addedProduct.productId, description: addedProduct.productName };

              //if trait ids will be independent of each other
              let trait: Trait = { traitId: 0, description: addedProduct.productName }

              this.traitService.AddTrait(trait)
                .subscribe(
                  trait => { alert(`${trait.description} has been added to the database.`) },
                  () => { alert(`${trait.description} could not be added`)}
              );
            })
          })
        }
      }
    })

  }

  editCharacterForm(): void {
    //Prompt the user to enter in a new entity.
    let newForm: string | null = prompt("Type in the new form for your character.");
    if (newForm === null || newForm === "") return;

    //Confirm that the user wants the entity.
    let choice: boolean = confirm(`Are you sure you want your character to become a ${newForm}? It will cost 400 not bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 400.
    this.bucksService.adjustBucks(-400).subscribe(canAfford => {
      if (canAfford) {
        //Fighter's form is changed
      }
    })
  }

  editCharacterTrait() {
    //Get a list of traits
    let traitList: Observable<Trait[]> = this.traitService.TraitList();
    //Confirm that the user wants the entity.
    let choice: boolean = confirm(`Are you sure you want your character's trait to change? It will cost 200 not bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 200.
    if (this.bucksService.adjustBucks(-200)) {
      //User picks a new trait from the database for their fighter
    }
  }

  editCharacterWeapon() {
    //Confirm that the user wants the entity.
    let choice: boolean = confirm(`Are you sure you want your character's weapon to change? It will cost 100 not bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 100.
    if (this.bucksService.adjustBucks(-100)) {
      //A new weapon is randomly generated for the character.
    }
  }
}
