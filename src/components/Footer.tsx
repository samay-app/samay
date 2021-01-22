import GithubCorner from "react-github-corner";

const Footer = (): JSX.Element => {
  return (
    <footer className="rm-footer">
      <GithubCorner
        href="https://github.com/RocketMeet"
        direction="left"
        octoColor="#000000"
        bannerColor="transparent"
        className="octocat"
      />
    </footer>
  );
};
export default Footer;
