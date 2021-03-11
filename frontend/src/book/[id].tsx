import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useBookQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import Card from "../components/Cards/Card";

const Book = () => {
  const { id } = useParams<{ id: string }>();
  const { error, loading, data } = useBookQuery({
    variables: { id: parseFloat(id) },
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>Sorry, we couldnt find the book you were looking for! </div>;
  }
  return (
    <Layout>
      <Header text={data?.book.title} />
      <div className="min-h-full rounded-lg flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {!loading && (
          <Card
            id={data!.book.id}
            title={data!.book.title}
            author={data!.book.author}
            price={data!.book.price}
            bookImage={data!.book.image}
          />
        )}
      </div>
    </Layout>
  );
};

export default Book;
