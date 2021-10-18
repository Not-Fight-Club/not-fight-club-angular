import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() id: string = "characterInput";
  @Input() characters: Character[] = [];
  @Input() label: string = "Character";

  @Output() selectedChar = new EventEmitter<Character | undefined>();

  ngOnInit(): void {
    if (!this.characters.length) {
      // TODO: this should probably be removed in favor of only using Input() property
      this.characterService.GetCharacters().subscribe(characters => this.characters = characters);
    }
  }

  onChange(event: any) {
    console.log(event);
    let charId = event.target.value;
    let char: Character | undefined = this.characters.find(c => c.characterId == charId);
    this.selectedChar.emit(char);
  }

}
