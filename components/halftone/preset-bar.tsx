"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HalftoneSettings, SavedPreset } from "@/lib/halftone/types";
import { TEMPLATE_PACKS } from "@/lib/halftone/types";

interface PresetBarProps {
  savedPresets: SavedPreset[];
  presetName: string;
  onPresetNameChange: (value: string) => void;
  onSavePreset: () => void;
  onApplySettings: (settings: HalftoneSettings) => void;
  onDeletePreset: (id: string) => void;
}

export function PresetBar({
  savedPresets,
  presetName,
  onPresetNameChange,
  onSavePreset,
  onApplySettings,
  onDeletePreset,
}: PresetBarProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="presetName">Save Current Config</Label>
        <div className="flex gap-2">
          <Input
            id="presetName"
            value={presetName}
            onChange={(event) => onPresetNameChange(event.target.value)}
            placeholder="My halftone style"
          />
          <Button onClick={onSavePreset}>Save</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Template Packs</p>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATE_PACKS.map((pack) => (
            <Button key={pack.name} variant="secondary" size="sm" onClick={() => onApplySettings(pack.settings)}>
              {pack.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Saved Local Configs</p>
        {savedPresets.length === 0 ? (
          <p className="text-xs text-muted-foreground">No saved configs yet. Save your first style above.</p>
        ) : (
          <div className="space-y-2">
            {savedPresets.map((preset) => (
              <div key={preset.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <button
                  type="button"
                  className="truncate text-left text-sm hover:underline"
                  onClick={() => onApplySettings(preset.settings)}
                >
                  {preset.name}
                </button>
                <Button variant="ghost" size="sm" onClick={() => onDeletePreset(preset.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
