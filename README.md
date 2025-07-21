# 🏗️ Revit Récap – Cours de Modélisation BIM pour Étudiants

Un site web statique moderne pour réviser les cours de modélisation BIM avec Autodesk Revit.

## 📋 Description

Ce site web a été créé pour permettre aux étudiants de retrouver rapidement les points essentiels abordés lors des séances de formation Revit. Il offre une interface épurée et moderne avec une navigation fluide entre les différentes séances.

## ✨ Fonctionnalités

- **Interface responsive** : Optimisé pour mobile, tablette et desktop
- **Navigation par accordéons** : Affichage/masquage du contenu de chaque séance
- **Navigation par dates** : Boutons pour accéder directement à une séance
- **Design moderne** : Utilisation des couleurs Autodesk (#0057B8) et de la police Poppins
- **Animations fluides** : Transitions et effets visuels agréables
- **Raccourcis clavier** : Navigation avec les flèches et Échap
- **Barre de progression** : Indicateur visuel du scroll
- **Lien WhatsApp** : Contact direct avec le formateur

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique et accessible
- **CSS3** : Design responsive avec Flexbox et Grid
- **JavaScript Vanilla** : Interactivité et animations
- **Google Fonts** : Police Poppins pour une typographie moderne

## 📁 Structure du projet

```
revit-iat/
├── index.html          # Page principale
├── style.css           # Feuille de style
├── script.js           # JavaScript pour l'interactivité
├── assets/             # Dossier pour les médias futurs
└── README.md           # Documentation du projet
```

## 🎨 Design

### Couleurs principales
- **Bleu Autodesk** : `#0057B8` (couleur principale)
- **Bleu ciel** : `#0078D4` (dégradés)
- **Gris clair** : `#f8f9fa` (arrière-plan)
- **Blanc** : `#ffffff` (cartes et contenu)

### Typographie
- **Police principale** : Poppins (Google Fonts)
- **Tailles** : 300, 400, 500, 600, 700

## 📚 Contenu des séances

### Séance 1 - 12 Juillet
**Installation des logiciels**
- Installation de Revit 2018 version étudiante
- Configuration de l'environnement Autodesk
- Vérification des performances PC

### Séance 2 - 19 Juillet
**Présentation de l'interface utilisateur**
- Les 10 composants principaux de l'interface Revit
- Personnalisation de l'interface

### Séance 3 - 20 Juillet
**Paramétrage des niveaux et premiers éléments**
- Création des niveaux (RDC, R+1, etc.)
- Placement des éléments structuraux
- Lignes de construction

### Séance 4 - 21 Juillet
**Modélisation complète 3D de la structure**
- Construction de la structure visible en 3D
- Outils copier, miroir, aligner
- Vue axonométrique et ombrée

## 🚀 Installation et utilisation

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans un navigateur web
3. **Naviguer** entre les séances en utilisant :
   - Les boutons de dates en haut
   - Les accordéons pour chaque séance
   - Les raccourcis clavier (flèches gauche/droite)

## ⌨️ Raccourcis clavier

- **Flèche gauche** : Séance précédente
- **Flèche droite** : Séance suivante
- **Échap** : Fermer tous les accordéons

## 📱 Responsive Design

Le site s'adapte automatiquement à tous les écrans :
- **Desktop** : Affichage complet avec navigation latérale
- **Tablette** : Adaptation des cartes et boutons
- **Mobile** : Navigation verticale optimisée

## 🔧 Personnalisation

### Ajouter une nouvelle séance

1. Ajouter un bouton dans la navigation des dates :
```html
<button class="date-btn" data-session="session-5">25 Juillet</button>
```

2. Créer la section correspondante :
```html
<section id="session-5" class="session-card">
    <!-- Contenu de la séance -->
</section>
```

### Modifier les couleurs

Éditer les variables CSS dans `style.css` :
```css
:root {
    --primary-color: #0057B8;
    --secondary-color: #0078D4;
    --background-color: #f8f9fa;
}
```

## 📞 Contact

**Formateur** : Issoufou Abdou Chefou  
**Rôle** : Formateur Revit & Ingénieur Civil  
**WhatsApp** : [+227 96 38 08 77](https://wa.me/22796380877)

## 🌐 Déploiement

### GitHub Pages
1. Créer un repository GitHub
2. Pousser le code
3. Activer GitHub Pages dans les paramètres

### Netlify
1. Connecter le repository GitHub
2. Déployer automatiquement
3. Obtenir l'URL publique

## 📄 Licence

© 2025 – Tous droits réservés - Issoufou Abdou Chefou

## 🔄 Mises à jour futures

- [ ] Ajout de captures d'écran pour chaque séance
- [ ] Intégration de vidéos explicatives
- [ ] Système de recherche par mot-clé
- [ ] Mode sombre activé par défaut
- [ ] Export PDF des séances
- [ ] Système de favoris pour les étudiants

---

**Développé avec ❤️ pour les étudiants en BIM** 