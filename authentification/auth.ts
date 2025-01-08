import prompts from "prompts";
import bcrypt from "bcryptjs";

const users = [
    { id: 1, pinHash: bcrypt.hashSync("1234", 10) },
];

export async function authenticate() {
    let attempts = 0;

    while (attempts < 3) {
        const response = await prompts({
            type: "number",
            name: "pin",
            message: "Veuillez entrer votre code PIN :",
        });

        const user = users.find((u) => bcrypt.compareSync(String(response.pin), u.pinHash));

        if (user) {
            console.log("Connexion réussie !");
            return user;
        } else {
            console.log("Code PIN incorrect.");
            attempts++;
        }
    }

    return null;
}