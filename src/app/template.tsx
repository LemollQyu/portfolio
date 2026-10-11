import Loader from "@/components/Loader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Loader duration={5000} />
      {children}
    </>
  );
}
