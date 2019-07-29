import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrextorComponent } from './grextor.component';

describe('GrextorComponent', () => {
  let component: GrextorComponent;
  let fixture: ComponentFixture<GrextorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrextorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrextorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
