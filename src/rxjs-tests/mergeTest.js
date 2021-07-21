import {fromEvent, interval, of, merge} from "rxjs";
import {map} from "rxjs/operators";

const mergeTestContainer = document.getElementById("merge");
const startButton = mergeTestContainer.querySelector(".start");
const output = mergeTestContainer.querySelector(".output");
let subscription;
fromEvent(startButton, "click").subscribe(
    (event) => {
        if (subscription) {
            subscription.unsubscribe();
            subscription = null;
            startButton.innerText = "Start";
            output.innerHTML = "";
        } else {
            let interval1 = interval(1000).pipe(map(i => i * 3));
            let interval2 = interval(1500).pipe(map(i => i * 4));
            subscription = merge(interval1, interval2).subscribe(
                (val) => {
                    output.innerHTML += `${JSON.stringify(val)}<br>`;
                }
            )
            startButton.innerText = "Stop";
        }

    }
);
