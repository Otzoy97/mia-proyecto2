import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CincoCeroCeroComponent } from './cinco-cero-cero.component';

describe('CincoCeroCeroComponent', () => {
  let component: CincoCeroCeroComponent;
  let fixture: ComponentFixture<CincoCeroCeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CincoCeroCeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CincoCeroCeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
