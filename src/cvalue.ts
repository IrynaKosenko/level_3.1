// objects А and В for testing function "багонутої" 
const A: any = {
    hello: { cvalue: 14 },     // test for a number
    world: {                  // test recursion, same object
        cvalue:
        {
            cvalue:
                { cvalue: '22' }
        }
    }
}
let c;
const B: any = {
    hello: { cvalue: '123ABC' },   // test for string and not a number
    world: {
        cvalue:
        {
            cvalue:
                { cvalue: c }      // test for undefined
        }
    }
}

// ... а вот и код багонутой функции:

// ...Функция должна вернуть сумму "значений" поля cvalue всех полей объекта, притом,
// - если у очередного элемента поле сvalue - это число, 
//   то просто добавляем это число.
// - если у очередного элемента поле сvalue - это строка, 
//   то просто конвертим строку в число и добавляем.
// - если у очередного элемента поле cvalue - это объект подобный корневому, 
//   то добавляем сумму его полей (привет рекурсия)
// - если мы натыкаемся на undefined, или же если cvalue был строкой которая по факту не являлась адекватным числом - 
//   то тогда значением будет 2022.

function summ(a: any) {
    const x = Object.keys(a).map((k) => {        // [hello, world]
        const elem = a[k];                       // elem = { cvalue: 1 }

        //если undefined, или же если cvalue был строкой которая по факту 
        //не являлась адекватным числом -то тогда значением будет 2022.
        if (elem === undefined
            || elem.cvalue === undefined
            || (typeof elem.cvalue === 'string' && isNaN(elem.cvalue))) {
            return 2022;
        }
        // сvalue - это строка, то просто конвертим строку в число и добавляем.
        if (typeof elem.cvalue === 'string') {
            return parseInt(elem.cvalue);
        }

        //cvalue - это объект подобный корневому, то добавляем сумму его полей (привет рекурсия)
        if (typeof elem.cvalue === 'object') {
            return summ(elem);
        }
        // сvalue - это число, то просто добавляем это число.
        return elem.cvalue;                 // на цьому рядку буква "с" була не англійського алфавіту
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {    // у назві властивості length була помилка
        sum += x[i];
    }
    return sum;
}
console.log(summ(A));
console.log(summ(B));

// 1) сложный этап. напишите нормальную тайпскриптовую сигнатуру функции 
// (отдельно опишите тип первого аргумента в виде interface)

type cvalueType = {
    cvalue: string | number | undefined | {}
}

interface InterfaceCValue {
    [key: string]: { cvalue: string | number | undefined | cvalueType } | undefined
}

const obj = { cvalue: 5 }    // объект по своей структуре/описанию подобный описываемому объекту
const obj2 = undefined;     // if undefined

// Obiect for testing
const objectCValue: InterfaceCValue = {
    print: { cvalue: { cvalue: '10ABG' } },
    hello: { cvalue: { cvalue: { cvalue: { cvalue: { cvalue: 41 } } } } },
    world: { cvalue: 66 },
    help: { cvalue: obj2 },
    start: obj2,
    open: { cvalue: { cvalue: '55 ' } },
    world1: { cvalue: { cvalue: { cvalue: '22' } } },
    world2: obj
}

function summValuesObject(newObj: InterfaceCValue): number {

    return Object.keys(newObj).map((keyObj) => {

        const elemObj = newObj[keyObj];

        if (elemObj === undefined
            || elemObj.cvalue === undefined
            || (typeof elemObj.cvalue === 'string' && isNaN(Number(elemObj.cvalue)))
        ) {
            return 2022;
        }
        if (typeof elemObj?.cvalue === 'string') {
            return parseInt(elemObj.cvalue);
        }
        if (typeof elemObj.cvalue === 'object') {
            return summ(elemObj);
        }
        return elemObj.cvalue;
    }).reduce((accum, current) => accum + current, 0)
}

console.log(summValuesObject(objectCValue));
























