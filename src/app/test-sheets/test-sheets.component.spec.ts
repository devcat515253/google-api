import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSheetsComponent } from './test-sheets.component';

describe('TestSheetsComponent', () => {
  let component: TestSheetsComponent;
  let fixture: ComponentFixture<TestSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
