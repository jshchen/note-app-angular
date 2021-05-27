import { Component, EventEmitter, DoCheck, OnChanges, OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked, Input, Output } from '@angular/core';
// import {FormsModule} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import url from '../helper.js'
// import * as EventEmitter from 'events';

type Note = { title: string, text: string, date: string, time: string, id: number }

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit, OnChanges, AfterViewInit {
  title: string = '';
  text: string = '';
  Notes: Note[] = [] as Note[]; 
  @Input() selectedNote: Note = {} as Note;
  @Output() updateEvent = new EventEmitter<any>()
  uploadedNote: Note = {} as Note;
  update: boolean = false;
  @Input() isSearching : boolean = false;
  @Input() findResult : boolean = false;
  titleChanged: Subject<string> = new Subject<string>();
  textChanged: Subject<string> = new Subject<string>();

  noteUpdate = (id, title, text) => {
    let daytime = new Date().getTime();
    this.http.put(url+'updateNote?id=' + id + '&daytime=' + daytime + '&title=' + title + '&text=' + text, {}).subscribe(
      data => {
        this.http.get<any>(url).subscribe(newdata => {
          this.Notes = newdata;
          console.log(this.Notes[this.Notes.length - 1].time + "---navbar");
          this.updateEvent.emit(this.Notes)
        })
      }
    )
  }
  isNumber(val): boolean { return typeof val === 'number'; }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.title = "Loading";
    // this.text = "Loading";
    console.log(this.selectedNote)
   }

  ngAfterViewInit(): void {
    this.titleChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe(e => {
        this.title = e;
        this.uploadedNote = this.selectedNote;
        this.uploadedNote.title = this.title;
        this.update = true;
        this.noteUpdate(this.uploadedNote.id, this.uploadedNote.title, this.uploadedNote.text)
        console.log("ngAfterViewChecked(title):" + this.uploadedNote.title);
      })

    this.textChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe(e => {
        this.text = e;
        this.uploadedNote = this.selectedNote;
        this.uploadedNote.text = this.text;
        this.update = true;
        this.noteUpdate(this.uploadedNote.id, this.uploadedNote.title, this.uploadedNote.text)
        console.log("ngAfterViewChecked(text):" + this.uploadedNote.text);
      })
  }

  ngOnChanges(): void {
    this.text = this.selectedNote.text;
    this.title = this.selectedNote.title;
  }


}
