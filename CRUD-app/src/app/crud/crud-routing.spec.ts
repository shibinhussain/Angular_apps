import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { CrudRoutingModule, routes } from './crud-routing.module';
import { AppComponent } from '../app.component';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('Crud routing', () => {
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [],
      imports: [
        CrudRoutingModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;

    router.initialNavigation();
  });

  it('should test redirecion to deafult path', async () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home');
    });
  });

  it(`should navigate to "" redirects you to /home`, fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('should navigate to path when clicked on link', fakeAsync(() => {
    fixture.detectChanges();
    let links = debugElement.queryAll(By.directive(RouterLinkWithHref));
    links[1].nativeElement.click();
    tick();
    expect(location.path()).toBe('/home');
  })); //error
});
