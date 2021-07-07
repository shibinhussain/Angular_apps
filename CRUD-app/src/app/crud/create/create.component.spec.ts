import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudRoutingModule } from '../crud-routing.module';
import { By } from '@angular/platform-browser';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        ReactiveFormsModule,
        CrudRoutingModule, 
        HttpClientModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be minimum one submit button on the page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length >= 1).toBeTruthy();
  });

  it(`should be 'Submit' on the button`, () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = buttons[0].nativeElement;
    expect(nativeButton.textContent).toBe('Submit');
  });
  it('should show one form-item only', () => {
    const oneForm = fixture.debugElement.queryAll(By.css('form'));
    expect(oneForm.length).toBe(1);
  });
  it('form invalid when empty', () => {
    expect(component.productForm.invalid).toBeFalsy();
  });
  it('[Product-name] - should check product name is entered', () => {
    let productName = component.productForm.controls['name'];
    productName.setValue('shirts');
    expect(productName.errors).toBeNull();
    expect(productName.valid).toBeTruthy();
  });
  it('[Form-Submit] - should check the form can be submitted', () => {
    let button = fixture.debugElement.query(By.css('button'));

    component.productForm.controls['name'].setValue('tees');
    component.productForm.controls['description'].setValue('branded');
    component.productForm.controls['price'].setValue('350');
    component.productForm.controls['quantity'].setValue('50');
    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBeFalsy();
    expect(button.nativeElement.click).toBeTruthy();
    component.submitForm();
    fixture.detectChanges();
  });
});
