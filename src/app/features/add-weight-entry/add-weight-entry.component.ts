import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateNativeAdapter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { WeightEntry } from 'src/app/shared/models/weight-entry';

@Component({
  selector: 'app-add-weight-entry',
  templateUrl: './add-weight-entry.component.html',
  styleUrls: ['./add-weight-entry.component.css'],
})
export class AddWeightEntryComponent implements OnInit {
  @Output() entrySubmitted = new EventEmitter<WeightEntry>();

  today: NgbDateStruct = inject(NgbCalendar).getToday();

  entryForm = this.formBuilder.group({
    entryDate: [this.today, Validators.required],
    entryWeight: [80, [Validators.required, Validators.max(700)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dateAdapter: NgbDateNativeAdapter
  ) {}

  ngOnInit() {}

  get entryDate() {
    return this.entryForm.get('entryDate');
  }

  get entryWeight() {
    return this.entryForm.get('entryWeight');
  }

  public makeEntry() {
    this.entrySubmitted.emit({
      date: this.dateAdapter
        .toModel(this.entryDate.value)
        .toISOString()
        .split('T')[0],
      weight: this.entryWeight.value,
    } as WeightEntry);
  }
}
