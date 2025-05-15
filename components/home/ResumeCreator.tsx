import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function ResumeCreator() {
  return (
    <section className="bg-secondary px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="py-4 sm:py-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-lg text-[#8CA3A3]">Ми вам допоможемо!</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Створіть перше професійне резюме!</h2>
          </div>

          <div className="flex flex-col items-center justify-between gap-20 lg:flex-row">
            <div className="space-y-6 lg:w-1/2">
              <h3 className="text-xl font-semibold">
                Віртуальний помічник для створення професійного резюме в IT
              </h3>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Наш віртуальний помічник, побудований на основі нейромереж, стане вашим незамінним
                  інструментом для створення ідеального резюме для роботи в IT-сфері. Помічник
                  допоможе вам автоматично згенерувати резюме, що підкреслить ваші професійні
                  навички, досвід та досягнення. Використовуючи сучасні алгоритми штучного
                  інтелекту, він здатний аналізувати ваші дані та налаштовувати резюме відповідно до
                  вимог різних роботодавців.
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold">Основні можливості:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Автоматична генерація резюме: Введіть базову інформацію, а нейромережа
                        створить добре структуроване резюме за кілька хвилин.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Аналіз і виправлення помилок: Помічник ретельно перевірить ваше резюме на
                        наявність граматичних помилок, некоректних формулювань або зайвої
                        інформації.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Оптимізація під IT-вакансії: Нейромережа врахує специфіку IT-індустрії,
                        включаючи відповідні ключові слова і формати, які підвищать ваші шанси на
                        отримання бажаної роботи.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Адаптація під конкретні вакансії: Помічник може модифікувати резюме для
                        різних позицій, підкреслюючи найбільш релевантні навички.
                      </span>
                    </li>
                  </ul>
                </div>

                <Button variant="primary" size="medium" className="mt-6">
                  Створити CV
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2">
              <Image
                src="/images/Remove-bg_cv 1.png"
                alt="Resume Creator Interface"
                width={600}
                height={600}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
