import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProjectComponent } from './history-project.component';

describe('HistoryProjectComponent', () => {
  let component: HistoryProjectComponent;
  let fixture: ComponentFixture<HistoryProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
