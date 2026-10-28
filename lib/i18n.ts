/**
 * Traductions FR / AR sans dépendance externe.
 *
 * Ce module est volontairement « pur » (aucun import de `next/headers`) pour
 * pouvoir être utilisé aussi bien dans les composants serveur que dans les
 * composants client. La lecture du cookie se fait dans `lib/locale.ts`.
 */

export const LOCALES = ['fr', 'ar'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'fr'
export const LOCALE_COOKIE = 'lang'

export function isLocale(value: unknown): value is Locale {
  return value === 'fr' || value === 'ar'
}

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

export function htmlLang(locale: Locale) {
  return locale === 'ar' ? 'ar' : 'fr'
}

export function dateLocale(locale: Locale) {
  return locale === 'ar' ? 'ar-MA' : 'fr-FR'
}

export type PatternSlug = 'abaya' | 'jilbeb' | 'sarouel' | 'qamis'

const fr = {
  localeName: 'Français',
  brand: 'Fil & Patron',
  meta: {
    title: 'Fil & Patron — Apprendre le patronnage traditionnel',
    template: '%s · Fil & Patron',
    description:
      'Application éducative gratuite de patronnage et de dessin technique : abaya, jilbeb, sarouel et qamis. Prise de mesures, glossaire, calculateur et suivi de progression.',
    pages: {
      mesures: {
        title: 'Guide de prise de mesures',
        description:
          'Apprenez à prendre les tours, hauteurs et longueurs, et à choisir les bonnes valeurs d’aisance.',
      },
      glossaire: {
        title: 'Glossaire technique',
        description:
          'Glossaire interactif des termes de couture et de patronnage : droit-fil, pinces, marges, fourche, gousset…',
      },
      emmanchure: {
        title: 'Leçon de maître : l’emmanchure',
        description:
          'Construire l’emmanchure de base au millimètre : géométrie du tracé, angles, courbe à la règle japonaise, gestes d’atelier et comportement des tissus.',
      },
      patrons: {
        title: 'Les patrons de base',
        description:
          'Abaya, jilbeb, sarouel et qamis : schémas techniques et étapes de construction détaillées.',
      },
      calculateur: {
        title: 'Calculateur de mensurations',
        description:
          'Entrez vos mesures et obtenez instantanément les valeurs de construction de chaque patron.',
      },
      dashboard: { title: 'Ma progression' },
      login: { title: 'Connexion' },
      signup: { title: 'Inscription' },
      authError: { title: 'Erreur d’authentification' },
      signupSuccess: { title: 'Vérifiez votre e-mail' },
    },
  },
  notFound: {
    title: 'Page introuvable',
    text: 'Cette page n’existe pas ou a été déplacée.',
    back: 'Retour à l’accueil',
  },
  a11y: {
    skip: 'Aller au contenu principal',
    mainNav: 'Navigation principale',
    footerNav: 'Liens de pied de page',
    breadcrumb: 'Fil d’Ariane',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    language: 'Changer de langue',
  },
  language: {
    label: 'Langue',
    fr: 'Français',
    ar: 'العربية',
    frShort: 'FR',
    arShort: 'AR',
  },
  nav: {
    mesures: 'Mesures',
    glossaire: 'Glossaire',
    emmanchure: 'Leçon',
    patrons: 'Patrons',
    calculateur: 'Calculateur',
    dashboard: 'Ma progression',
    signIn: 'Se connecter',
    signUp: 'Créer un compte',
    signOut: 'Se déconnecter',
  },
  footer: {
    tagline: 'Fil & Patron — un atelier gratuit pour apprendre à son rythme.',
    mesures: 'Prise de mesures',
    emmanchure: 'Leçon d’emmanchure',
    patrons: 'Patrons',
    calculateur: 'Calculateur',
  },
  home: {
    badge: 'Gratuit · Pour débutants et curieux',
    title: 'Apprenez le patronnage traditionnel, un trait à la fois.',
    intro:
      'Abaya, jilbeb, sarouel et qamis : comprenez chaque ligne de vos patrons grâce à des cours bienveillants, des schémas techniques et un calculateur qui s’adapte à votre corps.',
    ctaStart: 'Commencer le cours',
    ctaPatterns: 'Voir les patrons',
    imageAlt:
      'Table d’atelier avec papier à patron tracé au crayon, mètre ruban, craie et règle japonaise',
    modulesTitle: 'Un parcours en quatre temps',
    modulesIntro:
      'Suivez l’ordre proposé ou piochez librement : votre progression est enregistrée.',
    modules: [
      {
        title: 'Prendre ses mesures',
        text: 'Tours, hauteurs et valeurs d’aisance expliqués pas à pas, avec les erreurs à éviter.',
      },
      {
        title: 'Glossaire technique',
        text: 'Droit-fil, pinces, marges, fourche… les mots de l’atelier, enfin clairs.',
      },
      {
        title: '4 patrons de base',
        text: 'Schémas techniques et étapes de construction détaillées, calculés sur vos mesures.',
      },
      {
        title: 'Calculateur',
        text: 'Entrez vos mensurations : chaque repère du patron est calculé pour vous.',
      },
    ],
    patternsTitle: 'Les patrons de base',
    stepsCount: (n: number) => `${n} étapes de construction`,
    dashboardTitle: 'Votre carnet d’atelier personnel',
    dashboardText:
      'Créez un compte gratuit pour enregistrer vos mensurations, obtenir des patrons calculés à votre taille et cocher chaque étape terminée.',
    dashboardCta: 'Créer mon compte',
    masterclass: {
      badge: 'Atelier virtuel guidé',
      title: 'Le tracé de l’emmanchure de base',
      text: 'De l’acromion au creux axillaire : la géométrie, le geste et la matière, expliqués au millimètre.',
      meta: 'Leçon de maître · 18 min',
      cta: 'Ouvrir la leçon',
    },
  },
  pages: {
    mesures: {
      eyebrow: 'Cours théorique · Module 1',
      title: 'Guide de prise de mesures',
      intro:
        'Un patron juste commence par des mesures justes. Prenez votre temps : cette étape compte plus que toutes les autres.',
      beforeTitle: 'Avant de commencer',
      rules: [
        'Portez des vêtements fins et près du corps, ou mesurez sur les sous-vêtements.',
        'Tenez-vous droit·e, pieds joints, bras détendus. Demandez de l’aide pour le dos.',
        'Le ruban se pose sans serrer : un doigt doit pouvoir glisser dessous.',
        'Prenez chaque mesure deux fois et notez la moyenne, avec la date.',
      ],
      note:
        'Il n’y a pas de « bonnes » ou de « mauvaises » mesures : il n’y a que les vôtres. Le patron s’adapte à votre corps, jamais l’inverse.',
      imageAlt:
        'Mannequin de couture avec un mètre ruban placé horizontalement autour de la poitrine',
      toursTitle: 'Les tours',
      toursIntro:
        'Mesures horizontales, prises en faisant le tour du corps. Le ruban reste parallèle au sol.',
      hauteursTitle: 'Les hauteurs et longueurs',
      hauteursIntro:
        'Mesures verticales ou de largeur, prises debout, en suivant le corps sans tirer.',
      easeTitle: 'Les valeurs d’aisance',
      easeIntro:
        'L’aisance est la différence entre la mesure du corps et la mesure du vêtement fini. Les vêtements traditionnels sont amples : leur aisance est généreuse et fait partie de leur identité.',
      easeCaption: 'Valeurs d’aisance recommandées par vêtement',
      easeColumns: {
        garment: 'Vêtement',
        zone: 'Zone',
        total: 'Aisance totale',
        why: 'Pourquoi',
      },
      easeNote:
        'Pourquoi divise-t-on par 4 ? Le patron représente un quart du corps (moitié devant ou moitié dos). Une aisance de 16 cm devient donc +4 cm sur le patron.',
      finishedTitle: 'Vous avez terminé ce module ?',
      finishedBefore: 'Reportez vos mesures dans le ',
      finishedLink: 'calculateur',
      finishedAfter: ', puis découvrez le glossaire.',
    },
    glossaire: {
      eyebrow: 'Cours théorique · Module 2',
      title: 'Glossaire technique',
      intro:
        'Les mots de l’atelier, expliqués simplement. Recherchez un terme ou filtrez par thème, puis ouvrez une fiche pour approfondir.',
      doneTitle: 'Vocabulaire maîtrisé ?',
    },
    emmanchure: {
      back: 'Tous les cours',
      title: 'Leçon d’emmanchure',
      start: 'Commencer le tracé',
      memo: 'Repère d’atelier',
      memoText:
        'Une emmanchure se mesure au ruban posé sur chant, jamais à plat. La craie marque la coupe, le fil de bâti marque la couture.',
      progress: 'Votre progression',
    },
    patrons: {
      eyebrow: 'Pratique',
      title: 'Les patrons de base',
      intro:
        'Quatre vêtements, quatre apprentissages. Commencez par l’abaya si c’est votre premier patron.',
      previewTitle: (name: string) => `Aperçu du patron ${name}`,
      previewDescription: (pieces: string) => `Pièces : ${pieces}.`,
      open: 'Ouvrir le patron',
      doneSteps: (done: number, total: number) => `${done} / ${total} étapes terminées`,
      stepsTotal: (total: number) => `${total} étapes`,
    },
    calculateur: {
      eyebrow: 'Outil interactif',
      title: 'Calculateur de mensurations',
      intro:
        'Saisissez vos mesures en centimètres. Les valeurs de construction se recalculent à chaque modification, patron par patron.',
    },
    dashboard: {
      eyebrow: 'Carnet d’atelier',
      title: 'Ma progression',
      intro: 'Chaque étape cochée est un pas de plus. Avancez à votre rythme.',
      global: 'Progression globale',
      globalLabel: 'Progression globale',
      doneOf: (done: number, total: number) => `${done} éléments terminés sur ${total}`,
      next: 'Prochaine étape suggérée : ',
      allDone: 'Vous avez tout terminé. Félicitations !',
      noMeasures: 'Vous n’avez pas encore enregistré vos mesures. ',
      openCalculator: 'Ouvrir le calculateur',
      courses: 'Cours théoriques',
      patterns: 'Patrons',
      done: 'Terminé',
      todo: 'À faire',
      progressLabel: (name: string) => `Progression ${name}`,
    },
    pattern: {
      breadcrumb: 'Tous les patrons',
      savedMeasurements: 'Ce patron est calculé avec vos mesures enregistrées.',
      sampleMeasurements:
        'Ce patron est calculé avec des mesures d’exemple (taille 38-40). Enregistrez les vôtres pour le personnaliser.',
      editMeasures: 'Modifier mes mesures',
      enterMeasures: 'Saisir mes mesures',
      schema: 'Schéma technique',
      schemaTitle: (name: string) => `Schéma technique du patron ${name}`,
      schemaDescription: (pieces: string) =>
        `Pièces du patron, tracées à l’échelle sans marges : ${pieces}. Les points lettrés correspondent aux étapes de construction ci-dessous.`,
      steps: 'Étapes de construction',
      values: 'Valeurs calculées',
      valuesCaption: (name: string) => `Valeurs de construction du patron ${name}`,
      fabric: (m: string) => `Métrage estimé : ${m} m (laize 140 cm), marges comprises.`,
      usedMeasurements: 'Mesures utilisées',
    },
    auth: {
      loginTitle: 'Bon retour à l’atelier',
      loginIntro: 'Connectez-vous pour retrouver votre progression et vos mesures.',
      signupTitle: 'Créer votre compte',
      signupIntro: 'Gratuit, sans engagement. Votre progression sera enregistrée.',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      passwordHint: 'Au moins 8 caractères.',
      submitLogin: 'Se connecter',
      submitSignup: 'Créer mon compte',
      pending: 'Un instant…',
      noAccount: 'Pas encore de compte ? ',
      hasAccount: 'Déjà inscrit·e ? ',
      errorTitle: 'Le lien n’a pas fonctionné',
      errorText:
        'Il a peut-être expiré ou déjà été utilisé. Pas d’inquiétude : essayez simplement de vous connecter à nouveau.',
      backToLogin: 'Retour à la connexion',
      successTitle: 'Plus qu’une petite étape',
      successText:
        'Nous vous avons envoyé un e-mail de confirmation. Cliquez sur le lien qu’il contient pour activer votre compte, puis revenez vous connecter.',
      goToLogin: 'Aller à la connexion',
      errors: {
        emailNotConfirmed:
          'Votre adresse e-mail n’est pas encore confirmée. Vérifiez votre boîte de réception.',
        weakPassword:
          'Mot de passe trop faible : utilisez au moins 8 caractères variés.',
        rateLimit: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
        invalidEmail: 'Cette adresse e-mail n’est pas acceptée.',
        invalidCredentials: 'E-mail ou mot de passe incorrect.',
        generic: 'Une erreur inattendue est survenue. Réessayez dans un instant.',
        passwordShort: 'Le mot de passe doit contenir au moins 8 caractères.',
        passwordMismatch: 'Les deux mots de passe ne correspondent pas.',
      },
    },
  },
  ui: {
    lessonComplete: {
      loginPrefix: 'Connectez-vous',
      loginSuffix: ' pour marquer cette leçon comme lue.',
      done: 'Leçon terminée',
      mark: 'Marquer comme terminée',
    },
    stepChecklist: {
      doneCountSuffix: ' étapes terminées',
      loginPrefix: 'Connectez-vous',
      loginSuffix: ' pour cocher les étapes et suivre votre progression.',
      progress: 'Progression du patron',
      step: (n: number) => `Étape ${n} : `,
      tip: 'Astuce : ',
      checkbox: 'J’ai terminé cette étape',
      doneMessage: (title: string) => `Étape « ${title} » terminée. Bravo !`,
      undoneMessage: (title: string) => `Étape « ${title} » marquée à refaire.`,
    },
    calculator: {
      helpBefore: 'Besoin d’aide pour mesurer ? Consultez le ',
      helpLink: 'guide de prise de mesures',
      helpAfter: '.',
      groups: { tours: 'Tours', hauteurs: 'Hauteurs et longueurs' },
      numberError: 'Indiquez un nombre.',
      rangeError: (min: number, max: number) => `Entre ${min} et ${max} cm.`,
      fixFields: 'Corrigez les champs signalés avant d’enregistrer.',
      saved: 'Mesures enregistrées. Vos patrons sont maintenant personnalisés.',
      saving: 'Enregistrement…',
      save: 'Enregistrer mes mesures',
      sample: 'Valeurs d’exemple',
      loginPrefix: 'Connectez-vous',
      loginSuffix:
        ' pour enregistrer vos mesures et personnaliser automatiquement tous les patrons.',
      lastSaved: (date: string) => `Dernier enregistrement : ${date}`,
      results: 'Valeurs de construction',
      choosePattern: 'Choisir un patron',
      valuesCaption: (name: string) => `Valeurs calculées pour le patron ${name}`,
      fabric: (m: string) => `Métrage estimé : ${m} m en laize 140 cm.`,
      invalidUsesSample:
        'Les champs invalides utilisent temporairement la valeur d’exemple.',
      viewPattern: (name: string) => `Voir le patron ${name}`,
    },
    glossary: {
      search: 'Rechercher un terme',
      placeholder: 'Rechercher : droit-fil, pince, fourche…',
      filter: 'Filtrer par thème',
      all: 'Tous',
      categories: {
        tissu: 'Tissu',
        construction: 'Construction',
        couture: 'Couture',
        mesures: 'Mesures',
      },
      noResults: 'Aucun terme ne correspond. Essayez un autre mot.',
      count: (n: number) => `${n} terme${n > 1 ? 's' : ''}`,
      example: 'Exemple : ',
      related: 'Voir aussi : ',
    },
    valuesTable: {
      mark: 'Repère',
      formula: 'Formule',
      value: 'Valeur',
    },
    diagram: {
      grain: 'Droit-fil',
      fold: 'Bord au pli',
      point: 'Point de construction',
      grid: 'Quadrillage : 5 cm · Tracé sans marges de couture',
      foldLabel: 'PLI',
    },
    actions: {
      notConfigured:
        'Le compte en ligne n’est pas encore activé : impossible d’enregistrer pour le moment.',
      unknownLesson: 'Leçon inconnue.',
      signInProgress: 'Connectez-vous pour enregistrer votre progression.',
      signInMeasures: 'Connectez-vous pour enregistrer vos mesures.',
      saveFailed: 'L’enregistrement a échoué. Réessayez dans un instant.',
    },
  },
  measurements: {
    tourPoitrine: 'Tour de poitrine',
    tourTaille: 'Tour de taille',
    tourBassin: 'Tour de bassin (hanches)',
    tourCou: 'Tour de cou',
    tourBras: 'Tour de bras',
    tourPoignet: 'Tour de poignet',
    tourCheville: 'Tour de cheville',
    tourVisage: 'Tour de visage',
    carrureDos: 'Carrure dos',
    longueurEpaule: 'Longueur d’épaule',
    longueurManche: 'Longueur de manche',
    longueurTotale: 'Longueur nuque-sol',
    hauteurMontant: 'Hauteur de montant (fourche)',
    longueurCote: 'Longueur côté (taille-sol)',
  },
  levels: {
    Débutant: 'Débutant',
    Intermédiaire: 'Intermédiaire',
  },
  patterns: {
    abaya: { name: 'Abaya de base', tagline: 'Robe longue et fluide, coupe droite légèrement évasée' },
    jilbeb: { name: 'Jilbeb de base', tagline: 'Cape en cercle avec capuche encadrant le visage' },
    sarouel: { name: 'Sarouel', tagline: 'Pantalon ample à fourche abaissée et gousset en losange' },
    qamis: { name: 'Qamis', tagline: 'Tunique longue à col officier et patte de boutonnage' },
  } as Record<PatternSlug, { name: string; tagline: string }>,
}

export type Dictionary = typeof fr

const ar: Dictionary = {
  localeName: 'العربية',
  brand: 'فيل وباترون',
  meta: {
    title: 'فيل وباترون — تعلّم رسم الباترون التقليدي',
    template: '%s · فيل وباترون',
    description:
      'تطبيق تعليمي مجاني لرسم الباترون والرسم التقني: عباية، جلباب، سروال وقميص. أخذ المقاسات، معجم المصطلحات، الحاسبة وتتبّع التقدّم.',
    pages: {
      mesures: {
        title: 'دليل أخذ المقاسات',
        description:
          'تعلّموا أخذ المحيطات والارتفاعات والأطوال، واختيار قيم الارتياح المناسبة.',
      },
      glossaire: {
        title: 'معجم المصطلحات',
        description:
          'معجم تفاعلي لمصطلحات الخياطة والباترون: اتجاه الخيط، البنّات، الهوامش، الشوكة، الجُسأة…',
      },
      emmanchure: {
        title: 'درس الأستاذ: حردة الكمّ',
        description:
          'بناء حردة الكمّ الأساسية بالمليمتر: هندسة الرسم، الزوايا، المنحنى بالمسطرة اليابانية، حركات الورشة وسلوك الأقمشة.',
      },
      patrons: {
        title: 'الباترونات الأساسية',
        description: 'عباية، جلباب، سروال وقميص: مخططات تقنية ومراحل بناء مفصّلة.',
      },
      calculateur: {
        title: 'حاسبة المقاسات',
        description: 'أدخلوا مقاساتكم واحصلوا فورًا على قيم بناء كل باترون.',
      },
      dashboard: { title: 'تقدّمي' },
      login: { title: 'تسجيل الدخول' },
      signup: { title: 'إنشاء حساب' },
      authError: { title: 'خطأ في المصادقة' },
      signupSuccess: { title: 'تحقّقوا من بريدكم الإلكتروني' },
    },
  },
  notFound: {
    title: 'الصفحة غير موجودة',
    text: 'هذه الصفحة غير موجودة أو نُقلت.',
    back: 'العودة إلى الصفحة الرئيسية',
  },
  a11y: {
    skip: 'الانتقال إلى المحتوى الرئيسي',
    mainNav: 'التنقّل الرئيسي',
    footerNav: 'روابط التذييل',
    breadcrumb: 'مسار التنقّل',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    language: 'تغيير اللغة',
  },
  language: {
    label: 'اللغة',
    fr: 'الفرنسية',
    ar: 'العربية',
    frShort: 'ف',
    arShort: 'ع',
  },
  nav: {
    mesures: 'المقاسات',
    glossaire: 'المصطلحات',
    emmanchure: 'الدرس',
    patrons: 'الباترونات',
    calculateur: 'الحاسبة',
    dashboard: 'تقدّمي',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
  },
  footer: {
    tagline: 'فيل وباترون — ورشة مجانية للتعلّم على وتيرتكم.',
    mesures: 'أخذ المقاسات',
    emmanchure: 'درس حردة الكمّ',
    patrons: 'الباترونات',
    calculateur: 'الحاسبة',
  },
  home: {
    badge: 'مجاني · للمبتدئين والفضوليين',
    title: 'تعلّموا رسم الباترون التقليدي، خطًّا بعد خط.',
    intro:
      'عباية، جلباب، سروال وقميص: افهموا كل خط في باتروناتكم عبر دروس ودّية ومخططات تقنية وحاسبة تتلاءم مع جسمكم.',
    ctaStart: 'ابدأوا الدرس',
    ctaPatterns: 'اطّلعوا على الباترونات',
    imageAlt:
      'طاولة ورشة عليها ورق باترون مرسوم بالقلم، وشريط قياس، وطبشور، ومسطرة يابانية',
    modulesTitle: 'مسار في أربع مراحل',
    modulesIntro: 'اتبعوا الترتيب المقترح أو اختاروا بحرّية: تقدّمكم محفوظ.',
    modules: [
      {
        title: 'أخذ المقاسات',
        text: 'المحيطات والأطوال وقيم الارتياح مشروحة خطوة بخطوة، مع الأخطاء التي يجب تجنّبها.',
      },
      {
        title: 'معجم المصطلحات',
        text: 'اتجاه الخيط، البنّات، الهوامش، الشوكة… كلمات الورشة، أخيرًا واضحة.',
      },
      {
        title: '4 باترونات أساسية',
        text: 'مخططات تقنية ومراحل بناء مفصّلة، محسوبة على مقاساتكم.',
      },
      {
        title: 'الحاسبة',
        text: 'أدخلوا مقاساتكم: تُحسب كل نقطة في الباترون من أجلكم.',
      },
    ],
    patternsTitle: 'الباترونات الأساسية',
    stepsCount: (n: number) => `${n} مراحل بناء`,
    dashboardTitle: 'دفتر ورشتكم الشخصي',
    dashboardText:
      'أنشئوا حسابًا مجانيًا لحفظ مقاساتكم، والحصول على باترونات محسوبة على مقاسكم، وتعليم كل مرحلة منجزة.',
    dashboardCta: 'إنشاء حسابي',
    masterclass: {
      badge: 'ورشة افتراضية موجّهة',
      title: 'رسم حردة الكمّ الأساسية',
      text: 'من الأخرم إلى تجويف الإبط: الهندسة واليد والقماش، مشروحة بالمليمتر.',
      meta: 'درس الأستاذ · 18 دقيقة',
      cta: 'افتحوا الدرس',
    },
  },
  pages: {
    mesures: {
      eyebrow: 'درس نظري · الوحدة 1',
      title: 'دليل أخذ المقاسات',
      intro:
        'الباترون الصحيح يبدأ بمقاسات صحيحة. خذوا وقتكم: هذه المرحلة أهم من كل ما عداها.',
      beforeTitle: 'قبل أن تبدأوا',
      rules: [
        'ارتدوا ملابس رقيقة وملاصقة للجسم، أو خذوا المقاسات فوق الملابس الداخلية.',
        'قفوا مستقيمين، قدماكم مضمومتان وذراعاكم مرتاحتنا. اطلبوا المساعدة في قياس الظهر.',
        'يوضع شريط القياس دون شدّ: يجب أن يمرّ إصبع تحته.',
        'خذوا كل مقاس مرتين وسجّلوا المتوسط مع التاريخ.',
      ],
      note:
        'لا توجد مقاسات «صحيحة» أو «خاطئة»: هناك مقاساتكم فقط. الباترون يتلاءم مع جسمكم، وليس العكس.',
      imageAlt: 'مانيكان خياطة عليه شريط قياس موضوع أفقيًا حول الصدر',
      toursTitle: 'المحيطات',
      toursIntro: 'مقاسات أفقية، تُؤخذ بدوران الجسم. يبقى الشريط موازيًا للأرض.',
      hauteursTitle: 'الأطوال والارتفاعات',
      hauteursIntro: 'مقاسات رأسية أو عرضية، تُؤخذ واقفين، بمحاذاة الجسم دون شدّ.',
      easeTitle: 'قيم الارتياح',
      easeIntro:
        'الارتياح هو الفرق بين مقاس الجسم ومقاس الثوب المنتهي. الملابس التقليدية واسعة: ارتياحها سخيّ وهو جزء من هويتها.',
      easeCaption: 'قيم الارتياح الموصى بها حسب الثوب',
      easeColumns: {
        garment: 'الثوب',
        zone: 'المنطقة',
        total: 'الارتياح الكلي',
        why: 'السبب',
      },
      easeNote:
        'لماذا نقسم على 4؟ يمثّل الباترون ربع الجسم (نصف الأمام أو نصف الخلف). لذا يصبح ارتياح 16 سم +4 سم على الباترون.',
      finishedTitle: 'أتممتم هذه الوحدة؟',
      finishedBefore: 'انقلوا مقاساتكم إلى ',
      finishedLink: 'الحاسبة',
      finishedAfter: '، ثم اكتشفوا المصطلحات.',
    },
    glossaire: {
      eyebrow: 'درس نظري · الوحدة 2',
      title: 'معجم المصطلحات',
      intro:
        'كلمات الورشة، مشروحة ببساطة. ابحثوا عن مصطلح أو صفّوه حسب الموضوع، ثم افتحوا بطاقة للتعمّق.',
      doneTitle: 'أتقنتم المفردات؟',
    },
    emmanchure: {
      back: 'كل الدروس',
      title: 'درس حردة الكمّ',
      start: 'ابدأوا الرسم',
      memo: 'مرجع الورشة',
      memoText:
        'تُقاس حردة الكمّ بشريط موضوع على حافته، لا مسطّحًا. الطبشور يعلّم القصّ، وخيط التثبيت يعلّم الخياطة.',
      progress: 'تقدّمكم',
    },
    patrons: {
      eyebrow: 'تطبيق',
      title: 'الباترونات الأساسية',
      intro: 'أربعة ثياب، أربعة تعلّمات. ابدأوا بالعباية إن كان هذا أول باترون لكم.',
      previewTitle: (name: string) => `لمحة عن باترون ${name}`,
      previewDescription: (pieces: string) => `القطع: ${pieces}.`,
      open: 'فتح الباترون',
      doneSteps: (done: number, total: number) => `${done} / ${total} مراحل منجزة`,
      stepsTotal: (total: number) => `${total} مراحل`,
    },
    calculateur: {
      eyebrow: 'أداة تفاعلية',
      title: 'حاسبة المقاسات',
      intro:
        'أدخلوا مقاساتكم بالسنتيمتر. تُعاد قيم البناء الحسابية عند كل تعديل، باترونًا باترونًا.',
    },
    dashboard: {
      eyebrow: 'دفتر الورشة',
      title: 'تقدّمي',
      intro: 'كل مرحلة تُعلَّم هي خطوة إضافية. تقدّموا على وتيرتكم.',
      global: 'التقدّم الإجمالي',
      globalLabel: 'التقدّم الإجمالي',
      doneOf: (done: number, total: number) => `${done} عنصر منجز من ${total}`,
      next: 'المرحلة المقترحة التالية: ',
      allDone: 'أتممتم كل شيء. تهانينا!',
      noMeasures: 'لم تحفظوا مقاساتكم بعد. ',
      openCalculator: 'افتحوا الحاسبة',
      courses: 'الدروس النظرية',
      patterns: 'الباترونات',
      done: 'منجز',
      todo: 'للإنجاز',
      progressLabel: (name: string) => `تقدّم ${name}`,
    },
    pattern: {
      breadcrumb: 'كل الباترونات',
      savedMeasurements: 'هذا الباترون محسوب بمقاساتكم المحفوظة.',
      sampleMeasurements:
        'هذا الباترون محسوب بمقاسات نموذجية (مقاس 38-40). احفظوا مقاساتكم لتخصيصه.',
      editMeasures: 'تعديل مقاساتي',
      enterMeasures: 'إدخال مقاساتي',
      schema: 'المخطط التقني',
      schemaTitle: (name: string) => `المخطط التقني لباترون ${name}`,
      schemaDescription: (pieces: string) =>
        `قطع الباترون، مرسومة بمقياس دون هوامش: ${pieces}. الحروف تشير إلى مراحل البناء أدناه.`,
      steps: 'مراحل البناء',
      values: 'القيم المحسوبة',
      valuesCaption: (name: string) => `قيم بناء باترون ${name}`,
      fabric: (m: string) => `القطعة المقدّرة: ${m} م (عرض 140 سم)، الهوامش مشمولة.`,
      usedMeasurements: 'المقاسات المستعملة',
    },
    auth: {
      loginTitle: 'مرحبًا بعودتكم إلى الورشة',
      loginIntro: 'سجّلوا الدخول لتجدوا تقدّمكم ومقاساتكم.',
      signupTitle: 'أنشئوا حسابكم',
      signupIntro: 'مجاني، دون التزام. سيُحفظ تقدّمكم.',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      passwordHint: '8 أحرف على الأقل.',
      submitLogin: 'تسجيل الدخول',
      submitSignup: 'إنشاء حسابي',
      pending: 'لحظة…',
      noAccount: 'ليس لديكم حساب بعد؟ ',
      hasAccount: 'مسجّلون بالفعل؟ ',
      errorTitle: 'لم ينجح الرابط',
      errorText:
        'ربما انتهت صلاحيته أو استُعمل سابقًا. لا تقلقوا: حاولوا تسجيل الدخول من جديد.',
      backToLogin: 'العودة إلى تسجيل الدخول',
      successTitle: 'بقيت خطوة صغيرة',
      successText:
        'أرسلنا إليكم رسالة تأكيد. اضغطوا على الرابط الموجود فيها لتفعيل حسابكم، ثم عودوا لتسجيل الدخول.',
      goToLogin: 'الانتقال إلى تسجيل الدخول',
      errors: {
        emailNotConfirmed:
          'لم يتم تأكيد بريدكم الإلكتروني بعد. تحقّقوا من صندوق الوارد.',
        weakPassword: 'كلمة المرور ضعيفة: استعملوا 8 أحرف متنوّعة على الأقل.',
        rateLimit: 'محاولات كثيرة. انتظروا بضع دقائق قبل المحاولة مجددًا.',
        invalidEmail: 'هذا البريد الإلكتروني غير مقبول.',
        invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        generic: 'حدث خطأ غير متوقّع. أعيدوا المحاولة بعد لحظة.',
        passwordShort: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.',
        passwordMismatch: 'كلمتا المرور غير متطابقتين.',
      },
    },
  },
  ui: {
    lessonComplete: {
      loginPrefix: 'سجّلوا الدخول',
      loginSuffix: ' لتعليم هذا الدرس كمقروء.',
      done: 'الدرس مكتمل',
      mark: 'تعليمه كمكتمل',
    },
    stepChecklist: {
      doneCountSuffix: ' مراحل منجزة',
      loginPrefix: 'سجّلوا الدخول',
      loginSuffix: ' لتعليم المراحل وتتبّع تقدّمكم.',
      progress: 'تقدّم الباترون',
      step: (n: number) => `المرحلة ${n}: `,
      tip: 'نصيحة: ',
      checkbox: 'أنجزتُ هذه المرحلة',
      doneMessage: (title: string) => `المرحلة «${title}» منجزة. أحسنتم!`,
      undoneMessage: (title: string) => `المرحلة «${title}» أُعيدت إلى قائمة الإنجاز.`,
    },
    calculator: {
      helpBefore: 'تحتاجون مساعدة في القياس؟ راجعوا ',
      helpLink: 'دليل أخذ المقاسات',
      helpAfter: '.',
      groups: { tours: 'المحيطات', hauteurs: 'الأطوال والارتفاعات' },
      numberError: 'أدخلوا رقمًا.',
      rangeError: (min: number, max: number) => `بين ${min} و${max} سم.`,
      fixFields: 'صحّحوا الحقول المشار إليها قبل الحفظ.',
      saved: 'حُفظت المقاسات. باتروناتكم أصبحت مخصّصة.',
      saving: 'جارٍ الحفظ…',
      save: 'حفظ مقاساتي',
      sample: 'قيم نموذجية',
      loginPrefix: 'سجّلوا الدخول',
      loginSuffix: ' لحفظ مقاساتكم وتخصيص كل الباترونات تلقائيًا.',
      lastSaved: (date: string) => `آخر حفظ: ${date}`,
      results: 'قيم البناء',
      choosePattern: 'اختيار باترون',
      valuesCaption: (name: string) => `القيم المحسوبة لباترون ${name}`,
      fabric: (m: string) => `القطعة المقدّرة: ${m} م بعرض 140 سم.`,
      invalidUsesSample: 'الحقول غير الصالحة تستعمل مؤقتًا القيمة النموذجية.',
      viewPattern: (name: string) => `عرض باترون ${name}`,
    },
    glossary: {
      search: 'البحث عن مصطلح',
      placeholder: 'ابحثوا: اتجاه الخيط، بنّة، شوكة…',
      filter: 'التصفية حسب الموضوع',
      all: 'الكل',
      categories: {
        tissu: 'القماش',
        construction: 'البناء',
        couture: 'الخياطة',
        mesures: 'المقاسات',
      },
      noResults: 'لا يوجد مصطلح يطابق بحثكم. جرّبوا كلمة أخرى.',
      count: (n: number) => `${n} مصطلح`,
      example: 'مثال: ',
      related: 'انظروا أيضًا: ',
    },
    valuesTable: {
      mark: 'المرجع',
      formula: 'الصيغة',
      value: 'القيمة',
    },
    diagram: {
      grain: 'اتجاه الخيط',
      fold: 'حافة الطيّة',
      point: 'نقطة بناء',
      grid: 'شبكة: 5 سم · رسم دون هوامش خياطة',
      foldLabel: 'طيّة',
    },
    actions: {
      notConfigured: 'الحساب عبر الإنترنت غير مفعّل بعد: لا يمكن الحفظ في الوقت الحالي.',
      unknownLesson: 'درس غير معروف.',
      signInProgress: 'سجّلوا الدخول لحفظ تقدّمكم.',
      signInMeasures: 'سجّلوا الدخول لحفظ مقاساتكم.',
      saveFailed: 'فشل الحفظ. أعيدوا المحاولة بعد لحظة.',
    },
  },
  measurements: {
    tourPoitrine: 'محيط الصدر',
    tourTaille: 'محيط الخصر',
    tourBassin: 'محيط الحوض (الأرداف)',
    tourCou: 'محيط الرقبة',
    tourBras: 'محيط الذراع',
    tourPoignet: 'محيط الرسغ',
    tourCheville: 'محيط الكاحل',
    tourVisage: 'محيط الوجه',
    carrureDos: 'عرض الظهر',
    longueurEpaule: 'طول الكتف',
    longueurManche: 'طول الكم',
    longueurTotale: 'الطول من القفا إلى الأرض',
    hauteurMontant: 'ارتفاع الشوكة',
    longueurCote: 'الطول الجانبي (من الخصر إلى الأرض)',
  },
  levels: {
    Débutant: 'مبتدئ',
    Intermédiaire: 'متوسط',
  },
  patterns: {
    abaya: { name: 'عباية أساسية', tagline: 'ثوب طويل وانسيابي، بقصّة مستقيمة متّسعة قليلًا' },
    jilbeb: { name: 'جلباب أساسي', tagline: 'عباءة دائرية بقلنسوة تحيط بالوجه' },
    sarouel: { name: 'سروال', tagline: 'بنطال واسع بشوكة منخفضة وجُسأة معيّنية' },
    qamis: { name: 'قميص', tagline: 'قميص طويل بياقة عسكرية وفتحة أزرار' },
  },
}

export const DICTIONARIES: Record<Locale, Dictionary> = { fr, ar }

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE]
}

/** Nom et accroche traduits d'un patron (repli sur l'abaya si slug inconnu). */
export function patternText(t: Dictionary, slug: string) {
  return t.patterns[slug as PatternSlug] ?? t.patterns.abaya
}
