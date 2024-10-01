import { Job } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getJobs(): Job[] {
  const response: Job[] = [
    {
      id: "304830409234",
      title:
        "Senior Full-Stack Web, Game, DevOps, DataScience, Blockchain Developer",
      company: {
        id: "",
        name: "ФОП. Рога та Копита",
        logo: "https://i.ytimg.com/vi/78KkLYxzwzY/hqdefault.jpg",
      },
      location: "Dnipro",
      shortDescription:
        "Doloremque ex autem quo ad aut voluptate et doloremque. Sint nihil enim quae ea.",
      fullDescription:
        "Esse harum aliquam saepe ab in eum totam et voluptas. Quo sunt consequatur nulla aliquam. Rem laboriosam soluta. Voluptatem repellendus explicabo. Provident rerum possimus et autem nemo ipsa nihil alias. Est blanditiis aut hic in fugiat odit.\n \rModi porro delectus explicabo molestiae voluptas. Repellendus porro aut. Totam natus nemo repudiandae natus et.\n \rLibero ex aperiam. Enim minima voluptatem voluptas sed libero. Quod id corporis iure. Qui qui aliquid eos. Corrupti aspernatur aut aut molestiae voluptatem commodi impedit assumenda quisquam.",
      salary: {
        min: 10,
        max: 50,
        currency: "UAH",
      },
      postedDate: "28 Sep.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Ducimus rerum ut alias. Et aut eligendi. Assumenda accusantium error sed blanditiis. Id doloremque a. Omnis ex exercitationem quia laudantium ratione et quia provident.",
    },
    {
      id: "88238328",
      title: "et est omnis",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location:
        "Accusantium ducimus ratione repellendus rerum aliquid. Ab voluptatum molestiae. Exercitationem provident perspiciatis qui natus eius facere autem. Nihil ut quasi earum quis tempora. Est iure consectetur eligendi modi mollitia fuga commodi eaque.\n \rQui est adipisci voluptates. Adipisci quis quisquam consequatur velit quo hic asperiores voluptatum omnis. Qui cum magnam dicta cumque doloremque reiciendis natus. Voluptas aliquam non dolorum eum incidunt provident. Nulla voluptatem eius maiores possimus sint aspernatur et. Dolorum cumque incidunt velit rerum ipsa quia.\n \rTempora animi eum maiores sunt. Sint asperiores animi enim. Laboriosam et dignissimos velit odio libero praesentium vel. Ea consequatur amet quisquam et rerum aperiam temporibus. Quis in modi esse ad sed quasi itaque est.",
      shortDescription:
        "Ad inventore corporis et accusantium libero unde temporibus. In nesciunt repellendus. Itaque porro qui sed quisquam. Quas ea inventore fugit sit suscipit. Unde voluptatem id.",
      fullDescription: "Nam maxime fugiat.",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate:
        "Qui voluptatum tempora ad et harum. Aut architecto iusto ut at sapiente est. Error et neque officiis voluptatibus quia omnis architecto voluptate dolorem.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl: "Eos ipsum corrupti dolorum quas nam et.",
    },
    {
      id: "quia est quam",
      title: "Esse velit dolor deleniti ex vel.",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location: "non quas voluptatum",
      shortDescription: "cumque quas aut",
      fullDescription:
        "Porro et sed asperiores repellat. Labore aut deserunt pariatur quia quia nemo. Et facilis corrupti temporibus in sunt officiis officia temporibus consequatur.",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate: "ipsa",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Voluptatem nam ab consequatur et vero sapiente id. Fuga consectetur non eos deleniti hic libero possimus id. Ut maiores nemo animi quibusdam esse enim voluptas. Omnis et rerum id quod magnam temporibus. Alias eum ratione omnis dolorem quis sequi.\n \rVeritatis earum voluptatum ipsa at est. Qui rem deserunt omnis excepturi. Omnis commodi aut quasi. Repellendus aut labore provident odio quo numquam consequuntur odio. Nobis sit voluptas aut praesentium.\n \rMollitia eaque sint. Magni aut quo similique impedit vel aut qui et. Sit quibusdam sit. Deleniti omnis ut soluta ut ea rerum repellat. Repellat est reiciendis magnam facilis fugit minima veritatis ut iure.",
    },
    {
      id: "Voluptatem molestias sit illum ut.\nAutem aliquid ut quia voluptate qui enim sed.\nUt iste accusantium iste omnis.",
      title: "sed",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location: "Iusto qui labore ipsa et.",
      shortDescription:
        "Eligendi et et sed voluptates sunt velit beatae nesciunt.\nNisi cumque optio dolor voluptatem aperiam.\nVel hic animi aut beatae et nam autem blanditiis consequatur.",
      fullDescription:
        "Modi dignissimos facilis illo unde. Quo minima voluptatem repellendus. Et aut accusamus odit alias qui. Nulla qui quia. Dicta possimus sint dolorem.\n \rEligendi quisquam iste voluptas maiores totam quaerat repellendus ut. Illo officiis ducimus aut nesciunt. Minima nisi laboriosam sint dolores ea sed. Aut quam nulla fugit amet. Omnis saepe eum placeat voluptas dolores consequatur itaque sit.\n \rId dolores ipsa rerum vitae reprehenderit laborum temporibus. Non et qui. Aliquid eaque reprehenderit. Doloremque voluptatibus sint reprehenderit quos rerum.",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate:
        "Non corrupti in sapiente eum magni et. Tenetur dolor cum accusamus officia molestias rerum. Possimus dolores aperiam.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Dolore corrupti hic blanditiis qui est fugiat qui rerum.",
    },
    {
      id: "Dolorem id laboriosam recusandae quia. Placeat animi inventore provident. Modi quos eaque eos adipisci et laudantium consectetur aliquam. Quo molestiae consequatur rem enim facere sapiente et consequatur dolor. Non odit qui optio debitis.\n \rA aspernatur quia quam ut mollitia. Enim sed ullam quae quia. Numquam adipisci id quisquam possimus neque necessitatibus dignissimos. Et qui pariatur. Autem et sit harum ea. Occaecati omnis blanditiis repudiandae magnam ipsum est voluptatibus magnam.\n \rMinima molestias reiciendis maiores omnis ratione aut optio voluptas perferendis. Commodi sint velit laboriosam tenetur veniam autem quia molestias. Qui aut quam velit adipisci ea molestiae.",
      title: "Autem quis eveniet commodi laborum.",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location:
        "Consectetur quis eius et voluptatem enim omnis non voluptatem est. Qui esse occaecati voluptatem aliquid tempora. Vel facilis voluptatem. Minus laudantium commodi id facere. Enim eaque nisi accusamus animi et. Quis quia vero cupiditate.\n \rAut cum reiciendis minima omnis iusto tenetur voluptatem sapiente laboriosam. Quam aliquid occaecati voluptate rerum et incidunt aut perferendis eius. Ut perspiciatis totam eligendi ab esse impedit magnam. Assumenda fugiat omnis fugiat dolores eum veniam et ratione dolor. Voluptas sed eum modi molestiae architecto. Non est ullam facere sit vel.\n \rEt alias iure nobis eius earum. Nihil autem optio perspiciatis et eum ut ducimus porro est. Id qui et numquam tempora quis consequuntur laudantium.",
      shortDescription:
        "Ipsam delectus velit voluptatibus ipsam asperiores laudantium.\nVel laboriosam illo commodi.",
      fullDescription: "deleniti est quaerat",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate:
        "Quaerat voluptatibus accusamus at et. Et repudiandae minus reprehenderit suscipit placeat nam quo. Pariatur sunt qui nobis id. Incidunt non eaque consequatur dolorem nostrum est. Officia quas sequi beatae eaque omnis quis est voluptatem consequuntur. Debitis sint voluptatem totam rerum sapiente molestias.\n \rDebitis ab cumque sed autem est excepturi. Culpa excepturi explicabo voluptatem veritatis amet aut omnis. Deleniti provident nobis mollitia qui blanditiis quas quo debitis velit. At distinctio sit officia velit ut quis officiis. Accusantium nihil qui explicabo accusantium ea qui.\n \rDignissimos dolores non. Ea eum autem et est necessitatibus incidunt quaerat consectetur architecto. Sunt corrupti ut veniam iusto aliquid. Asperiores ipsa quod veniam voluptates quaerat delectus eius inventore. Voluptatibus provident sed.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Dolores et exercitationem deserunt. Ipsam et ullam ratione earum ullam molestias veritatis tenetur et. Est architecto provident ut maxime ut nulla.",
    },
    {
      id: "Similique autem et ipsa perspiciatis. Mollitia facere quasi fuga et ipsam ipsam reiciendis. Modi vel repellat enim. Ut possimus voluptas velit laborum nulla maxime non magni.",
      title: "ut",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location: "totam",
      shortDescription: "Velit sed quibusdam nulla eum dolore.",
      fullDescription:
        "Quaerat ipsam rem aliquam sapiente non cum. Ipsam ut odio laboriosam.",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate:
        "Aspernatur ipsam nisi et et. Veniam ut expedita aut. Omnis ut molestias. Sunt laudantium iste temporibus animi voluptatem iste voluptatem rerum nesciunt.\n \rVoluptate quos expedita consequatur earum numquam numquam quia. Natus minima suscipit est itaque iste. Quia provident maiores ullam. Voluptas iure omnis enim. Porro eaque magnam quasi in repellendus ut.\n \rNostrum consequatur labore voluptas dolore dolorem asperiores inventore fuga provident. Nemo consequatur dolorem facere. Sunt voluptatem perspiciatis exercitationem voluptatem est. Id ab rerum nostrum accusamus consequuntur non. Facilis at est ut qui dolores.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Alias repellat qui et sed est perferendis quia beatae tempore. Veritatis laborum sint cupiditate. Quas hic odio repellat et.",
    },
    {
      id: "Ea ea reiciendis laborum ut ex animi iure quod sint. Deserunt ea molestiae velit exercitationem expedita incidunt eos. Impedit consequuntur reprehenderit saepe aut natus optio adipisci. Porro ipsam repudiandae quae rem. Omnis quibusdam laborum id. Omnis ipsa quidem alias ex ea consequuntur sit.\n \rEnim vel ut accusamus incidunt at accusantium qui vero. Ut qui est voluptas voluptatum nihil ducimus eos cum. Voluptatem animi labore dignissimos sint alias dicta eos non. Consectetur dolores maiores ducimus quis placeat est qui voluptates consequatur. Fugit ratione iusto sint est aspernatur magnam rem. Perferendis nemo numquam.\n \rLabore blanditiis rerum iure molestiae. Nihil eos eos nisi rerum voluptatem officia aut et qui. Voluptates quia hic enim omnis numquam eaque. Recusandae culpa quibusdam qui. Deleniti qui sint corrupti cupiditate rem qui ut.",
      title: "Deleniti dolorum quo.",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location:
        "Assumenda perferendis et.\nEsse voluptatem quia modi harum odio sint consequatur pariatur et.\nHarum quo qui in sed qui illum quia.\nRerum eveniet repellat laborum quaerat accusantium.\nEt aut mollitia.",
      shortDescription:
        "Ducimus placeat voluptas voluptates quia similique enim.",
      fullDescription: "Atque quasi omnis ut dolorem est et.",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate: "dicta inventore esse",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Modi libero a. Est quaerat odit. Cupiditate ratione consequatur numquam nostrum nihil vero explicabo ipsa.",
    },
    {
      id: "Modi aliquid est nihil quos quia perferendis aspernatur. Nobis sint eos neque voluptates sed et. Itaque sint incidunt laboriosam ea explicabo at sint iusto aut. Ad impedit possimus et modi dolore cupiditate optio molestiae vero. Tempore et suscipit deleniti porro id commodi est voluptatem.",
      title:
        "Enim reprehenderit nulla iure enim est dolor.\nCorrupti rerum exercitationem doloribus explicabo enim illo.\nSit et ab officia et consequatur commodi et mollitia.\nAd molestiae est sunt recusandae.\nVoluptatum quam aliquid fuga aut molestias ex.",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location:
        "Quia sit sint dolorem autem.\nEt et dolor.\nPraesentium sed omnis enim reprehenderit.",
      shortDescription: "commodi voluptas aliquam",
      fullDescription: "autem ut quos",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate:
        "Est quos dolor enim. Omnis minima amet excepturi quos velit expedita. Sed qui at voluptate earum.\n \rConsequatur dolor fugiat delectus. Exercitationem perferendis et omnis voluptatem sit. Autem eos laudantium est ut ipsum qui saepe. Rerum explicabo aspernatur quidem rem laborum quia numquam ut dolores. Fugiat aut veritatis inventore. Nostrum odio nihil laborum magni ut omnis atque omnis odio.\n \rUt iure in esse est officiis. Cupiditate nobis ratione. Aliquam sit libero impedit non omnis quas quo a. Nesciunt exercitationem consectetur aspernatur. Corrupti corrupti velit occaecati est quisquam et officia. Accusantium est incidunt voluptate dolor saepe quis dolore sapiente.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Ea praesentium et. Earum tenetur voluptas quae porro qui laboriosam repellendus vel. Deleniti tempora est nulla quidem. Animi rerum dolor doloribus veniam neque iste molestiae.\n \rPerferendis magni unde doloribus. Mollitia quis odio inventore omnis consequatur sit. Ut sit amet sunt repudiandae.\n \rIllo quam accusantium. Debitis natus id dolor reiciendis nesciunt odio. Beatae exercitationem placeat praesentium alias voluptate. Cupiditate possimus itaque non doloribus qui. Aut magnam at. Placeat dicta qui non similique veritatis incidunt.",
    },
    {
      id: "doloribus cupiditate quisquam",
      title:
        "Saepe amet voluptatem harum nihil illum est ut voluptas voluptas. Molestiae ut et enim minus laborum et error. Enim autem sed sed in non. Qui alias necessitatibus. Quo qui beatae voluptatem iste reprehenderit eos quisquam enim.",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location:
        "Eum quo velit. Ea consequuntur ut sit. Ipsum laborum dolorem atque hic ut quas incidunt beatae. Et consequatur debitis rerum rem quibusdam. Voluptatem neque cumque id ut debitis vitae voluptatum. Autem et alias.\n \rNatus accusamus illo. Deleniti ea quibusdam consectetur adipisci. Tempora numquam voluptates quasi. Ipsam sed ad dolor enim. Dolore a officiis eaque. Tempore voluptatibus velit et sint qui non optio.\n \rEaque molestiae sint eligendi omnis tempora voluptatem exercitationem. Vero saepe recusandae molestias facere optio voluptas mollitia fugit. Excepturi consequatur quibusdam deleniti consequatur deserunt quos quas. Ad omnis explicabo velit autem labore velit iste maxime. Voluptatum eveniet dolorem explicabo ut ipsum iure cumque qui. Illo itaque quos et.",
      shortDescription: "Ea ad commodi ut repellat.",
      fullDescription: "non",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate:
        "Provident omnis recusandae et consequuntur minima. Repellat laborum soluta assumenda fuga consectetur. Qui sint doloremque voluptatem aliquid. Ea et vel cum fugiat. Eveniet voluptates accusantium provident qui. Soluta eaque inventore quisquam.",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "Autem non nemo in velit iure fugiat excepturi in laudantium. Earum similique aut deserunt repudiandae aliquid asperiores et quos. Dolor dolor quasi labore occaecati officia qui tenetur. Quo neque itaque adipisci quo impedit minima et excepturi.\n \rQuas omnis enim qui in consequatur hic. Quis explicabo quae est. Itaque id repellat suscipit ipsa quam. Odit doloremque ut repellendus molestiae aut ut consequatur quam. Error quo provident quaerat dolores architecto impedit et voluptas nostrum. Quo voluptatum recusandae voluptas voluptatem neque in eaque ea.\n \rQuibusdam dolor quibusdam consectetur saepe temporibus earum qui. Voluptas omnis voluptatem consequatur consequatur mollitia ratione enim assumenda asperiores. Error eius vero voluptatem et enim quam aspernatur. Quam aliquam animi non. Asperiores iure corrupti. Omnis rem modi veritatis et.",
    },
    {
      id: "Sit aperiam sint enim corrupti deleniti rerum. Molestiae saepe blanditiis cupiditate in voluptatem aperiam et delectus. Autem autem non corporis non est repellendus officiis earum.\n \rEst voluptas aut est est quasi itaque. Dolor ut veritatis ex voluptas quia ut. Eius commodi vero soluta et doloremque voluptate consequatur qui. Et aut in sit et et esse doloribus. Consequatur eum dolore veniam dolor.\n \rAmet natus enim. Unde praesentium dolor exercitationem numquam at numquam aperiam fuga sed. Possimus minima quos impedit repellendus debitis eos suscipit. Nostrum quasi excepturi molestias qui inventore et ut laboriosam. Fuga odio aut optio qui error non harum accusantium omnis.",
      title: "dolor nesciunt debitis",
      company: {
        id: "",
        name: "",
        logo: "",
      },
      location: "distinctio id assumenda",
      shortDescription:
        "Delectus dolore sapiente sunt nostrum quod. Adipisci magni ut corrupti aut neque facilis et porro. Exercitationem assumenda ipsa nihil minus enim.\n \rEt modi enim qui nihil reiciendis id itaque. Laborum maiores accusantium dolorem sed ut est porro eligendi eum. Consequuntur sit suscipit soluta.\n \rSit ipsa placeat officiis et officia. Officia aliquid soluta voluptatibus. Nisi ducimus architecto.",
      fullDescription: "voluptatum",
      salary: {
        min: 10,
        max: 50,
        currency: "eur",
      },
      postedDate: "est",
      employmentType: "FULL_TIME",
      experienceLevel: "SENIOR",
      tags: ["High salary", "Bonus", "wi-fi"],
      requirements: ["C2 english", "big balls"],
      applicationUrl:
        "A aut eum ut quas quidem laborum illo ducimus delectus. Iste unde et expedita. Laudantium rerum et rerum perferendis odit velit eum natus fugiat.\n \rPerspiciatis aperiam doloremque sint dolorum quo quos alias consequatur. Voluptatem et fuga est. Sunt aut maxime dolorum unde eum nesciunt corrupti. Et ex atque.\n \rEt est veniam ducimus rerum et nobis dicta optio. Asperiores nulla cumque aut excepturi et. Non sit eum sit ea recusandae eum veritatis similique.",
    },
  ];
  console.log("fetch");
  return response;
}
