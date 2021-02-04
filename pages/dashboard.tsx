import DashboardContainer from "../src/components/Dashboard/DashboardContainer";
import Layout from "../src/components/Layout";
import withprivateAuth from "../src/utils/privateAuth";

const Dashboard = (): JSX.Element => {
  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
};

export default withprivateAuth(Dashboard);
