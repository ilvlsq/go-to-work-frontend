import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="bg-secondary px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="lg:w-1/2">
            <Image
              src="/images/hero-image.png"
              width={500}
              height={460}
              alt="Статуя жінки-войовниці з мечем і щитом, що символізує захист і силу, на тлі стилізованих будівель, що відображають українську архітектурну культуру, із закликом розпочати ІТ-кар&apos;єру в Україні"
              className="max-w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-right m-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-loose">
              Ваша ІТ-кар&apos;єра починається тут
            </h1>
            <p className="text-xl mb-6">
              Найкращі вакансії для розробників, тестувальників, аналітиків та
              інших ІТ-фахівців
            </p>
            <Button href="/" size="medium" variant="primary">
              Завантажити CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
