import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEMPageComponent } from './aem-page.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AemPageComponent', () => {
  let component: AEMPageComponent;
  let fixture: ComponentFixture<AEMPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AEMPageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AEMPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
