import { ScrollProgress } from "@/components/ui/ScrollProgress";

/** Re-mounts on every navigation, which replays the entrance transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-in">
      <ScrollProgress />
      {children}
    </div>
  );
}
