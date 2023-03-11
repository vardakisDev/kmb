import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between p-2">
      <span>
        <Link target={"_blank"} href={"https://www.google.com/"} passHref>
          Copyrights
        </Link>
      </span>
      <div className="flex flex-row gap-2">
        <span>
          <Link target={"_blank"} href={"https://www.google.com/"} passHref>
            Privacy
          </Link>
        </span>
        <span>
          <Link target={"_blank"} href={"https://www.google.com/"} passHref>
            Terms
          </Link>
        </span>
        <span>
          <Link target={"_blank"} href={"https://www.google.com/"} passHref>
            Cookies
          </Link>
        </span>
      </div>
      <span>
        <Link target={"_blank"} href={"https://www.google.com/"} passHref>
          Copyrights Reserved{" "}
        </Link>{" "}
      </span>
    </div>
  );
}
