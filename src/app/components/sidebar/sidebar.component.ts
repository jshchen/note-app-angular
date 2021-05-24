import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
type Note = { title: string, text: string, date: string, time: string, id: number }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges{
  @Input() notes : Note[] = [];
  @Input() selectedNote : Note = {} as Note;
  @Input() search : string = '';
  @Input() isSearching : boolean = false;
  @Input() findResult : boolean = false;
  @Output() selectNoteEvent = new EventEmitter<Note>();

  selectNoteFunc = (selectNote: Note) =>{
    this.selectNoteEvent.emit(selectNote);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

  }

}
