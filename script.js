// Global Vars.
let input1 = 0;
let input2 = 0;
let oper = (a, b) => {
    return 0;
};
let defaultDisplayFlag = 0;
let equalFlag = 0;
let opFlag = 0;

function addEventListeners() {
    const calcMainDisplay = document.querySelector(".curr-num");
    const calcExprDisplay = document.querySelector(".curr-expr");
    const bt_ac = document.querySelector(".bt-ac");
    const bt_bksp = document.querySelector(".bt-bksp");
    const bt_eq = document.querySelector(".bt-eq");
    const numpadList = document.querySelectorAll(".numpad");
    const operList = document.querySelectorAll(".bt-oper");

    numpadList.forEach((elem) => {
        elem.addEventListener("click", (ev) => {
            if (defaultDisplayFlag <= 0) {
                calcMainDisplay.textContent = "";
                if (defaultDisplayFlag === -1) {
                    calcExprDisplay.textContent = "";
                    equalFlag = 0;
                }
                defaultDisplayFlag = 1;
            }
            if (calcMainDisplay.textContent.length < 7)
                calcMainDisplay.textContent += ev.target.textContent;
        });
    });

    operList.forEach((elem) => {
        elem.addEventListener("click", (ev) => {
            if (equalFlag === 0 && opFlag === 0 && defaultDisplayFlag !== 0) {
                input1 = parseInt(calcMainDisplay.textContent, 10);
                calcMainDisplay.textContent = ev.target.textContent;
                calcExprDisplay.textContent += (input1.toString() + ev.target.textContent);
                switch (ev.target.textContent) {
                    case "+":
                        oper = (a, b) => {
                            return a+b;
                        };
                        break;

                    case "-":
                        oper = (a, b) => {
                            return a-b;
                        }
                        break;

                    case "×":
                        oper = (a, b) => {
                            return a*b;
                        }
                        break;

                    case "÷":
                        oper = (a, b) => {
                            return (a/b).toFixed(4);
                        }
                        break;
                }
                defaultDisplayFlag = 0;
                opFlag = 1;
            }
        });
    });

    bt_eq.addEventListener("click", (ev) => {
        if (equalFlag === 0 && defaultDisplayFlag === 1 && calcExprDisplay.textContent !== "") {
            input2 = parseInt(calcMainDisplay.textContent, 10);
            calcMainDisplay.textContent = "";
            let res = oper(input1, input2);
            calcMainDisplay.textContent = res;
            calcExprDisplay.textContent += (input2.toString() + ev.target.textContent + res);
            equalFlag = 1;
            defaultDisplayFlag = -1;
            opFlag = 0;
        }
    });

    bt_ac.addEventListener("click", (ev) => {
        calcMainDisplay.textContent = "0";
        calcExprDisplay.textContent = "";
        defaultDisplayFlag = 0;
        equalFlag = 0;
        opFlag = 0;
    });

    bt_bksp.addEventListener("click", (ev) => {
        if (equalFlag === 0) {
            calcMainDisplay.textContent = calcMainDisplay.textContent.slice(0, calcMainDisplay.textContent.length-1);
        }
    });
}

addEventListeners();