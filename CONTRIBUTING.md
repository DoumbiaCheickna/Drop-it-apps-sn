# Guide de Contribution

Merci de votre intérêt pour contribuer à DROP IT Apps ! 🎉

## Comment Contribuer

### Signaler un Bug 🐛

Si vous trouvez un bug, créez une issue avec :
- Une description claire du problème
- Les étapes pour reproduire le bug
- Le comportement attendu vs le comportement observé
- Des captures d'écran si possible
- Votre environnement (navigateur, OS, version)

### Proposer une Fonctionnalité 💡

Pour proposer une nouvelle fonctionnalité :
1. Vérifiez qu'elle n'existe pas déjà dans les issues
2. Créez une issue détaillant :
   - Le besoin/problème à résoudre
   - La solution proposée
   - Des alternatives envisagées
   - Des maquettes/schémas si pertinent

### Soumettre une Pull Request 🚀

1. **Fork** le repository
2. **Créez** une branche pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. **Committez** vos changements
   ```bash
   git commit -m "feat: ajout de ma fonctionnalité"
   ```
4. **Poussez** vers votre fork
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. **Ouvrez** une Pull Request

### Convention de Commits

Nous utilisons la convention [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, pas de changement de code
- `refactor:` Refactoring du code
- `perf:` Amélioration des performances
- `test:` Ajout/modification de tests
- `chore:` Tâches de maintenance

**Exemples :**
```bash
feat: ajout du système de chat en temps réel
fix: correction du bug de connexion Firebase
docs: mise à jour du README avec les nouvelles fonctionnalités
style: amélioration du design des cartes d'applications
```

## Standards de Code

### HTML
- Utiliser l'indentation de 4 espaces
- Utiliser des commentaires pour les sections importantes
- Respecter la sémantique HTML5

### CSS
- Utiliser les variables CSS pour les couleurs et tailles
- Privilégier les classes réutilisables
- Mobile-first approach
- Commentaires pour les sections complexes

### JavaScript
- Utiliser ES6+
- Documenter les fonctions avec JSDoc
- Utiliser `const` et `let`, jamais `var`
- Nommage explicite des variables et fonctions

**Exemple de documentation :**
```javascript
/**
 * Envoie un message de contact à Firebase
 * @param {string} name - Nom de l'utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} message - Message de l'utilisateur
 * @returns {Promise<boolean>} - True si envoi réussi
 */
async function sendContactMessage(name, email, message) {
    // Implementation
}
```

## Tests

Avant de soumettre une PR, assurez-vous que :
- [ ] Le code fonctionne sur tous les navigateurs principaux
- [ ] Le design est responsive (mobile, tablette, desktop)
- [ ] Les formulaires valident correctement les entrées
- [ ] Aucune erreur dans la console
- [ ] Les animations sont fluides

## Code de Conduite

### Notre Engagement

Nous nous engageons à offrir un environnement accueillant et respectueux pour tous, indépendamment :
- De l'âge
- De l'origine ethnique
- Du genre
- De l'orientation sexuelle
- Du handicap
- De la religion
- De l'expérience

### Nos Standards

**Comportements encouragés :**
- Utiliser un langage accueillant et inclusif
- Respecter les différents points de vue
- Accepter les critiques constructives
- Se concentrer sur ce qui est meilleur pour la communauté
- Faire preuve d'empathie

**Comportements inacceptables :**
- Langage ou images à caractère sexuel
- Trolling, commentaires insultants ou dérogatoires
- Harcèlement public ou privé
- Publication d'informations privées sans permission
- Toute conduite inappropriée en contexte professionnel

## Questions ?

N'hésitez pas à :
- Ouvrir une issue pour des questions générales
- Contacter les mainteneurs : cheicknadevdot@gmail.com
- Rejoindre notre communauté (lien Discord/Slack)

## Licence

En contribuant, vous acceptez que vos contributions soient sous la même [licence MIT](LICENSE) que le projet.

---

Merci de contribuer à DROP IT Apps ! 🙏
