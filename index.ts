import {CLI} from "./CLI";
import {authenticate} from "./authentification/auth";
import { depositMoney, withdrawMoney, viewBalance, viewHistory } from "./banque/bank";

// Message de démarrage
const startupParts = [
  "   __________  ____  ___       ____  ___    _   ____ __",
  "  / ____/ __ \\/ __ \\/   |     / __ )/   |  / | / / //_/",
  " / /   / / / / / / / /| |    / __  / /| | /  |/ / ,<   ",
  "/ /___/ /_/ / /_/ / ___ |   / /_/ / ___ |/ /|  / /| |  ",
  "\\____/\\____/_____/_/  |_|  /_____/_/  |_/_/ |_/_/ |_|",
  "",
  "La banque de demain, aujourd'hui.",
  "",
];

console.log(startupParts.join("\n"));

(async () => {
  const user = await authenticate();

  const cli = new CLI([
    {
      title: "Déposer de l'argent",
      value: "deposit",
      action: () => depositMoney(user),
    },
    {
      title: "Retirer de l'argent",
      value: "withdraw",
      action: () => withdrawMoney(user),
    },
    {
      title: "Voir l'historique",
      value: "history",
      action: () => viewHistory(user),
    },
    {
      title: "Voir le solde",
      value: "balance",
      action: () => viewBalance(user),
    },
  ]);

  cli.menu();
})();