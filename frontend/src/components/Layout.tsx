import NavBar from "./NavBar";
import Footer from "./Footer";

type AppProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: AppProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-indigo-600 pb-32 h-full">
        <NavBar />
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32 mb-auto">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div>{children}</div>
          {/* <!-- /End replace --> */}
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Layout;
