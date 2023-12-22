import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extensions } from "@/config/constants";
import { Action } from "@/types";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type ConversionFormatSelectorProps = {
  action: Action;
  updateAction: (file_name: string, to: string) => void;
};

const ConversionFormatSelector = ({
  action,
  updateAction,
}: ConversionFormatSelectorProps) => {
  const [activeSelectTab, setActiveSelectTab] = useState("video");
  const [selectedFormat, setSelectedFormat] = useState<string>("...");

  return (
    <div className="text-gray-400 text-md flex flex-wrap items-center gap-4">
      <span>Convert to</span>
      <Select
        value={selectedFormat}
        onValueChange={(value) => {
          setSelectedFormat(value);
          if (extensions.audio.includes(value)) {
            setActiveSelectTab("audio");
          } else if (extensions.video.includes(value)) {
            setActiveSelectTab("video");
          }
          updateAction(action.file_name, value);
        }}
      >
        <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 text-md font-medium">
          <SelectValue placeholder="..." />
        </SelectTrigger>
        <SelectContent className="h-fit">
          {action.file_type.includes("image") && (
            <div className="grid grid-cols-2 gap-2 w-fit">
              {extensions.image.map((elt, i) => (
                <div key={i} className="col-span-1 text-center">
                  <SelectItem value={elt} className="mx-auto">
                    {elt}
                  </SelectItem>
                </div>
              ))}
            </div>
          )}
          {action.file_type.includes("video") && (
            <Tabs defaultValue={activeSelectTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="video" className="w-full">
                  Video
                </TabsTrigger>
                <TabsTrigger value="audio" className="w-full">
                  Audio
                </TabsTrigger>
              </TabsList>
              <TabsContent value="video">
                <div className="grid grid-cols-3 gap-2 w-fit">
                  {extensions.video.map((elt, i) => (
                    <div key={i} className="col-span-1 text-center">
                      <SelectItem value={elt} className="mx-auto">
                        {elt}
                      </SelectItem>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="audio">
                <div className="grid grid-cols-3 gap-2 w-fit">
                  {extensions.audio.map((elt, i) => (
                    <div key={i} className="col-span-1 text-center">
                      <SelectItem value={elt} className="mx-auto">
                        {elt}
                      </SelectItem>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
          {action.file_type.includes("audio") && (
            <div className="grid grid-cols-2 gap-2 w-fit">
              {extensions.audio.map((elt, i) => (
                <div key={i} className="col-span-1 text-center">
                  <SelectItem value={elt} className="mx-auto">
                    {elt}
                  </SelectItem>
                </div>
              ))}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConversionFormatSelector;
