import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-[430px] mx-auto relative min-h-screen pb-24">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
