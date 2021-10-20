import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { CharacterWithTraitandWeapon } from '../interfaces/characterWithTraitandWeapon';
import { User } from '../interfaces/user';
import { CharacterService } from '../service/character/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

@Input() charactersList: CharacterWithTraitandWeapon[] = [];

  constructor(private characterService: CharacterService) { }

 

  static id: number = 0;
  paginationName: string = "character-list-pagination-" + CharacterListComponent.id;
  totalRecords: number = this.charactersList.length;
  page: number = 1;
  maxSize: number = 2;

  ngOnInit(): void {
    CharacterListComponent.id += 1;
  //  //get the userId from session storage
  //  let userString = sessionStorage.getItem('user');
  //  if (userString != null) {
  //    let user: User = JSON.parse(userString)
  //     //get the users characters
  //    this.characterService.UserCharacterList(user.userId).subscribe(userCharacters => this.userCharacters = userCharacters);
  //  }
  //  //get all the characters in the db
  //  this.characterService.GetCharacters().subscribe(characters => this.characters = characters);
    
   
  }

}
