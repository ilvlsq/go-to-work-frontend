import Image from 'next/image';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="bg-secondary px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-20 lg:flex-row">
          <div className="lg:w-1/2">
            <Image
              src="/images/hero-image.png"
              width={500}
              height={460}
              alt="Статуя жінки-войовниці з мечем і щитом, що символізує захист і силу, на тлі стилізованих будівель, що відображають українську архітектурну культуру, із закликом розпочати ІТ-кар'єру в Україні"
              className="h-auto max-w-full"
            />
          </div>
          <div className="m-3 text-center lg:w-1/2 lg:text-right">
            <h1 className="mb-6 text-4xl font-bold leading-loose sm:text-5xl lg:text-6xl">
              Ваша ІТ-кар&apos;єра починається тут
            </h1>
            <p className="mb-6 text-xl">
              Найкращі вакансії для розробників, тестувальників, аналітиків та інших ІТ-фахівців
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
