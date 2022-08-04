"use strict";
let a = [];
let divs;
let delay = 500;
let recursiveCalls = 0;

function wait(ms) { return new Promise(resolve => setTimeout(() => resolve(), ms)); }

function generateGraph() {
    if (numbers.checkValidity()) {
        a.splice(0, a.length);
        graph.innerHTML = "";
        a = numbers.value.split(" ").map(Number);
        a.forEach((value) => { graph.innerHTML += `<div style="height: ${value}%;">${value}</div>`; })
    }
}

function randomizeGraph() {
    a.splice(0, a.length);
    graph.innerHTML = "";
    let range = Math.round(Math.random() * 35) + 2;
    for (let i = 0; i < range; i++) {
        a[i] = Math.round(Math.random() * 90) + 10;
        graph.innerHTML += `<div style="height: ${a[i]}%;">${a[i]}</div>`;
    }
}

function sort() {
    projectName.className = "afterStart";
    inputs.style.display = "none";
    divs = document.querySelectorAll("#graph>div");
    delay = 1500 / speed.value;
    startbtn.disabled = true;
    finishbtn.disabled = false;
    graph.className = "sorting";
    b.pause();
    switch (algo.value) {
        case "bs":
            bubbleSort(a.length - 1);
            break;
        case "is":
            insertionSort(a.length - 1);
            break;
        case "ss":
            selectionSort(a.length - 1);
            break;
        case "qs":
            quickSort(0, a.length - 1);
            break;
        case "ms":
            mergeSort(0, a.length - 1);
    }
}

function sorted() {
    sbar.innerText = "Sorted!";
    projectName.className = "beforeStart";
    inputs.style.display = "block";
    startbtn.disabled = false;
    finishbtn.disabled = true;
    graph.className = "";
    b.play();
}
function swap(i1, i2) {
    let temp = a[i1];
    a[i1] = a[i2];
    a[i2] = temp;
    divs[i1].style.height = `${a[i1]}%`;
    divs[i1].innerHTML = a[i1];
    divs[i2].style.height = `${a[i2]}%`;
    divs[i2].innerHTML = a[i2];
    sbar.innerText = `swap(${a[i1]}, ${a[i2]});`;
}

async function bubbleSort(li) {
    for (let i = 0; i < li; i++) {
        divs[0].style.backgroundColor = "var(--color-4)";
        for (let j = 0; j < li - i; j++) {
            divs[j + 1].style.backgroundColor = "var(--color-4)";
            // sbar.innerText = `Comparing ${a[j]} & ${a[j + 1]}`;
            sbar.innerText = `if(${a[j]} > ${a[j + 1]}) swap();`;
            await wait(delay);
            if (a[j] > a[j + 1]) {
                swap(j, j + 1);
                await wait(delay);
            }
            divs[j].style.backgroundColor = "var(--color-2)";
        }
        divs[li - i].style.backgroundColor = "var(--color-3)";
    }
    divs[0].style.backgroundColor = "var(--color-3)";
    sbar.innerText = "Sorted!";
    sorted();
}

async function insertionSort(li) {
    for (let i = 1; i <= li; i++) {
        for (let j = i - 1; j >= 0; j--) {
            divs[j].style.backgroundColor = "var(--color-4)";
            divs[j + 1].style.backgroundColor = "var(--color-4)";
            // sbar.innerText = `Comparing ${a[j]} & ${a[j + 1]}`;
            sbar.innerText = `if(${a[j]} > ${a[j + 1]}) swap();`;
            await wait(delay);
            if (a[j] > a[j + 1]) {
                swap(j, j + 1);
                await wait(delay);
                divs[j + 1].style.backgroundColor = "var(--color-3)";
            } else break;
        }
        for (let k = 0; k <= i; k++)divs[k].style.backgroundColor = "var(--color-3)";
        await wait(delay);
    }
    sbar.innerText = "Sorted!";
    sorted();
}

async function selectionSort(li) {
    for (let i = 0; i < li; i++) {
        let min = i;
        divs[min].style.backgroundColor = "var(--color-5)";
        sbar.innerText = `min = ${a[min]}`;
        await wait(delay);
        for (let j = i + 1; j <= li; j++) {
            divs[j].style.backgroundColor = "var(--color-4)";
            await wait(delay);
            if (a[j] < a[min]) {
                divs[min].style.backgroundColor = "var(--color-2)";
                min = j;
                sbar.innerText = `min = ${a[min]}`;
                divs[min].style.backgroundColor = "var(--color-5)";
                await wait(delay);
            }
            else divs[j].style.backgroundColor = "var(--color-2)";
        }
        if (i != min) {
            divs[i].style.backgroundColor = "var(--color-7)";
            divs[min].style.backgroundColor = "var(--color-7)";
            await wait(delay);
            swap(i, min);
            divs[i].style.backgroundColor = "var(--color-3)";
            divs[min].style.backgroundColor = "var(--color-2)";
            await wait(delay);
        } else {
            divs[i].style.backgroundColor = "var(--color-3)";
            await wait(delay);
        }
    }
    divs[li].style.backgroundColor = "var(--color-3)";
    sorted();
}

