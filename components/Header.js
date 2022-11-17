import { Image } from "react-datocms";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavItem = ({ link, label, style }) => {
  const router = useRouter();
  const isActive = router.asPath === link ? true : false;

  return (
    <Link href={link} style={{ pointerEvents: isActive ? `none` : "auto" }}>
      <div
        className={
          !style
            ? `mr-4 mb-px cursor-pointer text-xs transition-colors hover:mb-0 hover:border-b hover:border-link hover:text-link ${
                isActive ? "text-link" : ""
              }`
            : style
        }
      >
        {label}
      </div>
    </Link>
  );
};

const Header = ({ data }) => {
  return (
    <header className="mb-10">
      <div className="flex">
        <div className="relative mr-4 w-11">
          <Link href="/">
            <Image data={data.avatar.responsiveImage} alt="" />
          </Link>
        </div>
        <div className="text-xs">
          <div className="font-bold">{data.title}</div>
          <div>{data.description}</div>
        </div>
      </div>
      <div className="ml-[3.75rem] flex">
        <div className="flex">
          <NavItem link={"/blog"} label={"Блог"} />
          {data.menu.map((menuItem) => {
            return (
              <NavItem
                link={`/blog/category/${menuItem.slug}`}
                label={menuItem.category}
                key={menuItem.id}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
