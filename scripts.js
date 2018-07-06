

// global variables ====================================================================================
const doc = document;

// buttons
const errorBtn = doc.querySelector('#error');
const startBtn = doc.querySelector('#start');
const stopBtn = doc.querySelector('#stop');
const submitBtn = doc.querySelector('#submit');
const clearBtn = doc.querySelector('#clear');

// job data form
const form = doc.querySelector('#job-form');
const time = doc.querySelector('.run-time')
const downTime = doc.querySelector('#dt');
const stops = doc.querySelector('#st');
const warning = doc.querySelector('#form-warning');

// job data
var t = 0;
var dt = 0;
var st = 0;
var state = 0; // 0 = idle, 1 = running, 2 = paused
var timerInt; // clock interval
var downInt; // down time clock interval


// button event listeners ==============================================================================
startBtn.addEventListener('click', function(e) {
    if( canStart() && state != 1 ) {
        startTimer();
    } else if ( state == 1 ) {
        // do nothing
    } else {
        alertFormWarning();
    }
});

stopBtn.addEventListener('click', function(e) {
    if( state == 1 ) {
        stopTimer();
    }
});

submitBtn.addEventListener('click', function(e) {    
    if( t > 0 && confirm('Are you sure you would like to submit this job?') ) {
        alert('Thank you!');
        clear();
    }
});

clearBtn.addEventListener('click', function(e) {
    if( confirm('Are you sure you want to clear this job?') ) {
        clear();
    }
});

// general functions ====================================================================================

function canStart() {
    if( form.num.value && form.cases.value && form.task.value && form.name.value ) {
        return true;
    } else {
        return false;
    }
}

// start functionality ===========================
function alertFormWarning() {
    warning.classList.add('alert-ani');

    setTimeout(() => {
        warning.classList.remove('alert-ani');
    }, 6000);
}

function startTimer() {
    timerInt = setInterval(function() {
        t++;
        setTime(time, t)
    } ,1000);
    stopDownTimer();

    state = 1;
    toggleBtns();
}

// stop functionality ===========================
function stopTimer() {
    clearInterval(timerInt);
    startDownTimer();
    incrementStops();

    state = 2;
    toggleBtns();
}

function startDownTimer() {    
    downInt = setInterval(function() {
        dt++;
        setTime(downTime, dt)
    } ,1000);
}

function incrementStops() {
    st++;
    stops.textContent = st;
}

function stopDownTimer() {
    if( state == 2 ) {
        clearInterval(downInt);
    }
}

// set time format ===================
function setTime(elem, val) {
    var m = Math.floor(val / 60);
    m = m < 10 ? '0' + m : m;
    var s = val % 60;
    s = s < 10 ? '0' + s : s;
    var fixedT = m + ':' + s;

    elem.textContent = fixedT;
}

// clear functionality ==================
function clear() {
    // clear form values
    form.num.value = "";
    form.cases.value = "";
    form.task.value = "";
    form.name.value = "";
    
    // stop all timers
    stopTimer();
    stopDownTimer();

    // reset variables
    t = 0;
    dt = 0;
    st = 0;
    state = 0

    // clear job data values
    setTime(time, t);
    setTime(downTime, dt);
    stops.textContent = 0;

    // return btns to initial state
    toggleBtns();
}

// toggle btns ====================================
function toggleBtns() {
    if ( state == 0 ) {
        stopBtn.classList.remove('btn-active-st');
        submitBtn.classList.remove('btn-active');
        clearBtn.classList.remove('btn-active');
    } else if ( state == 1 ) {
        startBtn.classList.remove('btn-active');
        stopBtn.classList.add('btn-active-st');
        submitBtn.classList.add('btn-active');
        clearBtn.classList.add('btn-active');
    } else if ( state == 2 ) {
        startBtn.classList.add('btn-active');
        stopBtn.classList.remove('btn-active-st');
        // submitBtn.classList.remove('btn-active');
        // clearBtn.classList.remove('btn-active');
    }
}