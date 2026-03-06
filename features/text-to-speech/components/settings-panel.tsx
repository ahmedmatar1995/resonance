import { History, Settings } from "lucide-react";

import { SettingsPanelSettings } from "./settings-panel-settings";
import { SettingsPanelHistory } from "./settings-panel-histoy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsPanel() {
  const tabTriggerClassName =
    "flex-1 h-full rounded-none bg-transparent border-x-0 border-t-0 border-b-px border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none";
  return (
    <div className="hidden lg:flex flex-col min-h-0 w-105 border-l">
      <Tabs
        defaultValue="settings"
        className="flex h-full flex-col min-h-0 gap-y-0"
      >
        <TabsList className="w-full bg-transparent rounded-none border-b h-12 group-data[orientation=horizontal]/tabs:h-12 p-0">
          <TabsTrigger value="settings" className={tabTriggerClassName}>
            <Settings className="size-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history" className={tabTriggerClassName}>
            <History className="size-4" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="settings"
          className="min-h-0 mt-0 flex flex-col flex-1 overflow-y-auto"
        >
          <SettingsPanelSettings />
        </TabsContent>
        <TabsContent
          value="history"
          className="min-h-0 flex flex-col flex-1 mt-0 overflow-y-auto"
        >
          <SettingsPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
