const translations = {
  en: {
    navProfile: "Profile", navProof: "Proof", navProjects: "Projects", navStack: "Stack", navContact: "Contact",
    heroStatus: "Building safer digital systems",
    heroRole: "Cybersecurity student · Founder · Software builder",
    heroLead: "I turn security research, AI, and software engineering into practical tools for people who need to trust the internet.",
    exploreWork: "Explore the evidence", startConversation: "Start a conversation", scroll: "Scroll to enter",
    profileEyebrow: "The person behind wenli", profileTitle: "Security is the foundation.<br />Impact is the objective.",
    profileBody: "I am a cybersecurity student at CADT, startup founder, and software builder working across secure systems, artificial intelligence, cloud infrastructure, and digital safety. I founded Komnot to help people detect and verify online scams, translating a regional problem into a product built for real users.",
    profileBody2: "My path is deliberately multidisciplinary: I test applications, write software, study networks and forensics, pitch products, speak to students, and collaborate across cultures. I completed the Japanese IT Pathway with AUPP and NEXTMAKE in 2026.",
    based: "Based", focus: "Focus", languages: "Languages", current: "Current",
    focusValue: "Cybersecurity · AI · Product", currentValue: "Cybersecurity student / NEXTMAKE",
    proofEyebrow: "Selected achievements", proofTitle: "Not claims.<br />Evidence.",
    proofIntro: "A record of building, competing, representing Cambodia, and sharing what I learn.",
    a1Title: "Champion: Finclusion Innovate", a1Body: "Komnot won first place among university innovators at the national financial inclusion challenge co-organized by Credit Bureau Cambodia and the National Bank of Cambodia.",
    a2Title: "UN Cybercrime Hackathon Finalist", a2Body: "Selected as one of eight finalist teams from more than 50 applications across the Asia-Pacific. Presented Komnot during the UN Convention against Cybercrime signing week in Hanoi.",
    a3Title: "First Runner-up: CamTech Innovation", a3Body: "Komnot placed second after a two-month innovation program shaped by weekly training, mentor reviews, and direct feedback from industry judges.",
    a4Title: "Generation Connect Youth Envoy", a4Body: "Selected for active participation in the ITU Generation Connect Youth Envoys programme, contributing a Cambodian youth perspective to inclusive digital transformation.",
    komnotTitle: "One problem.<br />Three podiums.", komnotBody: "Komnot is an AI-assisted scam and fraud verification concept built to help people make safer decisions online. It turns suspicious messages, links, and claims into signals users can understand and act on.",
    podiums: "competition podiums", finalists: "regional finalists", topPrize: "top prize", income: "project income", signal: "SIGNAL CONFIDENCE",
    stackEyebrow: "How I build", stackTitle: "Broad range.<br />Security mindset.", stackIntro: "Tools change. The constant is learning how systems behave, where they fail, and how to build them better.",
    tabSecurity: "Security", tabEngineering: "Engineering", tabPlatform: "Platform",
    projectsEyebrow: "Selected technical work", projectsTitle: "Built to learn.<br />Built to work.", projectsIntro: "Security research, infrastructure, cryptography, and engineering projects developed through direct implementation and testing.",
    p1Type: "APPLICATION SECURITY", p1Title: "Secure Code Review in the SDLC", p1Body: "A repeatable review methodology for finding frontend and backend vulnerabilities. Combined manual review with SAST and DAST, Docker security checks, CVSS scoring, and actionable OWASP recommendations.",
    p2Type: "MACHINE LEARNING", p2Title: "Real-Time Scam URL Detection", p2Body: "A phishing and scam URL classifier trained with a Cambodia-specific dataset. The research focuses on local threat patterns and practical protection for Cambodian internet users.",
    p3Type: "CLOUD ENGINEERING", p3Title: "AWS Infrastructure as Code", p3Body: "Cloud infrastructure designed and deployed through Terraform, including AWS architecture, S3 storage, repeatable provisioning, and deployment configuration.",
    p4Type: "NETWORK ENGINEERING", p4Title: "Networking and Cybersecurity Labs", p4Body: "Hands-on network environments covering VLANs, routing and switching, packet inspection, Linux administration, Docker fundamentals, and defensive network configuration.",
    p5Type: "WEB SECURITY", p5Title: "Full-Stack Security Testing", p5Body: "Frontend and backend security assessment covering OWASP Top 10 risks, CORS behavior, security headers, vulnerable configuration, automated scanning, and structured reporting.",
    p6Type: "CRYPTOGRAPHY", p6Title: "AES and RSA Encryption CLI", p6Body: "A Go command-line application for encryption and decryption using AES and RSA, with database-backed storage for managed cryptographic records.",
    journeyEyebrow: "Learning beyond code", journeyTitle: "Cambodia,<br />connected.",
    j1Title: "Japanese IT Pathway", j1Body: "AUPP × NEXTMAKE × MPTC program combining Japanese language, workplace communication, and practical IT training toward JLPT N3.",
    j2Title: "Student Experience Speaker", j2Body: "Represented and shared practical learning experiences with students at the Cambodia Academy of Digital Technology.",
    j3Title: "Cambodia at UNODC", j3Body: "Participated in regional dialogue on cybercrime and digital safety, connecting product work with the human impact of online scam operations.",
    contactEyebrow: "Open channel", contactTitle: "Let’s build something<br />worth trusting.", contactBody: "For security research, product collaboration, speaking, or opportunities across Cambodia and beyond.", backTop: "BACK TO TOP ↑"
  },
  ja: {
    navProfile: "プロフィール", navProof: "実績", navProjects: "プロジェクト", navStack: "スキル", navContact: "連絡先",
    heroStatus: "より安全なデジタル社会をつくる",
    heroRole: "サイバーセキュリティ学生 · 創業者 · ソフトウェア開発者",
    heroLead: "セキュリティ研究、AI、ソフトウェア開発を、インターネットを信頼するための実用的なツールへ変えます。",
    exploreWork: "実績を見る", startConversation: "話を始める", scroll: "スクロールして入る",
    profileEyebrow: "wenliの中の人", profileTitle: "セキュリティは土台。<br />インパクトが目的。",
    profileBody: "CADTでサイバーセキュリティを学びながら、スタートアップ創業者・ソフトウェア開発者として、安全なシステム、AI、クラウド、デジタルセーフティに取り組んでいます。Komnotを立ち上げ、オンライン詐欺を発見・検証する仕組みを実際の利用者のために開発しています。",
    profileBody2: "アプリのテスト、開発、ネットワークとフォレンジックの学習、製品ピッチ、学生向け講演、異文化協働を横断して経験を積んでいます。AUPPとNEXTMAKEのJapanese IT Pathwayを2026年に修了しました。",
    based: "拠点", focus: "専門", languages: "言語", current: "現在",
    focusValue: "サイバーセキュリティ · AI · プロダクト", currentValue: "サイバーセキュリティ学生 / NEXTMAKE",
    proofEyebrow: "主な実績", proofTitle: "主張ではない。<br />証拠がある。",
    proofIntro: "開発、競争、カンボジア代表、そして学びの共有。その歩みの記録です。",
    a1Title: "優勝: Finclusion Innovate", a1Body: "CBCとカンボジア国立銀行が共同開催した全国金融包摂チャレンジで、Komnotが大学生チームの中から優勝しました。",
    a2Title: "国連サイバー犯罪ハッカソン ファイナリスト", a2Body: "アジア太平洋地域50件超の応募から8チームに選出。ハノイの国連サイバー犯罪防止条約署名週にKomnotを発表しました。",
    a3Title: "準優勝: CamTech Innovation", a3Body: "2か月間の研修、メンターレビュー、専門審査員からのフィードバックを経て、Komnotが第2位を獲得しました。",
    a4Title: "Generation Connect Youth Envoy", a4Body: "ITUの青年使節プログラムに選出され、包摂的なデジタル変革にカンボジアの若者の視点を届けます。",
    komnotTitle: "一つの課題。<br />三つの受賞。", komnotBody: "Komnotは、オンライン上でより安全な判断を支援するAI活用型の詐欺検証コンセプトです。不審なメッセージ、リンク、主張を、利用者が理解し行動できるシグナルに変換します。",
    podiums: "コンテスト受賞", finalists: "地域ファイナリスト", topPrize: "最高賞金", income: "プロジェクト収益", signal: "シグナル信頼度",
    stackEyebrow: "開発の方法", stackTitle: "広い技術領域。<br />セキュリティ思考。", stackIntro: "ツールは変わります。変わらないのは、システムの挙動と弱点を理解し、より良く構築する姿勢です。",
    tabSecurity: "セキュリティ", tabEngineering: "開発", tabPlatform: "プラットフォーム",
    projectsEyebrow: "主な技術プロジェクト", projectsTitle: "学ぶために作る。<br />使えるものを作る。", projectsIntro: "実装と検証を通じて開発した、セキュリティ研究、インフラ、暗号技術、エンジニアリングのプロジェクトです。",
    p1Type: "アプリケーションセキュリティ", p1Title: "SDLCにおけるセキュアコードレビュー", p1Body: "フロントエンドとバックエンドの脆弱性を発見する再現可能なレビュー手法。手動レビュー、SAST、DAST、Dockerのセキュリティ確認、CVSS評価、OWASPに基づく改善提案を組み合わせました。",
    p2Type: "機械学習", p2Title: "リアルタイム詐欺URL検知", p2Body: "カンボジア固有のデータセットで学習したフィッシング・詐欺URL分類器。地域の脅威パターンとカンボジアの利用者保護に焦点を当てています。",
    p3Type: "クラウドエンジニアリング", p3Title: "AWS Infrastructure as Code", p3Body: "Terraformを用いてAWSアーキテクチャ、S3ストレージ、再現可能なプロビジョニング、デプロイ設定を設計・構築しました。",
    p4Type: "ネットワークエンジニアリング", p4Title: "ネットワークとセキュリティラボ", p4Body: "VLAN、ルーティングとスイッチング、パケット解析、Linux管理、Docker基礎、防御的ネットワーク設定を扱う実践環境です。",
    p5Type: "WEBセキュリティ", p5Title: "フルスタックセキュリティテスト", p5Body: "OWASP Top 10、CORS、セキュリティヘッダー、設定不備、自動スキャン、構造化レポートを含むフロントエンドとバックエンドの評価です。",
    p6Type: "暗号技術", p6Title: "AES・RSA暗号化CLI", p6Body: "Goで開発したAESとRSAによる暗号化・復号CLI。暗号レコードを管理するデータベース連携も実装しました。",
    journeyEyebrow: "コードを越えた学び", journeyTitle: "カンボジアから、<br />世界へ。",
    j1Title: "Japanese IT Pathway", j1Body: "AUPP × NEXTMAKE × MPTCによる、日本語、職場コミュニケーション、実践ITをJLPT N3に向けて学ぶプログラム。",
    j2Title: "学生経験スピーカー", j2Body: "CADTの学生に向けて、実践的な学習経験を代表として共有しました。",
    j3Title: "UNODCでカンボジア代表", j3Body: "サイバー犯罪とデジタルセーフティの地域対話に参加し、製品開発とオンライン詐欺の人的影響を結びつけました。",
    contactEyebrow: "連絡先", contactTitle: "信頼できるものを、<br />一緒につくろう。", contactBody: "セキュリティ研究、製品協業、講演、カンボジア国内外の機会について。", backTop: "トップへ ↑"
  },
  zh: {
    navProfile: "简介", navProof: "成就", navProjects: "项目", navStack: "技能", navContact: "联系",
    heroStatus: "构建更安全的数字系统",
    heroRole: "网络安全学生 · 创业者 · 软件开发者",
    heroLead: "我将安全研究、人工智能和软件工程转化为实用工具，让人们能够更安心地使用互联网。",
    exploreWork: "查看成果", startConversation: "开始交流", scroll: "向下探索",
    profileEyebrow: "wenli背后的人", profileTitle: "安全是基础。<br />影响力是目标。",
    profileBody: "我是在CADT学习网络安全的学生，也是一名创业者和软件开发者，专注于安全系统、人工智能、云基础设施和数字安全。我创立了Komnot，帮助用户识别和验证网络诈骗，将区域性问题转化为面向真实用户的产品。",
    profileBody2: "我的成长路径跨越多个领域：应用安全测试、软件开发、网络与取证、产品路演、学生分享和跨文化协作。我于2026年完成了AUPP与NEXTMAKE的Japanese IT Pathway项目。",
    based: "所在地", focus: "方向", languages: "语言", current: "目前",
    focusValue: "网络安全 · AI · 产品", currentValue: "网络安全学生 / NEXTMAKE",
    proofEyebrow: "主要成就", proofTitle: "不是口号。<br />是证明。",
    proofIntro: "记录我的构建、竞赛、代表柬埔寨以及分享所学的历程。",
    a1Title: "冠军: Finclusion Innovate", a1Body: "Komnot在由柬埔寨征信局和柬埔寨国家银行联合举办的全国金融普惠挑战赛中获得大学创新团队第一名。",
    a2Title: "联合国网络犯罪黑客松决赛团队", a2Body: "从亚太地区50多份申请中入选八强，并在河内《联合国打击网络犯罪公约》签署周展示Komnot。",
    a3Title: "亚军: CamTech Innovation", a3Body: "经过两个月的训练、导师评审和行业评委反馈，Komnot最终获得第二名。",
    a4Title: "Generation Connect青年特使", a4Body: "入选国际电信联盟青年特使项目，为包容性数字化转型贡献柬埔寨青年的视角。",
    komnotTitle: "一个问题。<br />三次获奖。", komnotBody: "Komnot是一款AI辅助的诈骗验证方案，帮助用户在网上做出更安全的决定。它将可疑消息、链接和说法转化为用户能够理解并采取行动的信号。",
    podiums: "竞赛奖项", finalists: "区域决赛团队", topPrize: "最高奖金", income: "项目收入", signal: "信号可信度",
    stackEyebrow: "我的构建方式", stackTitle: "技术广度。<br />安全思维。", stackIntro: "工具不断变化，但理解系统行为、发现薄弱点并构建更好的系统始终不变。",
    tabSecurity: "安全", tabEngineering: "开发", tabPlatform: "平台",
    projectsEyebrow: "精选技术项目", projectsTitle: "为学习而构建。<br />为使用而构建。", projectsIntro: "通过直接实现和测试完成的安全研究、基础设施、密码学与工程项目。",
    p1Type: "应用安全", p1Title: "软件开发生命周期安全代码审查", p1Body: "用于发现前端和后端漏洞的可重复审查方法，结合手动审查、SAST、DAST、Docker安全检查、CVSS评分和OWASP修复建议。",
    p2Type: "机器学习", p2Title: "实时诈骗URL检测", p2Body: "使用柬埔寨本地数据集训练的钓鱼与诈骗URL分类器，专注于本地威胁模式和柬埔寨互联网用户保护。",
    p3Type: "云工程", p3Title: "AWS基础设施即代码", p3Body: "通过Terraform设计和部署云基础设施，包括AWS架构、S3存储、可重复配置与部署设置。",
    p4Type: "网络工程", p4Title: "网络与网络安全实验", p4Body: "实践网络环境涵盖VLAN、路由与交换、数据包分析、Linux管理、Docker基础和防御性网络配置。",
    p5Type: "WEB安全", p5Title: "全栈安全测试", p5Body: "针对前端与后端的安全评估，涵盖OWASP Top 10、CORS、安全响应头、错误配置、自动扫描和结构化报告。",
    p6Type: "密码学", p6Title: "AES与RSA加密CLI", p6Body: "使用Go开发的命令行加密与解密程序，支持AES、RSA以及由数据库管理的加密记录存储。",
    journeyEyebrow: "代码之外的学习", journeyTitle: "柬埔寨，<br />连接世界。",
    j1Title: "日本IT人才路径项目", j1Body: "AUPP × NEXTMAKE × MPTC联合项目，结合日语、职场沟通与实用IT培训，目标达到JLPT N3。",
    j2Title: "学生经验分享嘉宾", j2Body: "代表学生在柬埔寨数字技术学院分享实际学习与成长经验。",
    j3Title: "代表柬埔寨参与UNODC活动", j3Body: "参与网络犯罪与数字安全区域对话，将产品实践与网络诈骗对人的影响联系起来。",
    contactEyebrow: "开放联系", contactTitle: "一起打造<br />值得信赖的产品。", contactBody: "欢迎就安全研究、产品合作、演讲或柬埔寨及国际机会与我联系。", backTop: "返回顶部 ↑"
  }
};

const header = document.querySelector(".site-header");
const menu = document.querySelector(".desktop-nav");
const menuToggle = document.querySelector(".menu-toggle");
const glow = document.querySelector(".cursor-glow");

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 24));
window.addEventListener("pointermove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-btn").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = translations[lang][node.dataset.i18n];
      if (value) node.innerHTML = value;
    });
    localStorage.setItem("wenli-language", lang);
  });
});

document.querySelectorAll(".cap-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".cap-tab").forEach((item) => item.classList.toggle("active", item === tab));
    document.querySelectorAll(".cap-panel").forEach((panel) => panel.classList.toggle("active", panel.id === tab.dataset.target));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const savedLanguage = localStorage.getItem("wenli-language");
if (savedLanguage && savedLanguage !== "en") {
  document.querySelector(`.lang-btn[data-lang="${savedLanguage}"]`)?.click();
}
