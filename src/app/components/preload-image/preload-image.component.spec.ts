import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadImageComponent } from './preload-image.component';

describe('PreloadImageComponent', () => {
  let component: PreloadImageComponent;
  let fixture: ComponentFixture<PreloadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
