import {Component, effect, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HlmInputDirective} from "@spartan-ng/ui-input-helm";
import {HlmButtonDirective} from "@spartan-ng/ui-button-helm";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {createFormField, createFormGroup, SignalInputDirective, V} from "ng-signal-forms";
import {HlmLabelDirective} from "@spartan-ng/ui-label-helm";
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective
} from "@spartan-ng/ui-alert-helm";
import {HlmIconComponent} from "@spartan-ng/ui-icon-helm";
import {AppErrorComponent} from "./app.error.component";
import {HlmSeparatorDirective} from "@spartan-ng/ui-separator-helm";
import {BrnSeparatorComponent} from "@spartan-ng/ui-separator-brain";
import {HlmCheckboxComponent} from "@spartan-ng/ui-checkbox-helm";
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective, HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective
} from "@spartan-ng/ui-card-helm";
import {HlmSwitchComponent} from "@spartan-ng/ui-switch-helm";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    JsonPipe,
    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
    SignalInputDirective,
    HlmAlertDirective,
    HlmIconComponent,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmAlertDescriptionDirective,
    AppErrorComponent,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmButtonDirective,
    HlmCheckboxComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmCheckboxComponent,
    HlmSwitchComponent,
    HlmButtonDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    class: 'text-foreground block antialiased',
  },
})
export class AppComponent {
  protected readonlyBibNumber = signal(false);

  protected formModel = createFormGroup({
    name: createFormField('', {
      validators: [
        V.required(),
        {
          validator: V.minLength(2),
          message: ({minLength}) => `Name must be at least ${minLength} characters`,
        }
      ],
    }),
    bibNumber: createFormField<number | undefined>(4706674, {
      readOnly: () => this.readonlyBibNumber()
    }),
    shipping: createFormGroup(() => {
      const differentFromBilling = createFormField(false);
      return {
        differentFromBilling,
        street: createFormField('', {
          validators: [{
            validator: V.required(),
            disable: () => !differentFromBilling.value()
          }],
          hidden: () => !differentFromBilling.value()
        }),
        zip: createFormField('', {
          validators: [{
            validator: V.required(),
            disable: () => !differentFromBilling.value()
          }],
          hidden: () => !differentFromBilling.value()
        }),
      }
    }),
    team: createFormGroup([
      createFormField(''),
      createFormField(''),
      createFormField(''),
    ]),
  })

  private debug = effect(() => {
    console.log('value:', this.formModel.value());
    console.log('valid:', this.formModel.valid());
  })

  protected submit(): void {
    console.log({
      value: this.formModel.value(),
      valid: this.formModel.valid(),
    })
  }

  protected reset(): void {
    this.formModel.reset();
  }


  protected prefill(): void {
    this.formModel.controls.name.value.set('John Doe');
    this.formModel.controls.bibNumber.value.update(v => (v ?? 0)*10);
    this.formModel.controls.shipping.controls.differentFromBilling.value.set(true);
    this.formModel.controls.shipping.controls.street.value.set('Street');
    this.formModel.controls.shipping.controls.zip.value.set('Zip');
  }

  protected toggleReadonly(): void {
    this.readonlyBibNumber.update(v => !v)
  }
}
