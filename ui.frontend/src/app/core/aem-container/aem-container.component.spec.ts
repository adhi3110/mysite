import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemContainerComponent } from './aem-container.component';

describe('AemContainerComponent', () => {
  let component: AemContainerComponent;
  let fixture: ComponentFixture<AemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AemContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
