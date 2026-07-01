import { useEffect, useState } from 'react';
import { Sliders, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  DEFAULT_MOUTH,
  clearCalibration,
  saveCalibration,
  type MouthBox,
} from '@/lib/mouth-calibration';

interface Props {
  value: MouthBox;
  onChange: (box: MouthBox) => void;
  onReset: () => void;
}

/**
 * Compact floating panel that lets the user fine-tune the mouth overlay
 * position and size. Changes are broadcast live and persisted to
 * localStorage so the calibration survives reloads.
 */
const MouthCalibrator = ({ value, onChange, onReset }: Props) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<MouthBox>(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const update = (patch: Partial<MouthBox>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onChange(next);
    saveCalibration(next);
  };

  const rows: Array<{
    key: keyof MouthBox;
    label: string;
    min: number;
    max: number;
    step: number;
  }> = [
    { key: 'leftPct', label: 'Horizontal', min: 0, max: 100, step: 0.1 },
    { key: 'topPct', label: 'Vertical', min: 0, max: 100, step: 0.1 },
    { key: 'widthPct', label: 'Width', min: 0.5, max: 25, step: 0.1 },
    { key: 'heightPct', label: 'Height', min: 0.3, max: 15, step: 0.1 },
  ];

  return (
    <>
      <Button
        size="icon"
        variant="secondary"
        aria-label="Calibrate mouth overlay"
        onClick={() => setOpen((o) => !o)}
        className="absolute top-2 right-2 z-30 h-9 w-9 rounded-full shadow-lg opacity-70 hover:opacity-100"
      >
        <Sliders className="h-4 w-4" />
      </Button>

      {open && (
        <div
          className="absolute top-14 right-2 z-30 w-64 rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-xl p-4 space-y-3"
          role="dialog"
          aria-label="Mouth overlay calibration"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Lip-sync calibration</p>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              aria-label="Close calibration"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {rows.map((row) => (
            <div key={row.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{row.label}</span>
                <span className="tabular-nums">
                  {draft[row.key].toFixed(1)}%
                </span>
              </div>
              <Slider
                min={row.min}
                max={row.max}
                step={row.step}
                value={[draft[row.key]]}
                onValueChange={(v) => update({ [row.key]: v[0] } as Partial<MouthBox>)}
                aria-label={row.label}
              />
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              clearCalibration();
              setDraft(DEFAULT_MOUTH);
              onReset();
            }}
          >
            <RotateCcw className="h-3 w-3 mr-2" />
            Reset to auto-detected
          </Button>
        </div>
      )}
    </>
  );
};

export default MouthCalibrator;
