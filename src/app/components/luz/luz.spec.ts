import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Luz } from './luz';

describe('Luz', () => {
  let component: Luz;
  let fixture: ComponentFixture<Luz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Luz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Luz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
