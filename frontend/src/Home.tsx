import CardList from "./components/Cards/CardList";
import Header from "./components/Header";
import Layout from "./components/Layout";

const Home = () => {
  return (
    <Layout>
      <Header text={"Home"} />
      <div className="min-h-full rounded-lg  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <CardList />
      </div>
    </Layout>
  );
};

export default Home;
