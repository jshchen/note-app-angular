import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
type Note = { title: string, text: string, date: string, time: string, id: number }

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent implements OnInit, OnChanges{
  @Input() currentNote : Note = {} as Note;
  @Input() selectedNote : Note = {} as Note;
  @Output() selectedNoteIndex = 0;
  @Output() selectNoteEvent = new EventEmitter<Note>();
  // selectedNote : Note = {} as Note;
  

  constructor() { }

  selectNoteFunc = () => {
      // this.selectedNoteIndex = index;
      // this.selectedNote = note;
      this.selectNoteEvent.emit(this.currentNote);
      // console.log("selectNoteFunc, this.currentNote.id = " + this.currentNote.id);
      // console.log("this.selectedNoteIndex = " + this.selectedNoteIndex+ "||| this.currentNote.id = " + this.currentNote.id)
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void{
    // console.log("---------sidebar item--------");
    // console.log("this.selectedNote.id: " +  this.selectedNote.id);
    // console.log("this.currentNote.id: " +  this.currentNote.id);
  }

}
