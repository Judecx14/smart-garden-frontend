import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerpotDetailsComponent } from './flowerpot-details.component';

describe('FlowerpotDetailsComponent', () => {
  let component: FlowerpotDetailsComponent;
  let fixture: ComponentFixture<FlowerpotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerpotDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerpotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
