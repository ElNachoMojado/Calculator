//Evaluates screen to calculate result
function equal () {
    const onlyNums = [];
    const onlyOp = [];
    let num = 0;
    let counter = 0;
    let total = 0;
    for (i = 0; i < display.length; i++) {
        if (display[i] === '+' || display[i] === '-' ||
        display[i] === 'x' || display[i] === '/') {
            counter++;
            onlyOp[onlyOp.length] = display[i];
        } else if (display[i] === '=') {
            onlyNums.push(Number(num));
            total = onlyNums[0];
            for (i = 1; i < onlyNums.length; i++) {
                if (onlyOp[(i-1)] === '+') {
                    total += onlyNums[i];
                }
                if (onlyOp[(i-1)] === '-') {
                    total -= onlyNums[i];
                }
                if (onlyOp[(i-1)] === 'x') {
                    total *= onlyNums[i];
                }
                if (onlyOp[(i-1)] === '/') {
                    if (onlyNums[i] === 0) {
                        alert("I'll ignore that division by 0.");
                    } else {
                        total /= onlyNums[i];
                    }
                }
            }
            break;
        } else {
            if (counter > 0) {
                onlyNums[onlyNums.length] = Number(num);
                num = 0;
                counter = 0;
            }
            num += display[i];
        }
    }
    //Resets display so screen only shows result/total
    for (i = 0; display.length > 0;) {
        display.shift();
    }
    total = Math.round(total * 10000) / 10000;
    if (isNaN(total)) {
        total = 'ERROR';
    }
    return total;
}

const screen = document.querySelector('.screen');

//Inputs clicked numbers on screen
const dot = document.querySelector('.dot');
const numberBtns = document.querySelector('.numberBtns');
const display = [];
numberBtns.addEventListener('click', event => {
    if (event.target.nodeName === "BUTTON") {
        if (event.target.textContent === '.') {
            display.push(event.target.textContent);
            screen.textContent = display.join('');
            dot.disabled = true;
        } else {
            display.push(event.target.textContent);
            screen.textContent = display.join('');
        }
    }
});

//Inputs clicked operator on screen
const operBtns = document.querySelector('.operators');
operBtns.addEventListener('click', event => {
    if (event.target.nodeName === 'BUTTON') {
        dot.disabled = false;
        if (event.target.textContent === '???') {
            display.pop();
            screen.textContent = display.join('');
        } else if (event.target.textContent === 'AC') {
            for (i = 0; display.length > 0;) {
                display.shift();
            }
            screen.textContent = display;
        } else {
            display.push(event.target.textContent);
            screen.textContent = display.join('');
            if (event.target.textContent === '=') {
                display.push(equal());
                screen.textContent = display.join('');
            }
        }
    }
});