import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForixDetailsComponent } from './forix-details.component';

describe('ForixDetailsComponent', () => {
  let component: ForixDetailsComponent;
  let fixture: ComponentFixture<ForixDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForixDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForixDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
