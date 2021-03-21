import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = (): JSX.Element => {
  return (
    <footer className="rm-footer">
      <div className="footer-col">
        <h4>RocketMeet</h4>
        <ul>
          <li>
            <a href="#">Copyright &#169; 2021</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Open Source</h4>
        <ul>
          <li>
            <a href="https://github.com/RocketMeet/RocketMeet-server/blob/main/README.md">
              Quick Start
            </a>
          </li>
          <li>
            <a href="https://github.com/RocketMeet/RocketMeet-server/blob/main/CONTRIBUTING.md">
              Contributing
            </a>
          </li>
          <li>
            <a href="https://github.com/RocketMeet/RocketMeet-server/blob/main/CODE_OF_CONDUCT.md">
              Code of Conduct
            </a>
          </li>
          <li>
            <a href="https://github.com/RocketMeet/RocketMeet-server/blob/main/LICENSE">
              License
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>About Us</h4>
        <ul>
          <li>
            <a href="#">Team</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>follow us</h4>
        <div className="social-links">
          <a href="https://twitter.com/RocketMeetHQ">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/company/rocketmeet">
            <FaLinkedin />
          </a>
          <a href="https://github.com/RocketMeet">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
