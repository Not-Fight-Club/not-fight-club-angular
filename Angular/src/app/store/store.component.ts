import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Trait } from '../interfaces/trait';
import { BucksService } from '../service/bucks/bucks.service';
import { TraitService } from '../service/trait/trait.service';
import { User } from 'src/app/interfaces/user';
import { Product } from '../interfaces/product';
import { ShopService } from '../service/shop/shop.service';
import { Character } from '../interfaces/character';
import { CharacterService } from '../service/character/character.service';
import { WeaponService } from '../service/weapon/weapon.service';
import { Weapon } from '../interfaces/weapon';
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
  userCharacters: Character[] = [];

  constructor(private bucksService: BucksService, private traitService: TraitService,
    private router: Router, private shopService: ShopService, private characterService: CharacterService,
    private weaponService: WeaponService, private fightService: FightService) { }

  ngOnInit(): void {
    let userString: string | null = sessionStorage.getItem('user');
    if (userString !== null) {
      let userJSON = JSON.parse(userString);
      this.user = userJSON;

      //populate the characters for a specific user
      this.characterService.UserCharacterList(this.user?.userId).subscribe(
        (characters: Character[]) => {
          this.userCharacters = characters;
          console.log(this.userCharacters)
        })
     
    }
   
   
  }

  getRich(): void {
    this.bucksService.adjustBucks(2000).subscribe(canAfford => {
      if (canAfford) {
        alert("You now have 2000 more !Bucks.")
      }
    })
  }

  canAfford(): boolean {
    let userString = sessionStorage.getItem('user');
    if (userString === null) {
      alert("You are not logged in.");
      return false;
    }
    let currentUser = JSON.parse(userString);
    if (currentUser.bucks < 2000) {
      alert("You do not have enough bucks to make this purchase!");
      return false;
    }
    return true;
  }

  askForLocation(): void {
    if (!this.canAfford())
      return;
    //Prompt the user for a location
    let newLocation: string | null = prompt("Type in a new location for the database.");
    this.fightService.getLocation(newLocation)?.subscribe(x => {
      if (x != null)
        //If the location is invalid, you will be alerted that the location is invalid.
        alert(`Sorry, ${newLocation} already exists or is invalid.`)
      else {
        this.addLocation(newLocation);
      }
    });
  }

  addLocation(newLocation: string | null): void {
    //If the new location is null, don't do anything.
    if (newLocation === null || newLocation === "") return;
    //Confirm that the user wants to add that location
    let choice: boolean = confirm(`Are you sure you want to add the new location "${newLocation}"? It will cost 2000 !Bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 2000.
    this.bucksService.adjustBucks(-2000).subscribe(canAfford => {
      if (canAfford) {
        //Add the and product location to the database
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
              //finally send the new location to the fight db

              //if location ids will be independent of each other
              let location: Location = { locationId: 0, location1: addedProduct.productName }


              this.fightService.addLocation(location).subscribe(
                location => { alert(`${location.location1} has been added to the database.`) },
                () => { alert(`${location.location1} could not be added`) }
              )
            })
          })
        }
      }
    })
  }

  askForWeather(): void {
    if (!this.canAfford())
      return;
    //Prompt the user for a weather condition
    let newWeather: string | null = prompt("Type in a new weather condition for the database.");
    this.fightService.getSingleWeather(newWeather)?.subscribe(x => {
      if (x != null)
        //If the weather condition is invalid, you will be alerted that the weather is invalid.
        alert(`Sorry, ${newWeather} already exists or is invalid.`)
      else {
        this.addWeather(newWeather);
      }
    });
  }

  addWeather(newWeather: string | null): void {
    //If the new weather is null, don't do anything.
    if (newWeather === null || newWeather === "") return;
    //Confirm that the user wants to add that weather
    let choice: boolean = confirm(`Are you sure you want to add the new weather condition "${newWeather}"? It will cost 2000 !Bucks.`);
    if (!choice) return;
    //get user's bucks, and reduce by 2000.
    this.bucksService.adjustBucks(-2000).subscribe(canAfford => {
      if (canAfford) {
        //Add the weather to the database
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
                () => { alert(`${weather.description} could not be added`) }
              )
            })
          })
        }
      }
    })
  }

  askForTrait(): void {
    if (!this.canAfford())
      return;
    //Prompt the user for a trait
    let newTrait: string | null = prompt("Type in a new trait for the database.");
    //If the new trait is null, don't do anything.
    if (newTrait === null || newTrait === "") return;
    this.traitService.TraitList()?.subscribe(x => {
      let traitAlreadyExists = false;
      for (let i = 0; i < x.length; i++) {
        if (x[i].description == newTrait)
          traitAlreadyExists = true;
      }
      if (traitAlreadyExists)
        //If the trait is invalid, you will be alerted that the trait is invalid.
        alert(`Sorry, ${newTrait} already exists or is invalid.`)
      else {
        this.addTrait(newTrait);
      }
    });
  }

  addTrait(newTrait: string | null): void {

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
                  () => { alert(`${trait.description} could not be added`) }
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

  character1: Character | undefined;
  setChar1(c: Character | undefined) {
    if (c == undefined) {
      //always take the first character
      this.character1 = this.userCharacters[0];
      console.log("setchar1: ", this.character1)
    } else {
      console.log("setchar1: ", c);
      this.character1 = c;
    }
    
  }
  
  characterpickerViewable: boolean = false;
  editCharacterWeapon() {
    if (this.userCharacters.length == 0) {
      alert("You must create a character first!")
    }
    this.characterpickerViewable = true;
    //on button press toggle the component into view
  }

    //Confirm that the user wants the entity.
    //let choice: boolean = confirm(`Are you sure you want your character's weapon to change? It will cost 100 not bucks.`);
    //if (!choice) return;
    ////get user's bucks, and reduce by 100.
    //if (this.bucksService.adjustBucks(-100)) { //what does this need to be changed to Ask Simran

    //  //Allow them to select one of their characters
    //  this.characterService.get(this.user?.userId).subscribe(
    //    (characters: Character[]) => {
    //      this.userCharacters = characters;
    //    }
    //  )

      //A new weapon is randomly generated for the character.
      //pull code from character component

      //make a call to the character service to update the character
      //new code that character team should have developed


   // }
  

  changeCharacterWeapon() {
    
    //check if a character was selected
    if (this.character1 == undefined) {
      //always take the first character
      alert("You must pick a character first");
    }
     //generate a new weapon and send to the character db
    this.SubmitWeapon();

   
  }

  async SubmitWeapon() {
     //Confirm that the user wants the entity.
    let choice: boolean = confirm(`Are you sure you want your character's weapon to change? It will cost 500 not bucks.`);
    if (!choice) return;

    //collect payment
    this.bucksService.adjustBucks(-500).subscribe( async canAfford => {
      if (canAfford) {
        //get a weapon from the 3rd party api
        let OWeapon = await this.weaponService.RandomWeapon();
        OWeapon.subscribe(async item => {

          let weapon: Weapon = { weaponId: 0, description: item[0] }
          //send to the character db
          await this.weaponService.PostWeapon(weapon).subscribe(weapon => {
            //update the character with the new weapon
            if (this.character1 != undefined) {
              this.character1.weaponId = weapon.weaponId;

              this.characterService.UpdateCharacter(this.character1).subscribe(character => {
                alert(`You've updated ${character.name} to use a ${weapon.description}`)
                this.router.navigateByUrl('store') 
              })
            }



          });
        })
      }
    })

  }
}

//what to do next for editing a character's weapon
//add a button to confirm the purchase
//on confirmation run the code for
  //generating a weapon and sending the weapon to the db
//update the character with the new weapon
//display that update to the user

