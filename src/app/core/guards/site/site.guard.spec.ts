import { TestBed, async, inject } from '@angular/core/testing';

import { SiteGuard } from './site.guard';

describe('SiteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteGuard]
    });
  });

  it('should ...', inject([SiteGuard], (guard: SiteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
