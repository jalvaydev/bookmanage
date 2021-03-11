import { useBooksQuery } from "../../generated/graphql";
import Card from "./Card";
const CardList = () => {
  const { data, error, loading } = useBooksQuery();
  if (error) return <div>Error...</div>;
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {!loading &&
        data?.books.map((book) => (
          <Card
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            bookImage={book.image}
          />
        ))}
    </ul>
  );
};

export default CardList;
