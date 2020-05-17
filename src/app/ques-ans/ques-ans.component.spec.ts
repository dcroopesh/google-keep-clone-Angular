import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesAnsComponent } from './ques-ans.component';

describe('QuesAnsComponent', () => {
  let component: QuesAnsComponent;
  let fixture: ComponentFixture<QuesAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
