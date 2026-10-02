import React, { createContext, useContext } from 'react'

/* ==================================================================
   Traductions FR / AR
   - Arabe : fusha pour le contenu, quelques touches de darija dans
     les boutons d'action (CTA).
   - Pour modifier un texte : changez-le ici, dans les deux langues.
================================================================== */

export const LangContext = createContext('fr')
export const useLang = () => useContext(LangContext)
export const useT = () => T[useContext(LangContext)]

const tc = (s) => <span className="text-teal-600">{s}</span>

export const T = {
  fr: {
    dir: 'ltr',
    switchLang: 'العربية',
    switchLangAria: 'عرض الموقع بالعربية',
    nav: ['Technologie', 'Secteurs', 'Références', 'Réalisations', 'FAQ', 'Contact'],
    devis: 'Devis gratuit',
    call: 'Appeler',
    callAria: (p) => `Appeler le ${p}`,
    whatsapp: 'WhatsApp',
    whatsappAria: 'Devis sur WhatsApp',
    whatsappMsg: 'Bonjour ! Je souhaite un devis gratuit pour vos vitres intelligentes. Pouvez-vous me contacter ?',
    menu: 'Menu',
    logoAlt: 'Vitres intelligentes Maroc – verre PDLC et film commutable',

    hero: {
      eyebrow: 'Film PDLC · Smart Glass · Maroc',
      line1: 'Vos vitres,',
      word: 'Réinventées',
      lead: 'Passez de la transparence à l’intimité en un instant. Offrez à vos espaces élégance, confort et innovation.',
      sub: 'Nos films de verre intelligents redéfinissent vos espaces. Sans travaux lourds, vous choisissez : ouverture totale sur la lumière ou bulle d’intimité. Un geste simple, pour un quotidien plus moderne.',
      devisLabel: 'Devis gratuit, sans engagement',
      formLink: 'ou par formulaire',
      caption: '👉 Utilisez l’interrupteur en bas de l’écran pour voir la transformation instantanée de nos vitres intelligentes — ',
      captionStrong: 'tout le site réagit.',
    },
    window: {
      hintMouse: 'Passez la souris sur la vitre',
      hintTouch: 'Touchez la vitre',
      mode: 'Mode actuel :',
      on: 'Transparent',
      off: 'Opaque',
      altOff: 'Vitre intelligente en mode opaque – film PDLC',
      altOn: 'Vitre intelligente en mode transparent – film PDLC',
    },
    marquee: ['Transparent', 'Opaque', 'Intimité', 'Lumière', 'Sans travaux', 'Film PDLC', 'Smart Glass', 'Filtre UV'],

    techno: {
      eyebrow: 'Comment ça marche',
      title: <>Notre {tc('Technologie')}</>,
      intro: <>Un film mince appliqué <strong className="text-ink">sur vos vitres existantes</strong>. À l’intérieur, des cristaux liquides qui obéissent à un simple interrupteur.</>,
      offLabel: 'Sans courant électrique :',
      offText: 'les cristaux sont désordonnés → le film paraît opaque et protège votre intimité.',
      onLabel: 'Avec courant électrique :',
      onText: 'les molécules s’alignent → la vitre redevient transparente.',
    },

    sectors: {
      eyebrow: 'Pour qui ?',
      title: <>Nos {tc('Secteurs')}</>,
      introA: 'Chaque vitre cache un usage. ',
      hover: 'Survolez',
      touch: 'Touchez',
      introB: ' une vitre pour la rendre transparente.',
      altOn: 'vitre intelligente en mode transparent',
      altOff: 'vitre intelligente en mode opaque',
      items: [
        ['Hôtellerie & Resorts', 'Surprenez vos clients avec des suites lumineuses le jour, intimes et chaleureuses la nuit.'],
        ['Bureaux & Espaces de travail', 'Offrez à vos équipes la confidentialité quand elles en ont besoin, et l’ouverture quand elles la souhaitent.'],
        ['Santé & Cliniques', 'Créez un environnement rassurant, hygiénique et respectueux de l’intimité des patients.'],
        ['Résidentiel & Villas', 'Faites entrer la modernité chez vous : plus de rideaux, plus de compromis, seulement confort et élégance.'],
        ['Beauté & Bien-être', 'Donnez à vos clients l’expérience d’un cocon apaisant, entre lumière douce et discrétion totale.'],
        ['Commerce & Retail', 'Attirez le regard avec des vitrines vivantes qui s’adaptent à chaque moment de la journée.'],
      ],
    },

    clients: {
      eyebrow: 'Références',
      title: <>Ils nous ont fait {tc('confiance')}</>,
      intro: 'Institutions financières, industriels, hôtels de prestige et particuliers : partout au Maroc, nos vitres intelligentes équipent des espaces exigeants.',
      places: ['Casablanca Finance City', 'Salé', 'Marrakech'],
      manyEyebrow: 'Partout au Maroc',
      many: 'de nombreux particuliers',
      manySub: 'Villas, appartements, bureaux à domicile.',
    },

    reels: {
      eyebrow: 'En action',
      title: <>Quelques heures de pose. {tc('Des années d’effet waouh.')}</>,
      intro: 'Installation facile, résultat spectaculaire : vos vitres deviennent intelligentes en quelques heures. De la transparence à l’intimité, créez l’ambiance parfaite à tout moment. Vos espaces suivent vos envies.',
      items: [
        ['Avant / Après à Salé', 'Bureaux séparés de l’atelier de production, sans remplacer le vitrage existant.'],
        ['Une pose au millimètre', 'Environnement sans poussière, découpe sur mesure, zéro bulle : nos étapes pour un résultat parfait.'],
        ['La pergola d’un client', 'L’idée d’une architecte : une pergola en smart glass, transparente ou opaque à la demande.'],
      ],
      follow: (h) => `Suivre @${h} sur Instagram`,
    },

    values: {
      eyebrow: 'Notre engagement',
      title: <>Nos <span className="text-teal-300">Valeurs</span></>,
      items: ['Innovation qui simplifie la vie', 'Design qui sublime vos espaces', 'Fiabilité pour une tranquillité d’esprit', 'Durabilité pour l’avenir et la planète'],
    },

    faq: {
      eyebrow: 'Tout savoir',
      title: <>Questions {tc('Fréquentes')}</>,
      other: 'Une autre question ?',
      otherSub: 'Notre équipe vous répond directement.',
      items: [
        ['Qu’est‑ce que le film intelligent PDLC et comment fonctionne-t‑il ?', (
          <p>
            Le film PDLC (Polymer Dispersed Liquid Crystal) est un film mince que nous appliquons <strong>sur une vitre existante</strong> pour la rendre “intelligente”. <br/>
            Le film contient des cristaux liquides dans une matrice polymère qui s'organisent différemment selon le branchement électrique :<br/>
              - <strong>Sans courant électrique :</strong> les cristaux sont désordonnés → le film paraît <strong><span className="text-teal-600">opaque</span></strong> et protège votre intimité.<br/>
              - <strong>Avec courant électrique :</strong> les molécules s’alignent → la vitre redevient <strong><span className="text-teal-600">transparente</span></strong> et laisse passer la lumière.<br/>
            Cette technologie transforme vos vitres existantes en surfaces modulables, modernes et sécurisées.
          </p>
        )],
        ['Quels bénéfices concrets pour vos espaces ?', (
          <p>
            <strong>Intimité instantanée</strong> : d’un simple geste, passez de transparent à opaque selon vos besoins.<br/>
            <strong>Filtration des UV</strong> : protegez vos intérieurs et vos occupants des rayons ultraviolets.<br/>
            <strong>Entretien minimal</strong> : facile à nettoyer, sans mécanisme fragile ni store à dépoussiérer.<br/>
            <strong>Économies d’énergie</strong> : Réduisez les coûts de climatisation et de chauffage grâce à ses propriétés d’isolation thermique.<br/>
            <strong>Lumière naturelle maximale</strong> : même en mode opaque, la luminosité reste douce et diffuse.<br/>
            <strong>Sécurité renforcée</strong> : en cas de bris, le film retient les éclats de verre, évitant toute projection dangereuse.<br/>
            <strong>Polyvalence</strong> : sert de cloison dynamique, d’écran de projection HD ou même de tableau blanc interactif dans les salles de réunion.<br/>
          </p>
        )],
        ['Où installer le film, et quelle gamme choisir selon vos objectifs ?', (
          <p>
            Nos films s’adaptent à vos usages et ambitions :<br/>
            <strong>Essential</strong> : bureaux, salles de réunion, musées — intimité, transparence, projection.<br/>
            <strong>Superior</strong> : espaces multi-usages entre vision claire, projection et séparation visuelle.<br/>
            <strong>Crystal</strong> : lieux prestigieux demandant transparence optimale et rendu haut de gamme.<br/>
            <strong>Ultra</strong> : villas de luxe, hôtels 5 étoiles, laboratoires ou zones hautement sécurisées.
          </p>
        )],
        ['Quelle est la différence entre vos “Vitres Intelligentes” et un verre à technologie intégrée ?', (
          <p>
            - Nos <strong>Vitres Intelligentes</strong> désignent exclusivement le <strong>film PDLC appliqué sur vos vitrages existants</strong>, pour les rendre modulables et “intelligentes” instantanément.<br/>
            - Un <strong>verre à technologie intégrée</strong> (ou “smart glass”) intègre la couche PDLC dès sa fabrication, nécessitant de remplacer le vitrage complet et impliquant un coût plus élevé.<br/>
            Avec nos films, vous transformez vos vitrages actuels en espaces dynamiques, modernes et sécurisés, <strong>sans changer vos fenêtres</strong>.
          </p>
        )],
        ['Y a‑t-il des points de vigilance à connaître ?', (
          <p>
            <strong>Coût</strong> : plus onéreux qu’un vitrage classique, mais le film PDLC reste <em>beaucoup plus économique</em> qu’un verre intelligent intégré.<br/>
            <strong>Installation professionnelle</strong> : la pose et le raccordement électrique nécessitent un installateur qualifié.<br/>
            <strong>Utilisation intérieure</strong> : conçu pour les espaces intérieurs (bureaux, villas, hôtels, etc.).<br/>
            <strong>Alimentation électrique</strong> : un faible courant alternatif est nécessaire pour passer en mode transparent.<br/>
            <strong>Technologie encore émergente</strong> : assurez-vous de choisir un <strong>fournisseur fiable</strong> pour garantir la qualité et la durabilité du produit.<br/>
          </p>
        )],
        ['Quelle durabilité et sécurité pour votre investissement ?', (
          <p>
            Nos films résistent jusqu’à 105 °C, sont anti-rayures et améliorent l’isolation acoustique d’environ 20 %.<br/>
            En cas de casse, ils retiennent les éclats et garantissent un usage sûr et durable.
          </p>
        )],
      ],
    },

    contact: {
      eyebrow: 'Contact',
      title: <>Prêts à transformer vos vitres ? <span className="text-teal-300">Parlons-en !</span></>,
      listen: 'Nous sommes à votre écoute',
      fastest: 'Le plus rapide pour votre devis gratuit :',
      formTitle: 'Ou laissez-nous vos coordonnées',
      formSub: 'Nous vous rappelons pour votre devis gratuit, sans engagement.',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      codeAria: 'Indicatif',
      surface: 'Surface à équiper',
      surfaces: ['Moins de 5 m²', '5 à 40 m²', 'Plus de 40 m²'],
      submit: 'Recevoir mon devis gratuit',
      sending: 'Envoi en cours...',
      ok: 'Message envoyé avec succès!',
      err: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    },

    footer: (y) => `© ${y} Vitres Intelligentes Maroc, Noorium Group SARL. Tous droits réservés.`,
    seoLine: 'Vitres intelligentes · Film PDLC · Smart glass · Verre opacifiant électrique · Film opacifiant · Casablanca · Rabat · Salé · Marrakech · Tanger · Agadir · Fès',

    dock: {
      aria: 'Interrupteur et contact rapide',
      label: 'Vitres',
      on: 'Transparentes',
      off: 'Opaques',
      hint: 'Cliquez !',
      toOn: 'Rendre les vitres transparentes',
      toOff: 'Rendre les vitres opaques',
    },
    arrow: '→',
  },

  /* ================================================================ */

  ar: {
    dir: 'rtl',
    switchLang: 'Français',
    switchLangAria: 'Voir le site en français',
    nav: ['التقنية', 'القطاعات', 'مراجعنا', 'إنجازاتنا', 'الأسئلة الشائعة', 'اتصل بنا'],
    devis: 'عرض سعر مجاني',
    call: 'عيّط لينا',
    callAria: (p) => `اتصل بالرقم ${p}`,
    whatsapp: 'واتساب',
    whatsappAria: 'عرض سعر عبر واتساب',
    whatsappMsg: 'السلام عليكم! بغيت عرض سعر مجاني للزجاج الذكي ديالكم. واش ممكن تتواصلو معايا؟',
    menu: 'القائمة',
    logoAlt: 'Vitres Intelligentes Maroc – زجاج PDLC وفيلم ذكي',

    hero: {
      eyebrow: 'فيلم PDLC · زجاج ذكي · المغرب',
      line1: 'زجاجكم،',
      word: 'بحلّة ذكية',
      lead: 'انتقلوا من الشفافية إلى الخصوصية في لحظة. امنحوا فضاءاتكم الأناقة والراحة والابتكار.',
      sub: 'أفلامنا الذكية للزجاج تعيد تعريف فضاءاتكم. دون أشغال ثقيلة، أنتم من يختار: انفتاح تام على الضوء أو فقاعة من الخصوصية. حركة بسيطة لحياة يومية أكثر عصرية.',
      devisLabel: 'عرض سعر مجاني، بدون أي التزام',
      formLink: 'أو عبر الاستمارة',
      caption: '👉 استعملوا الزر في أسفل الشاشة لتروا التحوّل الفوري لزجاجنا الذكي — ',
      captionStrong: 'الموقع كلّه يتفاعل.',
    },
    window: {
      hintMouse: 'مرّروا الفأرة على الزجاج',
      hintTouch: 'المسوا الزجاج',
      mode: 'الوضع الحالي:',
      on: 'شفاف',
      off: 'معتم',
      altOff: 'زجاج ذكي في الوضع المعتم – فيلم PDLC',
      altOn: 'زجاج ذكي في الوضع الشفاف – فيلم PDLC',
    },
    marquee: ['شفاف', 'معتم', 'خصوصية', 'ضوء', 'بدون أشغال', 'فيلم PDLC', 'زجاج ذكي', 'حماية من UV'],

    techno: {
      eyebrow: 'كيف يعمل؟',
      title: <>{tc('تقنيتنا')}</>,
      intro: <>فيلم رقيق يُثبَّت <strong className="text-ink">على زجاجكم الحالي</strong>. بداخله بلورات سائلة تستجيب لزر بسيط.</>,
      offLabel: 'بدون تيار كهربائي:',
      offText: 'البلورات مبعثرة ← يبدو الفيلم معتماً ويحمي خصوصيتكم.',
      onLabel: 'مع التيار الكهربائي:',
      onText: 'تصطفّ الجزيئات ← يعود الزجاج شفافاً.',
    },

    sectors: {
      eyebrow: 'لمن؟',
      title: <>{tc('قطاعاتنا')}</>,
      introA: 'كل زجاج يخفي استعمالاً. ',
      hover: 'مرّروا الفأرة على',
      touch: 'المسوا',
      introB: ' أي زجاج ليصبح شفافاً.',
      altOn: 'زجاج ذكي في الوضع الشفاف',
      altOff: 'زجاج ذكي في الوضع المعتم',
      items: [
        ['الفنادق والمنتجعات', 'فاجئوا زبناءكم بأجنحة مضيئة نهاراً، حميمة ودافئة ليلاً.'],
        ['المكاتب وفضاءات العمل', 'امنحوا فرقكم الخصوصية عند الحاجة، والانفتاح متى أرادوا.'],
        ['الصحة والمصحات', 'أنشئوا بيئة مطمئنة وصحية تحترم خصوصية المرضى.'],
        ['السكن والفيلات', 'أدخلوا الحداثة إلى بيوتكم: لا ستائر بعد اليوم، ولا تنازلات، فقط الراحة والأناقة.'],
        ['التجميل والعافية', 'قدّموا لزبنائكم تجربة ملاذ هادئ، بين ضوء ناعم وتكتّم تام.'],
        ['التجارة والمحلات', 'اجذبوا الأنظار بواجهات حيّة تتكيّف مع كل لحظة من اليوم.'],
      ],
    },

    clients: {
      eyebrow: 'مراجعنا',
      title: <>وثقوا {tc('بنا')}</>,
      intro: 'مؤسسات مالية، صناعيون، فنادق فاخرة وخواص: في كل أنحاء المغرب، يجهّز زجاجنا الذكي فضاءات متطلّبة.',
      places: ['مدينة الدار البيضاء المالية', 'سلا', 'مراكش'],
      manyEyebrow: 'في كل أنحاء المغرب',
      many: 'عدد كبير من الخواص',
      manySub: 'فيلات، شقق، مكاتب منزلية.',
    },

    reels: {
      eyebrow: 'في الميدان',
      title: <>بضع ساعات من التركيب. {tc('وسنوات من الإبهار.')}</>,
      intro: 'تركيب سهل ونتيجة مذهلة: يصبح زجاجكم ذكياً في بضع ساعات. من الشفافية إلى الخصوصية، اخلقوا الأجواء المثالية في كل لحظة. فضاءاتكم تتبع رغباتكم.',
      items: [
        ['قبل / بعد في سلا', 'مكاتب مفصولة عن ورشة الإنتاج، دون تغيير الزجاج الموجود.'],
        ['تركيب بدقة المليمتر', 'بيئة خالية من الغبار، قصّ على المقاس، وبدون أي فقاعة: خطواتنا لنتيجة مثالية.'],
        ['برغولا أحد زبنائنا', 'فكرة مهندسة معمارية: برغولا من الزجاج الذكي، شفافة أو معتمة حسب الرغبة.'],
      ],
      follow: (h) => `تابعونا على إنستغرام @${h}`,
    },

    values: {
      eyebrow: 'التزامنا',
      title: <><span className="text-teal-300">قيمنا</span></>,
      items: ['ابتكار يسهّل الحياة', 'تصميم يرتقي بفضاءاتكم', 'موثوقية لراحة البال', 'استدامة من أجل المستقبل والكوكب'],
    },

    faq: {
      eyebrow: 'كل ما تريدون معرفته',
      title: <>الأسئلة {tc('الشائعة')}</>,
      other: 'عندك سؤال آخر؟',
      otherSub: 'فريقنا يجيبكم مباشرة.',
      items: [
        ['ما هو الفيلم الذكي PDLC وكيف يعمل؟', (
          <p>
            فيلم PDLC (بلورات سائلة مشتّتة في بوليمر) هو فيلم رقيق نثبّته <strong>على زجاج موجود</strong> ليصبح “ذكياً”.<br/>
            يحتوي الفيلم على بلورات سائلة داخل مادة بوليمرية، تنتظم بشكل مختلف حسب التيار الكهربائي:<br/>
              - <strong>بدون تيار كهربائي:</strong> تكون البلورات مبعثرة ← يبدو الفيلم <strong><span className="text-teal-600">معتماً</span></strong> ويحمي خصوصيتكم.<br/>
              - <strong>مع التيار الكهربائي:</strong> تصطفّ الجزيئات ← يعود الزجاج <strong><span className="text-teal-600">شفافاً</span></strong> ويمرّر الضوء.<br/>
            تحوّل هذه التقنية زجاجكم الحالي إلى أسطح مرنة، عصرية وآمنة.
          </p>
        )],
        ['ما هي الفوائد الملموسة لفضاءاتكم؟', (
          <p>
            <strong>خصوصية فورية</strong>: بحركة بسيطة، انتقلوا من الشفاف إلى المعتم حسب حاجتكم.<br/>
            <strong>تصفية الأشعة فوق البنفسجية</strong>: احموا فضاءاتكم وساكنيها من الأشعة فوق البنفسجية.<br/>
            <strong>صيانة بسيطة</strong>: سهل التنظيف، بدون آليات هشّة ولا ستائر تجمع الغبار.<br/>
            <strong>توفير في الطاقة</strong>: قلّلوا تكاليف التكييف والتدفئة بفضل خصائصه في العزل الحراري.<br/>
            <strong>أقصى قدر من الضوء الطبيعي</strong>: حتى في الوضع المعتم، يبقى الضوء ناعماً ومنتشراً.<br/>
            <strong>أمان معزّز</strong>: عند الكسر، يمسك الفيلم شظايا الزجاج ويمنع تطايرها.<br/>
            <strong>تعدّد الاستعمالات</strong>: يصلح كحاجز ديناميكي، أو شاشة عرض عالية الدقة، أو حتى سبورة تفاعلية في قاعات الاجتماعات.<br/>
          </p>
        )],
        ['أين يُركَّب الفيلم، وأي فئة تختارون حسب أهدافكم؟', (
          <p>
            تتكيّف أفلامنا مع استعمالاتكم وطموحاتكم:<br/>
            <strong>Essential</strong>: المكاتب، قاعات الاجتماعات، المتاحف — خصوصية، شفافية، عرض.<br/>
            <strong>Superior</strong>: فضاءات متعددة الاستعمالات بين الرؤية الواضحة والعرض والفصل البصري.<br/>
            <strong>Crystal</strong>: أماكن راقية تتطلب شفافية مثالية ولمسة فاخرة.<br/>
            <strong>Ultra</strong>: فيلات فاخرة، فنادق 5 نجوم، مختبرات أو مناطق عالية الأمان.
          </p>
        )],
        ['ما الفرق بين “الزجاج الذكي” لدينا وزجاج بتقنية مدمجة؟', (
          <p>
            - يقصد بـ<strong>الزجاج الذكي</strong> لدينا حصرياً <strong>فيلم PDLC المثبّت على زجاجكم الحالي</strong>، ليصبح مرناً و“ذكياً” فوراً.<br/>
            - أما <strong>الزجاج ذو التقنية المدمجة</strong> (smart glass) فيتضمّن طبقة PDLC منذ تصنيعه، مما يستلزم تغيير الزجاج بالكامل وبتكلفة أعلى.<br/>
            مع أفلامنا، تحوّلون زجاجكم الحالي إلى فضاءات ديناميكية، عصرية وآمنة، <strong>دون تغيير نوافذكم</strong>.
          </p>
        )],
        ['هل هناك نقاط يجب الانتباه إليها؟', (
          <p>
            <strong>التكلفة</strong>: أغلى من الزجاج العادي، لكن فيلم PDLC يبقى <em>أقل تكلفة بكثير</em> من الزجاج الذكي المدمج.<br/>
            <strong>تركيب احترافي</strong>: التركيب والربط الكهربائي يتطلبان تقنياً مؤهلاً.<br/>
            <strong>استعمال داخلي</strong>: مصمّم للفضاءات الداخلية (مكاتب، فيلات، فنادق…).<br/>
            <strong>التغذية الكهربائية</strong>: يلزم تيار متناوب ضعيف للانتقال إلى الوضع الشفاف.<br/>
            <strong>تقنية حديثة نسبياً</strong>: احرصوا على اختيار <strong>مزوّد موثوق</strong> لضمان جودة المنتج وديمومته.<br/>
          </p>
        )],
        ['واش ممكن نركّب الفيلم الذكي على الجاج اللي عندي؟', (
          <p>
            إيه، ممكن! الفيلم الذكي كيتلصق مباشرة على <strong>الجاج اللي عندكم</strong>، بلا ما تبدّلو الشراجم وبلا أشغال كبيرة.<br/>
            كنجيو عندكم، كناخدو القياسات، وكنركّبو الفيلم مع الربط الكهربائي في ساعات قليلة، فالدار البيضاء، الرباط، سلا، مراكش ولا أي مدينة أخرى فالمغرب.
          </p>
        )],
        ['ما مدى متانة وأمان استثماركم؟', (
          <p>
            تتحمّل أفلامنا حرارة تصل إلى 105 درجة، وهي مضادة للخدوش وتحسّن العزل الصوتي بحوالي 20 %.<br/>
            عند الكسر، تمسك الشظايا وتضمن استعمالاً آمناً ودائماً.
          </p>
        )],
      ],
    },

    contact: {
      eyebrow: 'اتصل بنا',
      title: <>مستعدّون لتحويل زجاجكم؟ <span className="text-teal-300">يلّاه نهضرو!</span></>,
      listen: 'نحن رهن إشارتكم',
      fastest: 'الأسرع للحصول على عرض سعر مجاني:',
      formTitle: 'أو اتركوا لنا معلوماتكم',
      formSub: 'سنتصل بكم من أجل عرض سعر مجاني، بدون أي التزام.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      codeAria: 'رمز الدولة',
      surface: 'المساحة المراد تجهيزها',
      surfaces: ['أقل من 5 م²', 'من 5 إلى 40 م²', 'أكثر من 40 م²'],
      submit: 'بغيت عرض السعر المجاني',
      sending: 'جارٍ الإرسال...',
      ok: 'تم إرسال رسالتكم بنجاح!',
      err: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
    },

    footer: (y) => `© ${y} Vitres Intelligentes Maroc، Noorium Group SARL. جميع الحقوق محفوظة.`,
    seoLine: 'الزجاج الذكي · جاج ذكي · فيلم ذكي للزجاج · فيلم PDLC · زجاج معتم وشفاف · الدار البيضاء · الرباط · سلا · مراكش · طنجة · أكادير · فاس',

    dock: {
      aria: 'زر التحكم والاتصال السريع',
      label: 'الزجاج',
      on: 'شفاف',
      off: 'معتم',
      hint: 'كليكي هنا!',
      toOn: 'اجعل الزجاج شفافاً',
      toOff: 'اجعل الزجاج معتماً',
    },
    arrow: '←',
  },
}
