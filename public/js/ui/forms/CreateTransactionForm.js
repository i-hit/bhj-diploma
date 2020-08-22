/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector(".accounts-select");

    if (localStorage.user && localStorage.user !== "null") {
      Account.list(User.current(), (err, response) => {
        if (response) {
          accountsSelect.innerHTML = "";
          response.data.forEach((el) => {
            accountsSelect.insertAdjacentHTML(
              "beforeend",
              `<option value="${el.id}">${el.name}</option>`
            );
          });
        } else {
          console.log("Ошибка при получении списка счетов");
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options.data, (err, response) => {
      if (response.success) {
        const modal = new Modal(this.element.closest(".modal"));
        modal.close();
        App.update();
        this.element.reset();
      }
    });
  }
}
