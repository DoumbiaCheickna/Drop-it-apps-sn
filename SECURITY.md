# Politique de Sécurité

## Versions Supportées

| Version | Supportée          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Signaler une Vulnérabilité

La sécurité de DROP IT Apps est une priorité. Si vous découvrez une vulnérabilité de sécurité, merci de nous en informer de manière responsable.

### Comment Signaler

**NE PAS** créer d'issue publique sur GitHub pour les vulnérabilités de sécurité.

À la place, envoyez un email à : **cheicknadevdot@gmail.com**

Incluez dans votre rapport :
- Description détaillée de la vulnérabilité
- Étapes pour reproduire le problème
- Impact potentiel
- Suggestions de correctifs si possible

### Processus de Réponse

1. **Accusé de réception** : Sous 48 heures
2. **Évaluation** : Analyse de la vulnérabilité sous 7 jours
3. **Correctif** : Développement et tests sous 30 jours
4. **Publication** : Déploiement du correctif
5. **Disclosure** : Annonce publique après le déploiement

## Bonnes Pratiques de Sécurité

### Pour les Contributeurs

- Ne jamais commiter de clés API ou credentials
- Utiliser des variables d'environnement pour les secrets
- Valider toutes les entrées utilisateur
- Échapper les données avant affichage
- Utiliser HTTPS pour toutes les communications
- Implémenter la protection CSRF
- Suivre les principes du moindre privilège

### Pour les Utilisateurs

- Gardez vos identifiants Firebase confidentiels
- Utilisez des mots de passe forts
- Activez l'authentification à deux facteurs
- Mettez à jour régulièrement les dépendances
- Surveillez les logs d'accès
- Limitez les permissions Firestore au strict minimum

## Dépendances

Nous utilisons des outils automatisés pour surveiller les vulnérabilités dans nos dépendances :
- Dependabot
- Snyk
- npm audit

## Configuration Sécurisée

### Firebase Security Rules

Exemple de règles de sécurité Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les témoignages
    match /testimonials/{testimonial} {
      allow read: if resource.data.approved == true;
      allow write: if request.auth != null;
    }
    
    // Règles pour les messages de contact
    match /contactMessages/{message} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth.token.admin == true;
    }
    
    // Règles pour les statistiques
    match /statistics/{stat} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

### Variables d'Environnement

Créez un fichier `.env` (ne jamais le commiter) :

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## Headers de Sécurité

Configuration recommandée dans `firebase.json` :

```json
{
  "headers": [
    {
      "source": "**",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

## Audits de Sécurité

Nous effectuons des audits réguliers :
- Revue de code avant chaque release
- Scan automatique des dépendances
- Tests de pénétration annuels
- Analyse statique du code

## Contact

Pour toute question de sécurité :
- Email : cheicknadevdot@gmail.com
- Téléphone : +221 77 443 57 52

---

Dernière mise à jour : Janvier 2024