async function quickSort(l, h) {
    recursiveCalls++;
    let i = l + 1, j = h;
    if (i > j) {
        divs[l].style.backgroundColor = "var(--color-3)";
        sbar.innerText = `pivot[${a[l]}] is already at its final position`;
        await wait(delay);
        //sorted();
    } else {
        divs[l].style.backgroundColor = "var(--color-4)";
        sbar.innerText = `pivot = ${a[l]};`;
        await wait(delay);
        divs[i].style.backgroundColor = "var(--color-5)";
        divs[j].style.backgroundColor = "var(--color-7)";
        sbar.innerText = `i = ${a[i]}; j = ${a[j]};`;
        await wait(delay);
        while (i <= j) {
            while (i < h && a[i] <= a[l]) {
                divs[i].style.backgroundColor = "var(--color-2)";
                sbar.innerText = "if(i <= pivot) i++;";
                i++;
                divs[i].style.backgroundColor = "var(--color-5)";
                await wait(delay);
            }
            while (j > l && a[j] >= a[l]) {
                if (i == j) divs[j].style.backgroundColor = "var(--color-5)"; else divs[j].style.backgroundColor = "var(--color-2)";
                sbar.innerText = "if(j >= pivot) j--;";
                j--;
                divs[j].style.backgroundColor = "var(--color-7)";
                await wait(delay);
            }
            if (i < j) {
                sbar.innerText = "if(i < j) swap(i, j);";
                await wait(delay);
                swap(i, j);
                await wait(delay);
            } else break;
        }
        if (l == j) {
            divs[j].style.backgroundColor = "var(--color-3)";
            divs[i].style.backgroundColor = "var(--color-2)";
            sbar.innerText = `pivot[${a[j]}] is already at its final position`;
            await wait(delay);
            await quickSort(j + 1, h);
            if (recursiveCalls == 1) sorted();
        } else {
            sbar.innerText = "if(pivot > j) swap(pivot, j);";
            await wait(delay);
            swap(l, j);
            await wait(delay);
            divs[j].style.backgroundColor = "var(--color-3)";
            divs[l].style.backgroundColor = "var(--color-2)";
            if (i != j) divs[i].style.backgroundColor = "var(--color-2)";
            await wait(delay);
            await quickSort(l, j - 1);
            if (j < h) await quickSort(j + 1, h);
            if (recursiveCalls == 1) sorted();
        }
    }
    recursiveCalls--;
}

async function mergeSort(low, high) {
    recursiveCalls++;
    if (low < high) {
        let mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        let b = [];
        let i = low;
        let j = mid + 1;
        while (i <= mid && j <= high) {
            if (a[i] < a[j]) {
                b.push(a[i]);
                i++;
            } else {
                b.push(a[j]);
                j++;
            }
        }
        while (i <= mid) {
            b.push(a[i]);
            i++;
        }
        while (j <= high) {
            b.push(a[j]);
            j++;
        }
        for (let i = low; i <= high; i++) {
            divs[i].style.backgroundColor = "var(--color-4)";
        }
        sbar.innerText = `low = ${a[low]}; high = ${a[high]};`;
        await wait(delay);
        for (let i = low; i <= high; i++) {
            a[i] = b.shift();
            divs[i].style.height = `${a[i]}%`;
            divs[i].innerHTML = a[i];
            divs[i].style.backgroundColor = "var(--color-5)";
            await wait(delay);
        }
        for (let i = low; i <= high; i++) {
            divs[i].style.backgroundColor = "var(--color-3)";
        }
        if (recursiveCalls == 1) sorted();
    }
    recursiveCalls--;
}

randomizeGraph();

var textWrapper = document.querySelector('.textani');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

let b = anime.timeline({ loop: true })
    .add({
        targets: '.textani .letter',
        iteration: 1,
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 500,
        delay: (el, i) => 150 * (i + 1)
    }).add({
        targets: '.textani',
        opacity: 0,
        duration: 200,
        easing: "easeOutExpo",
        delay: 500
    });
