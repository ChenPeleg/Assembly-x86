import {
  firstValueFrom,
  map,
  Observable,
  of,
  take,
  withLatestFrom,
} from "rxjs";

export const observableToPromise = <T>(
  _observable: Observable<T>
): Promise<T> =>
  firstValueFrom(
    of(0).pipe(
      withLatestFrom(_observable),
      map((tuple) => tuple[1]),
      take(1)
    )
  );
