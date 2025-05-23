import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscriptionsComponent } from './form-subscriptions.component';

describe('FormSubscriptionsComponent', () => {
  let component: FormSubscriptionsComponent;
  let fixture: ComponentFixture<FormSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubscriptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
