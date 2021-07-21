import {fromEvent, interval, of, zip} from "rxjs";
import {map, take} from "rxjs/operators";

const zipTestContainer = document.getElementById("zip");
const startButton = zipTestContainer.querySelector(".start");
const output = zipTestContainer.querySelector(".output");
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
            subscription = zip(interval1, interval2).subscribe(
                (val) => {
                    output.innerHTML += `${JSON.stringify(val)}<br>`;
                }
            )
            startButton.innerText = "Stop";
        }

    }
);
