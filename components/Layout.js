import Header from "./Header";

const Layout = ({ children, data }) => {
  const date = new Date();

  return (
    <div className="m-auto flex h-screen w-full flex-col justify-between p-6 md:w-10/12 lg:w-7/12">
      <div>
        <Header data={data} />
        <main>{children}</main>
      </div>
      <footer className="text-xs">
        © Антон Досыбиев, {date.getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
