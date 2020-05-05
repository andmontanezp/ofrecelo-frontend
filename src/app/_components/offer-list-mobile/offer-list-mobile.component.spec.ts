import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListMobileComponent } from './offer-list-mobile.component';

describe('OfferListMobileComponent', () => {
  let component: OfferListMobileComponent;
  let fixture: ComponentFixture<OfferListMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferListMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
