import type { Language, TranslationStructure } from "../types";

export const TRANSLATIONS = {
  en: {
    meta: {
      title: "Sisyphus Studio — Independent Game Developers",
      description:
        "Sisyphus Studio is an independent game studio creating Frog Frag and Krivda. Small team, big ambitions.",
      rssTitle: "Sisyphus Studio — Studio News",
      rssDescription:
        "Independent game studio creating Frog Frag and Krivda. Small team, big ambitions.",
    },
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      news: "News",
      careers: "Career",
      donate: "Sponsorship",
      partners: "Sponsors",
      contact: "Contacts",
      toggleNav: "Toggle navigation",
      navMenu: "Navigation menu",
    },
    hero: {
      title: "CREATING A NEW REALITY",
      cta: "See Our Games",
      ctaSecondary: "Learn More",
      badge: "Indie Company · Est. 2025",
      stats: {
        titles: "Titles in Development",
        founded: "Founded",
        independent: "Team Members",
      },
      featuredSub: "Death match · FPS",
      progressLabel: "Development Progress",
      conceptSub: "Survival · Slavic mythology",
      scroll: "SCROLL",
      comingSoon: "Soon",
      inDevLabel: "In Dev",
    },
    projects: {
      heading: "Our",
      headingSuffix: "Games",
      sectionLabel: "Projects",
      of: "of",
      learnMore: "Learn More",
      prevGame: "Previous game",
      nextGame: "Next game",
      swipeHint: "swipe",
      progressLabel: "Development",
    },
    about: {
      heading: "Sisyphus",
      headingSuffix: "studio",
      sectionLabel: "About Us",
      description:
        "We're a small independent studio founded in 2025. Everyone on the development team was deeply involved with games, and at a certain point, we realized that simply playing games wasn't enough—it was time to create them. Thus began our story of overcoming the challenges of an indie company in pursuit of lofty ideals. No sponsors. No compromises. Just sheer willpower.",
      foundedLabel: "Founded",
      indieLabel: "Indie Company",
      stats: {
        team: "Team Members",
        titles: "Titles in Dev",
        founded: "Founded",
        enthusiasm: "Enthusiasm",
      },
      missionLabel: "Mission",
      missionQuote: '"Games not only help us escape reality, they also help us complement it."',
      statusLabel: "Active Development",
      statusSub: "Frog Frag",
    },
    careers: {
      sectionLabel: "Careers",
      heading: "Join The",
      headingSuffix: "Team",
      description:
        "We are an independent studio united by a passion for creating deep and memorable games. We are looking not just for performers, but for full—fledged development partners - those who are ready to take responsibility and bring the matter to an end.",
      formCardLabel: "Application Form",
      formCardTitle: "Work with us",
      formCardDesc: "Fill in the form — tell us who you are and what you make.",
      checkItemsLabel: "What you get:",
      checkItems: [
        "Freedom to realize your boldest creative ideas",
        "A healthy environment: technical support and moral backing",
        "Transparent prospects (revenue share / RevShare)",
        "Real experience shipping a commercial product",
      ] as [string, string, string, string],
      formBtnLabel: "Submit Application",
      statusLabel: "Actively reviewing applications",
      vacanciesTitle: "Open Positions",
      vacancies: [
        { title: "VFX Designer", type: "Visual Effects" },
        { title: "SFX Designer", type: "Sound Design" },
        { title: "Scriptwriter", type: "Narrative" },
        { title: "UI Designer", type: "2D Art" },
        { title: "Concept Artist", type: "2D Art" },
        { title: "3D Character Designer", type: "3D Art" },
        { title: "3D Animation Designer", type: "UE5 / Maya" },
        { title: "UE5 Developer", type: "Code" },
      ],
      faq: {
        triggerLabel: "FAQ — Frequently asked questions about the project",
        title: "Common Questions",
        subtitle: "Everything about how we work and how earnings are split",
        closeLabel: "Close FAQ",
        items: [
          {
            question: "Why is there no salary?",
            answer:
              "We're starting from scratch and are honest about it. We have no investor and no payroll fund — only an idea, a team, and a plan to ship the game. Instead of a salary, each member gets a real share of the result: ~50% of the project's first net profit will be distributed among contributors proportionally to their tracked contribution in Trello. The remaining ~50% is reinvested into the studio and a future salary fund. This isn't working for someone else — it's co-authorship.",
          },
          {
            question: "How is profit split?",
            answer:
              "Fairly and transparently. Half of the first net profit is shared among everyone who contributed to development — proportionally to their contribution. The other half goes back into the studio: operating costs, project development, and future salaries. No magic — just clear math.",
          },
          {
            question: "How is my contribution tracked?",
            answer:
              "All work is logged in Trello: every task, participation in others' tasks, completions, and deadlines. Your final share is calculated based on your total volume of completed tasks at the time of product launch. The system is open — every participant sees their own picture and the overall one.",
          },
          {
            question: "What if I leave?",
            answer:
              "If a member decides to leave, we lock in their contribution made up to that point and retain the studio's right to use the work results, transferred under the agreement, within the project. To protect both sides, we sign a written agreement before work begins, covering the transfer of exclusive rights, contribution accounting, and exit terms. The right to participate in first-profit distribution is retained by those who were on the team for at least 6 months and completed the agreed scope of work, unless otherwise agreed by the parties.",
          },
          {
            question: "Are you legally registered?",
            answer:
              "The studio is not currently registered as a legal entity. However, participants can enter into written agreements as individuals — this is lawful and locks in the arrangements between parties. We are open to signing such documents on request.",
          },
          {
            question: "When will I get paid?",
            answer:
              "Payments happen after receiving the first net profit from the project's sales. Exact timelines cannot be guaranteed — it depends directly on the game's commercial success. We keep the team regularly informed of the project's financial status.",
          },
          {
            question: "What if the project doesn't ship or breaks even?",
            answer:
              "We're honest: this risk exists in any indie project. If the project doesn't recoup — there are no payouts. That's exactly why we recommend treating studio participation as an investment in your portfolio, commercial dev experience, and co-authorship of an IP — not as a replacement for a primary income. That's not a consolation prize — for many specialists it's the main value.",
          },
          {
            question: "Can I combine this with my main job?",
            answer:
              "Of course. We do too. Tasks are planned with real workloads in mind — nobody expects 40 hours a week. The main thing is to do your part of the work and communicate with the team.",
          },
        ],
      },
    },
    partners: {
      sectionLabel: "Sponsors",
      heading: "Our",
      headingSuffix: "Sponsors",
      description:
        "Our partners and like-minded people — studios, teams, and individuals who share our passion for game dev. Thank you to everyone who believes in us and helps bring our game worlds to life!",
      activeCount: "1 Active Sponsor",
      categoryLabels: {
        gold: "Gold Sponsor",
        silver: "Silver Sponsor",
        bronze: "Bronze Sponsor",
        partner: "Partner",
      },
      linkLabels: {
        website: "Website",
        steam: "Steam",
        twitter: "X / Twitter",
        github: "GitHub",
      },
    },
    news: {
      heading: "Studio",
      headingSuffix: "News",
      sectionLabel: "News",
      readMore: "Read more",
      of: "of",
      updates: "updates",
      closeArticle: "Close article",
      paused: "paused",
      swipeHint: "swipe",
      allCategories: "All",
      noNews: "No news in this category yet",
    },
    donate: {
      title: "Support The",
      titleSuffix: "Journey",
      description:
        "Our work is hard, but unlike the myth, our mountain has a peak — the release of a cool game. The main idea of sponsorship is mutual benefit and support. Do you want to become a part of this story and accelerate our rise? Support us, and we will make our entire community aware of your help!",
      sectionLabel: "Sponsorship",
      note: "100% of donations go directly to development.",
      tiers: [
        {
          label: "Sponsor",
          title: "Become a Sponsor",
          description: "Get your name in the credits and support the studio long-term.",
          cta: "Contact Us",
        },
        {
          label: "One-time",
          title: "Buy Us a Coffee",
          description: "A small donation goes a long way for an indie team.",
          cta: "Donate",
        },
        {
          label: "Steam",
          title: "Wishlist on Steam",
          description: "Our Steam page is coming soon. Stay tuned — we'll announce it here first!",
          cta: "Coming Soon",
          comingSoon: true,
        },
      ],
    },
    contact: {
      heading: "Get in Touch",
      headingSuffix: "With Us",
      sectionLabel: "Contacts",
      description:
        "If you want to become a sponsor, propose a collaboration, or have ideas for a joint project — feel free to reach out!",
      form: {
        name: "Your brand",
        namePlaceholder: "BrandCorp",
        email: "Email",
        emailPlaceholder: "hello@example.com",
        message: "Message",
        messagePlaceholder: "Hi, I have a proposal you can't refuse!",
        submit: "Send Message",
        submitting: "Sending…",
        success: "Message sent. We'll get back to you soon.",
        error: "Something went wrong. Please try again.",
        required: "Required field",
        invalidEmail: "Enter a valid email",
      },
    },
    footer: {
      sectionLabel: "Footer",
      copyright: "© {year} Sisyphus Studio",
      backToTop: "Back to top",
    },
    notFound: {
      badge: "Error 404",
      title: "Page Not Found",
      subtitle: "Looks like this page vanished like a village in Krivda.",
      cta: "Back Home",
    },
  },
  ru: {
    meta: {
      title: "Sisyphus Studio — Независимая инди-компания",
      description:
        "Sisyphus Studio — независимая игровая студия, создающая Frog Frag и Кривду. Небольшая команда с большими амбициями.",
      rssTitle: "Sisyphus Studio — Новости студии",
      rssDescription:
        "Независимая игровая студия. Разрабатываем Frog Frag и Кривду. Небольшая команда с большими амбициями.",
    },
    nav: {
      home: "Главная",
      about: "О нас",
      projects: "Проекты",
      news: "Новости",
      careers: "Карьера",
      donate: "Спонсорство",
      partners: "Спонсоры",
      contact: "Контакты",
      toggleNav: "Открыть меню",
      navMenu: "Меню навигации",
    },
    hero: {
      title: "СОЗДАЕМ НОВУЮ РЕАЛЬНОСТЬ",
      cta: "Наши игры",
      ctaSecondary: "Узнать больше",
      badge: "Инди-компания · Осн. в 2025",
      stats: {
        titles: "Игры в разработке",
        founded: "Основана",
        independent: "В команде",
      },
      featuredSub: "Бой на смерть · FPS",
      progressLabel: "Прогресс разработки",
      conceptSub: "Выживание · Славянская мифология",
      scroll: "ПРОКРУТКА",
      comingSoon: "Скоро",
      inDevLabel: "В разработке",
    },
    projects: {
      heading: "Наши",
      headingSuffix: "Игры",
      sectionLabel: "Проекты",
      of: "из",
      learnMore: "Узнать больше",
      prevGame: "Предыдущая игра",
      nextGame: "Следующая игра",
      swipeHint: "свайп",
      progressLabel: "Разработка",
    },
    about: {
      heading: "Sisyphus",
      headingSuffix: "studio",
      sectionLabel: "О нас",
      description:
        "Мы небольшая независимая студия, основанная в 2025 году. Каждый из команды разработки был тесно связан с играми и в определенный момент времени мы поняли, что просто играть в игры недостаточно, пора их создавать. Так началась наша история борьбы с трудностями инди-компании, ради высоких идей. Без спонсоров. Без компромиссов. Только сила воли.",
      foundedLabel: "Основана",
      indieLabel: "Инди-компания",
      stats: {
        team: "В команде",
        titles: "Игры в разработке",
        founded: "Год основания",
        enthusiasm: "Энтузиазм",
      },
      missionLabel: "Миссия",
      missionQuote:
        "«Игры не только помогают бежать из реальности, они также помогают её дополнять»",
      statusLabel: "Активная разработка",
      statusSub: "Frog Frag",
    },
    careers: {
      sectionLabel: "Карьера",
      heading: "Присоединяйся к",
      headingSuffix: "Команде",
      description:
        "Мы — независимая студия, объединённая страстью к созданию глубоких и запоминающихся игр. Мы ищем не просто исполнителей, а полноправных партнёров по разработке — тех, кто готов брать на себя ответственность и доводить дело до конца.",
      formCardLabel: "Форма заявки",
      formCardTitle: "Работай с нами",
      formCardDesc: "Заполни форму — расскажи о себе и своих работах.",
      checkItemsLabel: "Что ты получишь у нас:",
      checkItems: [
        "Свободу для реализации самых смелых творческих идей",
        "Экологичную среду: техническую взаимовыручку и моральную поддержку",
        "Прозрачные перспективы (работа за долю от будущей прибыли / RevShare)",
        "Реальный опыт выпуска коммерческого продукта",
      ] as [string, string, string, string],
      formBtnLabel: "Отправить заявку",
      statusLabel: "Активно рассматриваем заявки",
      vacanciesTitle: "Открытые вакансии",
      vacancies: [
        { title: "VFX дизайнер", type: "Видео-эффекты" },
        { title: "SFX дизайнер", type: "Саунд-дизайн" },
        { title: "Сценарист", type: "Нарратив" },
        { title: "UI дизайнер", type: "2D художник" },
        { title: "Концепт художник", type: "2D художник" },
        { title: "3D дизайнер персонажей", type: "3D арт" },
        { title: "3D дизайнер анимации", type: "UE5 / Maya" },
        { title: "UE5 разработчик", type: "Код" },
      ],
      faq: {
        triggerLabel: "FAQ — Частые вопросы о проекте",
        title: "Частые вопросы",
        subtitle: "Всё о том, как мы работаем и как делится прибыль",
        closeLabel: "Закрыть FAQ",
        items: [
          {
            question: "Почему нет зарплаты?",
            answer:
              "Мы начинаем с нуля и честны в этом. У нас нет инвестора и нет фонда оплаты труда — только идея, команда и план довести игру до релиза. Вместо зарплаты каждый участник получает реальную долю в результате: ~50% от первой прибыли проекта будут распределяться среди участников пропорционально их вкладу (который отслеживается в Trello). Остальные ~50% — реинвестиции в студию и будущий фонд оплаты. Это не «работа на дядю» и не волонтёрство — это соавторство.",
          },
          {
            question: "Как делится прибыль?",
            answer:
              "Честно и прозрачно. Половина от первой чистой прибыли делится между всеми, кто участвовал в разработке, — пропорционально вкладу. Оставшаяся половина возвращается в студию: на расходы, развитие проекта и будущие зарплаты. Никакой магии — просто понятная математика.",
          },
          {
            question: "Как считается мой вклад?",
            answer:
              "Вся работа фиксируется в Trello: каждая задача, участие в задачах других специалистов, выполнение и сроки. Итоговая доля рассчитывается на основе суммарного объёма выполненных задач на момент выхода продукта. Система открыта: каждый участник видит свою и общую картину.",
          },
          {
            question: "Что если я уйду?",
            answer:
              "Если участник решает покинуть команду, мы фиксируем его вклад, выполненный к моменту ухода, и сохраняем за студией право использовать результаты работ, переданные по договору, в рамках проекта. Чтобы защитить интересы обеих сторон, до начала работы мы подписываем письменное соглашение, где заранее прописываются передача исключительных прав, порядок учёта вклада и условия выхода из команды. Право на участие в распределении первой прибыли сохраняется за теми, кто был в команде не менее 6 месяцев и выполнил согласованный объём работ, если иное не будет отдельно согласовано сторонами.",
          },
          {
            question: "Вы юридически оформлены?",
            answer:
              "Студия сейчас не зарегистрирована как юридическое лицо. Однако участники могут заключать письменные соглашения как физические лица — это законно и фиксирует договорённости между сторонами. Мы открыты к подписанию таких документов по запросу.",
          },
          {
            question: "Когда я получу деньги?",
            answer:
              "Выплаты происходят после получения первой чистой прибыли от продаж проекта. Точных сроков гарантировать невозможно — это прямо зависит от коммерческого успеха игры. Мы регулярно держим команду в курсе финансового статуса проекта.",
          },
          {
            question: "Что если проект не выйдет или не окупится?",
            answer:
              "Мы честны: такой риск существует в любом инди-проекте. Если проект не окупится — выплат не будет. Именно поэтому мы рекомендуем воспринимать участие в студии как вложение в портфолио, опыт коммерческой разработки и соавторство в IP — а не как замену основной занятости. Это не утешительный приз — для многих специалистов это основная ценность.",
          },
          {
            question: "Можно совмещать с основной работой?",
            answer:
              "Конечно. Мы сами так живём. Планируем задачи с учётом реальной загрузки, никто не требует 40 часов в неделю. Главное — делать свою часть работы и коммуницировать с командой.",
          },
        ],
      },
    },
    partners: {
      sectionLabel: "Спонсоры",
      heading: "Наши",
      headingSuffix: "Спонсоры",
      description:
        "Наши партнеры и единомышленники — студии, команды и люди, которые разделяют нашу страсть к геймдеву. Спасибо всем, кто верит в нас и помогает воплощать наши игровые миры в реальность!",
      activeCount: "1 активный спонсор",
      categoryLabels: {
        gold: "Золотой спонсор",
        silver: "Серебряный спонсор",
        bronze: "Бронзовый спонсор",
        partner: "Партнёр",
      },
      linkLabels: {
        website: "Сайт",
        steam: "Steam",
        twitter: "X / Twitter",
        github: "GitHub",
      },
    },
    news: {
      heading: "Обновления",
      headingSuffix: "Студии",
      sectionLabel: "Новости",
      readMore: "Читать",
      of: "из",
      updates: "обновлений",
      closeArticle: "Закрыть статью",
      paused: "пауза",
      swipeHint: "свайп",
      allCategories: "Все",
      noNews: "В этой категории пока нет новостей",
    },
    donate: {
      title: "Поддержи",
      titleSuffix: "Нас",
      description:
        "Наш труд тяжел, но, в отличие от мифа, у нашей горы есть вершина — релиз крутой игры. Главная идея спонсорства — это взаимная польза и поддержка. Хотите стать частью этой истории и ускорить наш подъем? Поддержите нас, а мы сделаем так, чтобы о вашей помощи узнало всё наше комьюнити!",
      sectionLabel: "Спонсорство",
      note: "100% пожертвований идут напрямую в разработку.",
      tiers: [
        {
          label: "Спонсор",
          title: "Стать спонсором",
          description: "Ваше имя в титрах и долгосрочная поддержка студии.",
          cta: "Написать нам",
        },
        {
          label: "Разово",
          title: "Угостить кофе",
          description: "Небольшой донат — большая помощь для инди-команды.",
          cta: "Задонатить",
        },
        {
          label: "Steam",
          title: "Вишлист в Steam",
          description:
            "Страница в Steam скоро появится. Следите за обновлениями — объявим здесь первыми!",
          cta: "Скоро",
          comingSoon: true,
        },
      ],
    },
    contact: {
      heading: "Связаться",
      headingSuffix: "с нами",
      sectionLabel: "Контакты",
      description:
        "Если вы хотите стать спонсором, предложить сотрудничество или у вас есть идеи для совместного проекта, то обязательно свяжитесь с нами!",
      form: {
        name: "Ваш бренд",
        namePlaceholder: "АртГрупп",
        email: "Email",
        emailPlaceholder: "hello@example.com",
        message: "Сообщение",
        messagePlaceholder: "Привет, у меня есть предложение от которого сложно отказаться!",
        submit: "Отправить",
        submitting: "Отправка…",
        success: "Сообщение отправлено. Мы ответим в ближайшее время.",
        error: "Что-то пошло не так. Попробуйте ещё раз.",
        required: "Обязательное поле",
        invalidEmail: "Введите корректный email",
      },
    },
    footer: {
      sectionLabel: "Подвал",
      copyright: "© {year} Sisyphus Studio",
      backToTop: "Наверх",
    },
    notFound: {
      badge: "Ошибка 404",
      title: "Страница не найдена",
      subtitle: "Кажется, эта страница исчезла, как деревня в Кривде.",
      cta: "На главную",
    },
  },
} satisfies Record<Language, TranslationStructure>;
