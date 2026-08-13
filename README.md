# Le Carnet — Site de prise de rendez-vous

Deux pages :
- `index.html` — la page que vos clients utilisent pour réserver.
- `admin.html` — votre espace pour gérer les prestations et voir les rendez-vous.

Pas de paiement en ligne dans cette version : les rendez-vous sont confirmés directement.

## Mettre le site en ligne (gratuit, ~10 minutes)

Vous avez besoin d'un endroit pour héberger ce code en permanence sur internet. La solution la plus simple et gratuite pour démarrer : **Render**.

### Étape 1 — Créer un compte GitHub (si vous n'en avez pas)
Allez sur https://github.com et créez un compte gratuit. Créez un nouveau dépôt (bouton "New repository"), puis déposez-y tous les fichiers de ce dossier (`server.js`, `package.json`, le dossier `public/`). GitHub propose un glisser-déposer directement dans le navigateur si vous ne connaissez pas Git.

### Étape 2 — Créer un compte Render
Allez sur https://render.com, inscrivez-vous gratuitement (vous pouvez vous connecter directement avec votre compte GitHub).

### Étape 3 — Déployer
1. Sur Render, cliquez sur "New" → "Web Service".
2. Reliez votre dépôt GitHub.
3. Render détecte automatiquement Node.js. Vérifiez :
   - **Build command** : `npm install`
   - **Start command** : `npm start`
4. Choisissez le plan gratuit ("Free").
5. Cliquez sur "Deploy".

Après quelques minutes, Render vous donne une adresse du type `https://le-carnet.onrender.com`. C'est votre site, en ligne, accessible par vos clients.

- Page client à partager : `https://le-carnet.onrender.com/`
- Votre espace de gestion : `https://le-carnet.onrender.com/admin.html`

### Étape 4 — Protéger votre espace de gestion (important)
Actuellement, n'importe qui connaissant l'adresse `/admin.html` peut modifier vos prestations. Avant de partager le lien client publiquement, dites-le moi : je vous ajoute un mot de passe simple sur cette page.

## Limite technique à connaître

Les rendez-vous sont stockés dans un fichier (`data.json`) sur le serveur. Sur le plan gratuit de Render, ce fichier peut être réinitialisé lors de certaines mises à jour du service. Pour un usage réel avec des clients, il vaut mieux passer à une vraie base de données (peu coûteux, je peux vous aider à le faire quand vous serez prêt à passer à l'étape suivante).

## Ajouter le paiement en ligne plus tard

Si vous voulez à nouveau intégrer un paiement (Stripe, PayPal), on pourra le rebrancher sur cette même base sans tout refaire.
