import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauClient } from './nouveau-client';

describe('NouveauClient', () => {
  let component: NouveauClient;
  let fixture: ComponentFixture<NouveauClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
