import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function UserTypeChoice() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid divide-x-2 divide-gray-300 md:grid-cols-2">
          {/* seeker */}
          <div className="flex min-h-[400px] flex-col p-4 sm:p-6">
            <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">Ви шукаєте роботу?</h2>
            <div className="mb-2 h-px w-full bg-gray-300"></div>

            <div className="flex flex-1 flex-col items-center gap-8 md:flex-row">
              <div className="md:w-1/2">
                <div className="relative h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/seeker.png"
                    alt="Пошук роботи"
                    width={300}
                    height={200}
                    className="mx-auto h-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col md:w-1/2">
                <p className="text-left text-base text-gray-600">
                  Давайте обговоримо ваші наступні кар&apos;єрні можливості та почнемо роботу над
                  вашою заявкою!
                </p>
              </div>
            </div>

            <div className="mt-auto flex justify-end">
              <Button variant="primary" size="medium">
                Завантажити CV
              </Button>
            </div>
          </div>

          {/* employer */}
          <div className="flex min-h-[400px] flex-col p-4 sm:p-6">
            <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">Ви роботодавець?</h2>
            <div className="mb-2 h-px w-full bg-gray-300"></div>

            <div className="flex flex-1 flex-col items-center gap-8 md:flex-row">
              <div className="flex flex-col md:w-1/2">
                <p className="text-right text-base text-gray-600">
                  Дайте нам знати, кого ви шукаєте та коли вони мають приєднатися до вашої команди,
                  і ми надішлемо вам підбірку найкращих кандидатів!
                </p>
              </div>

              <div className="md:w-1/2">
                <div className="relative h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/employer.png"
                    alt="Роботодавець"
                    width={300}
                    height={200}
                    className="mx-auto h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-start">
              <Button variant="primary" size="medium">
                Подати вакансії
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
