# Fil & Patron

Application éducative gratuite de patronnage et de dessin technique : abaya, jilbeb,
sarouel et qamis. Prise de mesures, glossaire, calculateur, patrons pas à pas et suivi
de progression.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (thème défini dans `app/globals.css`)
- **Supabase** (authentification + progression + mesures enregistrées) — optionnel
- Bilingue **français / arabe** avec RTL, sans dépendance i18n externe

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # serveur de production
npm run typecheck
```

## Variables d'environnement

Le site est entièrement consultable **sans Supabase** (mode invité : comptes et
enregistrement désactivés). Pour activer les comptes, copiez `.env.example` en
`.env.local` et renseignez :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique (anon) Supabase |

Créez ensuite les tables et les politiques RLS avec `scripts/001_create_tables.sql`
(SQL Editor du tableau de bord Supabase).

## Bilingue FR / AR

- Le choix de langue est stocké dans le cookie `lang` (`fr` ou `ar`).
- `lib/i18n.ts` contient les dictionnaires et les utilitaires (`dirFor`, `getDictionary`).
- `lib/locale.ts` lit le cookie côté serveur (`getLocale()`).
- `components/language-switcher.tsx` bascule instantanément `lang`/`dir` sur `<html>`,
  écrit le cookie puis rafraîchit les composants serveur (`router.refresh()`).
- Les polices arabes **Cairo** (texte) et **Amiri** (titres) sont chargées via Google Fonts.

## Structure

```
app/                  routes (App Router)
components/           UI partagée (header, nav, formulaires, calculateur…)
lib/i18n.ts           dictionnaires FR / AR
lib/locale.ts         lecture du cookie de langue
lib/supabase/         clients Supabase (navigateur, serveur, proxy)
scripts/              schéma SQL Supabase
proxy.ts              middleware Next (session Supabase)
```

## Déploiement Vercel

Site en production : **https://fil-patron.vercel.app**

Le projet Vercel est relié à **ce dépôt GitHub** (`boufelligahicham-web/fil-patron`),
branche `main`, framework détecté : Next.js. Chaque `git push` sur `main` déclenche un
déploiement automatique.

1. Commande de build : `npm run build` (aucune commande d'installation spécifique, npm est
   détecté via `package-lock.json`).
2. Ajouter les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   si les comptes doivent être actifs (le site fonctionne sans, en mode invité).
