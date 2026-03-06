import { PageHeader } from "@/components/page-header";
import { HeroPattern } from "../components/hero-patern";
import { DashboardHeader } from "../components/dashboard-header";
import { TextInputPanel } from "../components/text-input-panel";
import { QuickActionsPanel } from "../components/quick-action-panel";

export function DashboardView() {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
