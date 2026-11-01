
import { useEffect, useRef, useState } from "react";
import { Upload, X, Lock, Globe, Users } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const MAX_CAPTION = 2200;

export function CreatePage() {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "followers" | "private">("public");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) { setPreviewUrl(null); return; }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onPick = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      toast.push("Please choose a video file.", "error");
      return;
    }
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.push("Select a video first.", "error"); return; }
    if (caption.length > MAX_CAPTION) { toast.push("Caption is too long.", "error"); return; }

    setSubmitting(true);
    try {
      toast.push("Video upload isn't wired up yet. The Cloudflare Stream pipeline ships in Phase 3.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-trendo-border">
        <div className="max-w-xl mx-auto px-4 py-3">
          <h1 className="text-base font-bold">Create</h1>
        </div>
      </header>

      <form onSubmit={onSubmit} className="max-w-xl mx-auto px-4 py-6 space-y-5">
        <section>
          {file && previewUrl ? (
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[9/16] max-h-[65vh] mx-auto">
              <video src={previewUrl} controls playsInline className="h-full w-full object-contain" />
              <button
                type="button"
                onClick={() => setFile(null)}
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 text-white grid place-items-center hover:bg-black/80"
                aria-label="Remove video"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-full rounded-xl border-2 border-dashed border-trendo-border bg-trendo-surface aspect-[9/16] max-h-[65vh] grid place-items-center text-center px-6 hover:border-trendo-primary transition-colors"
            >
              <div>
                <div className="mx-auto h-12 w-12 rounded-full bg-white grid place-items-center mb-3 border border-trendo-border">
                  <Upload size={22} className="text-trendo-primary" />
                </div>
                <p className="text-sm font-semibold">Select a video</p>
                <p className="text-xs text-trendo-muted mt-1">MP4, WebM, or MOV up to 3 min</p>
              </div>
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
        </section>

        <section>
          <label className="block text-sm font-semibold mb-1.5">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            maxLength={MAX_CAPTION}
            placeholder="Say something about your video…"
            className="w-full rounded-lg border border-trendo-border bg-white px-3 py-2.5 text-sm resize-none focus:border-trendo-primary outline-none"
          />
          <p className="text-xs text-trendo-muted text-right mt-1">
            {caption.length}/{MAX_CAPTION}
          </p>
        </section>

        <section>
          <label className="block text-sm font-semibold mb-1.5">Hashtags</label>
          <input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="#trending #music"
            className="w-full rounded-lg border border-trendo-border bg-white px-3 py-2.5 text-sm focus:border-trendo-primary outline-none"
          />
        </section>

        <section>
          <p className="block text-sm font-semibold mb-2">Who can watch</p>
          <div className="grid grid-cols-3 gap-2">
            <PrivacyOption
              icon={Globe}
              label="Everyone"
              active={privacy === "public"}
              onClick={() => setPrivacy("public")}
            />
            <PrivacyOption
              icon={Users}
              label="Followers"
              active={privacy === "followers"}
              onClick={() => setPrivacy("followers")}
            />
            <PrivacyOption
              icon={Lock}
              label="Only me"
              active={privacy === "private"}
              onClick={() => setPrivacy("private")}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting || !file}
          className="w-full rounded-lg bg-trendo-primary py-3 text-sm font-semibold text-white shadow-sm hover:bg-trendo-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Publishing…" : "Publish"}
        </button>
      </form>
    </div>
  );
}

function PrivacyOption({
  icon: Icon, label, active, onClick,
}: { icon: typeof Globe; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors ${
        active
          ? "border-trendo-primary bg-trendo-primary-tint text-trendo-primary"
          : "border-trendo-border text-trendo-text hover:bg-trendo-surface"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}