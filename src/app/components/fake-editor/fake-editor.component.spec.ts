import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeEditorComponent } from './fake-editor.component';

describe('FakeEditorComponent', () => {
  let component: FakeEditorComponent;
  let fixture: ComponentFixture<FakeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
