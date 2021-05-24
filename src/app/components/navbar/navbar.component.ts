import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
// import * as EventEmitter from 'events';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faSearch, faExpand, faTrash } from '@fortawesome/free-solid-svg-icons'
import { HttpClient } from '@angular/common/http';
import url from '../helper.js'
import { AfterViewInit } from '@angular/core';

type Note = { title: string, text: string, date: string, time: string, id: number }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  faEdit = faEdit;
  faSearch = faSearch;
  faExpand = faExpand;
  faTrash = faTrash;

  addingNote: boolean = false;

  @Input() isSearching: boolean = false;
  @Input() findResult: boolean = true;
  search: string = '';

  expand: boolean = true;
  Notes: Note[] = [];

  @Input() selectedNote: Note = {} as Note;
  @Output() expandEvent = new EventEmitter<boolean>();
  @Output() createEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() updateSearchEvent = new EventEmitter<any>();

  searchChanged: Subject<string> = new Subject<string>();

  expandFunc = () => {
    this.expand = !this.expand;
    this.expandEvent.emit(this.expand);
  }

  createFunc = () => {
    let daytime = new Date().getTime();
    this.http.put<any>(url + 'create?daytime=' + daytime + '&title=New Note Title ' + this.Notes.length + '&text=New Note ' + this.Notes.length + 1, {}).subscribe(
      data => {
        this.http.get<any>(url).subscribe(newdata => {
          this.Notes = newdata;
          console.log(this.Notes[this.Notes.length - 1].time + "---navbar");
          this.createEvent.emit(this.Notes)
        })
      }
    );
  }

  deleteFunc = () => {
    if (this.selectedNote.id != undefined) {
      this.http.delete(url + "delete?id=" + this.selectedNote.id).subscribe(
        data => {
          this.http.get<any>(url).subscribe(newdata => {
            this.Notes = newdata;
            if (this.Notes.length == 0) {
              console.log("all notes deleted")
            }
            else {
              console.log(this.Notes[this.Notes.length - 1].time);
            }
            this.deleteEvent.emit(this.Notes)
          })
        }
      )
    }
    else {
      console.log("deleteFun--navbar--error")
    }
  }

  newNotewithTitle = (title) => {
    if (this.search !== "" && this.findResult == false) {
      let daytime = new Date().getTime();
      this.http.put(url + 'create?daytime=' + daytime + '&title=' + title + '&text=New Note', {}).subscribe(
        data => {
          this.search = "";
          this.findResult = true;
          this.isSearching = false;
          this.http.get<any>(url).subscribe(newdata => {
            this.Notes = newdata;
            console.log(this.Notes[this.Notes.length - 1].time);
            this.createEvent.emit(this.Notes)
            this.updateSearchEvent.emit({isSearching: this.isSearching, findResult: this.findResult})
          })
        }
      )
    }
    else{
      console.log("find result || search nothing")
    }

  }

  keyPress(event: KeyboardEvent) {
    if (event.which !== 13) {
      return
    }
    else {
      console.log("pressed")
      this.newNotewithTitle(this.search);
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(url).subscribe(data => {
      this.Notes = data
      console.log(this.Notes);
    })
  }

  ngAfterViewInit(): void {
    this.searchChanged
      .pipe(
        debounceTime(200),
        distinctUntilChanged())
      .subscribe(e => {
        this.search = e;
        console.log("search");
        this.searchEvent.emit(this.search)
      })
  }






}
