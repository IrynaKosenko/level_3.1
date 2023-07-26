type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy"
}

// задача 1: создайте тип AnyButtonType, который описывает все вариации кнопок
// только без копипасты литералов, пожалуйста
type AnyButtonType = DialogButtonType | FormButton["type"]

const button: AnyButtonType = "Yes";
const button1: AnyButtonType = "No";
const button2: AnyButtonType = "Add";
const button3: AnyButtonType = "Remove";
const button4: AnyButtonType = "Buy";

// задача 2: создайте тип ConfirmationHandlingFormButton
// т.е. подтип формовых кнопок, которые ещё содержат поле onConfirm, в котором
// может лежать функция, которая вызывается с параметром типа DialogButtonType
// (и ничего не возвращает)
// Т.е. предполагается что у кнопки такого типа, если поле onConfirm пустое, 
// то при нажатии на эту кнопку сразу происходит действие
// а иначе вызывается диалог Подтверждения, и результат нажатия на кнопку Да или Нет
// в итоге попадет в функцию onConfirm, которая уже дальше решит что делать

type ConfirmationHandlingFormButton = FormButton & {
    onConfirm?: (dialogButton: DialogButtonType) => void;
};

let button5: ConfirmationHandlingFormButton = {
    type: "Add"
};
let button6 : ConfirmationHandlingFormButton = {
    type: "Remove",
    onConfirm: (button1) => {
        console.log('Using onConfirm')
    }
}

// .... НЕТ, не надо писать все эти диалоги формы кнопки,
// мы описываем чисто типы сейчас.