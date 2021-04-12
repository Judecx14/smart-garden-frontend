import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerpotGraphicsComponent } from './flowerpot-graphics.component';

describe('FlowerpotGraphicsComponent', () => {
  let component: FlowerpotGraphicsComponent;
  let fixture: ComponentFixture<FlowerpotGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerpotGraphicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerpotGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
