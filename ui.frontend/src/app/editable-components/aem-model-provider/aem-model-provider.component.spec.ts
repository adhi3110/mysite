import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemModelProviderComponent } from '@editable-components';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AemModelProviderComponent', () => {
  let component: AemModelProviderComponent;
  let fixture: ComponentFixture<AemModelProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AemModelProviderComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AemModelProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
