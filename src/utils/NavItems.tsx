import Link from "next/link";

type NavItemsProps = {
  activeItem: number;
  isMobile: boolean;
};

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const NavItems: React.FC<NavItemsProps> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>

      {/* Mobile view */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
            >
              Future Academy Learning
            </Link>
          </div>
          <div className="w-full flex flex-col  py-6 space-y-6 ">
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href="/" key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black"
                    }block text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
