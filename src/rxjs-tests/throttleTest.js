import { fromEvent, interval } from 'rxjs';
import { throttle, scan } from 'rxjs/operators';

const throttleTestContainer = document.getElementById("throttle");
const output = throttleTestContainer.querySelector(".output");

const clicks = fromEvent(output, 'click');
const result = clicks.pipe(throttle(ev => interval(5000)));
result.pipe(
    scan(l =>  l + 1, 0)
).subscribe(
    (c) => {
        output.innerHTML += `Click ${c}<br>`;
    }
)
