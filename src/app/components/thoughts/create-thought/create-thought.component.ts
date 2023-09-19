import { ThoughtsService } from './../../../services/thoughts/thoughts.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Thought } from 'src/app/interfaces/iThoughts';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.scss'],
})
export class CreateThoughtComponent {
  form!: FormGroup;

  constructor(
    private service: ThoughtsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  submitForm() {
    console.log(this.form.get('author')?.errors);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      author: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      model: ['', Validators.required],
    });
  }

  disableButton() {
    return this.form.valid ? 'botao' : 'botao__desabilitado';
  }
}
