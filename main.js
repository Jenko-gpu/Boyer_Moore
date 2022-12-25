

let start_seconds = new Date().getTime() / 1000;

let fs = require('fs');

let str = fs.readFileSync('input.txt').toString();


let raw_template = fs.readFileSync('substring.txt').toString();

function is_same(x, y) {
    for (var p = x.length - 1; p >= 0; p--) {
        if (x.charAt(p) != space_fake && y.charAt(p) != space_fake && x.charAt(p) != y.charAt(p)) {
            return false;
        }
    }
    return true;
}
let space_fake = String.fromCharCode(0);
let arr1 = new Array();
let good_suff = new Array();


let Has_an_entry = false;


for (i = 0; i < raw_template.length; i++) arr1[raw_template.charAt(i)] = i;

function find_shift(_x, _y) {
    if (is_same(_x, _y)) return "x";
    else {
        x = new String(_x); y = new String(_y);

        let j = y.length - 1;
        while (j > 0 && y.charAt(j) == x.charAt(j)) j--;

        let sh1;
        let sh2;
        if (arr1[x.charAt(j)] == undefined) sh1 = (j + 1);
        else sh1 = j - arr1[x.charAt(j)];

        sh2 = good_suff[y.length - 1 - j];

        if (0 < sh1 && sh1 <= sh2) return sh2;

        if ((0 < sh2) && (sh2 < sh1)) return sh1;

        return 1;
    }
}


let template = ' '.repeat(raw_template.length) + raw_template;


let indx = 0;
while (raw_template.charAt(raw_template.length - 1) == raw_template.charAt(raw_template.length - indx - 1)) indx++;
good_suff[0] = indx;
for (let i = 1; i < raw_template.length; i++) {
    indx = 1;
    findstr = raw_template.substr(raw_template.length - i, i);

    for (indx = 1; indx <= raw_template.length; indx++) {
        if (raw_template.charAt(raw_template.length - i - 1) != template.charAt(template.length - i - indx - 1)) {
            if (is_same(raw_template.substr(raw_template.length - i, i), template.substr(template.length - i - indx, i))) {
                break;
            }
        }
    }
    if (indx > raw_template.length) indx = raw_template.length;
    good_suff[i] = indx;
}

// console.log(good_suff);
i = 0;
while (i < str.length - raw_template.length + 1) {
    shift = find_shift(str.substr(i, raw_template.length), raw_template);

    if (shift == "x") {
        //console.log(i+1); // для вывода вхождений
        Has_an_entry = true;
        i++;
    } else
        i += shift;
}


if (Has_an_entry == false) {
    console.log(new Date().getTime() / 1000 - start_seconds)
    console.log("Not found");
}
else {
    console.log(new Date().getTime() / 1000 - start_seconds)
    console.log("Found")


}
