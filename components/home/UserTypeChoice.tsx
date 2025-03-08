import Image from "next/image";
import Button from "@/components/ui/Button";

export default function UserTypeChoice() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid md:grid-cols-2 divide-x-2 divide-gray-300">
          {/* seeker */}
          <div className="p-4 sm:p-6 flex flex-col min-h-[400px]">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Ви шукаєте роботу?</h2>
            <div className="h-px bg-gray-300 w-full mb-2"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
              <div className="md:w-1/2">
                <div className="relative h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/seeker.png"
                    alt="Пошук роботи"
                    width={300}
                    height={200}
                    className="object-contain mx-auto h-full"
                    priority
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 flex flex-col">
                <p className="text-gray-600 text-base text-left">
                  Давайте обговоримо ваші наступні кар'єрні можливості та почнемо роботу над вашою заявкою!
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
          <div className="p-4 sm:p-6 flex flex-col min-h-[400px]">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Ви роботодавець?</h2>
            <div className="h-px bg-gray-300 w-full mb-2"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
              <div className="md:w-1/2 flex flex-col">
                <p className="text-gray-600 text-base text-right">
                  Дайте нам знати, кого ви шукаєте та коли вони мають приєднатися до вашої команди, і ми надішлемо вам підбірку найкращих кандидатів!
                </p>
              </div>

              <div className="md:w-1/2">
                <div className="relative h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/employer.png"
                    alt="Роботодавець"
                    width={300}
                    height={200}
                    className="object-contain mx-auto h-full"
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