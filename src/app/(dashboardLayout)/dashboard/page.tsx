import Dashboard from "@/components/Modules/pages/DashboardPages/DashboardHome/Dashboard";
import DashboardHome from "@/components/Modules/pages/DashboardPages/DashboardHome/DashboardHome";
import { getDashboardReport, getMonthlyAnalytic } from "@/utils/actions/dashborad";


const DashboardHomePage = async () => {
  const { data:analytics  } = await getMonthlyAnalytic();
  const { data } = await getDashboardReport();


  return (
    <div className="w-full text-center">
      <Dashboard data={data}/> 
      <DashboardHome monthly={analytics} />
    </div>
  );
};

export default DashboardHomePage;
