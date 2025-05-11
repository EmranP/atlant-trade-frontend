import Image from "next/image";

const brands = [
  { id: 1, name: "drc", logo: "/images/drc.png" },
  { id: 2, name: "astero", logo: "/images/astero.png" },
  { id: 3, name: "marvemax", logo: "/images/marvemax.png" },
];

export default function Brands() {
  return (
    <section className="py-10 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Бренды</h2>

      <div className="flex flex-col gap-6 justify-items-center">
        {brands.map((brand) => (
          <div key={brand.id} className="w-64 h-32 transition">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
