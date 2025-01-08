import prompts from 'prompts';
import { login } from './features/login';
import { deposit } from './features/deposit';


let balance = 0;
const history: any[] = [];

async function main() {
    if (!(await login())) return;

    const choices = [
        {
            title: 'Déposer de l\'argent',
            value: 'deposit',
            action: async () => (balance = await deposit(balance, history))
        },
        {
            title: 'Voir le solde',
            value: 'balance',
            action: () => console.log(`Votre solde actuel est de ${balance}€.`)
        },
        {
            title: 'Quitter',
            value: 'quit',
            action: () => process.exit(0)
        }
    ];

    while (true) {
        const response = await prompts({
            type: 'select',
            name: 'choice',
            message: 'Que voulez-vous faire ?',
            choices
        });

        const choice = choices.find((c) => c.value === response.choice);
        if (choice) await choice.action();
    }
}

main();

export default main;