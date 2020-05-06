import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSidenavComponent } from './archive-sidenav.component';

describe('ArchiveSidenavComponent', () => {
  let component: ArchiveSidenavComponent;
  let fixture: ComponentFixture<ArchiveSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
