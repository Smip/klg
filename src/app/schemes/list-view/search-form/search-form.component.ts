import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'klg-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit, OnDestroy, OnChanges {
  searchForm: FormGroup;
  @Input() value: string;
  @Output() search = new EventEmitter<{ searchString: string }>();
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      'searchString': [this.value]
    });
    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(200)
      )
      .subscribe(newValue => {
        this.search.emit(newValue);
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    if (this.searchForm && this.searchForm.value['searchString'] !== this.value) {
      this.searchForm.controls['searchString'].patchValue(this.value, {emitEvent: false});
    }
  }
}

