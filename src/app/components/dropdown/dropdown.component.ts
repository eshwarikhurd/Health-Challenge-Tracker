import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Option {
  name: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor, OnInit {
  selectedOption: Option | null = null;
  options: Option[] = [
    { name: 'Select your workout type', value: '' },
    { name: 'Cycling', value: 'Cycling' },
    { name: 'Running', value: 'Running' },
    { name: 'Walking', value: 'Walking' },
    { name: 'Swimming', value: 'Swimming' },
    { name: 'Weightlifting', value: 'Weightlifting' },
    { name: 'Yoga', value: 'Yoga' },
    { name: 'Pilates', value: 'Pilates' },
    { name: 'Dance', value: 'Dance' },
  ];
  isDropdownOpen = false;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: Option): void {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.onChange(option.value); // Notify Angular about value change
    this.onTouched();
  }

  // **ControlValueAccessor methods**
  writeValue(value: string): void {
    this.selectedOption = this.options.find(option => option.value === value) || this.options[0];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
