import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

function atLeastOneSelected(control: AbstractControl) {
  const arr: boolean[] = control.value;
  return arr.some((v) => v === true) ? null : { required: true };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),

    gender: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),

    hobby: new FormArray(
      [new FormControl(false), new FormControl(false), new FormControl(false)],
      [atLeastOneSelected]
    ),

    country: new FormControl<
      'india' | 'usa' | 'uk' | 'canada' | 'russia' | null
    >('india', [Validators.required]),
  });

  get isFirstNameInvalid() {
    const firstName = this.form.controls.firstName;
    return firstName.touched && firstName.invalid;
  }

  getFirstErrorMessage() {
    const firstName = this.form.controls.firstName;
    if (firstName.hasError('required')) {
      return 'firstName is required';
    }
    if (firstName.hasError('maxlength')) {
      return 'firstName cannot exceed 50 characters';
    }
    return '';
  }

  get isLastNameInvalid() {
    const lastName = this.form.controls.lastName;
    return lastName.touched && lastName.invalid;
  }

  getLastErrorMessage() {
    const lastName = this.form.controls.lastName;
    if (lastName.hasError('required')) {
      return 'Lastname is required';
    }
    if (lastName.hasError('maxlength')) {
      return 'Lastname cannot exceed 50 characters';
    }
    return '';
  }

  get isEmailInvalid() {
    const email = this.form.controls.email;
    return (email.dirty || email.touched) && email.invalid;
  }

  getEmailErrorMessage() {
    const email = this.form.controls.email;
    if (email.hasError('required')) {
      return 'Email is required';
    }
    if (email.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (email.hasError('maxlength')) {
      return 'Email cannot exceed 50 characters';
    }
    return '';
  }

  get isGenderInvalid() {
    const gender = this.form.controls.gender;
    return gender.invalid && gender.touched;
  }

  getGenderErrorMessage() {
    const gender = this.form.controls.gender;
    if (gender.hasError('required')) {
      return 'Gender is required';
    }
    return '';
  }

  get isHobbyInvalid() {
    const hobby = this.form.controls.hobby;
    return hobby.invalid && hobby.touched;
  }

  gethobbyErrorMessage() {
    const hobby = this.form.controls.hobby;
    if (hobby.hasError('required')) {
      return 'Please select at least one hobby';
    }
    return '';
  }

  get isCountryInvalid() {
    const country = this.form.controls.country;
    return country.invalid && country.touched;
  }

  getCountryErrorMessage() {
    const country = this.form.controls.country;
    if (country.hasError('required')) {
      return 'Country is required';
    }
    return '';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawData = { ...this.form.value };

    const hobbyOptions = ['chess', 'cricket', 'travel'];

    const updatedData = {
      ...rawData,
      hobby: rawData.hobby
        ?.map((selected: boolean | null, index: number) =>
          selected === true ? hobbyOptions[index] : null
        )
        .filter((hobby: string | null) => hobby !== null),
    };
    console.log('Form Data:', updatedData);

    this.form.reset();
  }
}
