import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemPageComponent } from './aem-page.component';

describe('AemPageComponent', () => {
  let component: AemPageComponent;
  let fixture: ComponentFixture<AemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AemPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
