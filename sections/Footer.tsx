import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EAEAEA] text-black px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="flex  gap-14">
          <div>
            <h4 className="text-xl font-bold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/models">Популярные модели</Link>
              </li>
              <li>
                <Link href="/brands">Бренды</Link>
              </li>
              <li>
                <Link href="/catalog">Весь каталог</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Связаться с нами</h4>
            <p className="text-sm mb-2">Телефон: +7 (000) 000-00-00</p>
            <p className="text-sm mb-2">Email: info@company.ru</p>
            <p className="text-sm">Адрес: г. Москва, ул. Примерная, 123</p>
          </div>
        </div>
        <div>
          <p>TEst</p>
          <p>TEst</p>
          <p>TEst</p>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-black">
        © {new Date().getFullYear()} ATLANTTRADE
      </div>
    </footer>
  );
}
