import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Item } from './item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: Item[];
  checkedNumber: number;
  checkedItems: number[];

  checkedNumberFormArray: number;
  checkedFormArray: number[];
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.items = [];
    this.checkedItems = [];
    this.checkedNumber = 0;
    this.checkedNumberFormArray = 0;
    this.checkedFormArray = [];

    this.myForm = this.fb.group({
      entitiesForm: this.fb.array([]),
    });
  }

  get formArray(): FormArray {
    return this.myForm.get(`entitiesForm`) as FormArray;
  }

  doIncreaseItem(): void {
    this.items.push({
      Name: new Date().toString(),
      CheckedId: this.checkedNumber,
    });
    this.checkedNumber++;
  }

  doAddChecked(event, index: number): void {
    const isChecked = event.target.checked;
    const data: Item = this.items[index];
    if (isChecked) {
      this.checkedItems.push(data.CheckedId);
    } else {
      this.checkedItems = this.checkedItems.filter(
        (value) => value !== data.CheckedId
      );
    }
  }

  doRemoveItems(): void {
    this.checkedItems.forEach((value) => {
      const index = this.items.map((data) => data.CheckedId).indexOf(value);
      this.items.splice(index, 1);
    });

    this.checkedItems = [];
  }

  doRemoveItemsAll(): void {
    this.items = [];
    this.checkedItems = [];
  }

  doIncreaseFormArray(): void {
    const Entity = this.fb.group({
      Name: new Date().toString(),
      CheckedId: this.checkedNumberFormArray,
    });

    this.formArray.push(Entity);
    this.checkedNumberFormArray++;
  }

  doAddCheckedFormArray(event, index: number): void {
    const isChecked = event.target.checked;
    const formGroup = this.formArray.at(index) as FormGroup;

    const data: Item = formGroup.getRawValue();

    if (isChecked) {
      this.checkedFormArray.push(data.CheckedId);
    } else {
      this.checkedFormArray = this.checkedFormArray.filter(
        (value) => value !== data.CheckedId
      );
    }
  }

  doRemoveFormArray(): void {
    const items: Item[] = this.formArray.getRawValue();
    console.log(items);
    this.checkedFormArray.forEach((value) => {
      const index = this.formArray.controls
        .map((data) => data.get(`CheckedId`).value)
        .indexOf(value);
      this.formArray.removeAt(index);
    });

    this.checkedFormArray = [];
  }

  removeAllFomArray(): void {
    while (this.formArray.length) {
      this.formArray.removeAt(0);
    }

    this.checkedFormArray = [];
  }
}
