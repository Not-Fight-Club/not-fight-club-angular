import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Discount } from '../interfaces/discount';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { ProductService } from '../service/product/product.service';
import { UserService } from '../service/user/user.service';
import { SeasonTimerComponent } from '../season-timer/season-timer.component';
import { Season } from '../interfaces/season';
import { SeasonService } from '../service/season/season.service';
import { Character } from '../interfaces/character';
import { BucksService } from '../service/bucks/bucks.service';
import { WeaponService } from '../service/weapon/weapon.service';
import { CharacterService } from '../service/character/character.service';
import { Router } from '@angular/router';
import { Weapon } from '../interfaces/weapon';
import { ShopService } from '../service/shop/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];


  constructor(private productService: ProductService, private userService: UserService, private seasonService: SeasonService,
    private bucksService: BucksService, private weaponService: WeaponService, private characterService: CharacterService, private router: Router,
    private shopService: ShopService  ) { }

  locations: Product[] = [];
  weapons: Product[] = [];
  traits: Product[] = [];
  userCharacters: Character[] = [];

  characterpickerViewable: boolean = false;



  ngOnInit(): void {
    this.productService.productList().subscribe(x => {
      console.log(x);
      //put each product into a different list based on category
      x.forEach(elem => {
        if (elem.categoryId != null) {
          if (elem.categoryId == 2) {
            //add the element to the location list
            this.locations.push(elem);
          }
          else if (elem.categoryId == 1) {
            this.traits.push(elem);
          }
          else if (elem.categoryId == 5) {
            this.weapons.push(elem);
          }
        } else {
          this.products.push(elem);
        }

      })
      //this.products = x;
      console.log(`this.products`)
    });

    let userString = sessionStorage.getItem('user');
    //console.log(userString);
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let user:User = JSON.parse(userString);

    this.characterService.UserCharacterList(user.userId).subscribe(characters => this.userCharacters = characters)
  }

  buyProductButton(productId: number) {

    // get user from session

    let userString = sessionStorage.getItem('user');
    console.log(userString);
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let user = JSON.parse(userString);
    this.productService.getProductById(productId).subscribe(data => {
      console.log(data);

      this.productService.buyProduct(user.userId, data).subscribe(obj => {
        //call userService to update the bucks
        console.log(obj);
        var finalPrice = Discount(data.productDiscount, data.productPrice);

        if (userString !== null) {
          user.bucks = user.bucks - finalPrice;
        }
        window.alert(`You just bought ${data.productName} at discounted price ${finalPrice}. Total bucks remaining: ${user.bucks}`);
        this.userService.editProfile(obj.userId, user).subscribe(obj => {
          sessionStorage.setItem('user', JSON.stringify(obj));
        });
      });
    })
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

  editCharacterWeapon() {
    if (this.userCharacters.length == 0) {
      alert("You must create a character first!")
    }
    this.characterpickerViewable = true;
  }


  changeCharacterWeapon(product:Product) {

    //check if a character was selected
    if (this.character1 == undefined) {
      //always take the first character
      alert("You must pick a character first");
    
    }
    //generate a new weapon and send to the character db
    this.SubmitWeapon(product);

  }

  async SubmitWeapon(product: Product) {


    //Confirm that the user wants the entity.
    let choice: boolean = confirm(`Are you sure you want your character's weapon to change? It will cost ${product.productPrice} not bucks.`);
    if (!choice) return


    //collect payment
    this.bucksService.adjustBucks(product.productPrice).subscribe(async canAfford => {
      if (canAfford) {
        //get the weapon selected

        this.shopService.AddUserProduct(product)?.subscribe( async addedUserProduct => {
          let weapon: Weapon = { weaponId: 0, description: `${product.productName}: ${product.productDescription}` }
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
