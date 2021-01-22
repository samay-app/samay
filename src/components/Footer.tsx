import GithubCorner from "react-github-corner";

const Footer = (): JSX.Element => {
  return (
    <footer className="rm-footer">
      <GithubCorner
        href="https://github.com/username/repo"
        direction="left"
        octoColor="#000000"
        bannerColor="#ffffff"
        className="octocat"
      />
    </footer>
  );
};
export default Footer;
