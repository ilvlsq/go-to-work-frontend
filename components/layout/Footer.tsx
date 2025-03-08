import Link from "next/link";
import Button from "../ui/Button";

const quickLinks = [
  { href: "/vacancies", label: "Вакансії" },
  { href: "/for-employers", label: "Для роботодавців" },
  { href: "/create-cv", label: "Створити CV" },
  { href: "/news", label: "Новини" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
];

const helpLinks = [
  { href: "/terms", label: "Умови" },
  { href: "/privacy", label: "Політика конфіденціальності" },
  { href: "/report", label: "Подати скаргу" },
];

export default function Footer() {
  return (
    <footer className="bg-[#DDDDDD]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* warning column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Остерігайтесь шахраїв</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Оскільки шахрайство зростає, ми підкреслюємо нашу відданість вашій безпеці та фінансовій безпеці. Для отримання вашої інформації, ми не вимагаємо оплати від шукачів роботи за наші послуги, і ви можете перевірити наших співробітників і їх контактні дані на нашому офіційному сайті.
              </p>
              <p>
                Будьте обережні, якщо до вас звертаються особи, які стверджують, що представляють нас. Ваша довіра має першорядне значення. Ви завжди можете аутентифікувати будь-яке спілкування через наші офіційні канали, щоб захистити себе від потенційних шахраїв.
              </p>
              <p className="font-medium">Дякуємо за вибір наших послуг.</p>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Швидкі посилання</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-primary hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* help */}
          <div>
            <h3 className="font-bold text-lg mb-4">Допомога</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-primary hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contacts */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact us</h3>
            <a 
              href="mailto:devfusion.space@gmail.com" 
              className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              devfusion.space@gmail.com
            </a>

            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-[#1877F2] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#E4405F] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF0000] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>

            {/* button "write to us" */}
            <div className="mt-8 flex items-center gap-2">
            <svg className="w-6 h-6 transform -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M4 12L10 6M4 12L10 18" />
              </svg>
              <Button variant="primary" size="small">Напишіть нам</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 