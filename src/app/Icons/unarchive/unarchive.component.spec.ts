import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnarchiveComponent } from './unarchive.component';

describe('UnarchiveComponent', () => {
  let component: UnarchiveComponent;
  let fixture: ComponentFixture<UnarchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnarchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
