import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardDialogComponent } from './service-card-dialog.component';

describe('ServiceCardDialogComponent', () => {
  let component: ServiceCardDialogComponent;
  let fixture: ComponentFixture<ServiceCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
