const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "виберіть дію")
  .option("-i, --id <type>", "ідентифікатор користувача")
  .option("-n, --name <type>", "ім'я користувача")
  .option("-e, --email <type>", "електронна пошта користувача")
  .option("-p, --phone <type>", "номер телефону користувача");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  const contacts = require("./contacts");

  switch (action) {
    case "list":
      contacts.listContacts().then((data) => console.table(data));
      break;

    case "get":
      contacts.getContactById(id).then((contact) => {
        if (contact) {
          console.log("Знайдено контакт:");
          console.table(contact);
        } else {
          console.log("Контакт не знайдено");
        }
      });
      break;

    case "add":
      contacts.addContact(name, email, phone).then((newContact) => {
        console.log("Додано новий контакт:");
        console.table(newContact);
      });
      break;

    case "remove":
      contacts.removeContact(id).then((removedContact) => {
        if (removedContact) {
          console.log("Видалено контакт:");
          console.table(removedContact);
        } else {
          console.log("Контакт не знайдено");
        }
      });
      break;

    default:
      console.warn("\x1B[31m Невідомий тип дії!");
  }
}

invokeAction(argv);
