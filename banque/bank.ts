import prompts from "prompts";

interface Transaction {
    date: Date;
    type: "deposit" | "withdrawal";
    amount: number;
    balance: number;
    success: boolean;
}

let balance = 0;
const history: Transaction[] = [];

export async function depositMoney() {
    const response = await prompts({
        type: "number",
        name: "amount",
        message: "Montant à déposer :",
        validate: (value) => (value > 0 ? true : "Le montant doit être positif."),
    });

    balance += response.amount;
    history.push({
        date: new Date(),
        type: "deposit",
        amount: response.amount,
        balance,
        success: true,
    });

    console.log(`Déposé avec succès : ${response.amount}€. Nouveau solde : ${balance}€.`);
}

export async function withdrawMoney() {
    const response = await prompts({
        type: "number",
        name: "amount",
        message: "Montant à retirer :",
        validate: (value) => (value > 0 ? true : "Le montant doit être positif."),
    });

    if (response.amount > balance) {
        console.log("Fonds insuffisants.");
        history.push({
            date: new Date(),
            type: "withdrawal",
            amount: response.amount,
            balance,
            success: false,
        });
    } else {
        balance -= response.amount;
        history.push({
            date: new Date(),
            type: "withdrawal",
            amount: response.amount,
            balance,
            success: true,
        });
        console.log(`Retiré avec succès : ${response.amount}€. Nouveau solde : ${balance}€.`);
    }
}

export function viewBalance() {
    console.log(`Solde actuel : ${balance}€.`);
}

export function viewHistory() {
    console.log("Historique des transactions :");
    const recentHistory = history.slice(-10);
    recentHistory.forEach((transaction) => {
        console.log(
            `${transaction.date.toISOString()} - ${transaction.type.toUpperCase()} : ${transaction.amount}€ - Solde : ${transaction.balance}€ - ${
                transaction.success ? "Réussi" : "Échoué"
            }`
        );
    });
}