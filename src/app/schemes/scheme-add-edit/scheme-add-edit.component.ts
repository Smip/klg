import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {SchemesService} from '../../shared/services/schemes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {IScheme} from '../../shared/models/scheme';
import {range} from 'lodash-es';

@Component({
  selector: 'klg-character-add-edit',
  templateUrl: './scheme-add-edit.component.html',
  styleUrls: ['./scheme-add-edit.component.scss']
})
export class SchemeAddEditComponent implements OnInit, OnDestroy {
  id: number;
  scheme: IScheme;
  destroy$ = new Subject<void>();
  schemeForm: FormGroup;
  formSending = false;
  triggers = range(1, 51).map((i) => ({id: i, name: 'trigger ' + i}));
  interimtriggers = range(1, 51).map((i) => ({id: i, name: 'interim trigger ' + i}));
  constraints = range(1, 51).map((i) => ({id: i, name: 'constraint ' + i}));
  lbmanEffectivedeadlineinfos = range(1, 51).map((i) => ({id: i, name: 'lbmanEffectivedeadlineinfo ' + i}));
  lbmanProcbasisrefs = range(1, 51).map((i) => ({id: i, name: 'lbmanProcbasisref ' + i}));

  triggerdates = [
    {
      'id': 'triggerdateLbman',
      'name': 'Lawful'
    },
    {
      'id': 'triggerdateSvcscat',
      'name': 'Service Category'
    },
    {
      'id': 'triggerdateItem',
      'name': 'Item'
    }
  ];

  constraintValueKnown = [
    {
      'id': 'constraintLbman',
      'name': 'Lawful'
    },
    {
      'id': 'constraintSvcscat',
      'name': 'Service Category'
    },
    {
      'id': 'constraintItem',
      'name': 'Item'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private _schemes: SchemesService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        tap((params) => {
          if (!!params['id'] && !isNaN(params['id'])) {
            this.id = +params['id'];
          }
        }),
        switchMap(() => this.getScheme())
      )
      .subscribe((scheme) => {

        this.schemeForm = this.getForm(scheme);
      }, (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/404', {skipLocationChange: true});
        }
      });
  }

  getForm(scheme: IScheme) {
    const triggerdate = this.triggerdates.find((item) => scheme[item.id] ? item.name : false);
    const constraintValueKnown = this.constraintValueKnown.find((item) => scheme[item.id] ? item.name : false);
    return this.fb.group({
      name: [scheme.name, [Validators.required]],
      trigger: [scheme.trigger, [Validators.required]],

      triggerdate: [
        triggerdate ? triggerdate.id : null,
        [Validators.required]
      ],

      isinterimtrigger: [scheme.isinterimtrigger],
      interimtrigger: [scheme.interimtrigger],

      constraint: [scheme.constraint, [Validators.required]],

      constraintValueKnown: [
        constraintValueKnown ? constraintValueKnown.id : null,
        [Validators.required]
      ],

      lbmanEffectivedeadlineinfo: [scheme.lbmanEffectivedeadlineinfo, [Validators.required]],
      lbmanProcbasisref: [scheme.lbmanProcbasisref],

      purma: [scheme.purma],
      nntm: [scheme.nntm],
      pdbtm: [scheme.pdbtm],
      dsart: [scheme.dsart],

      description: [scheme.description],
    });
  }

  getScheme(): Observable<IScheme> {
    if (this.id) {
      return this._schemes.getScheme({id: this.id});
    } else {
      return of({
        id: null,
        name: null,
        status: null,
        modifyBy: null,
        modifyDate: null,
        description: null,
        triggerdateLbman: null,
        triggerdateSvcscat: null,
        triggerdateItem: null,
        isinterimtrigger: null,
        constraintLbman: null,
        constraintSvcscat: null,
        constraintItem: null,
        purma: null,
        nntm: null,
        pdbtm: null,
        dsart: null,
        trigger: null,
        interimtrigger: null,
        constraint: null,
        lbmanEffectivedeadlineinfo: null,
        lbmanProcbasisref: null,
        editable: null,
      });
    }
  }


  onSubmit() {
    if (this.schemeForm.invalid) {
      this.schemeForm.markAllAsTouched();
      return;
    }
    this.formSending = true;
    const value = this.schemeForm.value;

    this.triggerdates.forEach((triggerdate) => {
      value[triggerdate.id] = value.triggerdate === triggerdate.id;
    });
    delete value.triggerdate;

    this.constraintValueKnown.forEach((constraintValue) => {
      value[constraintValue.id] = value.constraintValueKnown === constraintValue.id;
    });
    delete value.constraintValueKnown;

    if (this.id) {
      this._schemes.patchScheme(this.id, value)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          this.formSending = false;
          this.router.navigate(['/']);
        });
    } else {
      this._schemes.postScheme(value)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          this.formSending = false;
          this.router.navigate(['/']);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

