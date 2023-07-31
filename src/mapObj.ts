// Эта функция должна принимать объект джаваскрипта
// и функцию transformer, которую нужно применить к каждому из полей того объекта, 
// ...а из результата применения функции transformer к каждому полю входящего объекта
// собрать новый объект и вернуть его.

// Так например можно будет замэппить объект типа 
// { "roma" : 5, "vasya": 2 } оценок студентов
// на функцию вроде (x) => x > 2
// чтобы получить объект 
// { "roma": true, "vasya": false } зачетов студентов

// Понятное дело для описания сигнатуры mapObject надо будет юзать
// 1) дженерики с несколькими параметрами-типами
// 2) такую штуку как Record (globalThis.Record, если быть точным ;) )


type RatingType = Record<string, number | string>;
type PassedType = Record<string, boolean>;

type FunctionType = (someArg: number | string) => boolean;    // type for function

const transformer = (value: number | string) => {
    if (typeof value === 'string') {
        value = parseInt(value);
    }
    return value > 2 ? true : false;
}

function mapObject<T extends RatingType>(obj: T, transformer: FunctionType): PassedType {
    let newObj: PassedType = {};
    // first method
    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            newObj[k] = transformer(obj[k]);
        }
    }
    // second method
    // Object.keys(obj).map(el => {
    //     let val = obj[el]
    //     let bool = transformer(val);
    //     newObj[el] = bool;
    // })
    return newObj;
}

const studentsRating: RatingType = {
    'roma': "9",
    "vasya": 2,
    "polin": 12,
    "olga": 3,
}

console.log(mapObject<RatingType>(studentsRating, transformer));