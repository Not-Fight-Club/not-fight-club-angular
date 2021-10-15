import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../service/character/character.service';

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.css']
})
export class CharacterPickerComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  @Input() name: string = "characterInput";
  @Input() characters: Character[] = [];

  ngOnInit(): void {
    if (!this.characters.length) {
      // TODO: this should probably be removed in favor of only using Input() property
      this.characterService.GetCharacters().subscribe(characters => this.characters = characters);
    }
  }

}
