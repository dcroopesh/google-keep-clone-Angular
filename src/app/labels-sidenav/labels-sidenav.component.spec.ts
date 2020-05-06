import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsSidenavComponent } from './labels-sidenav.component';

describe('LabelsSidenavComponent', () => {
  let component: LabelsSidenavComponent;
  let fixture: ComponentFixture<LabelsSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
