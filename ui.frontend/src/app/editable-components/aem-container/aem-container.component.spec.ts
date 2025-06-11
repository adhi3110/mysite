import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemContainerComponent } from '@editable-components';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AemContainerComponent', () => {
  let component: AemContainerComponent;
  let fixture: ComponentFixture<AemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AemContainerComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
