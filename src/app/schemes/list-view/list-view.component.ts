import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SchemesService} from '../../shared/services/schemes.service';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {merge, Observable, Subject} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {IScheme} from '../../shared/models/scheme';

@Component({
  selector: 'klg-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent implements OnInit, OnDestroy, AfterViewInit {
  total: number;
  page: number;
  limit = 10;
  schemes$: Observable<IScheme[]>;
  searchString = '';
  load$ = new Subject();
  destroy$ = new Subject<void>();
  displayedColumns = ['name', 'description', 'trigger', 'interimtrigger', 'lbmanEffectivedeadlineinfo', 'actions'];
  sort = 'id';
  direction = 'asc';

  @ViewChild(MatSort) tableSort: MatSort;

  constructor(
    private _schemes: SchemesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.schemes$ = merge(
      this.load$,
      this.route.queryParams
        .pipe(
          tap(queryParams => {
            if (!!queryParams['page'] && !isNaN(queryParams['page']) && +queryParams['page'] > 0) {
              this.page = +queryParams['page'];
            } else {
              this.page = 1;
            }
          }),
          tap(queryParams => {
            if (!!queryParams['search']) {
              this.searchString = queryParams['search'];
            } else {
              this.searchString = '';
            }
          }),
          tap(queryParams => {
            if (!!queryParams['sort']) {
              this.sort = queryParams['sort'];
            } else {
              this.sort = 'id';
            }
          }),
          tap(queryParams => {
            if (!!queryParams['direction'] && ['asc', 'desc'].includes(queryParams['direction'])) {
              this.direction = queryParams['direction'];
            } else {
              this.direction = 'asc';
            }
          })
        )
    )
      .pipe(
        switchMap(() => this._schemes.getSchemes({
          page: this.page,
          limit: this.limit,
          q: this.searchString,
          sort: this.sort,
          order: this.direction
        })),
        tap(response => {
          if (response.schemes.length === 0 && response.total > 0) {
            this.router.navigate(
              [],
              {
                relativeTo: this.route,
                queryParams: {page: this.page - 1},
                queryParamsHandling: 'merge'
              });
          }
        }),
        tap(response => this.total = response.total),
        map(response => response.schemes)
      );

  }

  ngAfterViewInit() {
    this.tableSort.sortChange
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(sort => {
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: {sort: sort.active, direction: sort.direction},
            queryParamsHandling: 'merge'
          });
      });
  }

  onPageChanged(page) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {page: page},
        queryParamsHandling: 'merge'
      });
  }

  onSearchFormChanged(searchForm) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {search: searchForm.searchString, page: 1},
        queryParamsHandling: 'merge'
      });
  }

  onDeleteScheme(id) {
    this._schemes.deleteScheme({id})
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.load$.next(true);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
