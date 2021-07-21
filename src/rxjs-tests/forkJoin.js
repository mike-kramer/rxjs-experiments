import {fromEvent, interval, of, forkJoin} from "rxjs";
import {map, take} from "rxjs/operators";

const forkJoinTestContainer = document.getElementById("forkJoin");
const startButton = forkJoinTestContainer.querySelector(".start");
const output = forkJoinTestContainer.querySelector(".output");
let subscription;
fromEvent(startButton, "click").subscribe(
    (event) => {
        if (subscription) {
            subscription.unsubscribe();
            subscription = null;
            startButton.innerText = "Start";
            output.innerHTML = "";
        } else {
            let interval1 = interval(1000).pipe(map(i => i * 3), take(3));
            let interval2 = interval(1500).pipe(map(i => i * 4), take(2));
            subscription = forkJoin(interval1, interval2).subscribe(
                (val) => {
                    output.innerHTML += `${JSON.stringify(val)}<br>`;
                }
            )
            startButton.innerText = "Stop";
        }

    }
);
