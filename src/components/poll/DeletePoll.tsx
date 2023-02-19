import { Trash } from "react-bootstrap-icons";
import { Dispatch } from "react";
import Router from "next/router";
import { deletePoll } from "../../utils/api/server";
import { encrypt } from "../../helpers";

const DeletePoll = (props: {
  pollID: string;
  pollTitle: string;
  secret: string;
  setResponse: Dispatch<{
    status: boolean;
    msg: string;
  }>;
}): JSX.Element => {
  const { pollID, pollTitle, secret, setResponse } = props;

  const handleDelete = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      let deletePollResponse;
      const deleteArgs = {
        pollID,
        secret: encrypt(secret),
      };
      deletePollResponse = await deletePoll(deleteArgs);
      if (deletePollResponse && deletePollResponse.statusCode === 200) {
        setResponse({
          status: true,
          msg: "Your poll been successfully deleted.",
        });
        if (typeof window !== "undefined") {
          let kukkeeCreatedPolls = localStorage.getItem("kukkeeCreatedPolls");

          if (kukkeeCreatedPolls) {
            kukkeeCreatedPolls = JSON.parse(kukkeeCreatedPolls);

            let newKukkeeCreatedPolls = {
              polls: kukkeeCreatedPolls["polls"].filter(
                (poll) => Object.keys(poll)[0] !== `${pollID}-${pollTitle}`
              ),
            };

            localStorage.setItem(
              "kukkeeCreatedPolls",
              JSON.stringify(newKukkeeCreatedPolls)
            );
          }
        }
        Router.push("/recent-polls");
      } else {
        setResponse({
          status: true,
          msg: "Please try again later.",
        });
        Router.reload();
      }
    } catch (err) {
      setResponse({
        status: true,
        msg: "Please try again later.",
      });
    }
  };

  return (
    <span
      onClick={handleDelete}
      className="poll-delete-icon"
      aria-hidden="true"
    >
      <Trash />
    </span>
  );
};

export default DeletePoll;
