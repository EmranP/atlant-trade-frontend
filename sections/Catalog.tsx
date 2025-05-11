import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Грузовые шины",
    image: "/images/tyre2.png",
    href: "/catalog/truck-tires",
  },
  {
    id: 2,
    title: "Шины для спецтехники",
    image: "/images/shina.png",
    href: "/catalog/special-tires",
  },
  {
    id: 3,
    title: "Грузовые диски",
    image: "/images/diska.png",
    href: "/catalog/truck-discs",
  },
];

export default function Catalog() {
  return (
    <section className="py-10 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Каталог</h2>

      <div className="flex flex-col gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex py-10 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="w-1/2 h-64">
              <Image
                src={category.image}
                alt={category.title}
                width={400}
                height={400}
                className="object-contain h-full"
              />
            </div>
            <div className="p-4 text-center flex items-center">
              <h3 className="font-semibold text-2xl">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
