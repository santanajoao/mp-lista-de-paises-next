type Props = {
  cardsQuantity?: number;
};

export default function Skelleton({ cardsQuantity = 3 }: Props) {
  const arrayToMap = new Array(cardsQuantity).fill(null);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {arrayToMap.map((_, index) => (
        <li key={index} className="bg-white rounded-xl px-2 py-3 pb-0 h-full block shadow-sm hover:shadow-md">
          <div className="rounded-md bg-gray-300 aspect-video object-cover"></div>
          <div className="bg-gray-300 h-5 my-3"></div>
        </li>
      ))}
    </ul>
  );
}

