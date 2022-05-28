import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopserviceDetailsComponent } from './copservice-details.component';

describe('CopserviceDetailsComponent', () => {
  let component: CopserviceDetailsComponent;
  let fixture: ComponentFixture<CopserviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopserviceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopserviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
