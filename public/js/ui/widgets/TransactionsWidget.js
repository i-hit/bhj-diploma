/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не задан в TransactionsWidget");
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * Если нет счета - то реакции нет
   * */
  registerEvents() {
    const inc = document.querySelector(".create-income-button");
    const dec = document.querySelector(".create-expense-button");

    inc.addEventListener("click", (e) => {
      if (document.querySelectorAll(".account").length) {
        e.preventDefault();
        App.getModal("newIncome").open();
      }
    });

    dec.addEventListener("click", (e) => {
      if (document.querySelectorAll(".account").length) {
        e.preventDefault();
        App.getModal("newExpense").open();
      }
    });
  }
}
