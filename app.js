const inputs = document.querySelectorAll("#ageCalculatorApp .col-input input");
const inputDay = document.querySelector("#ageCalculatorApp .col-input #day");
const inputMonth = document.querySelector("#ageCalculatorApp .col-input #month");
const inputYear = document.querySelector("#ageCalculatorApp .col-input #year");
const calculateButton = document.querySelector("#ageCalculatorApp .calculate-button");


calculateButton.addEventListener("click", () => {
    let valid = 0;
    inputs.forEach(function (input) {
        if (input.value == "") {
            input.closest(".col-input").querySelector("span").textContent = "This field is required";
            addClassActive(input);
        } else {
            removeClassActive(input);

            if (parseInt(input.value) > parseInt(input.getAttribute("max")) || input.value <= 0) {
                input.closest(".col-input").querySelector("span").textContent = "Must be a valid date";
                addClassActive(input);
                valid--;
            }
            valid++;
        }
    })

    if (valid === inputs.length) {
        calculateAge(inputDay, inputMonth, inputYear);
    } else {
        reset();
    }
})

function addClassActive(input) {
    input.closest(".col-input").querySelector("label").classList.add("active");
    input.closest(".col-input").querySelector("input").classList.add("active");
    input.closest(".col-input").querySelector("span").classList.add("active");
}
function removeClassActive(input) {
    input.closest(".col-input").querySelector("label").classList.remove("active");
    input.closest(".col-input").querySelector("input").classList.remove("active");
    input.closest(".col-input").querySelector("span").classList.remove("active");
}

function calculateAge(day, month, year) {
    const resultYear = document.querySelector("#ageCalculatorApp .year-col span");
    const resultMonth = document.querySelector("#ageCalculatorApp .month-col span");
    const resultDay = document.querySelector("#ageCalculatorApp .day-col span");

    let date = new Date();
    let currentDay = 1 + date.getDay();
    let currentMonth = 1 + date.getMonth();
    let currentYear = date.getFullYear();
    let monthdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day.value > currentDay) {
        currentDay += monthdays[currentMonth - 2];
        currentMonth -= 1;
    }
    if (month.value > currentMonth) {
        currentMonth += 12;
        currentYear -= 1;
    }

    let calcDay = currentDay - day.value;
    let calcMonth = currentMonth - month.value;
    let calcYear = currentYear - year.value;

    resultYear.textContent = calcYear;
    resultMonth.textContent = calcMonth;
    resultDay.textContent = calcDay;
}

function reset() {
    const resultYear = document.querySelector("#ageCalculatorApp .year-col span");
    const resultMonth = document.querySelector("#ageCalculatorApp .month-col span");
    const resultDay = document.querySelector("#ageCalculatorApp .day-col span");
    resultYear.textContent = "- -";
    resultMonth.textContent = "- -";
    resultDay.textContent = "- -";
}
