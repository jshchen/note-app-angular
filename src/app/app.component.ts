import { AfterViewChecked, Component, Input, OnChanges, OnInit, Output, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpContext } from '@angular/common/http';
import url from "./components/helper.js";
import { AfterViewInit } from '@angular/core';

type Note = { title: string, text: string, date: string, time: string, id: number }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnChanges
{

  expand: boolean = true;
  title = 'note-app';
  notes: Note[] = [{ title: 'Loading', text: '', date: ' ', time: ' ', id: 0 }];
  selectedNote: Note = {} as Note;
  selectedNoteIndex = '0';
  
  search: string = '';
  findResult: boolean = true;
  isSearching: boolean = false;

  expandFunc = (expand: boolean) => {
    this.expand = expand
    console.log("expand = " + this.expand)
  }
  createFunc = (Notes: []) => {
    this.notes = Notes;
    this.selectedNote = Notes[this.notes.length - 1];
    console.log("new note created" + this.notes);
  }
  deleteFunc = (Notes: []) => {
    this.notes = Notes;
    if(this.notes.length > 0) {
      this.selectedNote = this.notes[0];
    }
    else{
      this.selectedNote = {} as Note;
    }
    console.log("note deleted: " + this.notes + "here");
  }

  searchFunc = (search) => {
    console.log("run searchFunc")
    if (search != '') {
      this.search = search
      this.isSearching = true
      this.selectedNote = {} as Note
      console.log("searching")
    }
    else {
      this.search = search
      this.isSearching = false
      console.log("not searching")
    }

    if (this.searchforresult(this.search) === false) {
      this.findResult = false
      console.log("findResult == false")
    }
    else {
      this.findResult = true
      console.log("findResult == true")
    }
  }

  searchforresult = (search) => {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i] != null) {
        if (this.notes[i].title.includes(this.search) || this.notes[i].text.includes(this.search)) {
          return true
        }
      }
    }
    return false
  }

  updateSearchFunc = (searchObj) =>{
    this.isSearching = searchObj.isSearching;
    this.findResult = searchObj.findResult;
    this.search = ''
  }

  updateFunc = (note) => {
    let tempid = this.notes.indexOf(this.selectedNote);
    this.http.get<any>(url).subscribe(data => {
      this.notes = data
      this.selectedNote = this.notes[tempid]
      console.log(tempid);
    })
  }


  selectNoteFunc = (selectNote: Note) => {
    this.selectedNote = selectNote;
    // console.log(this.selectedNote);
  }

  getNotes = () => {
    this.http.get<any>(url).subscribe(data => {
      this.notes = data
      console.log(this.notes);
    })
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getNotes();
  }

  ngOnChanges(): void {
    this.getNotes();
    if(this.isSearching == true){
      console.log("sddffgsdfgsdfg")
    }
  }
}

