# Dossier Carrousel - Flyers et Publicités

## 📁 Structure des Images

Ce dossier contient les images pour le carrousel de flyers et publicités qui s'affiche sur la page d'accueil.

### Images Requises

Ajoutez vos images avec les noms suivants (format : PNG avec transparence, ratio 16:9) :

1. **dropit-flyer.png** - Flyer principal de l'application DROP IT
2. **dropit-pro-flyer.png** - Flyer de l'application DROP IT PRO
3. **dropit-trade-flyer.png** - Flyer de l'application DROP TRADE  
4. **promo-1.png** - Première publicité promotionnelle
5. **promo-2.png** - Deuxième publicité promotionnelle

### Spécifications Recommandées

- **Format** : PNG (avec transparence si nécessaire)
- **Ratio** : 16:9 (par exemple : 1920x1080px, 1600x900px, ou 1280x720px)
- **Poids** : < 500 KB par image (optimisez pour le web avec TinyPNG ou similaire)
- **Qualité** : Haute résolution pour un affichage professionnel

### Comment Ajouter vos Images

1. Créez vos flyers et publicités avec les dimensions recommandées
2. Exportez-les en PNG
3. Renommez-les selon la liste ci-dessus
4. Placez-les dans ce dossier : `assets/images/carousel/`
5. Rafraîchissez votre navigateur - les images s'afficheront automatiquement !

### Fonctionnalités du Carrousel

- ✅ Défilement automatique toutes les 5 secondes
- ✅ Navigation manuelle avec boutons précédent/suivant
- ✅ Indicateurs cliquables en bas
- ✅ Support du swipe sur mobile
- ✅ Pause automatique au survol
- ✅ Légendes descriptives au survol
- ✅ Design responsive

### Exemple de Code

Pour modifier une image dans le HTML, trouvez la section correspondante :

```html
<div class="carousel-slide">
    <img src="assets/images/carousel/dropit-flyer.png" alt="DROP IT Flyer">
    <div class="carousel-caption">
        <h3>DROP IT - Livraison Simplifiée</h3>
        <p>Vos colis livrés en un clic</p>
    </div>
</div>
```

### Notes Importantes

- Les placeholders bleus avec icônes disparaîtront automatiquement une fois vos images ajoutées
- Vous pouvez ajouter plus de slides en dupliquant la structure HTML dans index.html
- N'oubliez pas d'ajouter un indicateur pour chaque nouvelle slide
