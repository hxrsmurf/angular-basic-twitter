import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTweetsComponent } from './public-tweets.component';

describe('PublicTweetsComponent', () => {
  let component: PublicTweetsComponent;
  let fixture: ComponentFixture<PublicTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
