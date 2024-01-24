import { Container} from "react-bootstrap";
import {
  PlusCircle,
  Lock,
  Grid,
  Github,
  QuestionCircle,
} from "react-bootstrap-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNav = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="bottom-nav">
        <Link href="/recent-polls">
          <a
            className={`bottom-nav-link ${
              router.pathname === "/recent-polls" ? ` active` : ``
            }`}
          >
            <Grid className="bottom-nav-link-icon" />
          </a>
        </Link>
        <Link href="/how-to">
          <a
            className={`bottom-nav-link ${
              router.pathname === "/how-to" ? ` active` : ``
            }`}
          >
            <QuestionCircle className="bottom-nav-link-icon" />
          </a>
        </Link>
        <Link href="/">
          <a
            className={`bottom-nav-link ${
              router.pathname === "/" ? ` active` : ``
            }`}
          >
            <PlusCircle className="bottom-nav-link-icon" />
          </a>
        </Link>
        <Link href="https://github.com/samayapp/samay">
          <a className="bottom-nav-link">
            <Github className="bottom-nav-link-icon" />
          </a>
        </Link>
        <Link href="/privacy">
          <a
            className={`bottom-nav-link ${
              router.pathname === "/privacy" ? ` active` : ``
            }`}
          >
            <Lock className="bottom-nav-link-icon" />
          </a>
        </Link>
    </div>
  );
};

export default BottomNav;
