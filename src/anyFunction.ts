// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т, но возможно не со всеми полями
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1, 
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :) 
// нас интересует только ее сигнатура.

function function1<T>(arg: Partial<T>, additionalFunc: (argFunc: Partial<T>) => T): T {
    return additionalFunc(arg)
}

// Более сложный вариант:
// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т (у которого поле id: string), 
//    но возможно без поля id
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1, 
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :) 
// нас интересует только ее сигнатура.

type TypeID = {
    id?: string,
}

function function2<T extends TypeID>(arg: T, additionalFunc: (argFunc: T) => T): T {
    return arg;
}

// Последняя задача:
// Напишите сигнатуру функции, которая принимает
// - некий класс 
// - количество
// ...а возвращает массив экземпляров этого класса

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

// сделайте норм сигнатуру тут.
//НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию 

function createArrayFigure<T>(someClass: new () => T, count: number): T[] {
    let arrayFigures = []
    for (let i = 0; i < count; i++)
        arrayFigures.push(new someClass());
    return arrayFigures;
}

let a: Rectangle[] = createArrayFigure(Rectangle, 10);
let b: Circle[] = createArrayFigure(Circle, 20)

console.log(a)
console.log(b)