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
   * Если нет счетв - показать подсказку
   * */
  registerEvents() {
    const transactionsPanel = document.querySelector(".transactions-panel");
    const tooltip = document.createElement("div");
    tooltip.textContent = "Нужно создать счет";
    tooltip.classList.add("tooltip");
    let timer;

    transactionsPanel.addEventListener("click", (e) => {
      e.preventDefault();

      if (document.querySelectorAll(".account").length) {
        document.querySelector(".tooltip_active");
        tooltip.remove();

        if (e.target.closest(".create-income-button")) {
          App.getModal("newIncome").open();
        }

        if (e.target.closest(".create-expense-button")) {
          App.getModal("newExpense").open();
        }
      } else {
        if (e.target.classList.contains("tooltip_active")) return;

        clearTimeout(timer);

        tooltip.classList.add("tooltip_active");

        const elRect = e.target.closest(".btn").getBoundingClientRect();
        tooltip.setAttribute(
          "style",
          `left: ${elRect.right}px; top: ${elRect.bottom}px`
        );
        e.target.insertAdjacentElement("afterEnd", tooltip);

        timer = setTimeout(() => {
          document.querySelector(".tooltip_active");
          tooltip.classList.remove("tooltip_active");
        }, 3000);
      }
    });
  }
}
