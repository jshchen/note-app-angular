import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fake-editor',
  templateUrl: './fake-editor.component.html',
  styleUrls: ['./fake-editor.component.css']
})
export class FakeEditorComponent implements OnInit {
  title: string = "select/create a note to start";
  text: string = "select/create a note to start";
  constructor() { }

  ngOnInit(): void {
  }

}
