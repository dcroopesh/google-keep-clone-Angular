import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexDesignComponent } from './flex-design.component';

describe('FlexDesignComponent', () => {
  let component: FlexDesignComponent;
  let fixture: ComponentFixture<FlexDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
