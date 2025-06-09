import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemResponsivegridComponent } from '@editable-components';

describe('AemResponsivegridComponent', () => {
  let component: AemResponsivegridComponent;
  let fixture: ComponentFixture<AemResponsivegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AemResponsivegridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AemResponsivegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
