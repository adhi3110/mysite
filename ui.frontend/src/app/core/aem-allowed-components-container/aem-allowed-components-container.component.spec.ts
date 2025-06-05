import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemAllowedComponentsContainerComponent } from './aem-allowed-components-container.component';

describe('AemAllowedComponentsContainerComponent', () => {
  let component: AemAllowedComponentsContainerComponent;
  let fixture: ComponentFixture<AemAllowedComponentsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AemAllowedComponentsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AemAllowedComponentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
