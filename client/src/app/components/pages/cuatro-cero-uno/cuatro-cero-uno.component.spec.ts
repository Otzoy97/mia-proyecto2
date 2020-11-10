import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuatroCeroUnoComponent } from './cuatro-cero-uno.component';

describe('CuatroCeroUnoComponent', () => {
  let component: CuatroCeroUnoComponent;
  let fixture: ComponentFixture<CuatroCeroUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuatroCeroUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuatroCeroUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
