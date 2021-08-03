import {fromEvent, interval, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";

const switchMapContainer = document.getElementById("switchmapContainer");
const startButton = switchMapContainer.querySelector(".start");
const output = switchMapContainer.querySelector(".output");

fromEvent(startButton, "click").subscribe(
    () => {
        interval(1000).pipe(
            switchMap(
                (i) => {
                    return of(i * 2).pipe(
                        map(j => ({i, j}))
                    )
                }
            )
        ).subscribe(
            (val) => {
                output.innerHTML += `${JSON.stringify(val)}<br>`;
            }
        )
    }
)
